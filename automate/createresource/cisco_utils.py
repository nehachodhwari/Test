"""
Utility files for cisco use case for creation of resources
"""

import json
from zeep.exceptions import Fault
from zeep.helpers import serialize_object
from ..projectconfig.connection import create_sess
from ..projectconfig import common_config as cfg
from ..exception import get_cucm_error_message


service = create_sess()


def add_user(f_name, l_name, user_id, password, department):
    """
    Function to add a user
    :param f_name: first name of user
    :param l_name: last name of user
    :param user_id: user id of user
    :param password: password of user
    :param department: department of user
    :return: Boolean of success else error
    """
    try:
        cfg.logger.info("{} {} Adding user {} to cucm".format(cfg.username, cfg.ipaddress, user_id))
        service.addUser(user={'firstName': f_name, 'lastName': l_name,
                              'userid': user_id, 'password': password,
                              'presenceGroupName': 'Standard Presence Group',
                              'department': department
                              })
        cfg.logger.info("{} {} User {} added to cucm successfully".format(cfg.username, cfg.ipaddress, user_id))
        return True, "Success"
    except Fault as error:
        msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return False, msg


def get_cucm_user(userid):
    """
    Function to get cucm user
    :param userid: user id of user
    :return: list of boolean and string output
    """
    try:
        cfg.logger.info("{} {} Getting cucm user {} details".format(cfg.username, cfg.ipaddress, userid))
        list_of_user = service.getUser(userid=userid, returnedTags={'firstName': True,
                                       'middleName': True, 'lastName': True, 'userid': True,
                                       'mailid': True, 'manager': True, 'department': True,
                                       'userIdentity': True, 'primaryExtension': {'pattern': True},
                                       'associatedDevices': {'device': True},
                                        'telephoneNumber': True, 'phoneProfiles':
                                                                        {'profileName': True}})
        result = list_of_user
        input_data = serialize_object(result)
        output_data = json.loads(json.dumps(input_data))
        data = output_data['return']['user']
        resp_data = clean_null_terms(data)
        try:
            del resp_data["uuid"]
        except KeyError:
            pass
        for key, value in resp_data.items():
            if isinstance(value, dict):
                resp_data[key] = list(value.values())[0]
        for key, value in resp_data.items():
            if isinstance(value, list):
                for data in value:
                    if isinstance(data, dict):
                        new_val = list(data.values())[0]
                        resp_data[key] = new_val
                    else:
                        resp_data[key] = data
        output_user_data = dict((key.upper(), value) for key, value in resp_data.items())
        cfg.logger.info("{} {} Cucm user {} details are captured successfully".format(cfg.username, cfg.ipaddress, userid))
        return [True, output_user_data]
    except Fault as error:
        msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return [False, msg]


def clean_null_terms(data_dict):
    """
    Function to clean the data
    :param data_dict: data dictionary
    :return: cleaned data
    """
    clean = {}
    for key, value in data_dict.items():
        if isinstance(value, dict):
            nested = clean_null_terms(value)
            if len(nested.keys()) > 0:
                clean[key] = nested
        elif value is not None:
            clean[key] = value
    return clean
