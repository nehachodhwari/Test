"""
This module contains the utility function used in quick custom provision
"""

from flask import request
from zeep.exceptions import Fault
from automate.models.models import ExtensionRange, DirectoryNumbers, LocationMapping
from ..projectconfig.connection import create_sess
from ..quickprovision.config import get_route_partition_name, \
    get_css, get_device_pool_name, get_common_device_config_name, get_e164_mask, \
    get_voice_mail_profile_name, get_forward_to_voice_mail, PHONE_BUTTON_TEMPLATE, \
    get_calling_privilege
from ..quickprovision import unityutils as ut
from ..app import db
from ..projectconfig import common_config as cfg
from ..exception import get_cucm_error_message
from sqlalchemy import exc

service = create_sess()


def get_form_data(form, user_profile):
    """
    Function to capture and return the form data for quick custom
    :param form: quick custom form
    :return: dictionary containing form data
    """
    mapped_location = db.session.query(LocationMapping.SiteCode).filter(
        LocationMapping.Location == request.form.get('location')).first().SiteCode
    destination = request.form.get('destination')
    if user_profile == "Executive" and destination in ["", 'NA']:
        destination = None
    if user_profile == "Knowledge Worker":
        phonebuttontemplate = None
    else:
        phonebuttontemplate = PHONE_BUTTON_TEMPLATE[request.form.get('product')][request.form.get('protocol')][(dict(form.phonelinedialer.choices).get(
        form.phonelinedialer.data))]
    output = {'phonebuttontemplate': phonebuttontemplate,
              'calling_privilege': get_calling_privilege(request.form.get('local_check'),
                                                         request.form.get('internal_check'),
                                                         request.form.get('national_check'),
                                                         request.form.get('international_check')),
              'Mac': request.form.get('mac'), 'location': mapped_location,
              'user_id': request.form.get('user_id'), 'product': request.form.get('product'),
              'protocol': request.form.get('protocol'), 'extension': request.form.get('extension'),
              'destination': destination,
              'first_name': request.form.get('name_first'),
              'last_name': request.form.get('name_last'),
              'email': request.form.get('email'),
              'alerting_name': request.form.get('name_first') + ' ' + request.form.get('name_last')}
    return output


def get_user_cucm(user_id):
    """
    Function to get the cucm user via API call
    :param user_id: user id to be searched
    :return: Boolean
    """
    try:
        cfg.logger.info("{} {} Getting cucm user {} details".format(cfg.username, cfg.ipaddress, user_id))
        service.getUser(userid=user_id, returnedTags={'firstName': True, 'lastName': True,
                                                      'userid': True, 'mailid': True})
        cfg.logger.info("{} {} User {} details captured successfully".format(cfg.username, cfg.ipaddress, user_id))
        return True
    except Exception as error:  # pylint: disable=W0702
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return False


