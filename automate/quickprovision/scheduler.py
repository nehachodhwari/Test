"""
This module contains scheduler functions for the application
"""
import xml.etree.ElementTree as ET
import requests
from .quickusecase_functions import quick_provision_executive_profile, quick_provision_sales, \
    quick_provision_account_manager, quick_provision_knowledge_worker
from .utils import list_line, get_new_line
from automate.models.models import AdUsers, ProfileMapping, CallingPriviledges
from ..projectconfig import common_config as cfg
from ..app import db

TASK_STATUS = None

def quick_custom_scheduler():
    """
        Function to run a scheduler quick provision job
        return: task status (Success/Fail)
    """
    try:
        db_data = db.session.query(AdUsers).filter(AdUsers.flag == 1).all()
        for user in db_data:
            location = user.Location.strip()
            user_id = user.samAccountName.strip()
            name_first = user.FirstName.strip()
            name_last = user.LastName.strip()
            alerting_name = name_first + name_last
            protocol = 'SCCP'
            extension_list = list_line(location)
            extension = get_new_line(extension_list, location)
            profile_name = ProfileMapping.query.filter(user.Title == ProfileMapping.Title). \
                first().ProfileName
            output = {'location': location, 'user_id': user_id, 'name_first': name_first,
                      'name_last': name_last, 'alerting_name': alerting_name,
                      'extension': extension, 'product': '', 'protocol': protocol,
                      'phonebuttontemplate': '', 'calling_privilege': ''}
            ticket_info = open_service_now_ticket(user_id)    # pylint: disable=w0612
            if profile_name == 'Executive':
                # pylint: disable=W0612
                result = quick_provision_executive_profile(**output)
            elif profile_name == 'Sales':
                result = quick_provision_sales(**output)
            elif profile_name == 'Account Manager':
                result = quick_provision_account_manager(**output)
            elif profile_name == 'Knowledge Worker':
                result = quick_provision_knowledge_worker(**output)
            AdUsers.query().filter_by(AdUsers.flag == 1).update(dict(flag=0))
        task_status_flag = 'Task Executed Successfully..'
    # pylint: disable=W0703
    except Exception:
        task_status_flag = 'Task Execution Failed ! !'

    return task_status_flag


def job_details(sched, app):
    """
    This Function is invoked when job is added by scheduler
    :param sched: Background scheduler (sched)
    :param app: current app context(app)
    :return: None
    """
    # print('Running Scheduler')
    # pylint: disable=W0603
    global TASK_STATUS
    TASK_STATUS = quick_custom_scheduler()
    # TASK_STATUS = test_scheduler()
    with app.app_context():
        from ..models.models import Scheduler
        # from ..extension import db
        for job in sched.get_jobs():
            job_id = job.id
            job_next_run_time = job.next_run_time
            from sqlalchemy.sql.expression import func
            db.session.query(Scheduler).\
                filter(Scheduler.Id == db.session.query(func.max(Scheduler.Id))). \
                update({Scheduler.job_status: TASK_STATUS},
                       synchronize_session=False)
            insert_val = Scheduler(job_id=job_id, next_runtime=job_next_run_time,
                                   job_status='Yet To Start')
            db.session.add(insert_val)
            db.session.commit()


def open_service_now_ticket(user_id):
    """
    Function to open service now ticket
    :param user_id: user id of user
    :return: ticket number or None
    """
    url = cfg.SNOW['url']
    user = cfg.SNOW['user']
    pwd = cfg.SNOW['password']
    headers = {"Content-Type": "application/xml", "Accept": "application/xml"}
    data = """<request><entry><caller_id>Abel Tuter</caller_id><priority>1</priority>
                    <short_description>
                    Provisioning user""" + user_id + """through Scheduled Job run
                    </short_description>
                    <assignment_group>DL-UnifiedCommunication</assignment_group><state>1</state>
                    <incident_state>1</incident_state><category>Unified Communications</category>
                    <subcategory>Cisco Unified cm</subcategory></entry></request>"""
    try:
        response = requests.post(url, auth=(user, pwd), headers=headers, data=data)
    except requests.exceptions.RequestException as error:
        return error
    if response.status_code == 201:
        root = ET.fromstring(response.text)
        ticket_number = root.find(".//number")
        return ticket_number.text
    return None
