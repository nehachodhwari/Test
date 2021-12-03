# """
# This module contains functions for self heal use case
# """
#
# import socket
# import requests
# import paramiko
# from flask import Blueprint, render_template
# from automate.models.models import IspProvider
# from .utils import send_email, open_service_now_ticket, selfheal_incidents,\
#     list_assigned_to, list_assigned_group
# from ..projectconfig import common_config as cfg
#
# heal = Blueprint('heal', __name__)
#
#
# @heal.route('/interface')
# def interface_heal():
#     """
#     Function for healing of SIP gateway trunks
#     :return: None
#     """
#     ssh = paramiko.SSHClient()
#     ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#     try:
#         ssh.connect(hostname=cfg.GATEWAY_DETAILS['hostname'],
#                     username=cfg.GATEWAY_DETAILS['username'],
#                     password=cfg.GATEWAY_DETAILS['password'])
#     except (socket.error, paramiko.AuthenticationException,
#             paramiko.SSHException) as message:
#         return str(message)
#     stdin, stdout, stderr = ssh.exec_command('Show ISDN status')  # pylint: disable=W0612
#     list_data = []
#     flag = False
#     for line in stdout.read().splitlines():
#         if flag:
#             list_data.append(line)
#             flag = False
#         if line.startswith(b'ISDN'):
#             list_data.append(line)
#         if line.strip().startswith(b'Layer 1') or line.strip().startswith(b'Layer 2'):
#             list_data.append(line)
#             flag = True
#     stdin.flush()
#     ssh.close()
#     refined_data = {}
#     for data in range(0, len(list_data), 5):
#         refined_data[list_data[data].decode('ascii')] = {
#             list_data[data+1].decode('ascii').strip(' :'):
#                 list_data[data+2].decode('ascii').strip('\t'),
#             list_data[data+3].decode('ascii').strip(' :'):
#                 list_data[data+4].decode('ascii').split(',')[3].split('=')[1].strip(' ')}
#     for key in refined_data.keys():  # pylint: disable=C0201
#         if (refined_data[key]['Layer 1 Status'] == 'DEACTIVATED' and
#                 refined_data[key]['Layer 2 Status'] == 'TEI_ASSIGNED'):
#             db_data = IspProvider.query.filter_by(Interface=key.split(' ')[1]).all()
#             for data in db_data:
#                 ticket_number = open_service_now_ticket(key.split(' ')[1])
#                 send_email(ticket_number, key.split(' ')[1], data.CircuitID,
#                            refined_data[key], data.ISP)
#     return 'Success'
#
#
# @heal.route("/selfheal")
# def self_heal():
#     """
#     Function for pulling self heal incidents information from service now
#     :return: renders template with data
#     """
#     incident_data = selfheal_incidents()
#     assigned_group = list_assigned_group()
#     assigned_to = list_assigned_to()
#     state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem',
#              '4': 'Awaiting User Info', '5': 'Awaiting Evidence', '6': 'Resolved',
#              '7': 'Closed'}
#     return render_template("selfheal_incidents.html", incident_data=incident_data,
#                            assigned_group=assigned_group, assigned_to=assigned_to,
#                            state=state)
#
#
# @heal.route("/getincidentnotes/<string:sys_id>", methods=['POST', 'GET'])
# def get_incident_notes(sys_id):
#     """
#     Function to get incident notes from sevice now
#     :param sys_id: sys id of ticket
#     :return: renders template with data
#     """
#     url = cfg.TICKET_ANALYSIS_URL['get_incident_notes'].format(sys_id)
#     user = cfg.SNOW['user']
#     pwd = cfg.SNOW['password']
#     headers = {"Content-Type": "application/json", "Accept": "application/json"}
#     cfg.logger.info("{} {} Getting incident notes".format(cfg.username, cfg.ipaddress))
#     response = requests.get(url, auth=(user, pwd), headers=headers)
#     if response.status_code != 200:
#         cfg.logger.info("{} {} Incident notes captured successfully".format(cfg.username, cfg.ipaddress))
#         return
#     data = response.json()
#     data_filter = data['result']
#     return render_template("incident_notes.html", data_filter=data_filter)
