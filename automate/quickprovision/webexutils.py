"""
This module contains utility functions for webex
"""

import json
import requests
import os.path
from ..quickprovision import config



def list_web_ex_user(f_name, l_name, email):
    """
    Function to list the webex user
    :param f_name: First name of user
    :param l_name: last name of user
    :param email: email of user
    :return: List of boolean and string value
    """
    try:
        url = "https://webexapis.com/v1/people"
        payload = {}
        access_token = update_access_token()
        if access_token[1]:
            headers = {
              'Authorization': 'Bearer '+access_token[0]
            }
            response = requests.request("GET", url, headers=headers, data=payload, verify=False)
            if response.status_code == 200:
                resp = response.json()
                user_list = resp['items']
                for user in user_list:
                    if email in user['emails']:
                        if user['firstName'] == f_name and user['lastName'] == l_name:
                            return user, True
            elif response.status_code == 401:
                return "Invalid access token", False
            else:
                return "Internal server error", False
        else:
            return access_token[0], False
    except Exception as error:
        return "Internal server error", False


def update_web_ex_user(data):
    """
    Function to upadte a webex user
    :param data: dictionary of data
    :return: Boolean
    """
    try:
        license_code_first = "Y2lzY29zcGFyazovL3VzL0xJQ0VOU0UvMTY1OTU4OWMtMWMyYi00OGZlLWI4MGQtMGNiO" \
                             "TgyMzZlMWQ5OkNGXzQ1M2RhYWU0LTk4Y2MtNDEyOC1iMmEwLWMxMWEzYzAzMDU3Ng"
        license_code_second = "Y2lzY29zcGFyazovL3VzL0xJQ0VOU0UvMTY1OTU4OWMtMWMyYi00OGZlLWI4MGQtMGNi" \
                              "OTgyMzZlMWQ5Ok1TXzkxYmFmZTEyLWFmMmItNDVlMy05ZmU2LTk2ZjE5OTgzZWYzYg"
        url = "https://webexapis.com/v1/people/"+data['id']
        data['licenses'].append(license_code_first)
        data['licenses'].append(license_code_second)
        try:
            del data['created']
            del data['lastModified']
        except KeyError as err:
            return "Internal server error", False
        access_token = update_access_token()
        if access_token[1]:
            payload = json.dumps(data)
            headers = {
                'Authorization': 'Bearer '+access_token[0],
                'Content-Type': 'application/json'
            }
            response = requests.request("PUT", url, headers=headers, data=payload, verify=False)
            if response.status_code == 200:   # pylint: disable=R1703
                return "Success", True
            elif response.status_code == 401:
                return "Access token not valid", False
            else:
                return "Internal server error", False
        else:
            return access_token[0], False
    except Exception as error:
        return "Internal server error", False


def update_access_token():
    """Gets access token and refresh token"""
    try:
        url = "https://webexapis.com/v1/access_token"
        headers = {'accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'}
        path = os.path.realpath('automate/quickprovision')
        with open(os.path.join(path, 'tokens.txt'), 'r+') as token_file:
            refresh_token = token_file.readlines()[1].split(':')[1].strip("\n").strip("\\ ''")
            payload = ("grant_type=refresh_token&client_id={0}&client_secret={1}&refresh_token={2}").format(config.CLIENT_ID, config.SECRET_ID, refresh_token)
            req = requests.post(url=url, data=payload, headers=headers)
            if req.status_code == 200:
                token_file.seek(0)
                token_file.truncate()
                results = json.loads(req.text)
                token_file.write("Access_Token:{0}\n".format(results["access_token"]))
                token_file.write("Refresh_Token:{0}\n".format(results["refresh_token"]))
                access_token = results["access_token"]
                return access_token, True
            elif req.status_code == 400:
                return "Invalid refresh token", False
            else:
                return "Internal server error", False
    except Exception as error:
        return "Internal server error", False
