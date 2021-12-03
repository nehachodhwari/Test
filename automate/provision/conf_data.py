"""
This module contains configuration data for provisioning use case
"""

import random

# def getCiscoProduct(product):
#     if product in ['7962','7962g','7962G','cisco 7962','Cisco7962','Cisco 7962',
#     'cisco7962','Cisco7962G','Cisco 7962G','cisco 7962g']:
#         return "Cisco 7962"


def get_em_pin():
    """
    Function to generate extension mobility pin
    :return: pin
    """
    pin = str(random.randrange(100000, 999999))
    return pin


def get_device_pool_name(location):
    """
    Function to get the device pool name
    :param location: location of device
    :return: device pool name string
    """
    device_pool_name = None
    if location == 'NYC':
        device_pool_name = {'uuid': '171fddde-fdf6-06d3-8a19-6fd6294b637e'}
    elif location == 'LDN':
        device_pool_name = {'uuid': '559cdec0-ab5c-710f-3f74-c5905bd8ab08'}
    elif location == 'DEL':
        device_pool_name = {'uuid': 'de71f371-5ac5-9dec-493e-26870bf9814d'}
    return device_pool_name


def get_route_partition_name(location):
    """
    Function to get the route partition name
    :param location:
    :return:
    """
    route_partition_name = None
    if location == 'NYC':
        route_partition_name = 'NYC_PTT'
    elif location == 'LDN':
        route_partition_name = 'LDN_PTT'
    elif location == 'DEL':
        route_partition_name = 'DEL_PTT'
    return route_partition_name


# def get_routePartitionUuid(location):
#     if location == 'NYC':
#         get_routePartitionUuid = { 'uuid':'1bf8d4b6-db33-27e2-9725-3ecaa937e1d6'}
#         return get_routePartitionUuid
#     elif location == 'LDN':
#         get_routePartitionUuid = {'uuid':'618693a9-1db7-6387-fa2b-1dada313797c'}
#         return get_routePartitionUuid
#     elif location == 'DEL':
#         get_routePartitionUuid = {'uuid':'7e3c7da4-c52f-b3a9-26f8-eaaa62036e10'}
#         return get_routePartitionUuid
#     else:
#         routePartitionName = ''
#         return None


# def get_cfaCssProfile(location):
#     if location == 'NYC':
#         # cfaCssProfile = {'uuid':'d479e8bf-6b33-7832-6d8f-2d96f6ee3029'}
#         cfaCssProfile = 'NYC_CSS'
#         return cfaCssProfile
#     elif location == 'LDN':
#         # cfaCssProfile = {'uuid':'b4c9b164-aa89-627f-b8b8-c5531c4791e'}
#         cfaCssProfile = 'LDN_CSS'
#         return cfaCssProfile
#     elif location == 'DEL':
#         cfaCssProfile = 'DEL_CSS'
#         # cfaCssProfile = {'uuid':'2aa73fde-7109-8561-49de-c04dc76ca137'}
#         return cfaCssProfile
#     else:
#         cfaCssProfile =  {'uuid':''}
#         return None


def get_forward_to_voice_mail(location):
    """
    Function to get forward voicemail location
    :param location: location of user
    :return: Boolean
    """
    if location in ('NYC', 'LDN', 'DEL'):
        return True
    return False


def get_calling_search_space_name(location):
    """
    Function to get the css name
    :param location: location of device
    :return: css name string
    """
    calling_search_space_name = None
    if location == 'NYC':
        calling_search_space_name = 'NYC_CSS'
    elif location == 'LDN':
        calling_search_space_name = 'LDN_CSS'
    elif location == 'DEL':
        calling_search_space_name = 'DEL_CSS'
    return calling_search_space_name


def get_voice_mail_profile_name(location):
    """
    Function to get voice mail profile name
    :param location: location of device
    :return: voice mail profile name string
    """
    voice_mail_profile_name = None
    if location == 'NYC':
        voice_mail_profile_name = 'NYC_VM'
    elif location == 'LDN':
        voice_mail_profile_name = 'LDN_VM'
    elif location == 'DEL':
        voice_mail_profile_name = 'DEL_VM'
    return voice_mail_profile_name


def get_phone_button_template(button_tmp, protocol):
    """
    Function to get phone button template
    :param button_tmp: template name
    :param protocol: protocol of device used
    :return: phone button template string
    """
    template = button_tmp + 'G' + ' ' + protocol
    if button_tmp == 'Standard CIPC':
        template = button_tmp+' '+protocol
    return template


def get_common_device_config_name(location):
    """
    Function to get the coomon device configuration name
    :param location: location of device
    :return: common device config name string
    """
    device_config_name = None
    if location == 'NYC':
        device_config_name = 'NYC-CDC'
    elif location == 'LDN':
        device_config_name = 'LDN-CDC'
    elif location == 'DEL':
        device_config_name = 'DEL-CDC'
    return device_config_name


