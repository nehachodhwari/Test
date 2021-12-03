"""
This module contains configuration data for provisioning use case
"""

import json
from zeep import helpers
from zeep.exceptions import Fault
from ..unityconnection import utils
from ..provision import conf_data
from ..projectconfig.connection import create_sess
from ..projectconfig import common_config as cfg

service = create_sess()


def add_new_line(temp_line, alerting_name, location, description):
    """
    Function to add new line
    :param temp_line: temp line
    :param alerting_name: alerting name
    :param location: location of device
    :param description: short description
    :return: string message or error message
    """
    try:
        cfg.logger.info("{} {} Adding a new line {}".format(cfg.username, cfg.ipaddress, temp_line))
        new_line = service.addLine({
            'pattern': temp_line,
            'asciiDisplay': alerting_name,
            'usage': 'Device',
            'description': description,
            'routePartitionName': conf_data.get_route_partition_name(location),
            'alertingName': alerting_name,
            'asciiAlertingName': alerting_name,
            'shareLineAppearanceCssName': conf_data.get_temp_css(location),
            'callForwardAll': {
                'callingSearchSpaceName': conf_data.get_temp_css(location)
            },
        })
        input_data = helpers.serialize_object(new_line)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} New line {} added successfully".format(cfg.username, cfg.ipaddress, temp_line))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def add_new_phone(name, phone_description, product, protocol, location, button_tmp,
                  label, alerting_name, temp_line):
    """
    Function to add new phone
    :param name: name of phone
    :param phone_description: short description
    :param product: product type
    :param protocol: protocol used
    :param location: location of device
    :param button_tmp: button template name
    :param label: label for phone
    :param alerting_name: alerting name for device
    :param temp_line: temp line
    :return: status message or error string
    """
    try:
        cfg.logger.info("{} {} Adding new phone {} to cucm".format(cfg.username, cfg.ipaddress, name))
        new_phone = service.addPhone(phone={
            'name': name,
            'description': phone_description,
            'product': conf_data.get_product_name(product),
            'class': 'Phone',
            'protocol': protocol,
            'protocolSide': 'User',
            'softkeyTemplateName': 'Standard User',
            'devicePoolName': conf_data.get_device_pool_name(location),
            'callingSearchSpaceName': conf_data.get_temp_css(location),
            'commonDeviceConfigName': conf_data.get_common_device_config_name(location),
            'commonPhoneConfigName': {'uuid': 'AC243D17-98B4-4118-8FEB-5FF2E1B781AC'},
            'locationName': {'uuid': '29C5C1C4-8871-4D1E-8394-0B9181E8C54D'},
            'useTrustedRelayPoint': 'Default',
            'phoneTemplateName': conf_data.get_phone_button_template(button_tmp, protocol),
            'primaryPhoneName': {'uuid': 'None'},
            'builtInBridgeStatus': 'Default',
            'packetCaptureMode': 'None',
            'certificateOperation': 'No Pending Operation',
            'deviceMobilityMode': 'Off',
            'enableExtensionMobility': True,
            'lines': {
                'line': {
                    'index': 1,
                    'label': label,
                    'display': alerting_name,
                    'displayAscii': alerting_name,
                    'e164Mask': conf_data.get_e164_mask(location),
                    'dirn': {
                        'pattern': temp_line,
                        'routePartitionName': conf_data.get_route_partition_name(location)}}}
            })
        input_data = helpers.serialize_object(new_phone)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} New phone {} added to cucm successfully".format(cfg.username, cfg.ipaddress, name))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def update_user_user_group(user_id):
    """
    Function to update user group
    :param user_id: user id of user
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Updating user {} user group details".format(cfg.username, cfg.ipaddress, user_id))
        user_group = service.updateUser(userid=user_id, enableCti=True, associatedGroups={
            'userGroup': {'name': 'Standard User Group'}})
        input_data = helpers.serialize_object(user_group)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} User group details are updated successfully for the user {}".format(cfg.username, cfg.ipaddress, user_id))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def update_user_line(user_id, name, temp_line, location):
    """
    Function to update user line
    :param user_id: user id of user
    :param name: name of line
    :param temp_line: temp line
    :param location: location of line
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Updating user {} line details".format(cfg.username, cfg.ipaddress, user_id))
        user_line = service.updateUser(userid=user_id, associatedDevices={'device': name},
                                       primaryExtension={'pattern': temp_line,
                                       'routePartitionName':
                                           conf_data.get_route_partition_name(location)})
        input_data = helpers.serialize_object(user_line)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} User {} line details updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def update_phone(name):
    """
    Function to update phone
    :param name: name of phone
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Updating phone {} details".format(cfg.username, cfg.ipaddress, name  ))
        updated_phone = service.updatePhone(
            name=name,
            services={
                'service': {
                    'name': 'Extension Mobility',
                    'telecasterServiceName': {
                    'uuid': '1d4a5005-8f7f-e857-5a5e-d6e9f648024c'}
                    }})
        input_data = helpers.serialize_object(updated_phone)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} Phone {} details are updated successfully".format(cfg.username, cfg.ipaddress, name))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def std_line_no_desc(temp_line, std_user_alerting_name, std_user_description,
                     alerting_name, location):
    """
    Function to add line for standard user
    :param temp_line: temp line
    :param std_user_alerting_name: standard user alerting name
    :param std_user_description: standard user description
    :param alerting_name: alerting name
    :param location: location of user
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Adding line {} details".format(cfg.username, cfg.ipaddress, temp_line))
        data = service.addLine({
            'pattern': temp_line,
            'asciiDisplay': std_user_alerting_name,
            'usage': 'Device',
            'description': std_user_description,
            'routePartitionName': conf_data.get_route_partition_name(location),
            'alertingName': std_user_alerting_name,
            'asciiAlertingName': alerting_name,
            'shareLineAppearanceCssName': conf_data.get_temp_css(location),
            'callForwardAll': {
                    'callingSearchSpaceName': conf_data.get_temp_css(location)
                }
        })
        input_data = helpers.serialize_object(data)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} Line {} details added successfully".format(cfg.username, cfg.ipaddress, temp_line))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def line_udp(phone_line, alerting_name, description, location):
    """
    Function for adding user device profile to line
    :param phone_line: line
    :param alerting_name: alerting name for device
    :param description: short description
    :param location: location of device
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Adding device profile to the line {}".format(cfg.username, cfg.ipaddress, phone_line))
        udp_line = service.addLine({
            'pattern': phone_line,
            'asciiDisplay': alerting_name,
            'usage': 'Device',
            'description': description,
            'routePartitionName': conf_data.get_route_partition_name(location),
            'alertingName': alerting_name,
            'asciiAlertingName': alerting_name,
            'voiceMailProfileName': conf_data.get_voice_mail_profile_name(location),
            'callingSearchSpaceName': conf_data.get_calling_search_space_name(location),
            'shareLineAppearanceCssName': conf_data.get_calling_search_space_name(location),
            'callForwardAll': {
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardBusy': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardBusyInt': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardNoAnswer': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardNoAnswerInt': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
            'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardNoCoverage': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardNoCoverageInt': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardOnFailure': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardNotRegistered': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            },
            'callForwardNotRegisteredInt': {
                'forwardToVoiceMail': conf_data.get_forward_to_voice_mail(location),
                'callingSearchSpaceName': conf_data.get_calling_search_space_name(location)
            }
        })
        input_data = helpers.serialize_object(udp_line)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} Device profile added to the line {} successfully".format(cfg.username, cfg.ipaddress, phone_line))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def add_udp(user_id, product, description, protocol, button_tmp, label,
            alerting_name, location, phone_line):
    """
    Function to add a user device profile to line
    :param user_id: user id of user
    :param product: product type
    :param description: short description of line
    :param protocol: protocol
    :param button_tmp: button template name
    :param label: label for device
    :param alerting_name: alerting name for device
    :param location: location of user
    :param phone_line: phone line
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Adding device profile to the user {}".format(cfg.username, cfg.ipaddress, user_id))
        user_device_profile = service.addDeviceProfile({
            'name': user_id,
            'product': conf_data.get_product_name(product),
            'description': description,
            'class': 'Device Profile',
            'protocol': protocol,
            'protocolSide': 'User',
            'softkeyTemplateName': 'Standard User',
            'userLocale': 'English United States',
            'phoneTemplateName': conf_data.get_phone_button_template(button_tmp, protocol),
            'loginUserId': user_id,
            'securityProfileName': 'Cisco 7962 - Standard SCCP Non-Secure Profile',
            'lines': {
                'line': {
                    'index': 1,
                    'label': label,
                    'display': alerting_name,
                    'displayAscii': alerting_name,
                    'e164Mask': conf_data.get_e164_mask(location),
                    'dirn': {
                        'pattern': phone_line,
                        'routePartitionName': conf_data.get_route_partition_name(location)
                }},
                'lineIdentifier': {
                    'directoryNumber': phone_line,
                    'routePartitionName': conf_data.get_route_partition_name(location)}}
            })
        input_data = helpers.serialize_object(user_device_profile)
        output_data = json.loads(json.dumps(input_data))
        status = output_data['return']
        cfg.logger.info("{} {} Device profile added to the user {} successfully".format(cfg.username, cfg.ipaddress, user_id))
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def update_std_user(user_id):
    """
    Function to update standard user
    :param user_id: user id of user
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Updating user {} profile".format(cfg.username, cfg.ipaddress, user_id))
        std_user_update = service.updateUser(userid=user_id, enableCti=True,
        ctiControlledDeviceProfiles={
            'profileName': user_id},
            phoneProfiles={
                'profileName': user_id},
                associatedGroups={
                    'userGroup': {
                        'name': 'Standard User Group'
                        }})
        input_data = helpers.serialize_object(std_user_update)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} User {} profile updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def update_user_details(user_id, extension_mobility_pin, phone_line, location):
    """
    Function to update user details
    :param user_id: user id of user
    :param extension_mobility_pin: extension mobility pin
    :param phone_line: phone line
    :param location: location of device
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Updating user {} details".format(cfg.username, cfg.ipaddress, user_id))
        user_detail = service.updateUser(userid=user_id, pin=extension_mobility_pin,
                                        primaryExtension={'pattern': phone_line,
                    'routePartitionName':conf_data.get_route_partition_name(location)})
        input_data = helpers.serialize_object(user_detail)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} User {} details updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        status = output_data['return']
    except Fault as error:
        cfg.logger.info("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def update_device_profile(user_id):
    """
    Function to update device profile
    :param user_id: user id of user
    :return: status or error message string
    """
    try:
        cfg.logger.info("{} {} Updating user {} device profile".format(cfg.username, cfg.ipaddress, user_id))
        device_profile = service.updateDeviceProfile(name=user_id, services={
            'service': {'name': 'Extension Mobility',
                        'telecasterServiceName': {
                            'uuid': '1d4a5005-8f7f-e857-5a5e-d6e9f648024c'}}})
        input_data = helpers.serialize_object(device_profile)
        output_data = json.loads(json.dumps(input_data))
        cfg.logger.info("{} {} User {} device profile updated successfully".format(cfg.username, cfg.ipaddress, user_id))
        status = output_data['return']
    except Fault as error:
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        status = str(error.message)
    return status


def enable_voice_mail(user_id):
    """
    Function to enable voice mail for user
    :param user_id: user id of user
    :return: string message
    """
    msg = None
    user_exist = utils.get_cuc_user(user_id)
    cfg.logger.info("{} {} Validating user {} details".format(cfg.username, cfg.ipaddress, user_id))
    if user_exist is None:
        search_user_in_import = utils.find_user_in_import_section(user_id)
        if search_user_in_import is None:
            cfg.logger.warning("{} {} User {} details not found".format(cfg.username, cfg.ipaddress, user_id))
            msg = "User Not Found"
        else:
            cfg.logger.info("{} {} Enabling voice mail for the user {}".format(cfg.username, cfg.ipaddress, user_id))
            vm_enable_during_import = utils.import_ldap_user_with_vm_enabled(user_id)
            if vm_enable_during_import == 201:
                cfg.logger.info("{} {} Voice mail enabled for the user {}".format(cfg.username, cfg.ipaddress, user_id))
                msg = "VM Enabled"
            else:
                msg = "Check logs"
    elif user_exist[0] == "Yes":
        cfg.logger.info("{} {} Voice mail already enabled for the user".format(cfg.username, cfg.ipaddress, user_id))
        msg = "Voice Mail Already enabled"
    return msg


def reset_voice_mail_pin(user_id):
    """
    Function to reset voice mail pin for users
    :param user_id: user id of user
    :return: string message
    """
    user_exist = utils.get_cuc_user(user_id)
    cfg.logger.info("{} {} Validating user {} details".format(cfg.username, cfg.ipaddress, user_id))
    if user_exist is not None:
        cfg.logger.info("{} {} Resetting voice mail pin for the user {}".format(cfg.username, cfg.ipaddress, user_id))
        reset_pin = utils.reset_voicemail_pin(user_id)
        if reset_pin[1] == 204:
            cfg.logger.info("{} {} Voice mail pin reset successful for the user {}".format(cfg.username, cfg.ipaddress, user_id))
            msg = "Pin Reset Successful"
        else:
            msg = str(reset_pin[1])+"Unable to reset. Please check logs "
    else:
        cfg.logger.warning("{} {} User {} details not found".format(cfg.username, cfg.ipaddress, user_id))
        msg = "User Not Found"
    return msg
