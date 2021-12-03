"""
This module contains utility functions for unity connection
"""

import json
import random
import xml.etree.ElementTree as ET
import requests
from ..projectconfig import common_config as cfg

def get_cuc_user(user_id):
    """
    Function to find cuc user
    :param user_id: user id of user
    :return: string object id or error
    """
    url = "https://{}/vmrest/users".format(cfg.CISCO_UNITY_CONNECTION_CRED['host'])
    querystring = {"query": "(alias startswith "+user_id+")"}
    headers = {'connection': "keep-alive"}
    try:
        cfg.logger.info("{} {} Getting CUC user {} details".format(cfg.username, cfg.ipaddress, user_id))
        response = requests.request("GET", url, headers=headers, params=querystring,
                                    verify=False, auth=(cfg.CISCO_UNITY_CONNECTION_CRED['username'], cfg.CISCO_UNITY_CONNECTION_CRED['password']))
        if response.status_code in [401, 403]:
            cfg.logger.error("{} {} Authentication failed/Either Unity connection is requesting for password change".format(cfg.username, cfg.ipaddress))
            return ["Authentication failed", False]
        elif response.status_code == 200:
            text_resp = response.text
            root = ET.fromstring(text_resp)
            for user in root.findall('User'):
                alias = user.find('Alias').text
                if str(alias) == user_id:
                    object_id = user.find('ObjectId').text
                    # user.find('IsVmEnrolled').text
                    cfg.logger.info("{} {} User {} details captured successfully".format(cfg.username, cfg.ipaddress, user_id))
                    return [str(object_id), True]
        elif response.status_code == 404:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            return ["Url not valid", False]
        else:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            return ["Internal server error", False]
    except Exception as error:  # pylint: disable=W0703
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return ["Internal server error", False]


def get_object_id(user_id):
    """
    Function to get object id of user
    :param user_id: user id of user
    :return: string object id
    """
    get_user_details = get_cuc_user(user_id)
    return str(get_user_details[0])


def find_user_in_import_section(user_id):
    """
    Function to find users in import section
    :param user_id: user id of user
    :return: string message
    """
    url = "https://{}/vmrest/import/users/ldap".format(cfg.CISCO_UNITY_CONNECTION_CRED['host'])
    querystring = {"query": "(alias startswith "+user_id+")"}
    headers = {'connection': "keep-alive", 'content-type': "application/json"}
    try:
        cfg.logger.info("{} {} Finding user {} in import section".format(cfg.username, cfg.ipaddress, user_id))
        response = requests.request("GET", url, headers=headers, params=querystring,
                                    verify=False, auth=(cfg.CISCO_UNITY_CONNECTION_CRED['username'], cfg.CISCO_UNITY_CONNECTION_CRED['password']))
        if response.status_code in [401, 403]:
            cfg.logger.error("{} {} Authentication failed/Either Unity connection is requesting for password change".format(cfg.username, cfg.ipaddress))
            return [False, "Authentication failed"]
        elif response.status_code == 200:
            text_resp = response.text
            root = ET.fromstring(text_resp)
            for import_user in root.findall('ImportUser'):
                alias = import_user.find('alias').text
                if str(alias) == user_id:
                    pk_id = import_user.find('pkid').text
                    first_name = import_user.find('firstName').text
                    last_name = import_user.find('lastName').text
                    cfg.logger.info("{} {} User {} details captured".format(cfg.username, cfg.ipaddress, user_id))
                    return [True, pk_id, alias, first_name, last_name]
                # cfg.logger.warning("{} {} User {} not found".format(cfg.username, cfg.ipaddress, user_id))
                # return None
        elif response.status_code == 404:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            return [False, "Url not valid"]
        else:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            return [False, "Internal server error"]
    except Exception as error:  # pylint: disable=W0703
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return [False, "Internal server error"]

