import pysnow
from pysnow import exceptions
from datetime import date, timedelta, datetime
import requests
from flask import render_template, Blueprint, request, jsonify
from datetimerange import DateTimeRange
from ..app import cache
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.authentication import authorize
from ..projectconfig.common_config import SNOW, TICKET_ANALYSIS_URL
from ..errors.error_handler import UnhandledException
from ..projectconfig import common_config as cfg

ticket_analysis = Blueprint('ticket_analysis', __name__)

c = pysnow.Client(instance=SNOW['instance'], user=SNOW['user'], password=SNOW['password'])

@ticket_analysis.route("/ticketdashboard")
#@cache.cached(timeout=180, key_prefix=cache_key)
#@authorize
def dashboard():
    """
    Function to fetch the dashboard for data
    :return: renders a template
    """
    cfg.logger.info("{} {} Loading serviceNow dashboard".format(cfg.username, cfg.ipaddress))
    return render_template('discoverticketanalysis/dashboard13.html')

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
    if incident_data[2]:
        for priority in incident_data[0]:
            if priority['category'] == 'UCaaS':
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
            elif priority['category'] == 'Unified communication':
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
        return jsonify(message=incident_data[0]), incident_data[1]


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
        end_date = (datetime.today()+timedelta(hours=7)).strftime("%Y-%m-%d %H:%M:%S")
        start_date = ((datetime.today()+timedelta(hours=7)).replace(hour=0, minute=0, second=0, microsecond=0)).strftime("%Y-%m-%d %H:%M:%S")
    elif selected_value == "Week":
        end_date = (datetime.today()+timedelta(hours=7)).strftime("%Y-%m-%d %H:%M:%S")
        start_date = ((datetime.today()-timedelta(7)).replace(hour=0, minute=0, second=0, microsecond=0)).strftime("%Y-%m-%d %H:%M:%S")
    elif selected_value == "Month":
        end_date = (datetime.today()+timedelta(hours=7)).strftime("%Y-%m-%d %H:%M:%S")
        start_date = ((datetime.today()-timedelta(30)).replace(hour=0, minute=0, second=0, microsecond=0)).strftime("%Y-%m-%d %H:%M:%S")
    incident_data = list_incident()
    cfg.logger.info(
        "{} {} Servicenow tickets by category graph loading".format(cfg.username, cfg.ipaddress))
    if incident_data[2]:
        dict_tkt = {'opened_all_ucaas': 0, 'all_tickets_ucaas': 0, 'closed_all_ucaas': 0, 'resolved_all_ucaas': 0,
                    'opened_all_uc': 0, 'all_tickets_uc': 0, 'closed_all_uc': 0, 'resolved_all_uc': 0}
        time_range = DateTimeRange(start_date, end_date)
        for item in incident_data[0]:
            if item['category'] == "UCaaS":
                dict_tkt['all_tickets_ucaas'] = dict_tkt['all_tickets_ucaas'] + 1
                if item['opened_at'] != "":
                    if item['opened_at'] in time_range:
                        dict_tkt['opened_all_ucaas'] = dict_tkt['opened_all_ucaas'] + 1
                if item['closed_at'] != "":
                    if item['closed_at'] in time_range:
                        dict_tkt['closed_all_ucaas'] = dict_tkt['closed_all_ucaas'] + 1
                if item['resolved_at'] != "":
                    if item['resolved_at'] in time_range:
                        dict_tkt['resolved_all_ucaas'] = dict_tkt['resolved_all_ucaas'] + 1
            elif item['category'] == "Unified communication":
                dict_tkt['all_tickets_uc'] = dict_tkt['all_tickets_uc'] + 1
                if item['opened_at'] != "":
                    if item['opened_at'] in time_range:
                        dict_tkt['opened_all_uc'] = dict_tkt['opened_all_uc'] + 1
                if item['closed_at'] != "":
                    if item['closed_at'] in time_range:
                        dict_tkt['closed_all_uc'] = dict_tkt['closed_all_uc'] + 1
                if item['resolved_at'] != "":
                    if item['resolved_at'] in time_range:
                        dict_tkt['resolved_all_uc'] = dict_tkt['resolved_all_uc'] + 1
        cfg.logger.info(
            "{} {} Servicenow tickets by category graph loaded successfully".format(cfg.username, cfg.ipaddress))
        return dict_tkt
    else:
        cfg.logger.info(
            "{} {} Servicenow tickets by category graph loading failed".format(cfg.username, cfg.ipaddress))
        return jsonify(message=incident_data[0]), incident_data[1]

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
    if incident_data[2]:
        for priority in incident_data[0]:
            if priority['category'] == 'UCaaS':
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
            elif priority['category'] == 'Unified communication':
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
            "{} {} servicenow MTTR graph loaded successfully".format(cfg.username, cfg.ipaddress))
        return mttr_avg
    else:
        cfg.logger.info(
            "{} {} Loading servicenow MTTR graph failed".format(cfg.username, cfg.ipaddress))
        return jsonify(message=incident_data[0]), incident_data[1]

@ticket_analysis.route("/tickets_by_priority/<string:label>")
#@cache.memoize(timeout=180)
def tickets_by_priority(label):
    """
    Function to get service now tickets by priority
    :param label: label name for ticket
    :return: renders a template
    """
    cfg.logger.info(
        "{} {} Servicenow incidents table by priority loading".format(cfg.username, cfg.ipaddress))
    incident_data = list_incidents()
    incidents_details = []
    if incident_data[2]:
        for priority in incident_data[0]:
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
        cfg.logger.info(
            "{} {} Servicenow incidents table by priority loaded successfully".format(cfg.username, cfg.ipaddress))
        return render_template("discoverticketanalysis/tickets_by_priority.html",
                               incidents_Details=incidents_details)
    else:
        cfg.logger.info(
            "{} {} Servicenow incidents table by priority loading failed".format(cfg.username, cfg.ipaddress))
        raise UnhandledException(incident_data[0])

@ticket_analysis.route("/getincidentnotes/<string:sys_id>", methods=['POST','GET'])
#@cache.memoize(timeout=180)
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
        return render_template("discoverticketanalysis/incident_notes.html", data_filter=data_filter)
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


@ticket_analysis.route("/servicenow")
#@cache.cached(timeout=180, key_prefix=cache_key)
def servicenow_incident_form():
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
        return render_template("discoverticketanalysis/tickets_all.html",
                           incidents_data=incident_data[0])
    else:
        cfg.logger.error(
            "{} {} Servicenow incidents table loading failed".format(cfg.username, cfg.ipaddress))
        raise UnhandledException(incident_data[0])

def list_incident():
    try:
        cfg.logger.info(
            "{} {} Capturing incidents from servicenow".format(cfg.username, cfg.ipaddress))
        incidents = c.resource(api_path='/table/incident')
        incidents_qb = (
            pysnow.QueryBuilder().field('category').equals('UCaaS').OR().field('category').equals('Unified communication'))
        response = incidents.get(query=incidents_qb,
                                 fields=['number', 'short_description', 'priority', 'opened_by', 'incident_state',
                                         'assigned_to', 'assignment_group', 'opened_at', 'closed_at', 'resolved_at',
                                         'category', 'subcategory', 'sys_id']).all()
        cfg.logger.info(
            "{} {} Incidents details captured successfully from servicenow".format(cfg.username, cfg.ipaddress))
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
            pysnow.QueryBuilder().field('category').equals('UCaaS').OR().field('category').equals('Unified communication'))
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