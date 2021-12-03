"""
This module contains functions for service now data fetching and displaying
"""

from datetime import date, timedelta, datetime
import requests
from flask import render_template, Blueprint, request, jsonify

from ..app import cache
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.authentication import authorize
from ..projectconfig.common_config import SNOW, TICKET_ANALYSIS_URL
from ..errors.error_handler import UnhandledException
from ..projectconfig import common_config as cfg

ticket_analysis = Blueprint('ticket_analysis', __name__)


@ticket_analysis.route("/ticketdashboard")
#@cache.cached(timeout=180, key_prefix=cache_key)
#@authorize
def dashboard():
    """
    Function to fetch the dashboard for data
    :return: renders a template
    """
    return render_template('discoverticketanalysis/dashboard13.html')


# @ticket_analysis.route("/servicenowchartnew")
# #@cache.cached(timeout=180, key_prefix=cache_key)
# def service_now_chart_new():
#     """
#     Function to generate servicenow charts data
#     :return: dictionary of data
#     """
#     priority_1_count_ucaas = []
#     priority_2_count_ucaas = []
#     priority_3_count_ucaas = []
#     priority_4_count_ucaas = []
#     priority_5_count_ucaas = []
#     priority_1_count_unified_communications = []
#     priority_2_count_unified_communications = []
#     priority_3_count_unified_communications = []
#     priority_4_count_unified_communications = []
#     priority_5_count_unified_communications = []
#     incident_data = list_incident()
#     for priority in incident_data:
#         if priority['category'] == 'ucaas':
#             if priority['priority'] == '1':
#                 priority_1_count_ucaas.append(priority['priority'])
#             elif priority['priority'] == '2':
#                 priority_2_count_ucaas.append(priority['priority'])
#             elif priority['priority'] == '3':
#                 priority_3_count_ucaas.append(priority['priority'])
#             elif priority['priority'] == '4':
#                 priority_4_count_ucaas.append(priority['priority'])
#             elif priority['priority'] == '5':
#                 priority_5_count_ucaas.append(priority['priority'])
#         elif priority['category'] == 'unified communications':
#             if priority['priority'] == '1':
#                 priority_1_count_unified_communications.append(priority['priority'])
#             elif priority['priority'] == '2':
#                 priority_2_count_unified_communications.append(priority['priority'])
#             elif priority['priority'] == '3':
#                 priority_3_count_unified_communications.append(priority['priority'])
#             elif priority['priority'] == '4':
#                 priority_4_count_unified_communications.append(priority['priority'])
#             elif priority['priority'] == '5':
#                 priority_5_count_unified_communications.append(priority['priority'])
#     count = {'UCaas-p1': len(priority_1_count_ucaas), 'UCaas-p2': len(priority_2_count_ucaas),
#              'UCaas-p3': len(priority_3_count_ucaas), 'UCaas-p4': len(priority_4_count_ucaas),
#              'UCaas-p5': len(priority_5_count_ucaas),
#              'UC-p1': len(priority_1_count_unified_communications),
#              'UC-p2': len(priority_2_count_unified_communications),
#              'UC-p3': len(priority_3_count_unified_communications),
#              'UC-p4': len(priority_4_count_unified_communications),
#              'UC-p5': len(priority_5_count_unified_communications)}
#     return count

@ticket_analysis.route("/servicenowchartnew")
#@cache.cached(timeout=180, key_prefix=cache_key)
def service_now_chart_new():
    """
    Function to generate servicenow charts data
    :return: dictionary of data
    """
    cfg.logger.info(
        "{} {} Loading servicenow tickets by priority graph".format(cfg.username, cfg.ipaddress))
    count = {'UCaas-p1': 0, 'UCaas-p2': 0, 'UCaas-p3': 0, 'UCaas-p4': 0, 'UCaas-p5': 0,
             'UC-p1': 0, 'UC-p2': 0, 'UC-p3': 0, 'UC-p4': 0, 'UC-p5': 0}
    incident_data = list_incident()
    if incident_data[0] == 401:
        cfg.logger.error(
            "{} {} Loading servicenow tickets by priority graph failed due to login error".format(cfg.username, cfg.ipaddress))
        return jsonify(message="Login error"), 401
    elif incident_data[0] == 200:
        for priority in incident_data[1]:
            if priority['category'] == 'ucaas':
                if priority['priority'] == '1':
                    count['UCaas-p1'] = count['UCaas-p1'] + 1
                elif priority['priority'] == '2':
                    count['UCaas-p2'] = count['UCaas-p2'] + 1
                elif priority['priority'] == '3':
                    count['UCaas-p3'] = count['UCaas-p3'] + 1
                elif priority['priority'] == '4':
                    count['UCaas-p4'] = count['UCaas-p4'] + 1
                elif priority['priority'] == '5':
                    count['UCaas-p5'] = count['UCaas-p5'] + 1
            elif priority['category'] == 'unified communications':
                if priority['priority'] == '1':
                    count['UC-p1'] = count['UC-p1'] + 1
                elif priority['priority'] == '2':
                    count['UC-p2'] = count['UC-p2'] + 1
                elif priority['priority'] == '3':
                    count['UC-p3'] = count['UC-p3'] + 1
                elif priority['priority'] == '4':
                    count['UC-p4'] = count['UC-p4'] + 1
                elif priority['priority'] == '5':
                    count['UC-p5'] = count['UC-p5'] + 1
        cfg.logger.info(
            "{} {} Servicenow tickets by priority graph loaded successfully".format(cfg.username, cfg.ipaddress))
        return count
    else:
        cfg.logger.error(
            "{} {} Loading servicenow tickets by priority graph failed".format(cfg.username, cfg.ipaddress))
        return jsonify(message="Internal server error"), 500


