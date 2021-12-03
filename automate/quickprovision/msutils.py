"""
This module contains utility functions for microsoft operations.
"""
import msal as msal
import pycountry as pycountry
import requests
from ..app import db
from ..models.models import LocationMapping

from automate.models.models import LocationMapping
from ..projectconfig import common_config as cfg

def enable_ms_teams(userid, location):
    """
    Function to enable ms teams for a user
    :param userid: user if of user
    :param location: location of user
    :return: Boolean if success else exception
    """
    results = None
    user_id = str(userid)+'@nxtgenuc.com'
    mapped_location = db.session.query(LocationMapping.Country).filter(
        LocationMapping.SiteCode == location).first().Country
    country_code = pycountry.countries.get(name=mapped_location).alpha_2
    request_headers = msgraph_auth()
    body = {
        "usageLocation": country_code
    }
    graphURI = 'https://graph.microsoft.com'
    resource = graphURI + '/v1.0/users/' + user_id
    try:
        requests.patch(resource, json=body, headers=request_headers)
        assign_ms_teams_license(user_id)
    except Exception as error:
        return ["Error", False]
    return ["Success", True]


def assign_ms_teams_license(userid):
    """
    Function to assign license to ms teams
    :param userid: user id of user for whom ms teams needs to be assigned
    :return: Boolean if success else exception
    """
    results = None
    request_headers = msgraph_auth()
    body = {
        "addLicenses": [
            {
                "disabledPlans": [],
                "skuId": "cd2925a3-5076-4233-8931-638a8c94f773"
                }
        ],
        "removeLicenses": []
        }
    graphURI = 'https://graph.microsoft.com'
    resource = graphURI + '/v1.0/users/' + str(userid) + '/assignLicense'
    try:
        results = requests.post(resource, json=body, headers=request_headers)
        print(results)
    except Exception as error:
        print(error)
    return results



def msgraph_auth():
    requestHeaders = None
    tenantID = 'f94fdb9a-ddf7-4aa2-b2e5-a7c6aeabcd7a'
    authority = 'https://login.microsoftonline.com/' + tenantID
    clientID = 'eab5d9d0-53cd-445d-8ed6-bb83a47fcd01'
    clientSecret = 'ZIVR9cl~-1.HaWTAr-qFC7wn5RV7.293cg'
    scope = ['https://graph.microsoft.com/.default']

    app = msal.ConfidentialClientApplication(clientID, authority=authority, client_credential=clientSecret)

    try:
        accessToken = app.acquire_token_silent(scope, account=None)
        if not accessToken:
            try:
                accessToken = app.acquire_token_for_client(scopes=scope)
                if accessToken['access_token']:
                    requestHeaders = {'Authorization': 'Bearer ' + accessToken['access_token']}
                else:
                    return 'Error aquiring authorization token. Check your tenantID, clientID and clientSecret.'
            except:
                pass
        else:
            return None
    except Exception as err:
        return str(err)
    return requestHeaders











# import os
# import subprocess
#
#
# def enable_ms_teams(userid, location):
#     """
#     Function to enable ms teams for a user
#     :param userid: user if of user
#     :param location: location of user
#     :return: Boolean if success else exception
#     """
#     #oldpath= C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe
#     # user_to_license = str(userid)+'@nxtgenuc.com'
#     user_to_license = str(userid) + '@ngninnovation.com'
#     folder_path = os.path.realpath('automate/Uploadfiles')
#     location_for_teams = get_location_for_teams(location)
#     # pylint: disable=C0301
#     script = '$password= ConvertTo-SecureString '+"'"+'Practice@12345'+"'"+' -AsPlainText -Force\n' \
#             '$cred = New-Object System.Management.Automation.PSCredential("admin@ngninnovation.onmicrosoft.com",$password)\n' \
#             'Import-Module AzureAD -UseWindowsPowerShell\n' \
#             'Connect-AzureAD -Credential $Cred\n' \
#             'Set-AzureADUser -ObjectId '+user_to_license+' -UsageLocation '+location_for_teams
#     script_path = os.path.join(folder_path, 'enablemsteams.ps1')
#     file_open = open(script_path, 'w+')
#     file_open.write(script)
#     file_open.close()
#     try:
#         output = subprocess.Popen(
#             [r"C:\Program Files\PowerShell\7\pwsh.exe",
#              'automate/Uploadfiles/enablemsteams.ps1'],
#             stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
#         # output = subprocess.Popen(
#         #     ["powershell.exe",
#         #      'automate/Uploadfiles/enablemsteams.ps1'],
#         #     stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
#         output1, error = output.communicate()
#         if error:
#             print(error)
#             msg = False
#         elif output1:
#             print(output1)
#             assign_ms_teams_license(userid)
#             msg = True
#         else:
#             msg = True
#         return msg
#     except subprocess.CalledProcessError as error:
#         msg = "Oops... Exception occurred: output:\n" + error.output
#         return msg
#
#
# def assign_ms_teams_license(userid):
#     """
#     Function to assign license to ms teams
#     :param userid: user id of user for whom ms teams needs to be assigned
#     :return: Boolean if success else exception
#     """
#     # user_to_license = str(userid)+'@nxtgenuc.com'
#     user_to_license = str(userid) + '@ngninnovation.com'
#     folder_path = os.path.realpath('automate/Uploadfiles')
#     # pylint: disable=C0301
#     script = '$password= ConvertTo-SecureString '+"'"+'Practice@12345'+"'"+' -AsPlainText -Force\n' \
#             '$cred = New-Object System.Management.Automation.PSCredential("admin@ngninnovation.onmicrosoft.com",$password)\n' \
#             'Import-Module MSOnline\n' \
#             'Connect-MSolService -Credential $Cred\n' \
#             'Set-MsolUserLicense -UserPrincipalName '+user_to_license+' -AddLicenses reseller-account:TEAMS_EXPLORATORY'
#     script_path = os.path.join(folder_path, 'assignlicense.ps1')
#     file_open = open(script_path, 'w+')
#     file_open.write(script)
#     file_open.close()
#     try:
#         output = subprocess.Popen(
#             [r"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe",
#              'automate/Uploadfiles/assignlicense.ps1'],
#             stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
#         output1, error = output.communicate()
#         if error:
#             print(error)
#             msg = False
#         elif output1:
#             print(output1)
#             msg = True
#         else:
#             msg = True
#         return msg
#     except subprocess.CalledProcessError as error:
#         msg = "Oops... Exception occurred: output:\n" + error.output
#         return msg
#
#
# def get_location_for_teams(location):
#     """
#     Function to get location for ms teams
#     :param location: location
#     :return: String team location
#     """
#     if location == 'NYC':
#         teams_loc = 'US'
#     elif location == 'LDN':
#         teams_loc = 'GB'
#     elif location == 'DEL':
#         teams_loc = 'IN'
#     else:
#         teams_loc = 'AU'
#     return teams_loc