def get_e164_mask(location):
    """
    Function to get the e164 mask name
    :param location: location of device
    :return: mask name string
    """
    mask = None
    if location == 'NYC':
        mask = '+12123XXXXXXX'
    elif location == 'LDN':
        mask = '+44203XXXXXXX'
    elif location == 'DEL':
        mask = '+91981XXXXXXX'
    return mask


def get_product_name(product):
    """
    Function to get product name
    :param product: product type
    :return: product name string
    """
    product_name = None
    if product == 'CIPC':
        product_name = 'Cisco IP Communicator'
    elif product in ['cisco 7962', 'Cisco 7962', '7962']:
        product_name = 'Cisco 7962'
    return product_name


# def get_UserId(fname,lname):
#     uid = lname+'.'+fname[:2:]
#     return uid


def get_temp_css(location):
    """
    Function to get the temporary css name
    :param location: location of device
    :return: temp css string
    """
    temp_css = None
    if location == 'NYC':
        temp_css = 'NYC_INT_CSS'
    elif location == 'LDN':
        temp_css = 'LDN_INT_CSS'
    elif location == 'DEL':
        temp_css = 'DEL_INT_CSS'
    return temp_css


def get_temp_line(list_of_line, location):
    """
    Function to get the temp line
    :param list_of_line: list of all lines
    :param location: location of device
    :return: phone line string
    """
    line = None
    if location == 'NYC':
        for phone_line in range(1000000, 2000001, 1):
            if str(phone_line) not in list_of_line:
                line = str(phone_line)
                break
    elif location == 'LDN':
        for phone_line in range(2000001, 3000001, 1):
            if str(phone_line) not in list_of_line:
                line = str(phone_line)
                break
    elif location == 'DEL':
        for phone_line in range(3000001, 4000001, 1):
            if str(phone_line) not in list_of_line:
                line = str(phone_line)
                break
    else:
        pass
    return line

# def get_tempLine(listofline,location):
#     if location == 'NYC':
#         for phoneline in range(1000000,2000001,1):
#             if str(phoneline) not in listofline:
#                 print(phoneline)
#                 break
#     elif location == 'LDN':
#          for phoneline in range(2000001,3000001,1):
#             if str(phoneline) not in listofline:
#                 print(phoneline)
#                 break
#     elif location == 'DEL':
#         for phoneline in range(3000001,4000001,1):
#             if str(phoneline) not in listofline:
#                 print(phoneline)
#                 break
#     else:
#         pass
#     return (str(phoneline))


# def get_devicePoolName(location):
#     if location == 'NYC':
#         devicePoolName = {'uuid':'171fddde-fdf6-06d3-8a19-6fd6294b637e'}
#         return devicePoolName
#     elif location == 'LDN':
#         devicePoolName= {'uuid':'559cdec0-ab5c-710f-3f74-c5905bd8ab08'}
#         return devicePoolName
#     elif location == 'DEL':
#         devicePoolName = {'uuid':'de71f371-5ac5-9dec-493e-26870bf9814d'}
#         return devicePoolName
#     else:
#         devicePoolName = None
#         return devicePoolName


# def get_routePartitionName(location):
#     print('location: ', location.strip())
#     print('type location: ',type(location))
#     if location == 'NYC':
#         routePartitionName = 'NYC_PTT'
#         print(routePartitionName)
#         # routePartitionName = { 'uuid':'77ff4e81-544b-8089-804d-6499ad35b777'}
#         return routePartitionName
#     elif location == 'LDN':
#         routePartitionName = 'LDN_PTT'
#         # routePartitionName = {'uuid':'fa768515-8c11-e55d-59f6-2453de5b4c77'}
#         #print(routePartitionName)
#         #print(type(routePartitionName))
#         return routePartitionName
#     elif location == 'DEL':
#         #routePartitionName = {'uuid':'3174846A-6533-614D-1523-EE97EAEDE71D'}
#         routePartitionName = 'DEL_PTT'
#         return routePartitionName
#     else:
#         return None


# def get_routePartitionUuid(location):
#     if location == 'NYC':
#         get_routePartitionUuid = { 'uuid':'1bf8d4b6-db33-27e2-9725-3ecaa937e1d6'}
#         return get_routePartitionUuid
#     elif location == 'LDN':
#         get_routePartitionUuid = {'uuid':'618693a9-1db7-6387-fa2b-1dada313797c'}
#         return get_routePartitionUuid
#     elif location == 'DEL':
#         get_routePartitionUuid = {'uuid':'7e3c7da4-c52f-b3a9-26f8-eaaa62036e10'}
#         return get_routePartitionUuid
#     else:
#         routePartitionName = ''
#         return None


