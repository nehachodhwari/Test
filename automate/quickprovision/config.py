"""
This module contains config variables and some configuration function for quick
custom provisioning
"""

import random

PHONE_BUTTON_TEMPLATE = {
    "Cisco 7962": {
        "SIP": {"Default": "Standard 7962G SIP",
                "1Line 5Speed Dial": "Standard 7962G SIP 1L 5SD",
                "2Line 4Speed Dial": "Standard 7962G SIP 2L 4SD"
                },
        "SCCP": {"Default": "Standard 7962G SCCP",
                 "1Line 5Speed Dial": "Standard 7962G SCCP 1L 5SD",
                 "2Line 4Speed Dial": "Standard 7962G SCCP 2L 4SD"
                 }
    },
    "Cisco 7961": {
        "SIP": {"Default": "Standard 7962G SIP",
                "1Line 5Speed Dial": "Standard 7962G SIP 1L 5SD",
                "2Line 4Speed Dial": "Standard 7962G SIP 2L 4SD"
                },
        "SCCP": {"Default": "Standard 7962G SCCP",
                 "1Line 5Speed Dial": "Standard 7962G SCCP 1L 5SD",
                 "2Line 4Speed Dial": "Standard 7962G SCCP 2L 4SD"
                 }
    }
}

CLIENT_ID = 'C33f7b22ca601c0f716a586e96e9442db3af017f6747b109bd1e3e96b49582d2e'
SECRET_ID = "952dc0e18908f9fc07481fee1f23295296f6b71c685d00283e33a99bdc706648"


def get_calling_privilege(local, internal, national, international):  # pylint: disable=R1710
    """
    Function to get the calling privileges
    :param local: Boolean param for local calling
    :param internal: Boolean param for internal calling
    :param national: Boolean param for national calling
    :param international: Boolean param for international calling
    :return: string calling privilege name
    """
    if local == 'y':
        if internal == 'y':
            if national == 'y':
                if international == 'y':  # pylint: disable=R1705
                    return 'international'
                else:
                    return 'national'
            else:
                return 'internal'
        else:
            return 'local'


def get_route_partition_name(location):
    """
    Function to get the route partition name
    :param location: location name to fetch route partition
    :return: String route partition name
    """
    route_partition_name = None
    if location == 'NYC':
        route_partition_name = 'NYC_PTT'
    elif location == 'LDN':
        route_partition_name = 'LDN_PTT'
    elif location == 'DEL':
        route_partition_name = 'DEL_PTT'
    return route_partition_name


def get_css(location, calling_privilege):
    """
    Function to get the CSS name
    :param location: location name
    :param calling_privilege: Calling privilege for Css
    :return: String Css name if found else None
    """
    css = None
    if location.upper() in ['LDN', 'NYC', 'DEL'] and calling_privilege:
        css = location.upper()+'_'+calling_privilege.capitalize()+'_CSS'
    return css


def get_device_pool_name(location):
    """
    Function to fetch the device pool name
    :param location: location in which device is located
    :return: dictionary device pool name
    """
    device_pool_name = None
    if location == 'NYC':
        device_pool_name = {'uuid': '171fddde-fdf6-06d3-8a19-6fd6294b637e'}
    elif location == 'LDN':
        device_pool_name = {'uuid': '559cdec0-ab5c-710f-3f74-c5905bd8ab08'}
    elif location == 'DEL':
        device_pool_name = {'uuid': 'de71f371-5ac5-9dec-493e-26870bf9814d'}
    return device_pool_name


def get_common_device_config_name(location):
    """
    Function to fetch common device config name
    :param location: location to get common config device
    :return: String common device config name
    """
    device_config_name = None
    if location.upper() in ['NYC', 'LDN', 'DEL']:
        device_config_name = location.upper()+'-CDC'
    return device_config_name


def get_e164_mask(location):
    """
    Function to get mask object
    :param location: location
    :return: String mask
    """
    mask = None
    if location == 'NYC':
        mask = '+12123XXXXXXX'
    elif location == 'LDN':
        mask = '+44203XXXXXXX'
    elif location == 'DEL':
        mask = '+91981XXXXXXX'
    return mask


def get_temp_line(list_of_line, location):
    """
    Function to get temporary phone line bases on location
    :param list_of_line: list of availabe lines
    :param location: location in which line needs to be found
    :return: String line
    """
    line = None
    if location == 'NYC':
        for line in range(1000000, 2000001, 1):
            if line not in list_of_line[0]:
                break
    elif location == 'LDN':
        for line in range(2000012, 3000001, 1):
            if line not in list_of_line[0]:
                break
    elif location == 'DEL':
        for line in range(3000001, 4000001, 1):
            if line not in list_of_line[0]:
                break
    else:
        pass
    return '+'+str(line)


def get_voice_mail_profile_name(location):
    """
    FUnction to fetch the voice mail profile name
    :param location: Location in which voice profile is created
    :return: String Voice profile name
    """
    vm_profile_name = None
    if location == 'NYC':
        vm_profile_name = 'NYC_VM'
    elif location == 'LDN':
        vm_profile_name = 'LDN_VM'
    elif location == 'DEL':
        vm_profile_name = 'DEL_VM'
    return vm_profile_name


def get_forward_to_voice_mail(location):
    """
    Function to get forward voice mail enable on location
    :param location: location on which voice mail needs to be enabled
    :return: Boolean
    """
    if location in ('NYC', 'LDN', 'DEL'):
        return True
    return False


def get_em_pin():
    """
    Function to get random em pin
    :return: String Pin randomly generated
    """
    pin = str(random.randrange(100000, 999999))
    return pin