# @ticket_analysis.route("/time_range", methods=['POST', 'GET'])
# #@cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# def time_range():
#     """
#     Function to fetch time range data
#     :return: data dictionary
#     """
#     selected_value = request.args.get('selected_value')
#     start_date = None
#     end_date = None
#     if selected_value == "Today":
#         end_date = date.today().isoformat()
#         start_date = date.today().isoformat()
#     elif selected_value == "Week":
#         end_date = (date.today()-timedelta(days=7)).isoformat()
#         start_date = date.today().isoformat()
#     elif selected_value == "Month":
#         end_date = (date.today()-timedelta(days=30)).isoformat()
#         start_date = date.today().isoformat()
#     start_date_time_format = "'"+start_date+"'"+'%2C'+"'"+'23%3A59%3A59'+"'"
#     end_date_time_format = "'"+end_date+"'"+'%2C'+"'"+'00%3A00%3A00'+"'"
#     opened_ticket_url = TICKET_ANALYSIS_URL['opened_ticket'].format(end_date_time_format, start_date_time_format)
#     all_ticket_url = TICKET_ANALYSIS_URL['all_ticket']
#     closed_ticket_url = TICKET_ANALYSIS_URL['closed_ticket'].format(end_date_time_format, start_date_time_format)
#     resolved_ticket_url = TICKET_ANALYSIS_URL['resolved_ticket'].format(end_date_time_format, start_date_time_format)
#     user = SNOW['user']
#     pwd = SNOW['password']
#     headers = {"Content-Type": "application/json", "Accept": "application/json"}
#     open_response = requests.get(opened_ticket_url, auth=(user, pwd), headers=headers)
#     progress_response = requests.get(all_ticket_url, auth=(user, pwd), headers=headers)
#     close_response = requests.get(closed_ticket_url, auth=(user, pwd), headers=headers)
#     resolved_response = requests.get(resolved_ticket_url, auth=(user, pwd), headers=headers)
#     if open_response.status_code != 200:
#         return
#     if progress_response.status_code != 200:
#         return
#     if close_response.status_code != 200:
#         return
#     if resolved_response.status_code != 200:
#         return
#     open_ticket_data = open_response.json()
#     opened_all_ucaas = []
#     opened_all_uc = []
#     opened_all = open_ticket_data['result']
#     for item in opened_all:
#         if item['category'] == 'ucaas':
#             opened_all_ucaas.append(item['category'])
#         elif item['category'] == 'unified communications':
#             opened_all_uc.append(item['category'])
#     all_ticket_data = progress_response.json()
#     all_tickets_ucaas = []
#     all_tickets_uc = []
#     all_tickets = all_ticket_data['result']
#     for item in all_tickets:
#         if item['category'] == 'ucaas':
#             all_tickets_ucaas.append(item['category'])
#         elif item['category'] == 'unified communications':
#             all_tickets_uc.append(item['category'])
#     close_ticket_data = close_response.json()
#     closed_all_ucaas = []
#     closed_all_uc = []
#     closed_all = close_ticket_data['result']
#     for item in closed_all:
#         if item['category'] == 'ucaas':
#             closed_all_ucaas.append(item['category'])
#         elif item['category'] == 'unified communications':
#             closed_all_uc.append(item['category'])
#     resolved_ticket_data = resolved_response.json()
#     resolved_all_ucaas = []
#     resolved_all_uc = []
#     resolved_all = resolved_ticket_data['result']
#     for item in resolved_all:
#         if item['category'] == 'ucaas':
#             resolved_all_ucaas.append(item['category'])
#         elif item['category'] == 'unified communications':
#             resolved_all_uc.append(item['category'])
#     dict_tkt = {'opened_all_ucaas': len(opened_all_ucaas),
#                 'all_tickets_ucaas': len(all_tickets_ucaas),
#                 'closed_all_ucaas': len(closed_all_ucaas),
#                 'resolved_all_ucaas': len(resolved_all_ucaas),
#                 'opened_all_uc': len(opened_all_uc), 'all_tickets_uc': len(all_tickets_uc),
#                 'closed_all_uc': len(closed_all_uc), 'resolved_all_uc': len(resolved_all_uc)}
#     return dict_tkt

