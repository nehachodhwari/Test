"""
This module contains functions for self heal use case
"""

import socket
import requests
import paramiko
from automate.models.models import IspProvider
from .utils import send_email, open_service_now_ticket
import pysnow
from pysnow import exceptions
from flask import render_template, Blueprint, session
from ..errors.error_handler import UnhandledException
from ..projectconfig import common_config as cfg
from ..projectconfig.authentication import authorize
from ..projectconfig.common_config import SNOW


heal = Blueprint('heal', __name__)

c = pysnow.Client(instance=SNOW['instance'], user=SNOW['user'], password=SNOW['password'])

@heal.route('/interface')
@authorize
def interface_heal():
    """
    Function for healing of SIP gateway trunks
    :return: None
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect(hostname=cfg.GATEWAY_DETAILS['hostname'],
                    username=cfg.GATEWAY_DETAILS['username'],
                    password=cfg.GATEWAY_DETAILS['password'])
    except (socket.error, paramiko.AuthenticationException,
            paramiko.SSHException) as message:
        return str(message)
    stdin, stdout, stderr = ssh.exec_command('Show ISDN status')  # pylint: disable=W0612
    list_data = []
    flag = False
    for line in stdout.read().splitlines():
        if flag:
            list_data.append(line)
            flag = False
        if line.startswith(b'ISDN'):
            list_data.append(line)
        if line.strip().startswith(b'Layer 1') or line.strip().startswith(b'Layer 2'):
            list_data.append(line)
            flag = True
    stdin.flush()
    ssh.close()
    refined_data = {}
    for data in range(0, len(list_data), 5):
        refined_data[list_data[data].decode('ascii')] = {
            list_data[data+1].decode('ascii').strip(' :'):
                list_data[data+2].decode('ascii').strip('\t'),
            list_data[data+3].decode('ascii').strip(' :'):
                list_data[data+4].decode('ascii').split(',')[3].split('=')[1].strip(' ')}
    for key in refined_data.keys():  # pylint: disable=C0201
        if (refined_data[key]['Layer 1 Status'] == 'DEACTIVATED' and
                refined_data[key]['Layer 2 Status'] == 'TEI_ASSIGNED'):
            db_data = IspProvider.query.filter_by(Interface=key.split(' ')[1]).all()
            for data in db_data:
                ticket_number = open_service_now_ticket(key.split(' ')[1])
                send_email(ticket_number, key.split(' ')[1], data.CircuitID,
                           refined_data[key], data.ISP)
    return 'Success'




@heal.route("/selfheal")
#@cache.cached(timeout=180, key_prefix=cache_key)
@authorize
def self_heal():
    """
    Function to get servicenow incident form data
    :return: renders a template
    """
    cfg.logger.info(
        "{} {} Loading servicenow incidents table".format(cfg.username, cfg.ipaddress))
    incident_data = list_incidents()
    if incident_data[2]:
        cfg.logger.info(
            "{} {} Servicenow incidents table loaded successfully".format(cfg.username, cfg.ipaddress))
        username = session.get('user_id')
        return render_template("tickets_all.html",
                           incidents_data=incident_data[0], username=username)
    else:
        cfg.logger.error(
            "{} {} Servicenow incidents table loading failed".format(cfg.username, cfg.ipaddress))
        raise UnhandledException(incident_data[0])


@heal.route("/getincidentnotes/<string:sys_id>", methods=['POST','GET'])
#@cache.memoize(timeout=180)
@authorize
def get_incident_notes(sys_id):
    """
    Function to get incident notes
    :param sys_id: sys id for service now ticket
    :return: renders a template
    """
    cfg.logger.info(
        "{} {} Getting incident notes from servicenow".format(cfg.username, cfg.ipaddress))
    try:
        incidents_worknotes = c.resource(api_path='/table/sys_journal_field')
        incidents_worknotes_qb = (pysnow.QueryBuilder().field('element_id').equals(sys_id))
        data_filter = incidents_worknotes.get(query=incidents_worknotes_qb).all()
        cfg.logger.info(
            "{} {} Captured ncident notes from servicenow".format(cfg.username, cfg.ipaddress))
        username = session.get('user_id')
        return render_template("incident_notes.html", data_filter=data_filter, username=username)
    except Exception as e:
        if "401 Client Error:" in str(e):
            raise UnhandledException("Unauthorized for url")
        else:
            raise UnhandledException("Internal server error")
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, e))
    except exceptions as e:
        if "No records found" in str(e):
            raise UnhandledException("No records found")
        else:
            raise UnhandledException("Internal server error")
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, e))


def list_incidents():
    try:
        cfg.logger.info(
            "{} {} Capturing incidents from servicenow".format(cfg.username, cfg.ipaddress))
        sys_group = c.resource(api_path='/table/sys_user_group')
        sys_group_qb = (
            pysnow.QueryBuilder().field('name').equals('DL-UCaaS').OR().field('name').equals('DL-UnifiedCommunication'))
        cfg.logger.info("{} {} Capturing assignment group details from servicenow".format(cfg.username, cfg.ipaddress))
        sys_group_response = sys_group.get(query=sys_group_qb, fields=['sys_id', 'name']).all()
        cfg.logger.info("{} {} Captured assignment group details successfully from servicenow".format(cfg.username, cfg.ipaddress))
        sys_user = c.resource(api_path='/table/sys_user')
        cfg.logger.info(
            "{} {} Capturing assigned to user details from servicenow".format(cfg.username, cfg.ipaddress))
        sys_user_response = sys_user.get(fields=['sys_id', 'name']).all()
        cfg.logger.info(
            "{} {} Captured assigned to user details successfully from servicenow".format(cfg.username, cfg.ipaddress))
        incidents = c.resource(api_path='/table/incident')
        incidents_qb = (
            pysnow.QueryBuilder().field('category').equals('Unified communication').OR().field('category').equals('UCaaS'))
        response = incidents.get(query=incidents_qb,
                                 fields=['number', 'short_description', 'priority', 'opened_by', 'incident_state',
                                         'assigned_to', 'assignment_group', 'opened_at', 'closed_at', 'resolved_at',
                                         'category', 'subcategory', 'sys_id']).all()
        state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', ' 4': 'Awaiting User Info',
                 '5': 'Awaiting Evidence', '6': 'Resolved', '7': 'Closed'}
        for item in response:
            if item['assignment_group'] != "":
                for group in sys_group_response:
                    if group['sys_id'] == item['assignment_group']['value']:
                        item['assignment_group']['name'] = group['name']
            if item['assigned_to'] != "":
                for user in sys_user_response:
                    if user['sys_id'] == item['assigned_to']['value']:
                        item['assigned_to']['name'] = user['name']
            for users in sys_user_response:
                if users['sys_id'] == item['opened_by']['value']:
                    item['opened_by']['name'] = users['name']
            item['incident_state'] = state[item['incident_state']]
        cfg.logger.info(
            "{} {} Incidents captured successfully from servicenow".format(cfg.username, cfg.ipaddress))
        msg = [response, 200, True]
    except Exception as e:
        if "401 Client Error:" in str(e):
            msg = ["Unauthorized for url", 401, False]
        else:
            msg = ["Internal server error, please check logs...", 500, False]
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, e))
    except exceptions as e:
        if "No records found" in str(e):
            msg = ["No data found, please check logs...", 404, False]
        else:
            msg = ["Internal server error, please check logs...", 500, False]
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, e))
    return msg