# def msgraph_auth():
#     # request_headers = None
#     # tenantID = '11ba22e5-9252-4f99-83d0-3c6ea306635d'
#     # authority = 'https://login.microsoftonline.com/' + tenantID
#     # clientID = 'd423976e-bcca-40d2-8018-57833cc79282'   # Id of the app created in azure portal for graph api
#     # clientSecret = '-YKCPFxvVP32fGVtWV7-cD-3y54k6e__94'
#     # scope = ['https://graph.microsoft.com/.default']
#     #
#     # app = msal.ConfidentialClientApplication(clientID, authority=authority, client_credential=clientSecret)
#     #
#     # try:
#     #     access_token = app.acquire_token_silent(scope, account=None)
#     #     if not access_token:
#     #         try:
#     #             access_token = app.acquire_token_for_client(scopes=scope)
#     #             if access_token['access_token']:
#     #                 request_headers = {'Authorization': 'Bearer ' + access_token['access_token']}
#     #             # else:
#     #             #     return 'Error aquiring authorization token. Check your tenantID, clientID and clientSecret.'
#     #         except Exception as error:
#     #             pass
#     #     else:
#     #         return None
#     # except Exception as err:
#     #     return str(err)
#     # return request_headers
#     '''
#     Tenant Details of ngninovation.com domain
#     tenantID = '11ba22e5-9252-4f99-83d0-3c6ea306635d'
#     authority = 'https://login.microsoftonline.com/' + tenantID
#     clientID = 'd423976e-bcca-40d2-8018-57833cc79282'  # Id of the app created in azure portal for graph api
#     clientSecret = '-YKCPFxvVP32fGVtWV7-cD-3y54k6e__94'
#     scope = ['https://graph.microsoft.com/.default']
#
#     Make sure that user (admin) have permision to modify/delete/update/create users)
#     Make sure graphapi Application have all the permission to read write update users and directories
#     '''
#     request_headers = None
#     tenantID = 'f94fdb9a-ddf7-4aa2-b2e5-a7c6aeabcd7a'
#     # nxtgenuc domain tenant id
#     authority = 'https://login.microsoftonline.com/' + tenantID
#     clientID = 'eab5d9d0-53cd-445d-8ed6-bb83a47fcd01'
#     # Id of the app created in azure portal for graph api
#     clientSecret = 'xW4~708plf-pVz-AZH-8jm-4x12oPQ_SwX'
#     # secret of the app created in azure portal for graph api
#     scope = ['https://graph.microsoft.com/.default']
#     try:
#         cfg.logger.info("{} {} Authenticating to ms teams tenant".format(cfg.username, cfg.ipaddress))
#         app = msal.ConfidentialClientApplication(clientID, authority=authority, client_credential=clientSecret)
#         access_token = app.acquire_token_silent(scope, account=None)
#         if not access_token:
#             try:
#                 access_token = app.acquire_token_for_client(scopes=scope)
#                 if access_token['access_token']:
#                     request_headers = {'Authorization': 'Bearer ' + access_token['access_token'],
#                                        'Content-Type': 'application/json'}
#                     cfg.logger.info("{} {} Authenticated successfully".format(cfg.username, cfg.ipaddress))
#                     return [request_headers, True]
#             except Exception as error:
#                 err_msg = "{0}".format(str(error))
#                 if "access_token" in err_msg:
#                     cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, access_token['error_description']))
#                     return [access_token['error'], False]
#                 else:
#                     cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
#                     return [error, False]
#         else:
#             return None
#     except Exception as err:
#         cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, err))
#         return [str(err), False]