@ticket_analysis.route("/time_range", methods=['POST', 'GET'])
#@cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
def time_range():
    """
    Function to fetch time range data
    :return: data dictionary
    """
    selected_value = request.args.get('selected_value')
    start_date = None
    end_date = None
    if selected_value == "Today":
        end_date = date.today().isoformat()
        start_date = date.today().isoformat()
    elif selected_value == "Week":
        end_date = (date.today()-timedelta(days=7)).isoformat()
        start_date = date.today().isoformat()
    elif selected_value == "Month":
        end_date = (date.today()-timedelta(days=30)).isoformat()
        start_date = date.today().isoformat()
    start_date_time_format = "'"+start_date+"'"+'%2C'+"'"+'23%3A59%3A59'+"'"
    end_date_time_format = "'"+end_date+"'"+'%2C'+"'"+'00%3A00%3A00'+"'"
    opened_ticket_url = TICKET_ANALYSIS_URL['opened_ticket'].format(end_date_time_format, start_date_time_format)
    all_ticket_url = TICKET_ANALYSIS_URL['all_ticket']
    closed_ticket_url = TICKET_ANALYSIS_URL['closed_ticket'].format(end_date_time_format, start_date_time_format)
    resolved_ticket_url = TICKET_ANALYSIS_URL['resolved_ticket'].format(end_date_time_format, start_date_time_format)
    user = SNOW['user']
    pwd = SNOW['password']
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    try:
        cfg.logger.info(
            "{} {} Loading servicenow tickets by category graph failed due to login error".format(cfg.username, cfg.ipaddress))
        dict_tkt = {'opened_all_ucaas': 0, 'all_tickets_ucaas': 0, 'closed_all_ucaas': 0, 'resolved_all_ucaas': 0,
                    'opened_all_uc': 0, 'all_tickets_uc': 0, 'closed_all_uc': 0, 'resolved_all_uc': 0}
        open_response = requests.get(opened_ticket_url, auth=(user, pwd), headers=headers)
        progress_response = requests.get(all_ticket_url, auth=(user, pwd), headers=headers)
        close_response = requests.get(closed_ticket_url, auth=(user, pwd), headers=headers)
        resolved_response = requests.get(resolved_ticket_url, auth=(user, pwd), headers=headers)
        if open_response.status_code == 401:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed due to login error".format(cfg.username, cfg.ipaddress))
            return jsonify(message="Login error"), 401
        elif open_response.status_code == 200:
            open_ticket_data = open_response.json()
            opened_all = open_ticket_data['result']
            for item in opened_all:
                if item['category'] == 'ucaas':
                    dict_tkt['opened_all_ucaas'] = dict_tkt['opened_all_ucaas'] + 1
                elif item['category'] == 'unified communications':
                    dict_tkt['opened_all_uc'] = dict_tkt['opened_all_uc'] + 1
        else:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed".format(cfg.username, cfg.ipaddress))
            return jsonify(message="Internal server error"), 500
        if progress_response.status_code == 401:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed due to login error".format(cfg.username,
                                                                                                      cfg.ipaddress))
            return jsonify(message="Login error"), 401
        elif progress_response.status_code == 200:
            all_ticket_data = progress_response.json()
            all_tickets = all_ticket_data['result']
            for item in all_tickets:
                if item['category'] == 'ucaas':
                    dict_tkt['all_tickets_ucaas'] = dict_tkt['all_tickets_ucaas'] + 1
                elif item['category'] == 'unified communications':
                    dict_tkt['all_tickets_uc'] = dict_tkt['all_tickets_uc'] + 1
        else:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed".format(cfg.username, cfg.ipaddress))
            return jsonify(message="Internal server error"), 500
        if close_response.status_code == 401:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed due to login error".format(cfg.username,
                                                                                                      cfg.ipaddress))
            return jsonify(message="Login error"), 401
        elif progress_response.status_code == 200:
            close_ticket_data = close_response.json()
            closed_all = close_ticket_data['result']
            for item in closed_all:
                if item['category'] == 'ucaas':
                    dict_tkt['closed_all_ucaas'] = dict_tkt['closed_all_ucaas'] + 1
                elif item['category'] == 'unified communications':
                    dict_tkt['closed_all_uc'] = dict_tkt['closed_all_uc'] + 1
        else:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed".format(cfg.username, cfg.ipaddress))
            return jsonify(message="Internal server error"), 500
        if resolved_response.status_code == 401:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed due to login error".format(cfg.username,
                                                                                                      cfg.ipaddress))
            return jsonify(message="Login error"), 401
        elif progress_response.status_code == 200:
            resolved_ticket_data = resolved_response.json()
            resolved_all = resolved_ticket_data['result']
            for item in resolved_all:
                if item['category'] == 'ucaas':
                    dict_tkt['resolved_all_ucaas'] = dict_tkt['resolved_all_ucaas'] + 1
                elif item['category'] == 'unified communications':
                    dict_tkt['resolved_all_uc'] = dict_tkt['resolved_all_uc'] + 1
        else:
            cfg.logger.error(
                "{} {} Loading servicenow tickets by category graph failed".format(cfg.username, cfg.ipaddress))
            return jsonify(message="Internal server error"), 500
        return dict_tkt
    except Exception as error:
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return jsonify(message="Internal server error"), 500

