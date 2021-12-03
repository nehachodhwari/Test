"""
This module contains utility functions for microsoft resource creation
"""

from ..projectconfig.connection import create_ps_conn
from ..projectconfig import common_config as cfg
from ..exception import get_cucm_error_message

client = create_ps_conn()


def add_new_user_ad(data):  # pylint: disable=R0914
    """
    Function for adding new user to active directory
    :param data: dictionary of data
    :return: tuple of string messages
    """
    name = data['user_id']
    given_name = data['name_first']
    surname = data['name_last']
    display_name = data['name_first']
    user_principal_name = name + '@nxtgenuc.com'
    mobile_phone = data['mobile']
    fax = data['fax']
    company = data['company']
    department = data['department']
    city = data['city']
    # pylint: disable=C0301
    script = """New-ADUser -Name """ + "\"" + name + "\"" + """ -GivenName """ + "\"" + given_name + "\"" + """ -Surname """ + "\"" + surname + "\"" + """ -DisplayName """ + "\"" + display_name + "\"" + """ -ChangePasswordAtLogon $true -samaccountname """ + "\"" + name + "\"" + """ -UserPrincipalName """ + "\"" + user_principal_name + "\"" + """ -AccountPassword (ConvertTo-SecureString -AsPlainText "Practice@123" -Force) -Enabled $true -MobilePhone """ + "\"" + mobile_phone + "\"" + """ -Fax """ + "\"" + fax + "\"" + """ -Company """ + "\"" + company + "\"" + """ -City """ + "\"" + city + "\"" + """ -Department """ + "\"" + department + "\""
    try:
        cfg.logger.info("{} {} Adding new user {} to active directory".format(cfg.username, cfg.ipaddress, name))
        output, streams, had_errors = client.execute_ps(script)
        if not had_errors:
            result = output
            cfg.logger.info("{} {} New user {} added to active directory successfully".format(cfg.username, cfg.ipaddress, name))
            res_display = "Task Successful"
        else:
            result = ("\n".join([str(stream) for stream in streams.error]))
            res_display = "Task Failed"
            cfg.logger.warning("{} {} Adding new user {} to active directory is failed".format(cfg.username, cfg.ipaddress, name))
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, result))
        return result, res_display
    except Exception as error:  # pylint: disable=W0703
        msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        res_display = "Exception"
    return msg, res_display


def get_ad_user(data):
    """
    Function to get active directory user
    :param data:
    :return:
    """
    script = """Get-ADUser -Identity """+"\""+data+"\""
    try:
        cfg.logger.info("{} {} Getting user {} details from active directory".format(cfg.username, cfg.ipaddress, data))
        output, streams, had_errors = client.execute_ps(script)
        if not had_errors:
            cfg.logger.info("{} {} User {} details are captured from active directory".format(cfg.username, cfg.ipaddress, data))
            result = output
            msg = True
        else:
            result = ("ERROR:\n%s" % "\n".join([str(stream) for stream in streams.error]))
            cfg.logger.warning(
                "{} {} Getting user {} details from active directory failed".format(cfg.username, cfg.ipaddress, data))
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, result))
            if "Cannot find an object with identity" in result:
                result = "The specified User was not found in active directory"
                msg = False
        return result, msg
    except Exception as error:  # pylint: disable=W0703
        msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
    return msg


def mylist_to_dict(mylist):
    """
    Function to convert list to dictionary
    :param mylist: list to be converted
    :return: dictionary
    """
    return dict(map(lambda s: s.split(':'), mylist))