def add_new_line(extension, alerting_name, location, calling_privilege):
    """
    Function to add a new line
    :param extension: Extension number to be given to user
    :param alerting_name: alerting name of line
    :param location: location of user
    :param calling_privilege: calling privilege of users
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Adding a new line with extension {}".format(cfg.username, cfg.ipaddress, extension))
        service.addLine({
            'pattern': "\\"+extension,
            'asciiDisplay': alerting_name,
            'usage': 'Device',
            'description': alerting_name,
            'routePartitionName': get_route_partition_name(location),
            'alertingName': alerting_name,
            'asciiAlertingName': alerting_name,
            'shareLineAppearanceCssName': get_css(location, calling_privilege),
            'callForwardAll': {'callingSearchSpaceName': get_css(location, calling_privilege)},
        })
        cfg.logger.info("{} {} New line with extension {} added successfully".format(cfg.username, cfg.ipaddress, extension))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = ["Internal server error", False]
    return msg

def find_phone(mac):
    """
    Function to find a phone using mac address
    :param mac: mac address of phone
    :return: Boolean
    """
    try:
        cfg.logger.info("{} {} Finding phone {} details".format(cfg.username, cfg.ipaddress, mac))
        service.getPhone(name=mac, returnedTags={'name': True})
        cfg.logger.info("{} {} Phone {} details are captured successfully".format(cfg.username, cfg.ipaddress, mac))
        msg = ["Success", True]
        return msg
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
        return msg
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = ["Internal server error", False]
        return msg


def add_new_phone(user_id, mac, product, protocol, location,
                  calling_privilege, button_tmp, label, alerting_name, extension):
    """
    Function to add a new phone
    :param user_id: user id of user for which phone needs to be added
    :param mac: Mac address of the line
    :param product: product name
    :param protocol: protocol for phone
    :param location: location of user
    :param calling_privilege: Calling privilege for user
    :param button_tmp: button temp
    :param label: label for phone
    :param alerting_name: alerting name for phone
    :param extension: extension number
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Adding new phone {} to cucm user {}".format(cfg.username, cfg.ipaddress, mac, user_id))
        service.addPhone(phone={
            'name': mac,
            'description': alerting_name,
            'product': product,
            'class': 'Phone',
            'protocol': protocol,
            'protocolSide': 'User',
            'softkeyTemplateName': 'Standard User',
            'devicePoolName': get_device_pool_name(location),
            'callingSearchSpaceName': get_css(location, calling_privilege),
            'commonDeviceConfigName': get_common_device_config_name(location),
            'commonPhoneConfigName': {'uuid': 'AC243D17-98B4-4118-8FEB-5FF2E1B781AC'},
            'locationName': location,
            'useTrustedRelayPoint': 'Default',
            'phoneTemplateName': button_tmp,
            'primaryPhoneName': {'uuid': 'None'},
            'builtInBridgeStatus': 'Default',
            'packetCaptureMode': 'None',
            'ownerUserName': user_id,
            'certificateOperation': 'No Pending Operation',
            'deviceMobilityMode': 'Off',
            'enableExtensionMobility': True,
            'lines': {
                'line': {
                    'index': 1,
                    'label': label,
                    'display': alerting_name,
                    'displayAscii': alerting_name,
                    'e164Mask': get_e164_mask(location),
                    'dirn': {
                        'pattern': "\\"+extension,
                        'routePartitionName': get_route_partition_name(location)}}}
            })
        cfg.logger.info("{} {} Phone {} added to cucm user {} successfully".format(cfg.username, cfg.ipaddress, mac, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = ["Internal server error", False]
    return msg

def update_phone(mac):
    """
    Function to update a phone
    :param mac: mac address of phone
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Updating phone {} details".format(cfg.username, cfg.ipaddress, mac))
        service.updatePhone(name=mac, services={'service': {'name': 'Extension Mobility',
                                                'telecasterServiceName': {
                                                 'uuid': '1d4a5005-8f7f-e857-5a5e-d6e9f648024c'}}})
        cfg.logger.info("{} {} Phone {} details are updated successfully".format(cfg.username, cfg.ipaddress, mac))
        msg = ["Success", True]
        return msg
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
        return msg
    except Exception as error:
        err_msg = 'Internal server error'
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
        return msg


def list_line(location):
    """
    Function to list line
    :param location: location in which line is located
    :return: List of directory number
    """

    try:
        cfg.logger.info("{} {} Listing line details of the location {}".format(cfg.username, cfg.ipaddress, location))
        directory_number_list =[]
        db_data = db.session.query(DirectoryNumbers).filter(DirectoryNumbers.Location == location)
        cfg.logger.info("{} {} List of line details are captured for the location {} successfully".format(cfg.username,
                                                                                                          cfg.ipaddress,
                                                                                                          location))
        for directory_number in db_data:
            directory_number_list.append(int(directory_number.Extension))
        msg = [directory_number_list, True]
    except exc.SQLAlchemyError as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        err_msg = "DB error"
        msg = [err_msg, False]
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        err_msg = "Internal server error"
        msg = [err_msg, False]
    return msg


def add_udp_extension(extension, alerting_name, location, calling_privilege):
    """
    Function to add user device profile extension
    :param extension: Extension number
    :param alerting_name: alerting name of device
    :param location: location of device
    :param calling_privilege: calling privileges associated with device
    :return: Boolean if success else Exception
    """
    try:
        cfg.logger.info("{} {} Adding device profile to the line {}".format(cfg.username, cfg.ipaddress, extension))
        service.addLine({
            'pattern': "\\"+extension,
            'asciiDisplay': alerting_name,
            'usage': 'Device',
            'description': alerting_name,
            'routePartitionName': get_route_partition_name(location),
            'alertingName': alerting_name,
            'asciiAlertingName': alerting_name,
            'voiceMailProfileName': get_voice_mail_profile_name(location),
            'callingSearchSpaceName': get_css(location, calling_privilege),
            'shareLineAppearanceCssName': get_css(location, calling_privilege),
            'callForwardAll': {'callingSearchSpaceName': get_css(location, calling_privilege)},
            'callForwardBusy': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                'callingSearchSpaceName': get_css(location, calling_privilege)},
            'callForwardBusyInt': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                   'callingSearchSpaceName': get_css(location, calling_privilege)},
            'callForwardNoAnswer': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                    'callingSearchSpaceName': get_css(location, calling_privilege)},
            'callForwardNoAnswerInt': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                       'callingSearchSpaceName':
                                           get_css(location, calling_privilege)},
            'callForwardNoCoverage': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                      'callingSearchSpaceName':
                                          get_css(location, calling_privilege)},
            'callForwardNoCoverageInt': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                         'callingSearchSpaceName':
                                             get_css(location, calling_privilege)},
            'callForwardOnFailure': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                     'callingSearchSpaceName':
                                         get_css(location, calling_privilege)},
            'callForwardNotRegistered': {'forwardToVoiceMail': get_forward_to_voice_mail(location),
                                         'callingSearchSpaceName':
                                             get_css(location, calling_privilege)},
            'callForwardNotRegisteredInt': {'forwardToVoiceMail':
                                                get_forward_to_voice_mail(location),
                                            'callingSearchSpaceName':
                                                get_css(location, calling_privilege)}
        })
        cfg.logger.info("{} {} Device profile added to the line {} successfully".format(cfg.username, cfg.ipaddress, extension))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = ["Internal Server error", False]
    return msg

def add_device_profile(user_id, product, protocol, button_tmp, label,
                       alerting_name, location, phone_line):
    """
    Function to add device profile for a user
    :param user_id: user id of a user
    :param product: product code of device
    :param protocol: protocol to be used
    :param button_tmp: button temp
    :param label: label for device
    :param alerting_name: alerting name for device
    :param location: location of user
    :param phone_line: phone line associated to user
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Adding device profile to the user {}".format(cfg.username, cfg.ipaddress, user_id))
        service.addDeviceProfile({'name': user_id, 'product': product, 'description': alerting_name,
                                  'class': 'Device Profile', 'protocol': protocol,
                                  'protocolSide': 'User',
                                  'softkeyTemplateName': 'Standard User',
                                  'userLocale': 'English United States',
                                  'phoneTemplateName': button_tmp, 'loginUserId': user_id,
                                  'securityProfileName':
                                      'Cisco 7962 - Standard SCCP Non-Secure Profile',
                                  'lines': {
                                      'line': {
                                          'index': 1,
                                          'label': label,
                                          'display': alerting_name,
                                          'displayAscii': alerting_name,
                                          'e164Mask': get_e164_mask(location),
                                          'dirn': {
                                              'pattern': "\\"+phone_line,
                                              'routePartitionName':
                                                  get_route_partition_name(location)
                                          }},
                                      'lineIdentifier': {
                                          'directoryNumber': "\\"+phone_line,
                                          'routePartitionName': get_route_partition_name(location)
                                      }}})
        cfg.logger.info("{} {} Device profile added to the user{} successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        err_msg = "Internal Server error"
        msg = [err_msg, False]
    return msg


def update_user_with_dp(user_id):
    """
    Function to update a user with device profile
    :param user_id: user id of user
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Updating user {} with device profile".format(cfg.username, cfg.ipaddress, user_id))
        service.updateUser(userid=user_id, enableCti=True, homeCluster=True,
                           ctiControlledDeviceProfiles={'profileName': user_id},
                           phoneProfiles={'profileName': user_id},
                           associatedGroups={'userGroup': {'name': 'Standard User Group'}})
        cfg.logger.info("{} {} User {} updated with device profile successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal Server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg


def update_user_em_details(user_id, extension_mobility_pin, phone_line, location):
    """
    Function to update users extension mobility details
    :param user_id: user id of user
    :param extension_mobility_pin: pin for em
    :param phone_line: phone line associated with udp
    :param location: location of user
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Updating user {} extension mobility details".format(cfg.username, cfg.ipaddress, user_id))
        service.updateUser(userid=user_id, pin= extension_mobility_pin, imAndPresenceEnable=True, primaryExtension={
            'pattern': "\\" + phone_line,
            'routePartitionName': get_route_partition_name(location)})

        cfg.logger.info("{} {} User {} extension mobility details updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, True]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, True]
    return msg


def update_dp(user_id):
    """
    Function to update a device profile
    :param user_id: user id of user whose device profile needs to be updated
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Updating user {} device profile".format(cfg.username, cfg.ipaddress, user_id))
        service.updateDeviceProfile(name=user_id, services={'service': {
            'name': 'Extension Mobility', 'telecasterServiceName': {
                                        'uuid': '1d4a5005-8f7f-e857-5a5e-d6e9f648024c'}}})
        cfg.logger.info("{} {} User {} device profile updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg


def enable_vm(user_id, extension):
    """
    Function to enable voice mail for user
    :param user_id: user whose voice mail needs to be enabled
    :return: List of messages
    """
    cfg.logger.info("{} {} Enabling voice mail for the user {}".format(cfg.username, cfg.ipaddress, user_id))
    user_exist = ut.get_cuc_user(user_id)
    msg = []
    if user_exist is None:
        search_user_in_import = ut.find_user_in_import_section(user_id)
        if search_user_in_import is None:
            msg = ["User Not Found", False]
        else:
            vm_enable_during_import = ut.import_ldap_user_with_vm_enabled(user_id,extension)
            if vm_enable_during_import[0] == 201:
                msg = ["VM Enabled", True]
            else:
                msg = ["Check logs", False]
    else:
        if user_exist[1]:
            msg = ["Voice Mail Already enabled", True]
    return msg


def reset_vm_pin(user_id):
    """
    Function to reset voice mail pin of user
    :param user_id: user whose voice mail pin needs to be reset
    :return: List of message
    """
    cfg.logger.info("{} {} Validating user {} details".format(cfg.username, cfg.ipaddress, user_id))
    user_exist = ut.get_cuc_user(user_id)
    if user_exist is None:
        msg = ["User not found", False]
        cfg.logger.warning("{} {} User {} not found".format(cfg.username, cfg.ipaddress, user_id))
    elif not user_exist[1]:
        msg = [user_exist[0], False]
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, user_exist))
    else:
        reset_pin = ut.reset_voice_mail_pin(user_id)
        if reset_pin[0]:
            cfg.logger.info(
                        "{} {} Voice mail pin reset successfully for the user {}".format(cfg.username, cfg.ipaddress, user_id))
            return [reset_pin[1], True]
        else:
            cfg.logger.info(
                     "{} {} Unable to reset voice main pin for the user {}".format(cfg.username, cfg.ipaddress, user_id))
            return [reset_pin[1], False]
    # cfg.logger.info("{} {} Validating user {} details".format(cfg.username, cfg.ipaddress, user_id))
    # user_exist = ut.get_cuc_user(user_id)
    # if user_exist:
    #     cfg.logger.info("{} {} Resetting voice mail pin for the user {}".format(cfg.username, cfg.ipaddress, user_id))
    #     reset_pin = ut.reset_voice_mail_pin(user_id)
    #     if reset_pin[1] == 204:
    #         cfg.logger.info(
    #             "{} {} Voice mail pin reset successfully for the user {}".format(cfg.username, cfg.ipaddress, user_id))
    #         return [reset_pin[0], True]
    #     cfg.logger.info(
    #         "{} {} Unable to reset voice main pin for the user {}".format(cfg.username, cfg.ipaddress, user_id))
    #     msg = str(reset_pin[1]) + "Unable to reset. Please check logs "
    #     return [str(msg), False]
    # cfg.logger.warning("{} {} User {} not found".format(cfg.username, cfg.ipaddress), user_id)
    # return ["User Not Found", False]


def add_jabber(f_name, user_id, label, alerting_name, extension, location, calling_privilege):
    """
    Function to add a jabber for a user
    :param f_name: first name of user
    :param user_id: user id of user
    :param label: label for jabber
    :param alerting_name: alerting name for user
    :param extension: extension number of jabber phone
    :param location: location of user
    :param calling_privilege: calling privileges need to be given to user
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Adding jabber to the user {}".format(cfg.username, cfg.ipaddress, user_id))
        service.addPhone(phone={'name': "CSF"+str(user_id), 'description': "Jabberfor"+str(f_name),
                                'product': 'Cisco Unified Client Services Framework',
                                'class': 'Phone', 'protocol': 'SIP', 'protocolSide': 'User',
                                'softkeyTemplateName': 'Standard User', 'ownerUserName': user_id,
                                'devicePoolName': get_device_pool_name(location),
                                'callingSearchSpaceName': get_css(location, calling_privilege),
                                'commonDeviceConfigName': get_common_device_config_name(location),
                                'commonPhoneConfigName': {'uuid':
                                                          'AC243D17-98B4-4118-8FEB-5FF2E1B781AC'},
                                'locationName': location,
                                'phoneTemplateName': 'Standard Client Services Framework',
                                'lines': {'line': {'index': 1, 'label': label,
                                                   'display': alerting_name,
                                                   'displayAscii': alerting_name,
                                                   'e164Mask': get_e164_mask(location),
                                                   'dirn': {'pattern': "\\"+extension,
                                                            'routePartitionName':
                                                            get_route_partition_name(location)}}}
        })
        cfg.logger.info("{} {} Jabber service added to user {} successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg

def update_user_jabber(user_id, name):
    """
    Function to update a jabber for user
    :param user_id: User id of jabber user
    :param name: name of jabber device
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Updating user {} jabber profiles".format(cfg.username, cfg.ipaddress, user_id))
        service.updateUser(userid=user_id, homeCluster=True, imAndPresenceEnable=True, enableMobility=True,
                           password='Pa$$w0rd', associatedDevices={'device': [name,'SEP831844443333']},
                           associatedGroups={'userGroup': [
                               {'name': 'Standard User Group'},
                               {'name': 'Standard CTI Allow Call Monitoring'},
                               {'name': 'Standard CTI Enabled'}]})
        cfg.logger.info("{} {} User {} jabber profiles updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg


def check_valid_extension(extension, location):
    """
    Function to check if the given extension is correct.
    :param extension: DID number fetched using database
    :param location:  Location in which DID number exists.
    :return: Boolean True if exist else false.
    """
    is_valid = False
    if extension.strip():
        ext = int(extension.strip('+'))
        extension_range_db = db.session.query(
            ExtensionRange.DID_range_begin, ExtensionRange.DID_range_end).filter(
                ExtensionRange.SiteCode == location).all()
        for db_range in extension_range_db:
            begin = db_range[0].strip('+')
            end = db_range[1].strip('+')
            extension_range = set(range(int(begin), (int(end)+1)))
            if ext in extension_range:
                is_valid = True
                break
    return is_valid


def get_new_line(list_of_line, location):
    """
    Fetches new extension number based on location and available
    lines.
    :param list_of_line: List of used Extensions
    :param location: used to fetch DID range for particular location
    :return: DID extension
    """

    line = None
    extension_range_db = db.session.query(
        ExtensionRange.CountryCode, ExtensionRange.CityCode,
        ExtensionRange.DID_range_begin,
        ExtensionRange.DID_range_end).filter(
        ExtensionRange.SiteCode == location).all()
    for db_data in extension_range_db:
        begin = db_data[0]+db_data[1]+db_data[2]
        end = db_data[0]+db_data[1]+db_data[3]
        try:
            line_list = list(set(range(int(begin), int(end), 1)) - set(list_of_line))
            if line_list:
                line = '+'+str(line_list[0])
                break
        # test for UI
        except Exception as e:
            print(e)
    return line


def enable_single_number_reach(user_id, extension, destination, location, calling_privilege):
    """
    update the file AXLSoap.xsd in WSDLFiles>schema>current
    17330 change minoccurs to 0 from 1
    17315 chnage minoccurs to 0 from 1
    """
    update_user_enable_mobility = enable_mobility(user_id)
    if update_user_enable_mobility[1] == True:
        remote_destination_profile = create_remote_destination_profile(user_id, extension, location, calling_privilege)
        if remote_destination_profile[1] == True:
            update_destination_profile = update_remote_destination_profile(user_id, extension, location)
            if update_destination_profile[1] == True:
                remote_destination = add_remote_destination(user_id, destination, extension, location)

                if remote_destination[1] == True:
                    return ["Success", True]
                else:
                    return remote_destination
            else:
                return update_destination_profile
        else:
            return remote_destination_profile
    else:
        return update_user_enable_mobility

def enable_mobility(userid):
    try:
        cfg.logger.info("{} {} Enabling mobility for the user {}".format(cfg.username, cfg.ipaddress, userid))
        service.updateUser(userid=userid, enableMobility=True)
        cfg.logger.info("{} {} Mobility enabled for the user {}".format(cfg.username, cfg.ipaddress, userid))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg

def create_remote_destination_profile(user_id, extension, location, calling_privilege):
    try:
        service.addRemoteDestinationProfile(remoteDestinationProfile={
            'name': 'RDP_' + user_id,
            'description': 'RDP for ' + user_id,
            'product': 'Remote Destination Profile',
            'class': 'Remote Destination Profile',
            'protocol': 'Remote Destination',
            'protocolSide': 'User',
            'devicePoolName': get_device_pool_name(location),
            'userId': user_id,
            'callingSearchSpaceName': get_css(location, calling_privilege),
            'rerouteCallingSearchSpaceName': get_css(location, calling_privilege),
            'cgpnTransformationCssName': get_css(location, calling_privilege),
            'callInfoPrivacyStatus': 'Default',
            'lines': {
                'line': {
                    'index': 1,
                    'dirn': {
                        'pattern': "\\" + extension,
                        'routePartitionName': get_route_partition_name(location)
                    }
                }
            }
        })
        cfg.logger.info(
            "{} {} Remote destination profile created for the user {}".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg


def update_remote_destination_profile(user_id, extension, location):
    try:
        cfg.logger.info(
            "{} {} Updating Remote destination profile for the user {}".format(cfg.username, cfg.ipaddress, user_id))
        service.updateRemoteDestinationProfile(name='RDP_' + user_id,
                                               lines={
                                                   'line': {
                                                       'index': 1,
                                                       'dirn': {
                                                           'pattern': "\\" + extension,
                                                           'routePartitionName': get_route_partition_name(location)
                                                       },
                                                       'associatedEndusers': {
                                                           'enduser': {
                                                               'userId': user_id
                                                           }
                                                       }
                                                   }
                                               },
                                               userId=user_id
                                               )
        cfg.logger.info(
            "{} {} Remote destination profile updated for the user {}".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg

def add_remote_destination(user_id, destination, extension, location):
    try:
        cfg.logger.info(
            "{} {} Adding remote destination profile for the user {}".format(cfg.username, cfg.ipaddress, user_id))
        service.addRemoteDestination(remoteDestination={
            'ownerUserId': user_id,
            'name': 'RD_' + user_id,
            'destination': destination,
            'answerTooSoonTimer': 1500,
            'answerTooLateTimer': 19000,
            'delayBeforeRingingCell': 4000,
            'enableUnifiedMobility': True,
            'remoteDestinationProfileName': 'RDP_' + user_id,
            'enableMobileConnect': True,
            'lineAssociations':{'lineAssociation': {
                'pattern': "\\"+extension,
                'routePartitionName': get_route_partition_name(location)
            }}
        })
        cfg.logger.info(
            "{} {} Remote destination profile added for the user {} successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg


def update_user_phone_device(user_id, name):
    """
    Function to update a jabber for user
    :param user_id: User id of jabber user
    :param name: name of jabber device
    :return: Boolean if success else exception
    """
    try:
        cfg.logger.info("{} {} Updating user {} jabber profiles".format(cfg.username, cfg.ipaddress, user_id))
        service.updateUser(userid=user_id, password='Pa$$w0rd', associatedDevices={'device': [name]})
        cfg.logger.info("{} {} User {} jabber profiles updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        msg = ["Success", True]
    except Fault as error:
        err_msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    except Exception as error:
        err_msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [err_msg, False]
    return msg