# @ticket_analysis.route("/servicenowmttrchart")
# #@cache.cached(timeout=180, key_prefix=cache_key)
# def service_now_mttr_chart():
#     """
#     Function for fetching mttr data for charts display
#     :return: data dictionary
#     """
#     priority_1_count_ucaas = []
#     priority_2_count_ucaas = []
#     priority_3_count_ucaas = []
#     priority_4_count_ucaas = []
#     priority_5_count_ucaas = []
#     priority_1_count_unified_communications = []
#     priority_2_count_unified_communications = []
#     priority_3_count_unified_communications = []
#     priority_4_count_unified_communications = []
#     priority_5_count_unified_communications = []
#     incident_data = list_incident()
#     date_format = "%Y-%m-%d %H:%M:%S"
#     for priority in incident_data:
#         if priority['category'] == 'ucaas':
#             if priority['priority'] == '1':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                                 datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_1_count_ucaas.append(time_diff_hours)
#             elif priority['priority'] == '2':
#                 if priority['resolved_at'] != "":
#                     time_diff=datetime.strptime(priority['resolved_at'], date_format) -\
#                               datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_2_count_ucaas.append(time_diff_hours)
#             elif priority['priority'] == '3':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                                 datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_3_count_ucaas.append(time_diff_hours)
#             elif priority['priority'] == '4':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                                 datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_4_count_ucaas.append(time_diff_hours)
#             elif priority['priority'] == '5':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                               datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_5_count_ucaas.append(time_diff_hours)
#         elif priority['category'] == 'unified communications':
#             if priority['priority'] == '1':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                               datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_1_count_unified_communications.append(time_diff_hours)
#             elif priority['priority'] == '2':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                               datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_2_count_unified_communications.append(time_diff_hours)
#             elif priority['priority'] == '3':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                                 datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_3_count_unified_communications.append(time_diff_hours)
#             elif priority['priority'] == '4':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                               datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_4_count_unified_communications.append(time_diff_hours)
#             elif priority['priority'] == '5':
#                 if priority['resolved_at'] != "":
#                     time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
#                               datetime.strptime(priority['opened_at'], date_format)
#                     time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
#                     priority_5_count_unified_communications.append(time_diff_hours)
#     mttr_avg = {}
#     if len(priority_1_count_ucaas) != 0:
#         mttr_avg['Mttr_UCaas-p1'] = sum(priority_1_count_ucaas)/len(priority_1_count_ucaas)
#     else:
#         mttr_avg['Mttr_UCaas-p1'] = 0
#     if len(priority_2_count_ucaas) != 0:
#         mttr_avg['Mttr_UCaas-p2'] = sum(priority_2_count_ucaas)/len(priority_2_count_ucaas)
#     else:
#         mttr_avg['Mttr_UCaas-p2'] = 0
#     if len(priority_3_count_ucaas) != 0:
#         mttr_avg['Mttr_UCaas-p3'] = sum(priority_3_count_ucaas)/len(priority_3_count_ucaas)
#     else:
#         mttr_avg['Mttr_UCaas-p3'] = 0
#     if len(priority_4_count_ucaas) != 0:
#         mttr_avg['Mttr_UCaas-p4'] = sum(priority_4_count_ucaas)/len(priority_4_count_ucaas)
#     else:
#         mttr_avg['Mttr_UCaas-p4'] = 0
#     if len(priority_5_count_ucaas) != 0:
#         mttr_avg['Mttr_UCaas-p5'] = sum(priority_5_count_ucaas)/len(priority_5_count_ucaas)
#     else:
#         mttr_avg['Mttr_UCaas-p5'] = 0
#     if len(priority_1_count_unified_communications) != 0:
#         mttr_avg['Mttr_UC-p1'] = sum(priority_1_count_unified_communications)/len(
#             priority_1_count_unified_communications)
#     else:
#         mttr_avg['Mttr_UC-p1'] = 0
#     if len(priority_2_count_unified_communications) != 0:
#         mttr_avg['Mttr_UC-p2'] = sum(priority_2_count_unified_communications)/len(
#             priority_2_count_unified_communications)
#     else:
#         mttr_avg['Mttr_UC-p2'] = 0
#     if len(priority_3_count_unified_communications) != 0:
#         mttr_avg['Mttr_UC-p3'] = sum(priority_3_count_unified_communications)/len(
#             priority_3_count_unified_communications)
#     else:
#         mttr_avg['Mttr_UC-p3'] = 0
#     if len(priority_4_count_unified_communications) != 0:
#         mttr_avg['Mttr_UC-p4'] = sum(priority_4_count_unified_communications)/len(
#             priority_4_count_unified_communications)
#     else:
#         mttr_avg['Mttr_UC-p4'] = 0
#     if len(priority_5_count_unified_communications) != 0:
#         mttr_avg['Mttr_UC-p5'] = sum(priority_5_count_unified_communications)/len(
#             priority_5_count_unified_communications)
#     else:
#         mttr_avg['Mttr_UC-p5'] = 0
#     if len(priority_1_count_ucaas) == 0 and len(priority_1_count_unified_communications) == 0:
#         mttr_avg['Mttr_all-p1'] = 0
#     else:
#         mttr_avg['Mttr_all-p1'] = (sum(priority_1_count_ucaas)+sum(
#             priority_1_count_unified_communications))/(len(priority_1_count_ucaas)+len(
#             priority_1_count_unified_communications))
#     if len(priority_2_count_ucaas) == 0 and len(priority_2_count_unified_communications) == 0:
#         mttr_avg['Mttr_all-p2']= 0
#     else:
#         mttr_avg['Mttr_all-p2'] = (sum(priority_2_count_ucaas)+sum(
#             priority_2_count_unified_communications))/(len(priority_2_count_ucaas)+len(
#             priority_2_count_unified_communications))
#     if len(priority_3_count_ucaas) == 0 and len(priority_3_count_unified_communications) == 0:
#         mttr_avg['Mttr_all-p3'] = 0
#     else:
#         mttr_avg['Mttr_all-p3'] = (sum(priority_3_count_ucaas)+sum(
#             priority_3_count_unified_communications))/(len(priority_3_count_ucaas)+len(
#             priority_3_count_unified_communications))
#     if len(priority_4_count_ucaas) == 0 and len(priority_4_count_unified_communications) == 0:
#         mttr_avg['Mttr_all-p4'] = 0
#     else:
#         mttr_avg['Mttr_all-p4'] = (sum(priority_4_count_ucaas)+sum(
#             priority_4_count_unified_communications))/(len(priority_4_count_ucaas)+len(
#             priority_4_count_unified_communications))
#     if len(priority_5_count_ucaas) == 0 and len(priority_5_count_unified_communications) == 0:
#         mttr_avg['Mttr_all-p5'] = 0
#     else:
#         mttr_avg['Mttr_all-p5'] = (sum(priority_5_count_ucaas)+sum(
#             priority_5_count_unified_communications))/(len(priority_5_count_ucaas)+len(
#             priority_5_count_unified_communications))
#     return mttr_avg

