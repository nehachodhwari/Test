"""
This module contains use cases for cucm
"""

import datetime
from zeep.exceptions import Fault
from flask import render_template, request, redirect, url_for, flash, Blueprint, session

from ..app import cache
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.connection import create_sess
from ..auditlogs.audit import capture_audit_log, timer
from ..macd.forms import AddDeviceProfile, EmUserId, AddPhone
from ..provision import email
from .utils import get_device_pool_name, get_css, get_em_pin, get_location, get_phone_template, \
    get_phone_type, get_protocol, get_route_partition, get_security_profile,\
    get_em, get_sip_profile, get_userid
from ..exception import get_cucm_error_message
from ..projectconfig.authentication import authorize
from ..projectconfig import common_config as cfg
from ..auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from ..projectconfig.connection import execution_time


service = create_sess()

macdcucm = Blueprint('macdcucm', __name__)

# @macdcucm.route("/addenduser", methods=['POST','GET'])
# @timer
# def cucm_End_User():
#     form = add_cucm_user_form()
#     if request.method == 'POST' and form.validate_on_submit():
#         task_detail = []
#         date_of_execution = datetime.datetime.now()
#         try:
#             addenduser = service.addUser(user={
#                 'firstName': request.form.get('name_first') ,
#                 'lastName':request.form.get('name_last'),
#                 'userid':request.form.get('user_id'),
#                 'password': request.form.get('password'),
#                 'presenceGroupName':'Standard Presence Group',
#                 'department': request.form.get('department')
#                 })
#             print(addenduser)
#             task_detail.append('added local user')
#             flash('User Created', category='success')
#             username = request.form.get('user_id')
#             status = 'pass'
#             task_data = ", ".join(str(x) for x in task_detail)
#             capture_audit_log(func_name=cucm_End_User.__name__, status=status,
#             date_of_execution=date_of_execution, detail=task_data)
#             return render_template('macd/addlocaluser.html',form=form,username=username,
#             FinalReport='Click here to get user details')
#         except Fault as fault :
#             status = 'fail'
#             error = fault.message
#             msg = get_Error_Message(error)
#             if msg == 'User already exists':
#                 status = 'pass'
#             flash(msg, category='info')
#             task_data = str(fault.message)
#             username = request.form.get('user_id')
#             capture_audit_log(func_name=cucm_End_User.__name__, status=status,
#             date_of_execution=date_of_execution,detail=task_data)
#             return render_template('macd/addlocaluser.html',form=form,username=username,
#             FinalReport='Click here to get user details')
#     else:
#         return render_template('macd/addlocaluser.html', form=form)


# @macdcucm.route('/getcucmuser/<userid>', methods=['get', 'post'])
# @timer
# def get_cucm_User(userid):
#     # form = EmUserId()
#     # if request.method == "POST" and form.validate_on_submit():
#     # if request.method == 'POST':
#     print(userid)
#     try:
#         date_of_execution = datetime.datetime.now()
#         ListOfUser = service.getUser(userid=userid,
#                                      returnedTags={
#                                          'firstName': True,
#                                          'middleName': True,
#                                          'lastName': True,
#                                          'userid':True,
#                                          'mailid': True,
#                                          'manager':True,
#                                          'department':True,
#                                          'userIdentity':True,
#                                          'primaryExtension': {'pattern': True},
#                                          'associatedDevices': {'device':True},
#                                          'telephoneNumber': True,
#                                          'phoneProfiles': {'profileName': True}})
#
#         print(ListOfUser)
#         result = ListOfUser
#         input_data = helpers.serialize_object(result)
#         output_data = json.loads(json.dumps(input_data))
#         Data = output_data['return']['user']
#         respdata = cleanNullTerms(Data)
#         print(respdata)
#         try:
#             del respdata["uuid"]
#         except KeyError:
#             pass
#         for k, v in respdata.items():
#             if isinstance(v, dict):
#                 respdata[k] = list(v.values())[0]
#         print(respdata)
#         for k,v in respdata.items():
#             if isinstance(v,list):
#                 for i in v:
#                     if isinstance(i,dict):
#                         new_val = list(i.values())[0]
#                         respdata[k] = new_val
#                     else:
#                         respdata[k] = i
#         print(respdata)
#         outputuserdata=dict((k.upper(),v) for k,v in respdata.items())
#         status = 'pass'
#         task_data = 'User Found Successfully'
#         capture_audit_log(func_name=get_cucm_User.__name__, status=status,
#         date_of_execution=date_of_execution,detail=task_data)
#         return render_template('getcucmuser.html',myresult=outputuserdata)
#     except Fault as e:
#         print(e)
#         flash('Internal Server Error occured. Try after some time', category='info')
#         status = 'fail'
#         task_data = str(e)
#         capture_audit_log(func_name=get_cucm_User.__name__, status=status,
#         date_of_execution=date_of_execution,detail=task_data)
#         return redirect(url_for('macdcucm.cucm_End_User'))