# def get_cfaCssProfile(location):
#     if location == 'NYC':
#         # cfaCssProfile = {'uuid':'d479e8bf-6b33-7832-6d8f-2d96f6ee3029'}
#         cfaCssProfile = 'NYC_CSS'
#         return cfaCssProfile
#     elif location == 'LDN':
#         # cfaCssProfile = {'uuid':'b4c9b164-aa89-627f-b8b8-c5531c4791e'}
#         cfaCssProfile = 'LDN_CSS'
#         return cfaCssProfile
#     elif location == 'DEL':
#         cfaCssProfile = 'DEL_CSS'
#         # cfaCssProfile = {'uuid':'2aa73fde-7109-8561-49de-c04dc76ca137'}
#         return cfaCssProfile
#     else:
#         cfaCssProfile =  {'uuid':''}
#         return None


# def get_forwardToVoiceMail(location):
#     if location in ('NYC','LDN','DEL'):
#         return True
#     else:
#         return False


# def get_callingSearchSpaceName(location):
#     if location == 'NYC':
#         callingSearchSpaceName = 'NYC_CSS'
#         # callingSearchSpaceName = {'uuid':'d479e8bf-6b33-7832-6d8f-2d96f6ee3029'}
#         return callingSearchSpaceName
#     elif location == 'LDN':
#         callingSearchSpaceName = 'LDN_CSS'
#         # callingSearchSpaceName = {'uuid':'b4c9b164-aa89-627f-b8b8-c5531c4791ef'}
#         return callingSearchSpaceName
#     elif location == 'DEL':
#         callingSearchSpaceName = 'DEL_CSS'
#         # callingSearchSpaceName = {'uuid':'2aa73fde-7109-8561-49de-c04dc76ca137'}
#         return callingSearchSpaceName
#     else:
#         callingSearchSpaceName = {'uuid':''}
#         return None


# def get_voiceMailProfileName(location):
#     if location == 'NYC':
#         voiceMailProfileName = 'NYC_VM'
#        # voiceMailProfileName = {'uuid':'125b4cf9-e9b2-9089-54fc-852a6c1de083'}
#         return voiceMailProfileName
#     elif location == 'LDN':
#         voiceMailProfileName = 'LDN_VM'
#         #voiceMailProfileName = {'uuid':'078d00c0-4858-192b-668a-bb992e4f73c7'}
#         return voiceMailProfileName
#     elif location == 'DEL':
#         #voiceMailProfileName = {'uuid':'57f2973e-f4ec-752a-f520-333f8705d1d3'}
#         voiceMailProfileName = 'DEL_VM'
#         return voiceMailProfileName
#     else:
#         voiceMailProfileName =  {'uuid':''}
#         return None


# def get_phoneButtonTemplate(buttonTmp,protocol):
#     if buttonTmp == 'Standard CIPC':
#         template = buttonTmp+' '+protocol
#     else:
#         template = buttonTmp+'G'+' '+protocol
#     return template


# def get_commonDeviceConfigName(location):
#     if location == 'NYC':
#         cdcName= 'NYC-CDC'
#         return cdcName
#     elif location == 'LDN':
#         cdcName = 'LDN-CDC'
#         return cdcName
#     elif location == 'DEL':
#         cdcName = 'DEL-CDC'
#         return cdcName
#     else:
#         return None


# def get_e164Mask(location):
#     if location == 'NYC':
#         mask = '+12123XXXXXXX'
#         return mask
#     elif location == 'LDN':
#         mask = '+44203XXXXXXX'
#         return mask
#     elif location == 'DEL':
#         mask = '+91981XXXXXXX'
#         return mask
#     else:
#         return None

# def get_ProductName(product):
#     if product == 'CIPC':
#         productName = 'Cisco IP Communicator'
#     else:
#         productName = 'Cisco '+product
#     return(productName)

# def get_UserId(fname,lname):
#     uid = lname+'.'+fname[:2:]
#     return uid


# def get_tempCSS(location):
#     if location == 'NYC':
#         tempCss = 'NYC_INT_CSS'
#     elif location == 'LDN':
#         tempCss = 'LDN_INT_CSS'
#     elif location == 'DEL':
#         tempCss = 'DEL_INT_CSS'
#     else:
#         tempCss = None
#     return (tempCss)


# def get_tempLine(listofline,location):
#     if location == 'NYC':
#         for phoneline in range(1000000,2000001,1):
#             if str(phoneline) not in listofline:
#                 print(phoneline)
#                 break
#     elif location == 'LDN':
#          for phoneline in range(2000001,3000001,1):
#             if str(phoneline) not in listofline:
#                 print(phoneline)
#                 break
#     elif location == 'DEL':
#         for phoneline in range(3000001,4000001,1):
#             if str(phoneline) not in listofline:
#                 print(phoneline)
#                 break
#     else:
#         pass
#     return (str(phoneline))