@ticket_analysis.route("/servicenowmttrchart")
#@cache.cached(timeout=180, key_prefix=cache_key)
def service_now_mttr_chart():
    """
    Function for fetching mttr data for charts display
    :return: data dictionary
    """
    cfg.logger.info(
        "{} {} Loading servicenow MTTR graph".format(cfg.username, cfg.ipaddress))
    priority_1_count_ucaas = []
    priority_2_count_ucaas = []
    priority_3_count_ucaas = []
    priority_4_count_ucaas = []
    priority_5_count_ucaas = []
    priority_1_count_unified_communications = []
    priority_2_count_unified_communications = []
    priority_3_count_unified_communications = []
    priority_4_count_unified_communications = []
    priority_5_count_unified_communications = []
    incident_data = list_incident()
    date_format = "%Y-%m-%d %H:%M:%S"
    if incident_data[0] == 401:
        cfg.logger.error(
            "{} {} Loading servicenow MTTR graph failed due to login error".format(cfg.username, cfg.ipaddress))
        return jsonify(message="Login error"), 401
    elif incident_data[0] == 200:
        for priority in incident_data[1]:
            if priority['category'] == 'ucaas':
                if priority['priority'] == '1':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                    datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_1_count_ucaas.append(time_diff_hours)
                elif priority['priority'] == '2':
                    if priority['resolved_at'] != "":
                        time_diff=datetime.strptime(priority['resolved_at'], date_format) -\
                                  datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_2_count_ucaas.append(time_diff_hours)
                elif priority['priority'] == '3':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                    datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_3_count_ucaas.append(time_diff_hours)
                elif priority['priority'] == '4':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                    datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_4_count_ucaas.append(time_diff_hours)
                elif priority['priority'] == '5':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                  datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_5_count_ucaas.append(time_diff_hours)
            elif priority['category'] == 'unified communications':
                if priority['priority'] == '1':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                  datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_1_count_unified_communications.append(time_diff_hours)
                elif priority['priority'] == '2':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                  datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_2_count_unified_communications.append(time_diff_hours)
                elif priority['priority'] == '3':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                    datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_3_count_unified_communications.append(time_diff_hours)
                elif priority['priority'] == '4':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                  datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_4_count_unified_communications.append(time_diff_hours)
                elif priority['priority'] == '5':
                    if priority['resolved_at'] != "":
                        time_diff = datetime.strptime(priority['resolved_at'], date_format) -\
                                  datetime.strptime(priority['opened_at'], date_format)
                        time_diff_hours = ((time_diff.days*24)+(time_diff.seconds/3600))
                        priority_5_count_unified_communications.append(time_diff_hours)
        mttr_avg = {}
        if len(priority_1_count_ucaas) != 0:
            mttr_avg['Mttr_UCaas-p1'] = sum(priority_1_count_ucaas)/len(priority_1_count_ucaas)
        else:
            mttr_avg['Mttr_UCaas-p1'] = 0
        if len(priority_2_count_ucaas) != 0:
            mttr_avg['Mttr_UCaas-p2'] = sum(priority_2_count_ucaas)/len(priority_2_count_ucaas)
        else:
            mttr_avg['Mttr_UCaas-p2'] = 0
        if len(priority_3_count_ucaas) != 0:
            mttr_avg['Mttr_UCaas-p3'] = sum(priority_3_count_ucaas)/len(priority_3_count_ucaas)
        else:
            mttr_avg['Mttr_UCaas-p3'] = 0
        if len(priority_4_count_ucaas) != 0:
            mttr_avg['Mttr_UCaas-p4'] = sum(priority_4_count_ucaas)/len(priority_4_count_ucaas)
        else:
            mttr_avg['Mttr_UCaas-p4'] = 0
        if len(priority_5_count_ucaas) != 0:
            mttr_avg['Mttr_UCaas-p5'] = sum(priority_5_count_ucaas)/len(priority_5_count_ucaas)
        else:
            mttr_avg['Mttr_UCaas-p5'] = 0
        if len(priority_1_count_unified_communications) != 0:
            mttr_avg['Mttr_UC-p1'] = sum(priority_1_count_unified_communications)/len(
                priority_1_count_unified_communications)
        else:
            mttr_avg['Mttr_UC-p1'] = 0
        if len(priority_2_count_unified_communications) != 0:
            mttr_avg['Mttr_UC-p2'] = sum(priority_2_count_unified_communications)/len(
                priority_2_count_unified_communications)
        else:
            mttr_avg['Mttr_UC-p2'] = 0
        if len(priority_3_count_unified_communications) != 0:
            mttr_avg['Mttr_UC-p3'] = sum(priority_3_count_unified_communications)/len(
                priority_3_count_unified_communications)
        else:
            mttr_avg['Mttr_UC-p3'] = 0
        if len(priority_4_count_unified_communications) != 0:
            mttr_avg['Mttr_UC-p4'] = sum(priority_4_count_unified_communications)/len(
                priority_4_count_unified_communications)
        else:
            mttr_avg['Mttr_UC-p4'] = 0
        if len(priority_5_count_unified_communications) != 0:
            mttr_avg['Mttr_UC-p5'] = sum(priority_5_count_unified_communications)/len(
                priority_5_count_unified_communications)
        else:
            mttr_avg['Mttr_UC-p5'] = 0
        if len(priority_1_count_ucaas) == 0 and len(priority_1_count_unified_communications) == 0:
            mttr_avg['Mttr_all-p1'] = 0
        else:
            mttr_avg['Mttr_all-p1'] = (sum(priority_1_count_ucaas)+sum(
                priority_1_count_unified_communications))/(len(priority_1_count_ucaas)+len(
                priority_1_count_unified_communications))
        if len(priority_2_count_ucaas) == 0 and len(priority_2_count_unified_communications) == 0:
            mttr_avg['Mttr_all-p2']= 0
        else:
            mttr_avg['Mttr_all-p2'] = (sum(priority_2_count_ucaas)+sum(
                priority_2_count_unified_communications))/(len(priority_2_count_ucaas)+len(
                priority_2_count_unified_communications))
        if len(priority_3_count_ucaas) == 0 and len(priority_3_count_unified_communications) == 0:
            mttr_avg['Mttr_all-p3'] = 0
        else:
            mttr_avg['Mttr_all-p3'] = (sum(priority_3_count_ucaas)+sum(
                priority_3_count_unified_communications))/(len(priority_3_count_ucaas)+len(
                priority_3_count_unified_communications))
        if len(priority_4_count_ucaas) == 0 and len(priority_4_count_unified_communications) == 0:
            mttr_avg['Mttr_all-p4'] = 0
        else:
            mttr_avg['Mttr_all-p4'] = (sum(priority_4_count_ucaas)+sum(
                priority_4_count_unified_communications))/(len(priority_4_count_ucaas)+len(
                priority_4_count_unified_communications))
        if len(priority_5_count_ucaas) == 0 and len(priority_5_count_unified_communications) == 0:
            mttr_avg['Mttr_all-p5'] = 0
        else:
            mttr_avg['Mttr_all-p5'] = (sum(priority_5_count_ucaas)+sum(
                priority_5_count_unified_communications))/(len(priority_5_count_ucaas)+len(
                priority_5_count_unified_communications))
        cfg.logger.info(
            "{} {} Servicenow MTTR graph loaded successfully".format(cfg.username, cfg.ipaddress))
        return mttr_avg
    else:
        cfg.logger.error(
            "{} {} Loading servicenow MTTR graph failed".format(cfg.username, cfg.ipaddress))
        return jsonify(message="Internal server error"), 500