def get_import_user_details(user_id):
    """
    Function to get imported user details
    :param user_id: user id of user
    :return: string of data
    """
    user_details = find_user_in_import_section(user_id)
    return str(user_details[1]), str(user_details[2]) ,str(user_details[3]), str(user_details[4])


def import_ldap_user_with_vm_enabled(user_id):
    """
    Function to import ad users with vm enabled
    :param user_id: user id of user
    :return: status code or exception string
    """
    user_details = get_import_user_details(user_id)
    alias = user_details[1]
    first_name = user_details[2]
    last_name = user_details[3]
    pk_id = user_details[0]
    payload = {"alias": alias, "firstName": first_name, "lastName": last_name, "pkid": pk_id}
    # querystring = {"templateAlias":"voicemailusertemplate"}
    try:
        cfg.logger.info("{} {} Validating LDAP user {} with voice mail enabled".format(cfg.username, cfg.ipaddress, user_id))
        url = "https://{}/vmrest/import/users/ldap?templateAlias=voicemailusertemplate".format(cfg.CISCO_UNITY_CONNECTION_CRED['host'])
        headers = {'content-type': "application/json", 'connection': "keep-alive"}
        pay_json = json.dumps(payload)
        response = requests.request("POST", url, data=pay_json, headers=headers, verify=False,
                                    auth=(cfg.CISCO_UNITY_CONNECTION_CRED['username'], cfg.CISCO_UNITY_CONNECTION_CRED['password']))
        if response.status_code in [401, 403]:
            cfg.logger.error("{} {} Authentication failed/Either Unity connection is requesting for password change".format(cfg.username, cfg.ipaddress))
            return ["Authentication failed", False]
        elif response.status_code == 201:
            cfg.logger.info(
                "{} {} LDAP user {} with voice mail already enabled".format(cfg.username, cfg.ipaddress, user_id))
            return [response.status_code, True]
        elif response.status_code == 404:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            return ["Url not valid", False]
        elif response.status_code == 400:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            if "Value of table tbl_DtmfAccessId column DtmfAccessId is invalid." in response.text:
                return ["Extension is not associated with this user", False]
            else:
                return ["Internal server error", False]
        else:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            return ["Internal server error", False]
    except Exception as error:  # pylint: disable=W0703
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return ["Internal server error", False]

def reset_voicemail_pin(user_id):
    """
    Helper Function for other modules to reset voice mail pin
    :param user_id: user id of user
    :return: pin and status code or error
    """
    user_object_id = get_object_id(user_id)
    url = "https://{}/vmrest/users/{}/credential/pin".format(cfg.CISCO_UNITY_CONNECTION_CRED['host'], user_object_id)
    pin = str(random.randrange(100000, 999999))
    json_pay = json.dumps({"Credentials": pin})
    headers = {'content-type': "application/json", 'connection': "keep-alive"}
    try:
        cfg.logger.info("{} {} Resetting voice mail pin for the user {}".format(cfg.username, cfg.ipaddress, user_id))
        response = requests.request("PUT", url, data=json_pay, headers=headers, verify=False,
                                    auth=(cfg.CISCO_UNITY_CONNECTION_CRED['username'], cfg.CISCO_UNITY_CONNECTION_CRED['password']))
        if response.status_code == 401:
            cfg.logger.error("{} {} Authentication failed/Either Unity connection is requesting for password change".format(cfg.username, cfg.ipaddress))
            msg = [False, "Authentication failed"]
        elif response.status_code == 204:
            cfg.logger.info("{} {} Voice mail pin reset successful for the user {}".format(cfg.username, cfg.ipaddress, user_id))
            msg = [True, pin, response.status_code]
        elif response.status_code == 403:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            msg = [False, "Url not valid"]
        elif response.status_code == 404:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            msg = [False, "User {} was not found".format(user_id)]
        else:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, response.text))
            msg = [False, "Internal server error"]
    except Exception as error:  # pylint: disable=W0703
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        msg = [False, "Internal server error"]
    return msg
