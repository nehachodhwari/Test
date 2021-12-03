"""
This module contains utility functions for self heal use case
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import xml.etree.ElementTree as ET
import requests
from flask import current_app as app
from jinja2 import Environment
from ..projectconfig import common_config as cfg


def send_email(ticket_number, interface, circuit, data, isp):
    """
    Function to send email to users
    :param ticket_number: service now ticket number
    :param interface: interface name
    :param circuit: circuit number
    :param data: data
    :param isp: isp name
    :return: Boolean
    """
    template = """
                <html>
                <head>
                </head>
                <body>

                Hi User,
                <br></br>
                Ticket Number {{ ticket_number }} has been opened with 
                ISP provider {{ isp }} for the interface issue. 
                <br></br>
                Below are the details for the same.

                Interface:  {{ interface }} <br></br>
                CircuitID: {{ circuit }} <br></br>
                Data: {{ data }} <br></br>

                <br></br>
                <br></br><br></br>
                Thanks,<br></br>
                Administrator

                </body>
                </html>
                """

    msg = MIMEMultipart()
    msg['From'] = app.config['MAIL_DEFAULT_SENDER']
    msg['To'] = 'sales2@nxtgenuc.com'
    msg['Subject'] = 'customer ' + interface + ' issue'
    msg.attach(MIMEText(
        Environment().from_string(template).render(
            ticket_number=ticket_number,
            interface=interface,
            circuit=circuit,
            data=data,
            isp=isp
        ), 'html'))
    try:
        cfg.logger.info("{} {} Sending an email with ticket details".format(cfg.username, cfg.ipaddress))
        server = smtplib.SMTP(app.config['MAIL_SERVER'])
        server.starttls()
        server.sendmail(msg['From'], msg['To'], msg.as_string())
        server.quit()
        cfg.logger.info("{} {} Email sent".format(cfg.username, cfg.ipaddress))
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise error
    return True


def open_service_now_ticket(interface_name):
    """
    Function to open service now ticket
    :param interface_name: interface name
    :return: ticket number or None
    """
    url = cfg.SNOW['url']
    user = cfg.SNOW['user']
    pwd = cfg.SNOW['password']
    headers = {"Content-Type": "application/xml", "Accept": "application/xml"}
    data = """<request><entry><caller_id>Abel Tuter</caller_id><priority>1</priority>
                    <short_description>Rendezvous Terminal-Server Interface""" \
                       + interface_name + """ issue</short_description>
                    <assignment_group>DL-UnifiedCommunication</assignment_group><state>1</state>
                    <incident_state>1</incident_state><category>Unified Communications</category>
                    <subcategory>Cisco Unified cm</subcategory></entry></request>"""
    try:
        cfg.logger.info("{} {} Opening service now ticket".format(cfg.username, cfg.ipaddress))
        response = requests.post(url, auth=(user, pwd), headers=headers, data=data)
        cfg.logger.info("{} {} Ticket opened successfully".format(cfg.username, cfg.ipaddress))
    except requests.exceptions.RequestException as error:
        cfg.logger.error("{} {} error".format(cfg.username, cfg.ipaddress, error))
        return error
    if response.status_code == 201:
        root = ET.fromstring(response.text)
        ticket_number = root.find(".//number")
        return ticket_number.text
    return None

#
# def selfheal_incidents():
#     """
#     Function for getting self heal incidents count
#     :return: string data
#     """
#     # pylint: disable=C0301
#     url = 'https://dev79271.service-now.com/api/now/table/incident?sysparm_query=category%3Dunified%20communications%5EORcategory%3Ducaas%5Eshort_descriptionLIKEGateway%5EORshort_descriptionLIKEreset&sysparm_limit=10000'
#     user = 'admin'
#     pwd = '81LDQxcOfjiG'
#     headers = {"Content-Type": "application/json", "Accept": "application/json"}
#     response = requests.get(url, auth=(user, pwd), headers=headers)
#     if response.status_code != 200:
#         return
#     data = response.json()
#     data_filter = data['result']
#     return data_filter
#
#
# def list_assigned_group():
#     """
#     Function to get list of assigned group
#     :return: dictionary of data
#     """
#     url = 'https://dev79271.service-now.com/api/now/table/sys_user_group?sysparm_limit=100000'
#     user = 'admin'
#     pwd = '81LDQxcOfjiG'
#     headers = {"Content-Type": "application/json", "Accept": "application/json"}
#     cfg.logger.info("{} {} Getting list of assigned groups".format(cfg.username, cfg.ipaddress))
#     response = requests.get(url, auth=(user, pwd), headers=headers)
#     if response.status_code != 200:
#         cfg.logger.info("{} {} Assignation groups are listed successfully".format(cfg.username, cfg.ipaddress))
#         return
#     data = response.json()
#     data_filter = data['result']
#     name = []
#     group_id = []
#     for value in data_filter:
#         name.append(value['name'])
#         group_id.append(value['sys_id'])
#     res = {}
#     for key in group_id:
#         for value in name:
#             res[key] = value
#             name.remove(value)
#             break
#     return res
#
#
# def list_assigned_to():
#     """
#     Function to get the list of assigned user groups to
#     :return: data dictionary
#     """
#     url = 'https://dev79271.service-now.com/api/now/table/sys_user?&sysparm_limit=100000'
#     user = 'admin'
#     pwd = '81LDQxcOfjiG'
#     headers = {"Content-Type": "application/json", "Accept": "application/json"}
#     cfg.logger.info("{} {} Getting list of assigned to user groups".format(cfg.username, cfg.ipaddress))
#     response = requests.get(url, auth=(user, pwd), headers=headers)
#     if response.status_code != 200:
#         return
#     data = response.json()
#     data_filter = data['result']
#     name = []
#     user_id = []
#     for value in data_filter:
#         name.append(value['name'])
#         user_id.append(value['sys_id'])
#     res = {}
#     for key in user_id:
#         for value in name:
#             res[key] = value
#             name.remove(value)
#             break
#     return res
