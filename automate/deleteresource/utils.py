"""
This module contains utility functions for deleting resources
"""

from zeep.exceptions import Fault
from ..projectconfig.connection import create_sess
from ..projectconfig import common_config as cfg
from ..exception import get_cucm_error_message

service = create_sess()


def get_phone_data(mac):
    """
    Function to get the phone data
    :param mac: mac address of phone
    :return: tuple of boolean and string
    """
    try:
        cfg.logger.info("{} {} Getting phone {} data from cucm".format(cfg.username, cfg.ipaddress, mac))
        phone_data = service.getPhone(name=mac, returnedTags={'lines': {'line': {
            'dirn': {'pattern': True, 'routePartitionName': True}}}})
        if phone_data['return']['phone']['lines'] is not None:
            pattern = phone_data['return']['phone']['lines']['line'][0]['dirn']['pattern']
            # pylint: disable=C0301
            route_partition_name = phone_data['return']['phone']['lines']['line'][0]['dirn']['routePartitionName']['_value_1']
            cfg.logger.info("{} {} Captured phone {} data from cucm successfully".format(cfg.username, cfg.ipaddress, mac))
        else:
            pattern = None
            route_partition_name = None
            cfg.logger.info("{} {} No data found".format(cfg.username, cfg.ipaddress))
        return True, pattern, route_partition_name
    except Fault as error:
        msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return False, msg


def remove_dn(directory_number, route_partition_name):
    """
    Function to remove directory number
    :param directory_number: directory number
    :param route_partition_name: route partition name
    :return: Boolean and string error message
    """
    try:
        cfg.logger.info("{} {} Removing directory number {}".format(cfg.username, cfg.ipaddress, directory_number))
        service.removeLine(pattern=directory_number, routePartitionName=route_partition_name)
        cfg.logger.info("{} {} Directory number {} removed successfully".format(cfg.username, cfg.ipaddress, directory_number))
        return True
    except Fault as error:
        msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return False, msg


def remove_phone(mac):
    """
    Function to remove phone
    :param mac: mac address of phone
    :return: Boolean and string error message
    """
    try:
        cfg.logger.info("{} {} Removing phone {} from cucm".format(cfg.username, cfg.ipaddress, mac))
        service.removePhone(name=mac)
        cfg.logger.info("{} {} Phone {} removed from cucm successfully".format(cfg.username, cfg.ipaddress, mac))
        return True
    except Fault as error:
        msg = get_cucm_error_message(error)
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return False, msg