@ticket_analysis.route("/servicenow")
#@cache.cached(timeout=180, key_prefix=cache_key)
def servicenow_incident_form():
    """
    Function to get servicenow incident form data
    :return: renders a template
    """
    cfg.logger.info(
        "{} {} Loading servicenow incidents table".format(cfg.username, cfg.ipaddress))
    incident_data = list_incident()
    if incident_data[0] == 401:
        cfg.logger.error(
            "{} {} Loading servicenow incidents table failed due to login error".format(cfg.username, cfg.ipaddress))
        msg = "Login error"
        raise UnhandledException(msg)
    elif incident_data[0] != 200:
        cfg.logger.error(
            "{} {} Loading servicenow incidents table failed".format(cfg.username, cfg.ipaddress))
        msg = "Internal server error"
        raise UnhandledException(msg)
    else:
        incidents_data = incident_data[1]
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', ' 4': 'Awaiting User Info',
             '5': 'Awaiting Evidence', '6': 'Resolved', '7': 'Closed'}
    cfg.logger.info(
        "{} {} Servicenow incidents table loaded successfully".format(cfg.username, cfg.ipaddress))
    return render_template("discoverticketanalysis/servicenow_incidents_all.html",
                           incidents_data=incidents_data, assigned_group=assigned_group,
                           assigned_to=assigned_to, state=state)


