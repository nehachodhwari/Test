import requests
import xml.etree.ElementTree as ET
import random
import json
from ..projectconfig import common_config as cfg
import xmltodict
import json

def get_CUCUser(userid):
    url = "https://172.17.120.32/vmrest/users"
    querystring = {"query": "(alias startswith "+userid+")"}
    headers = {
        'connection': "keep-alive"
        }
    try:
        cfg.logger.info("{} {} Getting CUC user {} details".format(cfg.username, cfg.ipaddress, userid))
        response = requests.request("GET", url, headers=headers, params=querystring,verify=False, auth=(cfg.CISCO_UNITY_CONNECTION_CRED['username'],cfg.CISCO_UNITY_CONNECTION_CRED['password']))
        text_resp = response.text
        print(text_resp)
        if response.status_code == 200:
            text_resp = response.text
            root = ET.fromstring(text_resp)
            msg = [False, "User not found"]
            user_list = root.findall('User')
            print(user_list)
            for user in root.findall('User'):
                alias = user.find('Alias').text
                if str(alias).lower() == str(userid).lower():
                    object_id = user.find('ObjectId').text
                    # user.find('IsVmEnrolled').text
                    cfg.logger.info(
                        "{} {} User {} details captured successfully".format(cfg.username, cfg.ipaddress, userid))
                    msg = [True, str(object_id)]
                    break
            return msg
        else:
            return [False, "User does not exist"]
    except Exception as error:
        print("Connection Error")
        return [False, str(error)]


def get_Object_Id(userid):
    getUserDetails = get_CUCUser(userid)
    if getUserDetails[0]:
        return [True, str(getUserDetails[1])]
    else:
        return [False, "User not found"]


def remove_unity_user(userid):
    object_id = get_Object_Id(userid)
    if object_id[0]:
        url = "https://172.17.120.32/vmrest/users/"+object_id[1]
        headers = {
            'connection': "keep-alive"
        }

        try:
            cfg.logger.info("{} {} Removing CUC user {} details".format(cfg.username, cfg.ipaddress, userid))
            response = requests.request("DELETE", url, headers=headers, verify=False, auth=(cfg.CISCO_UNITY_CONNECTION_CRED['username'],cfg.CISCO_UNITY_CONNECTION_CRED['password']))
            cfg.logger.info("{} {} CUC user {} details are removed successfully".format(cfg.username, cfg.ipaddress, userid))
            print(response.status_code)
            return [True, response.status_code]
        except:
            print("Exception")
            return [False, response.status_code]
    else:
        return [False, object_id[1]]

