import requests
from flask import render_template, Blueprint

snow = Blueprint('snow', __name__)

@snow.route("/ticket_analysis")
def ticket_analysis():
    incident_data = list_incident()
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {}
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info', '5': 'Awaiting Evidence',
             '6': 'Resolved', '7': 'Closed'}
    return render_template("dashboard8.html", incident_data=incident_data, assigned_group=assigned_group,
                           assigned_to=assigned_to, state=state)


@snow.route("/servicenow")
def servicenow_Incident_form():
    incident_data = list_incident()
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {}
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info', '5': 'Awaiting Evidence',
             '6': 'Resolved', '7': 'Closed'}
    return render_template("Servinow_incidents.html", incident_data=incident_data, assigned_group=assigned_group,
                           assigned_to=assigned_to, state=state)


@snow.route("/servicenowchartnew")
def servicenowchartnew():
    Priority_1_count_UCaaS = []
    Priority_2_count_UCaaS = []
    Priority_3_count_UCaaS = []
    Priority_4_count_UCaaS = []
    Priority_5_count_UCaaS = []
    Priority_1_count_UnifiedCommunications = []
    Priority_2_count_UnifiedCommunications = []
    Priority_3_count_UnifiedCommunications = []
    Priority_4_count_UnifiedCommunications = []
    Priority_5_count_UnifiedCommunications = []
    incident_data = list_incident()
    # print(incident_data)
    for priority in incident_data:
        if priority['category'] == 'ucaas':
            if priority['priority'] == '1':
                Priority_1_count_UCaaS.append(priority['priority'])
            elif priority['priority'] == '2':
                Priority_2_count_UCaaS.append(priority['priority'])
            elif priority['priority'] == '3':
                Priority_3_count_UCaaS.append(priority['priority'])
            elif priority['priority'] == '4':
                Priority_4_count_UCaaS.append(priority['priority'])
            elif priority['priority'] == '5':
                Priority_5_count_UCaaS.append(priority['priority'])
        elif priority['category'] == 'unified communications':
            if priority['priority'] == '1':
                Priority_1_count_UnifiedCommunications.append(priority['priority'])
            elif priority['priority'] == '2':
                Priority_2_count_UnifiedCommunications.append(priority['priority'])
            elif priority['priority'] == '3':
                Priority_3_count_UnifiedCommunications.append(priority['priority'])
            elif priority['priority'] == '4':
                Priority_4_count_UnifiedCommunications.append(priority['priority'])
            elif priority['priority'] == '5':
                Priority_5_count_UnifiedCommunications.append(priority['priority'])
    count = {}
    count['UCaas-p1'] = len(Priority_1_count_UCaaS)
    count['UCaas-p2'] = len(Priority_2_count_UCaaS)
    count['UCaas-p3'] = len(Priority_3_count_UCaaS)
    count['UCaas-p4'] = len(Priority_4_count_UCaaS)
    count['UCaas-p5'] = len(Priority_5_count_UCaaS)
    count['UC-p1'] = len(Priority_1_count_UnifiedCommunications)
    count['UC-p2'] = len(Priority_2_count_UnifiedCommunications)
    count['UC-p3'] = len(Priority_3_count_UnifiedCommunications)
    count['UC-p4'] = len(Priority_4_count_UnifiedCommunications)
    count['UC-p5'] = len(Priority_5_count_UnifiedCommunications)
    print(count)
    return count


@snow.route("/p1")
def get_p1():
    incident_data = list_incident()
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {}
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info', '5': 'Awaiting Evidence',
             '6': 'Resolved', '7': 'Closed'}
    Priority_1_incidents = []
    for priority in incident_data:
        if priority['priority'] == '1':
            Priority_1_incidents.append(priority)
    return render_template("Servinow_p1_incidents.html", Priority_1_incidents=Priority_1_incidents,
                           assigned_group=assigned_group, assigned_to=assigned_to, state=state)


@snow.route("/p2")
def get_p2():
    incident_data = list_incident()
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {}
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info', '5': 'Awaiting Evidence',
             '6': 'Resolved', '7': 'Closed'}
    Priority_2_incidents = []
    for priority in incident_data:
        if priority['priority'] == '2':
            Priority_2_incidents.append(priority)
    return render_template("Servinow_p2_incidents.html", Priority_2_incidents=Priority_2_incidents,
                           assigned_group=assigned_group, assigned_to=assigned_to, state=state)


