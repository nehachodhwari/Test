# from requests import Session
# from requests.auth import HTTPBasicAuth
# import requests
# import xml.etree.ElementTree as ET
# import random
# import json
#
# def get_CSS(location,calling_priviledge):
#     if location in ['LDN','ldn','Ldn','LDn','lDn','ldN']:
#         if calling_priviledge == 'international':
#             css = 'LDN_International_CSS'
#         elif calling_priviledge == 'national':
#             css = 'LDN_National_CSS'
#         elif calling_priviledge == 'internal':
#             css = 'LDN_Internal_CSS'
#         elif calling_priviledge == 'local':
#             css='LDN_Local_CSS'
#     elif location in ['NYC','nyc','Nyc','NYc','nyC','nYc']:
#         if calling_priviledge == 'international':
#             css = 'NYC_International_CSS'
#         elif calling_priviledge == 'national':
#             css = 'NYC_National_CSS'
#         elif calling_priviledge == 'internal':
#             css = 'NYC_Internal_CSS'
#         elif calling_priviledge == 'local':
#             css='NYC_Local_CSS'
#     elif location == ['DEL','del','Del','DEl','dEl','deL']:
#         if calling_priviledge == 'international':
#             css = 'DEL_International_CSS'
#         elif calling_priviledge == 'national':
#             css = 'DEL_National_CSS'
#         elif calling_priviledge == 'internal':
#             css = 'DEL_Internal_CSS'
#         elif calling_priviledge == 'local':
#             css='DEL_Local_CSS'
#     else:
#         css = None
#     return css
#
# def get_CUCUser(userid):
#     url = "https://172.17.120.32/vmrest/users"
#     querystring = {"query":"(alias startswith "+userid+")"}
#     headers = {
#         'connection': "keep-alive"
#         }
#     response = requests.request("GET", url, headers=headers, params=querystring,verify=False, auth=('ccmapp','Networks@123'))
#     textrep=response.text
#     myroot = ET.fromstring(textrep)
#     for User in myroot.findall('User'):
#         alias =User.find('Alias').text
#         if str(alias) == userid:
#             objectId = User.find('ObjectId').text
#             isVmEnable = User.find('IsVmEnrolled').text
#             return("Yes",str(objectId))
#
# def get_Object_Id(userid):
#     getUserDetails = get_CUCUser(userid)
#     return str(getUserDetails[1])
#
#
# def find_User_In_Import_Section(userid):
#     print("Finding in import list")
#     url = "http://172.17.120.32/vmrest/import/users/ldap"
#     querystring = {"query":"(alias startswith "+userid+")"}
#     headers = {
#         'connection': "keep-alive",
#         'content-type': "application/json"
#         }
#     response = requests.request("GET", url, headers=headers, params=querystring,verify=False, auth=('ccmapp','Networks@123'))
#     textrep=response.text
#     myroot = ET.fromstring(textrep)
#     for ImportUser in myroot.findall('ImportUser'):
#         alias =ImportUser.find('alias').text
#         print(alias)
#         print(type(alias))
#         if str(alias) == userid:
#             pkid = ImportUser.find('pkid').text
#             firstName = ImportUser.find('firstName').text
#             lastName = ImportUser.find('lastName').text
#             return("Yes",pkid,alias,firstName,lastName)
#         else:
#             return("User Not Found")
#
# def get_ImportUserDetails(userid):
#     print("getting import details")
#     user_details = find_User_In_Import_Section(userid)
#     return (str(user_details[1]), str(user_details[2]),str(user_details[3]),str(user_details[4]))
#
# def import_LdapUser_With_VMEnabled(userid):
#     print("Import ldap user")
#     user_details = get_ImportUserDetails(userid)
#     alias = user_details[1]
#     print ("Alias: "+alias)
#     firstName = user_details[2]
#     lastName = user_details[3]
#     pkid = user_details[0]
#     print(user_details)
#     payload = {
#         "alias":alias,
#         "firstName": firstName,
#         "lastName": lastName,
#         "pkid": pkid
#         }
#     querystring = {"templateAlias":"voicemailusertemplate"}
#     url = "https://172.17.120.32/vmrest/import/users/ldap?templateAlias=voicemailusertemplate"
#     headers = {
#         'content-type': "application/json",
#         'connection': "keep-alive"
#         }
#     payjson=json.dumps(payload)
#     response = requests.request("POST", url, data=payjson, headers=headers,verify=False, auth=('ccmapp','Networks@123'))
#     print(response.text)
#     print(response.status_code)
#     print ("User imported With VM Enabled")
#     print(response.content)
#     return(response.status_code)
#
#
#
# def reset_VoiceMailPin(userid):
#     userObjectId = get_Object_Id(userid)
#     url = "https://172.17.120.32/vmrest/users/"+userObjectId+"/credential/pin"
#     pin = str(random.randrange(100000,999999))
#     json_pay=json.dumps({"Credentials": pin})
#     headers = {
#         'content-type': "application/json",
#         'connection': "keep-alive"
#     }
#     response = requests.request("PUT", url, data=json_pay, headers=headers, verify=False, auth=('ccmapp','Networks@123'))
#     resp= response.text
#     return (pin,response.status_code)
#
#