@ticket_analysis.route("/tickets_by_priority/<string:label>")
#@cache.memoize(timeout=180)
def tickets_by_priority(label):
    """
    Function to get service now tickets by priority
    :param label: label name for ticket
    :return: renders a template
    """
    incident_data = list_incident()
    if incident_data[0] == 401:
        msg = "Login error"
        raise UnhandledException(msg)
    elif incident_data[0] != 200:
        msg = "Internal server error"
        raise UnhandledException(msg)
    else:
        incidents_data = incident_data[1]
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info',
             '5': 'Awaiting Evidence', '6': 'Resolved', '7': 'Closed'}
    incidents_details = []
    for priority in incidents_data:
        if label == "P1" and priority['priority'] == '1':
            incidents_details.append(priority)
        elif label == "P2" and priority['priority'] == '2':
            incidents_details.append(priority)
        elif label == "P3" and priority['priority'] == '3':
            incidents_details.append(priority)
        elif label == "P4" and priority['priority'] == '4':
            incidents_details.append(priority)
        elif label == "P5" and priority['priority'] == '5':
            incidents_details.append(priority)
    return render_template("discoverticketanalysis/servicenow_incidents_by_priority.html",
                           incidents_Details=incidents_details, assigned_group=assigned_group,
                           assigned_to=assigned_to, state=state)


