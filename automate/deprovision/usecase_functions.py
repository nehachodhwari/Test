"""
Module containing functions for de provisoning of a user according to profile
"""

from .cucm_utils import get_user_data, get_phone_data,\
    remove_directory_number,\
    remove_phone, remove_device_profile, remove_remote_destination_profile
from .unity_utils import remove_unity_user
from .msutils import remove_ms_teams_license
from flask import flash, request
from ..quickprovision.zoomutils import disable_zoom


def deprovision_any_user(**kwargs):  # pylint: disable=R1711
    """
    Function to deprovision a user with executive profile
    @param user_id: user id of user
    @return: None
    """
    task_data = []
    status = []
    if kwargs.get('extension'):
        # pylint: disable=W0612
        delete_dir_number = remove_directory_number(kwargs.get('extension'),
                                                    kwargs.get('route_partition'))
        print(delete_dir_number)
        status.append(delete_dir_number[0])
        task_data.append("Removing extension: "+str(delete_dir_number[0]))
    if kwargs.get('phone_mac'):
        phone_config = get_phone_data(kwargs.get('phone_mac'))
        task_data.append("Getting phone details: "+str(phone_config[0]))
        status.append(phone_config[0])
        if phone_config[0]:
            if phone_config[1] is not None:
                remove_phone_line = remove_directory_number(phone_config[1], phone_config[2])
                task_data.append("Removing Phone directory number: "+str(remove_phone_line[0]))
                status.append(remove_phone_line[0])
                if remove_phone_line:
                    status.append(remove_phone_line[0])
            else:
                msg = "No dn associated"
                task_data.append("Removing Phone DN: False, No DN associated")
                status.append(True)
        else:
            status = False
        delete_phone = remove_phone(kwargs.get('phone_mac'))  # pylint: disable=W0612
        task_data.append(delete_phone[0])
        status.append(delete_phone[0])
    if kwargs.get('device_profile'):
        delete_profile = remove_device_profile(kwargs.get('device_profile'))  # pylint: disable=W0612
        task_data.append("Removing device profiles: "+str(delete_profile[0]))
        status.append(delete_profile[0])
    if kwargs.get('remote_dp'):
        remove_destination_profile = remove_remote_destination_profile(kwargs.get('remote_dp'))
        task_data.append("Remove SNR: "+str(remove_destination_profile[0]))
        status.append(remove_destination_profile[0])
    if kwargs.get('voicemail_cuc') == 'y':
        remove_user_from_unity_connection = remove_unity_user(kwargs.get('user_id'))  # pylint: disable=W0612
        status.append(remove_user_from_unity_connection)
    if kwargs.get('meet_ms_teams') == 'y':
        remove_ms_teams = remove_ms_teams_license(kwargs.get('email'))
        status.append(remove_ms_teams)
    if kwargs.get('meet_webex_teams') == 'y':
        remove_webex_teams = ''
    if kwargs.get('meet_skype') == 'y':
        remove_skype = ''
    remove_teams_license = ''  # pylint: disable=W0612
    remove_webex_teams = ''  # pylint: disable=W0612
    if kwargs.get(('meeting_zoom')) == 'y':
        remove_zoom_meeting = disable_zoom(request.form.get('email'))
    final_status = get_final_status(status)
    if final_status == "Success":
        msg = "Deprovision Successful"
        flash(msg, category="success")
    elif final_status == "Partial":
        msg = "Partially deprovisioned"
        flash(msg, category="success")
    else:
        msg = "Task failed. Ckeck logs for more details."
        flash(msg, category='error')
    return (True, final_status, task_data)




def get_final_status(*status):
    """
    function to get final status of the task.
    """
    if False not in status:
        return "Success"
    elif True in status:
        return "Partial"
    else:
        return "Fail"


