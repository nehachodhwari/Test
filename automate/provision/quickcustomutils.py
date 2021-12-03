# from zeep import Client
# from zeep.cache import SqliteCache
# from zeep.transports import Transport
# from zeep.exceptions import Fault
# from zeep import helpers
# from requests import Session
# from requests.auth import HTTPBasicAuth
# from urllib3 import disable_warnings
# from urllib3.exceptions import InsecureRequestWarning
# from automate.provision import quickutils as ut
# from automate.provision import conf_data
# from automate.projectconfig.connection import create_sess
# import json
#
#
# service=create_sess()
#
#
#
# def addNewLine(templine,alertingName,location,calling_priviledge,description):
#     try:
#         AddNewLine=service.addLine({
#             'pattern':templine,
#             'asciiDisplay': alertingName,
#             'usage':'Device',
#             'description':description,
#             'routePartitionName': conf_data.get_route_partition_name(location),
#             'alertingName':alertingName,
#             'asciiAlertingName': alertingName,
#             'shareLineAppearanceCssName':ut.get_CSS(location,calling_priviledge),
#             'callForwardAll':{
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             },
#         })
#         print("New Line Added")
#         data=AddNewLine
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def addNewPhone(name,phoneDescription,product,protocol,location,buttonTmp,label,alertingName,templine):
#     try:
#         AddNewPhone = service.addPhone(phone={
#             'name': name,
#             'description':phoneDescription,
#             'product':conf_data.get_product_name(product),
#             'class':'Phone',
#             'protocol':protocol,
#             'protocolSide':'User',
#             'softkeyTemplateName':'Standard User',
#             'devicePoolName':conf_data.get_device_pool_name(location),
#             'callingSearchSpaceName':conf_data.get_temp_css(location),
#             'commonDeviceConfigName':conf_data.get_common_device_config_name(location),
#             # 'commonPhoneConfigName':conf_data.get_commonPhoneConfigName(self.location),
#             'commonPhoneConfigName':{'uuid':'AC243D17-98B4-4118-8FEB-5FF2E1B781AC'},
#             'locationName':{'uuid':'29C5C1C4-8871-4D1E-8394-0B9181E8C54D'},
#             'useTrustedRelayPoint':'Default',
#             #'phoneTemplateName':'Standard 7962G SCCP',
#             'phoneTemplateName':buttonTmp,
#             # 'phoneTemplateName':{'uuid':'1F9180ED-D6F1-417D-96F0-A57C42F20665'},
#             'primaryPhoneName':{'uuid':'None'},
#             'builtInBridgeStatus':'Default',
#             'packetCaptureMode':'None',
#             'certificateOperation':'No Pending Operation',
#             'deviceMobilityMode':'Off',
#             'enableExtensionMobility': True,
#             'lines':{
#                 'line':{
#                     'index':1,
#                     'label':label,
#                     'display':alertingName,
#                     'displayAscii':alertingName,
#                     'e164Mask':conf_data.get_e164_mask(location),
#                     'dirn':{
#                         'pattern':templine,
#                         'routePartitionName':conf_data.get_route_partition_name(location)}}}
#             })
#         print("New Phone added")
#         data=AddNewPhone
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def update_User_Usergroup(UserId):
#     try:
#         UpdateUserUG = service.updateUser(userid=UserId,enableCti=True,
#         associatedGroups={
#             'userGroup':{
#                 'name':'Standard User Group'
#                 }})
#         print("User updated first time")
#         data=UpdateUserUG
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def update_User_Line(UserId,name,templine,location):
#     try:
#         UpdateUserLine=service.updateUser(userid=UserId,associatedDevices={
#             'device':name},
#             primaryExtension={
#                 'pattern':templine,
#                 'routePartitionName':conf_data.get_route_partition_name(location)})
#         print("User updated second Time")
#         data=UpdateUserLine
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def update_Phone(name):
#     try:
#         UpdatePhone=service.updatePhone(
#             name=name,
#             services={
#                 'service':{
#                     'name':'Extension Mobility',
#                     'telecasterServiceName':{
#                     'uuid':'1d4a5005-8f7f-e857-5a5e-d6e9f648024c'}
#                     }})
#         data=UpdatePhone
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def Std_Line_No_Desc(templine,Std_User_alertingName,Std_User_description,alertingName,location,calling_priviledge):
#     try:
#         AddNewLine=service.addLine({
#             'pattern':templine,
#             'asciiDisplay': Std_User_alertingName,
#             'usage':'Device',
#             'description':Std_User_description,
#             'routePartitionName': conf_data.get_route_partition_name(location),
#             'alertingName':Std_User_alertingName,
#             'asciiAlertingName': alertingName,
#             'shareLineAppearanceCssName':ut.get_CSS(location,calling_priviledge),
#             'callForwardAll':{
#                     'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#                 }
#         })
#         data=AddNewLine
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def line_UDP(phoneline,alertingName,description,location,calling_priviledge):
#     try:
#         LineForUDP=service.addLine({
#             'pattern':phoneline,
#             'asciiDisplay': alertingName,
#             'usage':'Device',
#             'description':description,
#             'routePartitionName': conf_data.get_route_partition_name(location),
#             'alertingName':alertingName,
#             'asciiAlertingName': alertingName,
#             'voiceMailProfileName': conf_data.get_voice_mail_profile_name(location),
#             'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge),
#             'shareLineAppearanceCssName':ut.get_CSS(location,calling_priviledge),
#             'callForwardAll':{
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             },
#             'callForwardBusy':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardBusyInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNoAnswer':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':'',
#             # 'duration':''
#             },
#             'callForwardNoAnswerInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#             'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':'',
#             # 'duration':''
#             },
#             'callForwardNoCoverage':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNoCoverageInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardOnFailure':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNotRegistered':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNotRegisteredInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             }
#         })
#         print("line added for UDP")
#         data= LineForUDP
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#         print(Status)
#     except Fault as e:
#         Status=e
#     return Status
#
# def update_Std_User(UserId):
#     try:
#         Std_UserUpdate=service.updateUser(userid=UserId,enableCti=True,
#         ctiControlledDeviceProfiles={
#             'profileName':UserId},
#             phoneProfiles={
#                 'profileName':UserId},
#                 associatedGroups={
#                     'userGroup':{
#                         'name':'Standard User Group'
#                         }})
#         print("User updated first time")
#         data= Std_UserUpdate
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def update_UserDetails(UserId,Extension_Mobility_Pin,phoneline,location):
#     try:
#         OtherDetailUpdate =service.updateUser(userid=UserId,pin = Extension_Mobility_Pin ,primaryExtension={
#             'pattern':phoneline,
#             'routePartitionName':conf_data.get_route_partition_name(location)})
#         print("User updated second Time")
#         data= OtherDetailUpdate
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def update_DP(UserId):
#     try:
#         Update_DeviceProfile=service.updateDeviceProfile(
#             name=UserId,
#             services={
#                 'service':{
#                 'name':'Extension Mobility',
#                 'telecasterServiceName':{
#                     'uuid':'1d4a5005-8f7f-e857-5a5e-d6e9f648024c'}
#                 }})
#         data= Update_DeviceProfile
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def add_UDP(UserId,product,description,protocol,buttonTmp,label,alertingName,location,phoneline):
#     try:
#         UserDeviceProfile=service.addDeviceProfile({
#             'name':UserId,
#             'product':conf_data.get_product_name(product),
#             'description':description,
#             'class':'Device Profile',
#             'protocol':protocol,
#             'protocolSide': 'User',
#             'softkeyTemplateName': 'Standard User',
#             'userLocale':'English United States',
#             'phoneTemplateName':buttonTmp,
#             'loginUserId':UserId,
#             'securityProfileName':'Cisco 7962 - Standard SCCP Non-Secure Profile',
#             'lines':{
#                 'line':{
#                     'index':1,
#                     'label':label,
#                     'display':alertingName,
#                     'displayAscii':alertingName,
#                     'e164Mask':conf_data.get_e164_mask(location),
#                     'dirn':{
#                         'pattern':phoneline,
#                         'routePartitionName':conf_data.get_route_partition_name(location)
#                 }} ,
#                 'lineIdentifier':{
#                     'directoryNumber':phoneline,
#                     'routePartitionName':conf_data.get_route_partition_name(location)}}
#             })
#         print("Device profile added")
#         data= UserDeviceProfile
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def line_UDP(phoneline,alertingName,description,location,calling_priviledge):
#     try:
#         LineForUDP=service.addLine({
#             'pattern':phoneline,
#             'asciiDisplay': alertingName,
#             'usage':'Device',
#             'description':description,
#             'routePartitionName': conf_data.get_route_partition_name(location),
#             'alertingName':alertingName,
#             'asciiAlertingName': alertingName,
#             'voiceMailProfileName': conf_data.get_voice_mail_profile_name(location),
#             'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge),
#             'shareLineAppearanceCssName':ut.get_CSS(location,calling_priviledge),
#             'callForwardAll':{
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             },
#             'callForwardBusy':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardBusyInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNoAnswer':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':'',
#             # 'duration':''
#             },
#             'callForwardNoAnswerInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#             'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':'',
#             # 'duration':''
#             },
#             'callForwardNoCoverage':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNoCoverageInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardOnFailure':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNotRegistered':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             },
#             'callForwardNotRegisteredInt':{
#                 'forwardToVoiceMail':conf_data.get_forward_to_voice_mail(location),
#                 'callingSearchSpaceName':ut.get_CSS(location,calling_priviledge)
#             # 'destination':''
#             }
#         })
#         print("line added for UDP")
#         data= LineForUDP
#         input_data = helpers.serialize_object(data)
#         output_data = json.loads(json.dumps(input_data))
#         Status= output_data['return']
#     except Fault as e:
#         Status=e
#     return Status
#
# def enablevm(userid):
#     checkifuserexist = ut.get_CUCUser(userid)
#     if checkifuserexist == None:
#         search_User_In_Import = ut.find_User_In_Import_Section(userid)
#         if search_User_In_Import == None:
#             msg = "User Not Found"
#         else:
#             vmenable_during_import = ut.import_LdapUser_With_VMEnabled(userid)
#             if vmenable_during_import == 201:
#                 msg = "VM Enabled"
#             else:
#                 msg = "Check logs"
#     else:
#         if checkifuserexist[0] == "Yes":
#             msg = "Voice Mail Already enabled"
#     return str(msg)
#
#
# def resetvmPin(userid):
#     checkifuserexist = ut.get_CUCUser(userid)
#     if checkifuserexist != None:
#         reset_Pin = ut.reset_VoiceMailPin(userid)
#         if reset_Pin[1] == 204:
#             msg = "Pin Reset Successful"
#         else:
#             msg = str(reset_Pin[1])+"Unable to reset. Please check logs "
#     else:
#         msg = "User Not Found"
#     return str(msg)
#