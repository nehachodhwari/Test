"""
This module contains utility functions for zoom.
"""
import json
import requests
from ..projectconfig import common_config as cfg
import os.path


def enable_zoom(f_name, l_name, email):
    """
    Function to enable zoom service for user
    :param f_name: First name of user
    :param l_name: Last name of user
    :return: Boolean or string text
    """
    try:
        url = "https://api.zoom.us/v2/users"
        payload = json.dumps({"action": "create", "user_info": {"email": email,
                                                                "type": 1, "first_name": f_name,
                                                                "last_name": l_name}})
        token = get_refreshed_access_token()
        if token[1]:
            headers = {'Content-Type': 'application/json',
                       'Authorization': 'bearer ' + token[0],
                       'EyqIbwwrTCCMrG9NXOcnug': token[0]}
            cfg.logger.info("{} {} Enabling zoom service to the user {} {}".format(cfg.username, cfg.ipaddress, f_name, l_name))
            response = requests.request("POST", url, headers=headers, data=payload)
            if response.status_code == 201:
                cfg.logger.info("{} {} Zoom service enabled to the user {} {}".format(cfg.username, cfg.ipaddress, f_name, l_name))
                return "Success", True
            elif response.status_code == 401:
                cfg.logger.error(
                    "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, response.text))
                return "Access token invalid", False
            else:
                cfg.logger.error(
                    "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, response.text))
                return "Internal server error", False
        else:
            cfg.logger.error(
                "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, token[0]))
            return token[0], False
    except Exception as error:
        cfg.logger.error(
            "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, error))
        return "Internal server error", False


def get_refreshed_access_token():
    try:
        cfg.logger.info(
            "{} {} Getting zoom acccess token using refresh token".format(cfg.username, cfg.ipaddress))
        url = "https://zoom.us/oauth/token"
        # Authorization code is created by base64 encoding Client_ID:Client_Secret
        headers = {'Authorization': 'Basic SFVRTUoyZkVRWHVncE1xRldHY3F3dzphUTlONWc3NDI1TjkzNDNmTktYQVQ1c3JtUDhDQzNoTQ=='}
        path = os.path.realpath('automate/quickprovision')
        with open(os.path.join(path, 'zoom_tokens.txt'), 'r+') as token_data:
            refresh_token = token_data.readlines()[0].split(':')[1]
            payload = {'grant_type': 'refresh_token', 'refresh_token': refresh_token}
            output = requests.request("POST", url, headers=headers, params=payload)
            if output.status_code == 200:
                if json.loads(output.text)['access_token']:
                    data = json.loads(output.text)
                    zoom_access_token = data['access_token']
                    print(zoom_access_token)
                    zoom_refresh_token = data['refresh_token']
                    print(zoom_refresh_token)
                    token_data.seek(0)
                    token_data.truncate()
                    token_data.write("Refresh_Token:{0}".format(zoom_refresh_token))
                    cfg.logger.info(
                        "{} {} Zoom acccess token captured successfully using refresh token".format(cfg.username, cfg.ipaddress))
                    return zoom_access_token, True
                else:
                    cfg.logger.error(
                        "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
                    return "Authorization code not valid", False
            elif output.status_code == 401:
                cfg.logger.error(
                    "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
                return "Refresh token not valid", False
            else:
                cfg.logger.error(
                    "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
                return "Internal server error", False
    except Exception as error:
        cfg.logger.error(
            "{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return "Internal server error", False


def disable_zoom(email):
    """
    Function to enable zoom service for user
    :param email: email of user
    :return: Boolean or string text
    """
    try:
        url = "https://api.zoom.us/v2/users/"+str(email)
        payload = json.dumps({"action": "delete",
                              "transfer_email": "amlesh.sengar@hcl.com",
                              "transfer_meeting": "true",
                              "transfer_webinar": "true",
                              "transfer_recording": "true"
                              })
        token = get_refreshed_access_token()
        if token[1]:
            headers = {'Content-Type': 'application/json',
                       'Authorization': 'bearer ' + token[0],
                       'EyqIbwwrTCCMrG9NXOcnug': token[0]}
            # cfg.logger.info("{} {} Enabling zoom service to the user {} {}".format(cfg.username, cfg.ipaddress))
            response = requests.request("DELETE", url, headers=headers, data=payload)
            print(response.text)
            print(response.status_code)
            if response.status_code == 204:
                cfg.logger.info("{} {} Zoom service disabled to the user {} {}".format(cfg.username, cfg.ipaddress, f_name, l_name))
                return "Success", True
            elif response.status_code == 401:
                cfg.logger.error(
                    "{} {} Disabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, response.text))
                return "Access token invalid", False
            else:
                cfg.logger.error(
                    "{} {} Disabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, response.text))
                return "Internal server error", False
        else:
            cfg.logger.error(
                "{} {} Disabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, token[0]))
            return token[0], False
    except Exception as error:
        cfg.logger.error(
            "{} {} Disabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, error))
        return "Internal server error", False


def get_zoom_user(email):
    """
    Function get user from zoom
    """
    try:
        url = "https://api.zoom.us/v2/users/" + str(email)
        payload = json.dumps({"login_type": "100"})
        token = get_refreshed_access_token()
        if token[1]:
            headers = {'Content-Type': 'application/json',
                       'Authorization': 'bearer ' + token[0],
                       'EyqIbwwrTCCMrG9NXOcnug': token[0]}
            # cfg.logger.info("{} {} Enabling zoom service to the user {} {}".format(cfg.username, cfg.ipaddress))
            response = requests.request("GET", url, headers=headers, data=payload)
            print(response.text)
            print(response.status_code)
            if response.status_code == 200:
                return "Success", True
            elif response.status_code == 401:
                cfg.logger.error(
                    "{} {} Get zoom user service failed due to : {}".format(cfg.username, cfg.ipaddress,
                                                                             response.text))
                return "Access token invalid", False
            elif response.status_code == 404:
                cfg.logger.error(
                    "{} {} Get zoom user service failed due to : {}".format(cfg.username, cfg.ipaddress,
                                                                            response.text))
                return "User does not exist", False
            else:
                cfg.logger.error(
                    "{} {} Get zoom user service failed due to : {}".format(cfg.username, cfg.ipaddress,
                                                                             response.text))
                return "Internal server error", False
        else:
            cfg.logger.error(
                "{} {} Get  zoom user service failed due to : {}".format(cfg.username, cfg.ipaddress, token[0]))
            return token[0], False
    except Exception as error:
        cfg.logger.error(
            "{} {} Get zoom user service failed due to : {}".format(cfg.username, cfg.ipaddress, error))
        return "Internal server error", False

# """
# This module contains utility functions for zoom.
# """

# import json
# import requests
# from ..projectconfig import common_config as cfg
# import os.path
#
# def enable_zoom(f_name, l_name, email):
#     """
#     Function to enable zoom service for user
#     :param f_name: First name of user
#     :param l_name: Last name of user
#     :return: Boolean or string text
#     """
#     try:
#         url = "https://api.zoom.us/v2/users"
#         payload = json.dumps({"action": "create", "user_info": {"email": email,
#                                                                 "type": 1, "first_name": f_name,
#                                                                 "last_name": l_name}})
#         token = get_refreshed_access_token()
#         if token[1]:
#             headers = {'Content-Type': 'application/json',
#                        'Authorization': 'bearer ' + token[0],
#                        'EyqIbwwrTCCMrG9NXOcnug': token[0]}
#             cfg.logger.info("{} {} Enabling zoom service to the user {} {}".format(cfg.username, cfg.ipaddress, f_name, l_name))
#             response = requests.request("POST", url, headers=headers, data=payload)
#             if response.status_code == 201:
#                 cfg.logger.info("{} {} Zoom service enabled to the user {} {}".format(cfg.username, cfg.ipaddress, f_name, l_name))
#                 return "Success", True
#             elif response.status_code == 401:
#                 cfg.logger.error(
#                     "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, response.text))
#                 return "Access token invalid", False
#             else:
#                 cfg.logger.error(
#                     "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, response.text))
#                 return "Internal server error", False
#         else:
#             cfg.logger.error(
#                 "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, token[0]))
#             return token[0], False
#     except Exception as error:
#         cfg.logger.error(
#             "{} {} Enabling zoom service failed due to : {}".format(cfg.username, cfg.ipaddress, error))
#         return "Internal server error", False
#
#
# def get_refreshed_access_token():
#     try:
#         cfg.logger.info(
#             "{} {} Getting zoom acccess token using refresh token".format(cfg.username, cfg.ipaddress))
#         url = "https://zoom.us/oauth/token"
#         # Authorization code is created by base64 encoding Client_ID:Client_Secret
#         headers = {'Authorization': 'Basic SFVRTUoyZkVRWHVncE1xRldHY3F3dzphUTlONWc3NDI1TjkzNDNmTktYQVQ1c3JtUDhDQzNoTQ=='}
#         path = os.path.realpath('automate/quickprovision')
#         with open(os.path.join(path, 'zoom_tokens.txt'), 'r+') as token_data:
#             refresh_token = token_data.readlines()[0].split(':')[1]
#             payload = {'grant_type': 'refresh_token', 'refresh_token': refresh_token}
#             output = requests.request("POST", url, headers=headers, params=payload)
#             if output.status_code == 200:
#                 if json.loads(output.text)['access_token']:
#                     data = json.loads(output.text)
#                     zoom_access_token = data['access_token']
#                     zoom_refresh_token = data['refresh_token']
#                     token_data.seek(0)
#                     token_data.truncate()
#                     token_data.write("Refresh_Token:{0}".format(zoom_refresh_token))
#                     cfg.logger.info(
#                         "{} {} Zoom acccess token captured successfully using refresh token".format(cfg.username, cfg.ipaddress))
#                     return zoom_access_token, True
#                 else:
#                     cfg.logger.error(
#                         "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
#                     return "Authorization code not valid", False
#             elif output.status_code == 401:
#                 cfg.logger.error(
#                     "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
#                 return "Refresh token not valid", False
#             else:
#                 cfg.logger.error(
#                     "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
#                 return "Internal server error", False
#     except Exception as error:
#         cfg.logger.error(
#             "{} {} {}".format(cfg.username, cfg.ipaddress, error))
#         return "Internal server error", False
#
#
#
# def get_refreshed_access_token():
#     try:
#         cfg.logger.info(
#             "{} {} Getting zoom acccess token using refresh token".format(cfg.username, cfg.ipaddress))
#         url = "https://zoom.us/oauth/token"
#         # Authorization code is created by base64 encoding Client_ID:Client_Secret
#         headers = {
#             'Authorization': 'Basic SFVRTUoyZkVRWHVncE1xRldHY3F3dzphUTlONWc3NDI1TjkzNDNmTktYQVQ1c3JtUDhDQzNoTQ=='}
#         path = os.path.realpath('automate/quickprovision')
#         with open(os.path.join(path, 'zoom_tokens.txt'), 'r+') as token_data:
#             refresh_token = token_data.readlines()[0].split(':')[1]
#             payload = {'grant_type': 'refresh_token', 'refresh_token': refresh_token}
#             output = requests.request("POST", url, headers=headers, params=payload)
#             if output.status_code == 200:
#                 if json.loads(output.text)['access_token']:
#                     data = json.loads(output.text)
#                     zoom_access_token = data['access_token']
#                     zoom_refresh_token = data['refresh_token']
#                     token_data.seek(0)
#                     token_data.truncate()
#                     token_data.write("Refresh_Token:{0}".format(zoom_refresh_token))
#                     cfg.logger.info(
#                         "{} {} Zoom acccess token captured successfully using refresh token".format(cfg.username,
#                                                                                                     cfg.ipaddress))
#                     return zoom_access_token, True
#                 else:
#                     cfg.logger.error(
#                         "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
#                     return "Authorization code not valid", False
#             elif output.status_code == 401:
#                 cfg.logger.error(
#                     "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
#                 return "Refresh token not valid", False
#             else:
#                 cfg.logger.error(
#                     "{} {} {}".format(cfg.username, cfg.ipaddress, output.text))
#                 return "Internal server error", False
#     except Exception as error:
#         cfg.logger.error(
#             "{} {} {}".format(cfg.username, cfg.ipaddress, error))
#         return "Internal server error", False
#
#
# # def get_refreshed_access_token():
# #     url = "https://zoom.us/oauth/token"
# #     # Authorization code is created by base64 encoding Client_ID:Client_Secret
# #     headers = {'Authorization': 'Basic SU8ycjVmUG1TaGFtcHBQX0w4U2kwdzpvaXA0aFg1ek5WaUZNenFmRjBaN08xUXBmVzVSWFBvaQ=='}
# #     with open('zoom_tokens.txt', 'r+') as token_data:
# #         refresh_token = token_data.readlines()[0].split(':')[1]
# #         payload = {'grant_type': 'refresh_token', 'refresh_token': refresh_token}
# #         output = requests.request("POST", url, headers=headers, params=payload)
# #         data = json.loads(output.text)
# #         zoom_access_token = data['access_token']
# #         zoom_refresh_token = data['refresh_token']
# #         token_data.seek(0)
# #         token_data.truncate()
# #         token_data.write("Refresh_Token:{0}".format(zoom_refresh_token))
# #     return zoom_access_token