@macdcucm.route('/validateem', methods=['get', 'post'])
# @timer
# # @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def check_enable_em():
    """
    Function to check if extension mobility is enabled
    :return: renders template
    """
    form = EmUserId()
    task_data = []
    username = session.get('user_id')
    if request.method == "POST" and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=check_enable_em.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        try:
            cfg.logger.info("{} {} Validating if extension mobility enabled for the user {}".format(cfg.username, cfg.ipaddress, request.form.get('user_id')))
            list_of_user = service.getUser(userid=request.form.get('user_id'),
                                           returnedTags={
                                             'primaryExtension': {'pattern': True},
                                             'telephoneNumber': True,
                                             'phoneProfiles': {'profileName': True}
                                         })
            task_data.append('Fetching user data:Success')
            if list_of_user['return']['user']['phoneProfiles']:
                cfg.logger.info("{} {} Extension mobility has already enabled for the user {}".format(cfg.username, cfg.ipaddress, request.form.get('user_id')))
                flash('Extension mobility has already been enabled for the user.',
                      category='info')
                status = 'Success'
                task_data.append('User already enabled:Success')
                task_detail = ", ".join(str(data) for data in task_data)
                capture_audit_log(un=unique_identifier, status=status,
                                  date_of_execution=execution_time(), detail=task_detail)
                return render_template('em_user_id.html', form=form, username=username)
            task_data.append('Redirected user to add device profile page since device profile does not exist:Success')
            cfg.logger.warning(
                "{} {} Device profile does not exist, Redirected user {} to add device profile page".format(
                    cfg.username, cfg.ipaddress, request.form.get('user_id')))
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status='pass',
                              date_of_execution=execution_time(), detail=task_detail)
            flash("Device profile does not exist, Click below to add device profile", category="info")
            return render_template('em_user_id.html', form=form, FinalReport='Add Device Profile', username=username)
        except Fault as fault:
            error = fault.message
            msg = get_cucm_error_message(fault)
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, fault))
            flash(msg, category='error')
            status = 'Fail'
            task_data.append(str(error) + ':Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template('em_user_id.html', form=form, username=username)
    return render_template('em_user_id.html', form=form, username=username)


@macdcucm.route('/adddeviceprofile', methods=['get', 'post'])
# @timer
# # @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def add_device_profile():
    """
    Function to add a device profile
    :return: renders a template
    """
    form = AddDeviceProfile()
    task_data = []
    username = session.get('user_id')
    if request.method == "POST" and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        try:
            capture_audit_log(un=unique_identifier, func_name=add_device_profile.__name__, status='Executing',
                              date_of_execution=execution_time(), detail=None)
            try:
                cfg.logger.info("{} {} Getting line details of extension ".format(cfg.username, cfg.ipaddress, request.form.get('extension')))
                line = service.getLine(pattern=request.form.get('extension'),
                                       routePartitionName=request.form.get(
                                           'route_partition_name'),
                                       returnedTags={'pattern': True,
                                                     'description': True, 'usage': True})
                task_data.append('Fetching line details:Success')
                cfg.logger.info("{} {} Line details captured successfully".format(cfg.username, cfg.ipaddress))
            except Fault as error:
                msg = get_cucm_error_message(error)
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                task_data.append('Fetching line details:Fail')
                line = None
            if not line:
                cfg.logger.info("{} {} Adding a new line for the extension".format(cfg.username, cfg.ipaddress, request.form.get('extension')))
                service.addLine({
                    'pattern': request.form.get('extension'),
                    'usage': 'Device',
                    'description': 'teset device 4008',
                    'routePartitionName': request.form.get('route_partition_name'),
                    'shareLineAppearanceCssName': request.form.get('calling_search_space')
                })
                task_data.append('Line Added:Success')
                cfg.logger.info("{} {} Line added successfully".format(cfg.username, cfg.ipaddress))
            try:
                cfg.logger.info("{} {} Adding device profile {}".format(cfg.username, cfg.ipaddress, request.form.get('device_profile_name')))
                service.addDeviceProfile({
                    'name': request.form.get('device_profile_name'),
                    'product': request.form.get('product'),
                    'class': 'Device Profile',
                    'protocol': request.form.get('protocol'),
                    'protocolSide': 'User',
                    'phoneTemplateName': request.form.get('phone_template_name'),
                    'lines': {
                        'line': {
                            'index': 1,
                            'dirn': {
                                'pattern': request.form.get('extension'),
                                'routePartitionName': request.form.get('route_partition_name')
                            }},
                        'lineIdentifier': {
                            'directoryNumber': request.form.get('extension'),
                            'routePartitionName': request.form.get('route_partition_name')}}
                    })
                task_data.append('Added Device Profile:Success')
                cfg.logger.info("{} {} Device profile {} added successfully".format(cfg.username, cfg.ipaddress,
                                                                                    request.form.get(
                                                                                        'device_profile_name')))
                cfg.logger.info("{} {} Getting extension mobility pin".format(cfg.username, cfg.ipaddress))
                em_pin = get_em_pin()
                cfg.logger.info("{} {} Updating user with device profile {}".format(cfg.username, cfg.ipaddress, request.form.get('device_profile_name')))
                service.updateUser(userid=request.form.get('device_profile_name'), pin=em_pin,
                                   phoneProfiles={'profileName': request.form.get(
                                       'device_profile_name')})
                task_data.append('Updated user with device profile:Success')
                cfg.logger.info("{} {} Updated user with device profile {}".format(cfg.username, cfg.ipaddress, request.form.get('device_profile_name')))
                cfg.logger.info("{} {} Sending an email with extension mobility pin".format(cfg.username, cfg.ipaddress))
                #email.send_email(em_pin)
                task_data.append('Sent an email to user with pin:Success')
                cfg.logger.info("{} {} Email sent with extension mobility pin".format(cfg.username, cfg.ipaddress))
                cfg.logger.info("{} {} Getting uuid from Get Ip Phone Services".format(cfg.username, cfg.ipaddress))
                ip_phone_services_uuid = service.getIpPhoneServices(
                    serviceName='Extension Mobility', returnedTags={'uuid': True})
                uuid = ip_phone_services_uuid['return']['ipPhoneServices']['uuid']
                cfg.logger.info("{} {} Captured uuid from Get Ip Phone Services".format(cfg.username, cfg.ipaddress))
                task_data.append('Got uuid from get IP phone services:Success')
                cfg.logger.info("{} {} Updating device profile {} with uuid".format(cfg.username, cfg.ipaddress, request.form.get('device_profile_name')))
                service.updateDeviceProfile(
                    name=request.form.get('device_profile_name'),
                    services={
                        'service': {
                            'name': 'Extension Mobility',
                            'telecasterServiceName': {
                                'uuid': uuid}
                        }})
                flash("Task Successful", category='success')
                task_data.append('updated device profile:Success')
                cfg.logger.info("{} {} Device profile {} updated successfully".format(cfg.username, cfg.ipaddress,
                                                                                      request.form.get(
                                                                                          'device_profile_name')))
                status = 'Success'
            except Fault as fault:
                msg = get_cucm_error_message(fault)
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, fault))
                error = fault.message
                if msg == "Could not duplicate unique index values":
                    flash(msg, category='info')
                    status = 'Success'
                else:
                    flash(msg, category='error')
                    status = 'Fail'
                task_data.append(str(error) + ':Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            return render_template('extension_mobility.html', form=form, username=username)
        except Fault as fault:
            msg = get_cucm_error_message(fault)
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, fault))
            flash(msg, category='error')
            status = 'Fail'
            task_data.append(str(fault.message) + ':Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            return render_template('extension_mobility.html', form=form, username=username)
    return render_template('extension_mobility.html', form=form, username=username)


@macdcucm.route("/doldapsync", methods=["GET", "POST"])
# @timer
# # @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def directory_sync():
    """
    Function to synchronize directory
    :return: renders template
    """
    username = session.get('user_id')
    if request.method == 'POST':
        task_data = []
        try:
            cfg.logger.info("{} {} LDAP directory sync started".format(cfg.username, cfg.ipaddress))
            unique_identifier = generate_random_identifier(7)
            capture_audit_log(un=unique_identifier, func_name=directory_sync.__name__, status='Executing',
                              date_of_execution=execution_time(), detail=None)
            ldap_sync = service.doLdapSync(name='AD', sync=True)
            result = ldap_sync['return']
            if result == "Sync initiated successfully":
                cfg.logger.info("{} {} LDAP directory sync is successful".format(cfg.username, cfg.ipaddress))
                flash("Sync Successful", category='success')
                task_data.append('Sync Directory:Success')
                status = 'Success'
            else:
                cfg.logger.warning("{} {} LDAP directory sync not successful".format(cfg.username, cfg.ipaddress))
                flash("Sync not Successful", category='error')
                task_data.append('Sync Directory:Fail')
                status = 'Fail'
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(func_name=directory_sync.__name__, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template('ldapsync.html', username=username)
        except Fault as error:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            flash("Interal Server Error Occurred. Please check logs.", category='error')
            status = 'Fail'
            task_data.append(str(error.message) + ':Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(func_name=directory_sync.__name__, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template('ldapsync.html', username=username)
    return render_template('ldapsync.html', username=username)


@macdcucm.route("/add_phone_cucm", methods=['POST', 'GET'])
# @timer
# # @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def add_phone_cucm():
    """
    Function to add a phone in CUCM
    :return: renders a template
    """
    form = AddPhone()
    # date_of_execution = datetime.datetime.now()
    name = request.form.get('Name')
    description = request.form.get('Description')
    extension = request.form.get('Line')
    product = request.form.get('Phone_Type')
    protocol = request.form.get('Protocol')
    device_pool = request.form.get('DevicePool')
    location = request.form.get('LocationName')
    phone_template = request.form.get('PhoneButtonTemplate')
    css = request.form.get('CSS')
    security_profile = request.form.get('SecurityProfileName')
    owner_user_name = request.form.get('UserID')
    route_partition = request.form.get('RoutePartition')
    sip_profile_name = request.form.get('SIPProfile')
    extension_mobility = request.form.get('ExtensionMobility')
    product = get_phone_type(product)
    protocol = get_protocol(protocol)
    device_pool = get_device_pool_name(device_pool)
    location = get_location(location)
    phone_template = get_phone_template(phone_template)
    css = get_css(css)
    security_profile = get_security_profile(security_profile)
    owner_user_name = get_userid(owner_user_name)
    route_partition = get_route_partition(route_partition)
    sip_profile_name = get_sip_profile(sip_profile_name)
    extension_mobility_value = get_em(extension_mobility)
    username = session.get('user_id')
    if request.method == 'POST' and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=add_phone_cucm.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        task_data = []
        cfg.logger.info("{} {} Adding phone {} to cucm".format(cfg.username, cfg.ipaddress, name))
        if protocol == "SCCP":  # pylint: disable=R1705
            try:
                try:
                    cfg.logger.info("{} {} Getting line details of extension {}".format(cfg.username, cfg.ipaddress, extension))
                    line = service.getLine(pattern=extension, routePartitionName=route_partition,
                                           returnedTags={'pattern': True, 'description': True,
                                                         'usage': True})
                    cfg.logger.info("{} {} Line details are captured successfully".format(cfg.username, cfg.ipaddress))
                    task_data.append('Fetching line details:Success')
                except Fault as error:
                    task_data.append('Fetching line details:Fail')
                    msg = get_cucm_error_message(error)
                    cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                    line = None
                if not line:
                    cfg.logger.info("{} {} Adding new line with extension {}".format(cfg.username, cfg.ipaddress, extension))
                    service.addLine({'pattern': extension, 'usage': 'Device', 'description': "",
                                     'routePartitionName': route_partition,
                                     'shareLineAppearanceCssName': css})
                    task_data.append('Added new line:Success')
                    cfg.logger.info("{} {} Line added successfully".format(cfg.username, cfg.ipaddress))
                service.addPhone(phone={'name': name, 'product': product, 'class': 'Phone',
                                        'protocol': protocol, 'protocolSide': 'User',
                                        'description': description,
                                        'devicePoolName': device_pool, 'locationName': location,
                                        'useTrustedRelayPoint': 'Default',
                                        'phoneTemplateName': phone_template,
                                        'builtInBridgeStatus': 'Default',
                                        'packetCaptureMode': 'None',
                                        'certificateOperation': 'No Pending Operation',
                                        'deviceMobilityMode': 'Default',
                                        'subscribeCallingSearchSpaceName': css,
                                        'securityProfileName': security_profile,
                                        'callingSearchSpaceName': css,
                                        'enableExtensionMobility': extension_mobility_value,
                                        'commonPhoneConfigName': 'Standard Common Phone Profile',
                                        'ownerUserName': owner_user_name,
                                        'networkHoldMohAudioSourceId': '0',
                                        'userHoldMohAudioSourceId': '0',
                                        'lines': {'line': {'index': 1, 'label': '', 'dirn': {
                                            'pattern': extension,
                                            'routePartitionName': route_partition}}}})
                task_data.append('Added Phone:Success')
                cfg.logger.info("{} {} Phone {} added successfully".format(cfg.username, cfg.ipaddress, name))
                result = "Task Successful"
                status = 'Success'
                flash(result, category='success')
            except Fault as error:
                msg = get_cucm_error_message(error)
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                status = 'Fail'
                task_data.append(str(error.message) + ':Fail')
                flash(msg, category='error')
            task_detail = ", ".join(str(x) for x in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template("add_phone2.html", FinalReport="Userdetails", form=form, username=username)
        elif protocol == "SIP":
            try:
                try:
                    cfg.logger.info("{} {} Getting line details of extension".format(cfg.username, cfg.ipaddress, extension))
                    line = service.getLine(pattern=extension,
                                           routePartitionName=route_partition,
                                           returnedTags={'pattern': True,
                                                         'description': True,
                                                         'usage': True})
                    cfg.logger.info("{} {} Line details are captured successfully".format(cfg.username, cfg.ipaddress))
                    task_data.append('Fetching line details:Success')
                except Fault as error:
                    task_data.append('Fetching line details:Fail')
                    msg = get_cucm_error_message(error)
                    cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                    line = None
                if not line:
                    cfg.logger.info("{} {} Adding new line with extension".format(cfg.username, cfg.ipaddress, extension))
                    service.addLine({'pattern': extension, 'usage': 'Device',
                                     'description': "", 'routePartitionName': route_partition,
                                     'shareLineAppearanceCssName': css})
                    task_data.append('Added new line:Success')
                    cfg.logger.info("{} {} Line added successfully".format(cfg.username, cfg.ipaddress))
                service.addPhone(phone={
                    'name': name,
                    'product': product,
                    'class': 'Phone',
                    'protocol': protocol,
                    'protocolSide': 'User',
                    'description': description,
                    'devicePoolName': device_pool,
                    'locationName': location,
                    'useTrustedRelayPoint': 'Default',
                    'phoneTemplateName': phone_template,
                    'builtInBridgeStatus': 'Default',
                    'packetCaptureMode': 'None',
                    'certificateOperation': 'No Pending Operation',
                    'deviceMobilityMode': 'Default',
                    'subscribeCallingSearchSpaceName': css,
                    'securityProfileName': security_profile,
                    'callingSearchSpaceName': css,
                    'enableExtensionMobility': extension_mobility_value,
                    'commonPhoneConfigName': 'Standard Common Phone Profile',
                    'ownerUserName': owner_user_name,
                    'networkHoldMohAudioSourceId': '0',
                    'userHoldMohAudioSourceId': '0',
                    'sipProfileName': sip_profile_name,
                    'lines': {
                        'line': {
                            'index': 1,
                            'label': '',
                            'dirn': {
                                'pattern': extension,
                                'routePartitionName': route_partition}}}})
                task_data.append('Added phone:Success')
                cfg.logger.info("{} {} Phone {} added successfully".format(cfg.username, cfg.ipaddress, name))
                flash("Task Successful", category='success')
                status = 'Success'
            except Fault as error:
                msg = get_cucm_error_message(error)
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                status = 'Fail'
                task_data.append(str(error.message) + ':Fail')
                flash(msg, category='error')
            task_detail = ", ".join(str(x) for x in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template("add_phone2.html", FinalReport="Userdetails", form=form, username=username)
    return render_template("add_phone2.html", title="Add Phone", form=form, username=username)
