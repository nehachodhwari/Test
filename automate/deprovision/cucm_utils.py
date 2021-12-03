from ..projectconfig.connection import create_sess
from zeep.exceptions import Fault
from ..projectconfig import common_config as cfg
from .msutils import get_user_license_details, get_user_presence
from .unity_utils import get_CUCUser
from ..quickprovision.zoomutils import get_zoom_user
from flask import request

service = create_sess()


def get_user_data(user_id):
    data = {}
    try:
        cfg.logger.info("{} {} Getting user {} data from cucm".format(cfg.username, cfg.ipaddress, user_id))
        user_data = service.getUser(userid=user_id, returnedTags={
            'firstName': True,
            'middleName': True,
            'lastName': True,
            'userid': True,
            'mailid': True,
            'manager': True,
            'department': True,
            'userIdentity': True,
            'primaryExtension': {'pattern': True,
                                 'routePartitionName': True},
            'associatedDevices': {'device': True},
            'telephoneNumber': True,
            'phoneProfiles': {'profileName': True},
            'associatedRemoteDestinationProfiles': {'remoteDestinationProfile': True}})
        print(user_data)
        if user_data['return']['user']['firstName'] is not None:
            data['fname'] = str(user_data['return']['user']['firstName'])
        if user_data['return']['user']['lastName'] is not None:
            data['lname'] = str(user_data['return']['user']['lastName'])
        if user_data['return']['user']['mailid'] is not None:
            data['email'] = str(user_data['return']['user']['mailid'])
        if user_data['return']['user']['primaryExtension'] is not None:
            data['extension'] = user_data['return']['user']['primaryExtension']['pattern']
            data['routePartitionName'] = str(user_data['return']['user']['primaryExtension']['routePartitionName'])
        if user_data['return']['user']['associatedDevices'] is not None:
            data['device'] = str(user_data['return']['user']['associatedDevices']['device'][0])
        if user_data['return']['user']['phoneProfiles'] is not None:
            for profile in user_data['return']['user']['phoneProfiles']['profileName']:
                data['profileName'] = str(user_data['return']['user']['phoneProfiles']['profileName'][0]['_value_1'])
        if user_data['return']['user']['associatedRemoteDestinationProfiles'] is not None:
            data['remote_destination_profile'] = str(user_data['return']['user']
                                                     ['associatedRemoteDestinationProfiles']['remoteDestinationProfile'][0])
        data['ms_teams'] = get_user_license_details(data['email'])
        data['webex_teams'] = False
        zoom_user = get_zoom_user(request.form.get('email'))
        data['zoom'] = zoom_user[1]
        print(data['zoom'])
        data['skype'] = False
        data['meeting_state'] = meeting_config(data['ms_teams'], data['webex_teams'])
        cuc_vm = get_CUCUser(user_id)
        data['vm_cuc'] = cuc_vm[0]
        data['vm_exchange'] = False
        data['voice_mail_state'] = meeting_config(data['vm_cuc'], data['vm_exchange'])
        # data['im_presence_ms_teams'] = get_user_presence(data['email'])
        data['im_presence_ms_teams'] = get_user_license_details(data['email'])
        data['im_presence_webex'] = False
        data['im_presence_skype'] = False
        data['im_presence_state'] = meeting_config(data['im_presence_webex'], data['im_presence_ms_teams'])
        cfg.logger.info("{} {} User {} data captured successfully".format(cfg.username, cfg.ipaddress, user_id))
        return data
    except Fault as e:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, e))
        print(e)
        return str(e)


def get_phone_data(mac):
    try:
        cfg.logger.info("{} {} Getting phone {} data from cucm".format(cfg.username, cfg.ipaddress, mac))
        phone_data = service.getPhone(name=mac, returnedTags={
            'lines': {
                'line': {
                    'dirn': {
                       'pattern': True,
                       'routePartitionName': True
                    }
                }
            }
         })
        print(phone_data)
        if phone_data['return']['phone']['lines'] is not None:
            pattern = phone_data['return']['phone']['lines']['line'][0]['dirn']['pattern']
            route_partition_name = phone_data['return']['phone']['lines']['line'][0]['dirn']['routePartitionName']['_value_1']
            cfg.logger.info("{} {} Phone {} data captured successfully".format(cfg.username, cfg.ipaddress, mac))
        else:
            pattern = None
            route_partition_name = None
            cfg.logger.info("{} {} No data found".format(cfg.username, cfg.ipaddress))
        return [True, pattern, route_partition_name]
    except Fault as e:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, e))
        return [False, str(e)]


def remove_phone(mac):
    try:
        cfg.logger.info("{} {} Removing phone {} from cucm".format(cfg.username, cfg.ipaddress, mac))
        remove_p = service.removePhone(name=mac)
        print(remove_p)
        cfg.logger.info("{} {} Phone {} removed successfully".format(cfg.username, cfg.ipaddress, mac))
        return [True, "Success"]
    except Fault as e:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, e))
        phone_response = str(e)
        return [False, phone_response]


def remove_device_profile(user_id):
    try:
        cfg.logger.info("{} {} Removing device profile for user {} from cucm".format(cfg.username, cfg.ipaddress, user_id))
        service.removeDeviceProfile(name=user_id)
        cfg.logger.info("{} {} Device profile for user {} removed successfully".format(cfg.username, cfg.ipaddress, user_id))
        return [True, "Success"]
    except Fault as e:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, e))
        return [False, str(e)]


def remove_directory_number(dn, route_partition_name):
    try:
        cfg.logger.info("{} {} Removing directory number {}".format(cfg.username, cfg.ipaddress, dn))
        service.removeLine(pattern=dn,
                           routePartitionName=route_partition_name)
        cfg.logger.info("{} {} Directory number {} removed successfully".format(cfg.username, cfg.ipaddress, dn))
        return [True, "Success"]
    except Fault as e:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, e))
        line_response = str(e)
        return [False, line_response]


# def remove_destination(destination):
#     """
#     This function removes remote destination
#     and remote destination profile
#     """
#
#     try:
#         service.removeRemoteDestination(destination=destination)
#         return True
#     except Fault as e:
#         return False, str(e)


def remove_remote_destination_profile(remote_destination_profile):
    """
    Rremove remote destination profile
    """
    try:
        service.removeRemoteDestinationProfile(name=remote_destination_profile)
        return [True, "Success"]
    except Fault as e:
        return [False, str(e)]


def meeting_config(*status):
    if True in status:
        state = True
    else:
        state = False
    return state

