"""
This module contains utility functions for macd use cases
"""

import random


# def cleanNullTerms(d):
#    clean = {}
#    for k, v in d.items():
#       if isinstance(v, dict):
#          nested = cleanNullTerms(v)
#          if len(nested.keys()) > 0:
#             clean[k] = nested
#       elif v is not None:
#          clean[k] = v
#    return clean


def get_em_pin():
    """
    Function to generate extension mobility pin
    :return: pin
    """
    pin = str(random.randrange(100000, 999999))
    return pin


def get_device_pool_name(data):
    """
    Function to get the device pool name
    :param data: numeric values
    :return: device pool name
    """
    device_pool_name = None
    if data == '1':
        device_pool_name = 'Default'
    elif data == '2':
        device_pool_name = 'test'
    elif data == '3':
        device_pool_name = 'DEL-DP'
    elif data == '4':
        device_pool_name = 'LDN-DP'
    elif data == '5':
        device_pool_name = 'NYC-DP'
    return device_pool_name


def get_location(data):
    """
    Function to get location
    :param data: numeric value
    :return: location name
    """
    location_name = None
    if data == '1':
        location_name = 'Phantom'
    elif data == '2':
        location_name = 'Shadow'
    elif data == '3':
        location_name = 'Hub_None'
    elif data == '4':
        location_name = 'DEL'
    elif data == '5':
        location_name = 'NYC'
    elif data == '6':
        location_name = 'LDN'
    return location_name


def get_css(data):
    """
    Function to get css name
    :param data: numeric value
    :return: css name
    """
    css_name = None
    if data == '1':
        css_name = 'UCCX'
    elif data == '2':
        css_name = 'internal-css'
    elif data == '3':
        css_name = 'jlt_local'
    elif data == '4':
        css_name = 'jlt_pstn'
    elif data == '5':
        css_name = 'DEL_CSS'
    elif data == '6':
        css_name = 'LDN_CSS'
    elif data == '7':
        css_name = 'NYC_CSS'
    elif data == '8':
        css_name = 'NYC_INT_CSS'
    elif data == '9':
        css_name = 'DEL_INT_CSS'
    elif data == '10':
        css_name = 'LDN_INT_CSS'
    elif data == '11':
        css_name = 'vmcss'
    return css_name


def get_route_partition(data):
    """
    Function to get route partition name
    :param data: numeric values
    :return: route partition name
    """
    route_partition_name = None
    if data == '1':
        route_partition_name = 'Directory URI'
    elif data == '2':
        route_partition_name = 'Global Learned Enterprise Numbers'
    elif data == '3':
        route_partition_name = 'Global Learned E164 Numbers'
    elif data == '4':
        route_partition_name = 'Global Learned Enterprise Patterns'
    elif data == '5':
        route_partition_name = 'Global Learned E164 Patterns'
    elif data == '6':
        route_partition_name = 'UCCX'
    elif data == '7':
        route_partition_name = 'internal-pt'
    elif data == '8':
        route_partition_name = 'jlt_internal'
    elif data == '9':
        route_partition_name = 'jlt_local'
    elif data == '10':
        route_partition_name = 'jlt_ITSP'
    elif data == '11':
        route_partition_name = 'DEL_PTT'
    elif data == '12':
        route_partition_name = 'LDN_PTT'
    elif data == '13':
        route_partition_name = 'NYC_PTT'
    return route_partition_name


def get_phone_type(data):
    """
    Function to get the phone type
    :param data: numeric values
    :return: phone type
    """
    phone_type = None
    if data == '1':
        phone_type = 'Cisco 7960'
    elif data == '2':
        phone_type = 'Cisco 7961'
    elif data == '3':
        phone_type = 'Cisco 7962'
    elif data == '4':
        phone_type = 'Cisco IP Communicator'
    return phone_type


def get_security_profile(data):
    """
    Function to get the security profile name
    :param data: numeric value
    :return: security profile name
    """
    security_profile = None
    if data == '1':
        security_profile = 'Cisco 7962 - Standard SCCP Non-Secure Profile'
    elif data == '2':
        security_profile = 'Cisco 7962 - Standard SIP Non-Secure Profile'
    elif data == '3':
        security_profile = 'Cisco 7961 - Standard SCCP Non-Secure Profile'
    elif data == '4':
        security_profile = 'Cisco 7961 - Standard SIP Non-Secure Profile'
    elif data == '5':
        security_profile = 'Cisco 7960 - Standard SCCP Non-Secure Profile'
    elif data == '6':
        security_profile = 'Cisco 7960 - Standard SIP Non-Secure Profile'
    elif data == '7':
        security_profile = 'Cisco IP Communicator - Standard SCCP Non-Secure Profile'
    elif data == '8':
        security_profile = 'Cisco IP Communicator - Standard SIP Non-Secure Profile'
    return security_profile


def get_phone_template(data):
    """
    Function to get the phone button template name
    :param data: numeric value
    :return: phone template name
    """
    phone_template_name = None
    if data == '1':
        phone_template_name = 'Standard 7960 SCCP'
    elif data == '2':
        phone_template_name = 'Standard 7960 SIP'
    elif data == '3':
        phone_template_name = 'Standard 7961 SCCP'
    elif data == '4':
        phone_template_name = 'Standard 7961 SIP'
    elif data == '5':
        phone_template_name = 'Standard 7962G SCCP'
    elif data == '6':
        phone_template_name = 'Standard 7962G SIP'
    return phone_template_name


def get_protocol(data):
    """
    Function to get protocol name
    :param data: numeric value
    :return: protocol name
    """
    protocol_name = None
    if data == '1':
        protocol_name = 'SCCP'
    elif data == '2':
        protocol_name = 'SIP'
    return protocol_name


def get_userid(data):
    """
    Function to get the user id
    :param data: numeric value
    :return: protocol name
    """
    protocol_name = None
    if data == '1':
        protocol_name = 'noida.test'
    elif data == '2':
        protocol_name = 'Weasley.Ro'
    return protocol_name


def get_em(data):
    """
    Function to get em data
    :param data: string data
    :return: True or False string
    """
    if data == 'y':  # pylint: disable=R1705
        return 'True'
    elif data == 'None':
        return 'False'


def get_sip_profile(data):
    """
    Function to get sip profile name
    :param data: numeric value
    :return: css name
    """
    css_name = None
    if data == '1':
        css_name = 'Standard SIP Profile'
    elif data == '2':
        css_name = 'Standard SIP Profile for Mobile Device'
    elif data == '3':
        css_name = 'Standard SIP Profile For TelePresence Conferencing'
    elif data == '4':
        css_name = 'Standard SIP Profile For Cisco VCS'
    elif data == '5':
        css_name = 'Standard SIP Profile For TelePresence Endpoint'
    elif data == '6':
        css_name = 'Standard SIP Profile -CUC'
    elif data == '7':
        css_name = 'Standard SIP Profile - IMP'
    elif data == '8':
        css_name = 'Standard SIP Profile - Interop'
    elif data == '9':
        css_name = 'Standard SIP Profile -CUCM2'
    elif data == '10':
        css_name = 'Cisco Jabber SIP Profile'
    elif data == '11':
        css_name = 'Standard SIP Profile for Webex Hybrid Calling'
    return css_name