@ticket_analysis.route("/getincidentnotes/<string:sys_id>", methods=['GET'])
#@cache.memoize(timeout=180)
def get_incident_notes(sys_id):
    """
    Function to get incident notes
    :param sys_id: sys id for service now ticket
    :return: renders a template
    """
    # pylint: disable=C0301
    url = TICKET_ANALYSIS_URL['get_incident_notes'].format(sys_id)
    user = SNOW['user']
    pwd = SNOW['password']
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    try:
        cfg.logger.info(
            "{} {} Getting incident notes from servicenow".format(cfg.username, cfg.ipaddress))
        response = requests.get(url, auth=(user, pwd), headers=headers)
        if response.status_code == 401:
            cfg.logger.error(
                "{} {} Login error".format(cfg.username, cfg.ipaddress))
            msg = "Login error"
            raise UnhandledException(msg)
        elif response.status_code == 200:
            cfg.logger.info(
                "{} {} Captured incident notes from servicenow".format(cfg.username, cfg.ipaddress))
            data = response.json()
            data_filter = data['result']
            return render_template("discoverticketanalysis/incident_notes.html", data_filter=data_filter)
        else:
            cfg.logger.error(
                "{} {} Capturing incident notes from servicenow failed".format(cfg.username, cfg.ipaddress))
            msg = "Internal server error"
            raise UnhandledException(msg)
    except Exception as error:
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = "Internal server error"
        raise UnhandledException(msg)


#@cache.cached(timeout=180, key_prefix=cache_key)
def list_incident():
    """
    Function to list all the incidents
    :return: string data
    """
    # pylint: disable=C0301
    url = TICKET_ANALYSIS_URL['list_incident']
    user = SNOW['user']
    pwd = SNOW['password']
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    try:
        cfg.logger.info(
            "{} {} Capturing incident data from servicenow".format(cfg.username, cfg.ipaddress))
        response = requests.get(url, auth=(user, pwd), headers=headers)
        if response.status_code != 200:
            cfg.logger.error(
                "{} {} Getting incident data from servicenow failed".format(cfg.username, cfg.ipaddress))
            return response.status_code, "error"
        else:
            data = response.json()
            data_filter = data['result']
            cfg.logger.info(
                "{} {} Incidents data captured from servicenow".format(cfg.username, cfg.ipaddress))
            return response.status_code, data_filter
    except Exception as error:
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return "Internal server error"


#@cache.cached(timeout=180, key_prefix=cache_key)
def list_assigned_group():
    """
    Function to get list of assigned group
    :return: dictionary of data
    """
    url = TICKET_ANALYSIS_URL['list_assigned_group']
    user = SNOW['user']
    pwd = SNOW['password']
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    try:
        cfg.logger.info(
            "{} {} Getting list of tickets assigned group information from servicenow".format(cfg.username, cfg.ipaddress))
        response = requests.get(url, auth=(user, pwd), headers=headers)
        if response.status_code == 401:
            cfg.logger.error(
                "{} {} Login error".format(cfg.username, cfg.ipaddress))
            msg = "Login error"
            raise UnhandledException(msg)
        elif response.status_code == 200:
            cfg.logger.info(
                "{} {} Captured list of tickets assigned groups information from servicenow".format(cfg.username, cfg.ipaddress))
            data = response.json()
            data_filter = data['result']
            name = []
            group_id = []
            for value in data_filter:
                name.append(value['name'])
                group_id.append(value['sys_id'])
            res = {}
            for key in group_id:
                for value in name:
                    res[key] = value
                    name.remove(value)
                    break
            return res
        else:
            cfg.logger.error(
                "{} {} Capturing list of tickets assigned groups from servicenow failed".format(cfg.username, cfg.ipaddress))
            msg = "Internal server error"
            raise UnhandledException(msg)
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = "Internal server error"
        raise UnhandledException(msg)


# @cache.cached(timeout=180, key_prefix=cache_key)
def list_assigned_to():
    """
    Function to get list of assigned to
    :return: dictionary of data
    """
    url = TICKET_ANALYSIS_URL['list_assigned_to']
    user = SNOW['user']
    pwd = SNOW['password']
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    try:
        cfg.logger.info(
            "{} {} Getting list of tickets assigned to information from servicenow".format(cfg.username, cfg.ipaddress))
        response = requests.get(url, auth=(user, pwd), headers=headers)
        if response.status_code == 401:
            cfg.logger.error("{} {} Login error".format(cfg.username, cfg.ipaddress))
            msg = "Login error"
            raise UnhandledException(msg)
        elif response.status_code == 200:
            cfg.logger.info("{} {} Captured list of tickets assigned to information from servicenow".format(cfg.username, cfg.ipaddress))
            data = response.json()
            data_filter = data['result']
            name = []
            user_id = []
            for value in data_filter:
                name.append(value['name'])
                user_id.append(value['sys_id'])
            res = {}
            for key in user_id:
                for value in name:
                    res[key] = value
                    name.remove(value)
                    break
            return res
        else:
            cfg.logger.error(
                "{} {} Capturing list of tickets assigned to information from servicenow failed".format(cfg.username, cfg.ipaddress))
            msg = "Internal server error"
            raise UnhandledException(msg)
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = "Internal server error"
        raise UnhandledException(msg)