@snow.route("/p3")
def get_p3():
    incident_data = list_incident()
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {}
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info', '5': 'Awaiting Evidence',
             '6': 'Resolved', '7': 'Closed'}
    Priority_3_incidents = []
    for priority in incident_data:
        if priority['priority'] == '3':
            Priority_3_incidents.append(priority)
    return render_template("Servinow_p3_incidents.html", Priority_3_incidents=Priority_3_incidents,
                           assigned_group=assigned_group, assigned_to=assigned_to, state=state)


@snow.route("/p4")
def get_p4():
    incident_data = list_incident()
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {}
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info', '5': 'Awaiting Evidence',
             '6': 'Resolved', '7': 'Closed'}
    Priority_4_incidents = []
    for priority in incident_data:
        if priority['priority'] == '4':
            Priority_4_incidents.append(priority)
    return render_template("Servinow_p4_incidents.html", Priority_4_incidents=Priority_4_incidents,
                           assigned_group=assigned_group, assigned_to=assigned_to, state=state)


@snow.route("/p5")
def get_p5():
    incident_data = list_incident()
    assigned_group = list_assigned_group()
    assigned_to = list_assigned_to()
    state = {}
    state = {'1': 'New', '2': 'Active', '3': 'Awaiting Problem', '4': 'Awaiting User Info', '5': 'Awaiting Evidence',
             '6': 'Resolved', '7': 'Closed'}
    Priority_5_incidents = []
    for priority in incident_data:
        if priority['priority'] == '5':
            Priority_5_incidents.append(priority)
    return render_template("Servinow_p5_incidents.html", Priority_5_incidents=Priority_5_incidents,
                           assigned_group=assigned_group, assigned_to=assigned_to, state=state)


@snow.route("/getincidentnotes/<string:sys_id>", methods=['POST', 'GET'])
def get_incident_notes(sys_id):
    url = 'https://dev94091.service-now.com/api/now/table/sys_journal_field?sysparm_query=element_id=' + sys_id + '^work_notes=comments'
    user = 'admin'
    pwd = 'mJJE3kA9Qwfl'
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    response = requests.get(url, auth=(user, pwd), headers=headers)
    # Check for HTTP codes other than 200
    if response.status_code != 200:
        print('Status:', response.status_code, 'Headers:', response.headers, 'Error Response:', response.json())
        exit()
    # Decode the JSON response into a dictionary and use the data
    data = response.json()
    data_filter = data['result']
    return render_template("incident_notes.html", data_filter=data_filter)


def list_incident():
    url = 'https://dev94091.service-now.com/api/now/table/incident?&sysparm_limit=100&sysparm_query=category=unified communications^ORcategory=ucaas'
    user = 'admin'
    pwd = 'mJJE3kA9Qwfl'
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    response = requests.get(url, auth=(user, pwd), headers=headers)
    # Check for HTTP codes other than 200
    if response.status_code != 200:
        print('Status:', response.status_code, 'Headers:', response.headers, 'Error Response:', response.json())
        exit()
    # Decode the JSON response into a dictionary and use the data
    data = response.json()
    data_filter = data['result']
    return data_filter


def list_assigned_group():
    url = 'https://dev94091.service-now.com/api/now/table/sys_user_group?sysparm_limit=100000'
    user = 'admin'
    pwd = 'mJJE3kA9Qwfl'
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    # Do the HTTP request
    response = requests.get(url, auth=(user, pwd), headers=headers)
    # Check for HTTP codes other than 200
    if response.status_code != 200:
        print('Status:', response.status_code, 'Headers:', response.headers, 'Error Response:', response.json())
        exit()
    # Decode the JSON response into a dictionary and use the data
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


def list_assigned_to():
    url = 'https://dev94091.service-now.com/api/now/table/sys_user?&sysparm_limit=100000'
    user = 'admin'
    pwd = 'mJJE3kA9Qwfl'
    # Set proper headers
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    # Do the HTTP request
    response = requests.get(url, auth=(user, pwd), headers=headers)
    # Check for HTTP codes other than 200
    if response.status_code != 200:
        print('Status:', response.status_code, 'Headers:', response.headers, 'Error Response:', response.json())
        exit()
    # Decode the JSON response into a dictionary and use the data
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
