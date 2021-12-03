"""
This module contains utility functions for provisioning
"""

import os
import subprocess
import csv
from ..projectconfig.connection import create_sess, create_ps_conn
from ..provision import prov_conf, conf_data


service = create_sess()
client = create_ps_conn()

ALLOWED_EXTENSIONS = set(['csv'])


def allowed_file(filename):
    """
    Function to check valid file name
    :param filename: file name
    :return: Boolean
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def addUser_SFB(data):
#     print(data)
#     Name = data['user_id']
#     GivenName = data['name_first']
#     Surname = data['name_last']
#     DisplayName = data['name_first']
#     UserPrincipalName = Name+'@nxtgenuc.com'
#     MobilePhone = data['mobile']
#     Fax = data['fax']
#     Company = data['company']
#     Department = data['department']
#     City = data['city']
#     script =  """New-ADUser -Name """+"\""+Name+"\""+""" -GivenName
#     """+"\""+GivenName+"\""+""" -Surname """+"\""+Surname+"\""+"""
#     -DisplayName """+"\""+DisplayName+"\""+""" -ChangePasswordAtLogon $true
#     -samaccountname """+"\""+Name+"\""+""" -UserPrincipalName """+"\""+
#     UserPrincipalName+"\""+""" -AccountPassword (ConvertTo-SecureString -AsPlainText
#     "Practice@123" -Force) -Enabled $true -MobilePhone """+"\""+MobilePhone+"\""+"""
#     -Fax """+"\""+Fax+"\""+""" -Company """+"\""+Company+"\""+""" -City """+"\""+City+
#     "\""+""" -Department """+"\""+Department+"\""
#
#     try:
#         output, streams, had_errors = client.execute_ps(script)
#         if had_errors == False:
#             print("OUTPUT:\n%s" % output)
#             Result = output
#             Res_Display = "Task Successful"
#         else:
#             print("HAD ERRORS: %s" % had_errors)
#             print("ERROR:\n%s" % "\n".join([str(s) for s in streams.error]))
#             Result = ("\n".join([str(s) for s in streams.error]))
#             Res_Display = "Task Failed"
#         return (Result, Res_Display)
#     except Exception as e:
#         print("Exception raised due to e ",e)
#         Result = e
#         Res_Display="Exception"
#     return (Result, Res_Display)


# def get_ADUser(data):
#     Name = data
#     script = """Get-ADUser -Identity """+"\""+Name+"\""
#     try:
#         output, streams, had_errors = client.execute_ps(script)
#         if had_errors == False:
#             print("OUTPUT:\n%s" % output)
#             Result = output
#         else:
#             print("HAD ERRORS: %s" % had_errors)
#             print("ERROR:\n%s" % "\n".join([str(s) for s in streams.error]))
#             Result = ("ERROR:\n%s" % "\n".join([str(s) for s in streams.error]))
#     except Exception as e:
#         print("Exception raised due to e ",e)
#         Result = e
#     return (Result)


def prov_bulk_user(filename):
    """
    Function for bulk provisioning a user
    :param filename: name of file with user data
    :return: string
    """
    try:
        with open('automate/Uploadfiles/' + filename) as file:
            csv_reader = csv.reader(file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count == 0:
                    line_count += 1
                else:
                    name = 'SEP' + f'{row[0]}'
                    phone_line = f'{row[2]}'
                    location = f'{row[1]}'
                    first_name = f'{row[3]}'
                    last_name = f'{row[4]}'
                    description = first_name + ' ' + last_name + ' ' + location
                    alerting_name = first_name + ' ' + last_name
                    # ascii_name = first_name + ' ' + last_name
                    product = f'{row[5]}'
                    protocol = f'{row[6]}'
                    button_tmp = 'Standard ' + f'{row[5]}'
                    label = alerting_name + ' ' + phone_line
                    user_profile = f'{row[7]}'
                    phone_description = f'{row[8]}' + ' ' + location
                    user_id = f'{row[9]}'
                    std_phone = f'{row[8]}'
                    # email_id = f'{row[10]}'
                    service.addUser(user={'firstName': first_name, 'lastName': last_name,
                                          'userid': user_id, 'password': 'Practice@123',
                                          'presenceGroupName': 'Standard Presence Group'})
                    res = service.listLine(searchCriteria={
                        'routePartitionName': conf_data.get_route_partition_name(location)},
                        returnedTags={'pattern': '', 'usage': '', 'routePartitionName': ''})
                    pattern_list = res['return']
                    list_of_line = []
                    if pattern_list is None:
                        list_of_line = []
                    else:
                        pattern_list = res['return']['line']
                        for i in pattern_list:
                            list_of_line.append(i['pattern'])
                    if user_profile == 'TempUser' and phone_line == 'NA':  # pylint: disable=R1705
                        temp_line = conf_data.get_temp_line(list_of_line, location)
                        label = alerting_name + ' ' + temp_line
                        add_new_line = prov_conf.add_new_line(temp_line, alerting_name,
                                                              location, description)
                        add_phone = prov_conf.add_new_phone(name, phone_description, product,
                                                            protocol, location, button_tmp, label,
                                                            alerting_name, temp_line)
                        update_user_ug = prov_conf.update_user_user_group(user_id)
                        update_user_line = prov_conf.update_user_line(user_id, name, temp_line,
                                                                      location)
                        update_phone = prov_conf.update_phone(name)
                        return add_new_line, add_phone, update_user_ug, update_user_line, update_phone  # pylint: disable=C0301
                    elif user_profile == 'TempUser' and phone_line != 'NA':
                        temp_line = phone_line
                        if temp_line not in list_of_line:
                            prov_conf.add_new_line(temp_line, alerting_name, location, description)
                        else:
                            pass
                        label = alerting_name + ' ' + temp_line
                        # pylint: disable=C0301
                        add_phone = prov_conf.add_new_phone(name, phone_description, product, protocol,
                                                            location, button_tmp, label, alerting_name,
                                                            temp_line)
                        update_user_ug = prov_conf.update_user_user_group(user_id)
                        prov_conf.update_user_line(user_id, name, temp_line, location)
                        update_phone = prov_conf.update_phone(name)
                        ui_resp = [add_phone, update_user_ug, update_phone]
                        return ui_resp
                    else:
                        temp_line = conf_data.get_temp_line(list_of_line, location)
                        if phone_description == 'NA':
                            std_user_alerting_name = None
                            std_user_description = location
                            label = std_phone + ' ' + temp_line
                            prov_conf.std_line_no_desc(temp_line, std_user_alerting_name,
                                                       std_user_description, alerting_name, location)
                            add_phone = prov_conf.add_new_phone(name, phone_description, product,
                                                                protocol, location, button_tmp, label,
                                                                alerting_name, temp_line)
                        else:
                            std_user_alerting_name = std_phone
                            std_user_description = std_phone + ' ' + location
                            label = std_phone + ' ' + temp_line
                            prov_conf.add_new_line(temp_line, std_user_alerting_name, location,
                                                   std_user_description)
                            add_phone = prov_conf.add_new_phone(name, std_user_description, product,
                                                                protocol, location, button_tmp, label,
                                                                std_user_alerting_name, temp_line)
                        if phone_line not in list_of_line:
                            prov_conf.line_udp(phone_line, alerting_name, description, location)
                        label = alerting_name + ' ' + phone_line
                        add_device_profile = prov_conf.add_udp(user_id, product, description, protocol,
                                                               button_tmp, label, alerting_name,
                                                               location, phone_line)
                        prov_conf.update_std_user(user_id)
                        extension_mobility_pin = conf_data.get_em_pin()
                        update_user_details = prov_conf.update_user_details(user_id, extension_mobility_pin,
                                                                            phone_line, location)
                        prov_conf.update_phone(name)
                        prov_conf.update_device_profile(user_id)
                        prov_conf.enable_voice_mail(user_id)
                        prov_conf.reset_voice_mail_pin(user_id)
                        result_data = {
                            "Device Profile": add_device_profile,
                            "Phone": add_phone,
                            "Update User Details": update_user_details
                        }
                        ui_resp = [result_data]
                        return ui_resp
    except Exception as error:  # pylint: disable=W0703
        return error


def single_user_sfb_script(user_id):
    """
    Function to get single user sfb script
    :param user_id: user id of user
    :return: Boolean and string message
    """
    # pylint: disable=C0301
    script = 'Enable-CsUser -Identity '+user_id+' -sipaddresstype samaccountname -registrarpool "pool1.nxtgenuc.com" -sipdomain "nxtgenuc.com" '
    try:
        output = subprocess.Popen(
            [r"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe", script],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        output1, error = output.communicate()
        if error:
            output_msg = error.decode('utf-8')
            # pylint: disable=C0301
            sub_str = 'Enable-CsUser : Management object not found for identity "vedant.singh@nxtgenuc.com".'
            if (output_msg.find(sub_str)) != -1:
                output_msg = 'User with userid '+ user_id.upper() +' was not found.'
            msg = False
        else:
            output_msg = output1.decode('utf-8')
            # pylint: disable=C0301
            sub_str = 'WARNING: Object with identity "CN=singh.ankur,CN=Users,DC=nxtgenuc,DC=com" was not changed.'
            if (output_msg.find(sub_str)) != -1:
                output_msg = 'User with userid '+user_id.upper()+' already enabled for SFB.'
            msg = True
        return msg, output_msg
    except Exception as error:  # pylint: disable=W0703
        msg = str(error)
        return msg, 'Exception'


def sfb_bulk_prov(filename):
    """
    Function for sfb bulk provisioning
    :param filename: file name
    :return: Boolean or string
    """
    folder_path = os.path.realpath('automate/Uploadfiles')
    new_path = os.path.join(folder_path, filename)
    # pylint: disable=C0301
    bulk_script = '$upns=Get-Content -Path '+'"'+new_path+'"'+'\nforeach( $upn in $upns ){\nEnable-CsUser -identity $upn -sipaddresstype samaccountname -registrarpool "pool1.nxtgenuc.com" -sipdomain "nxtgenuc.com"}'
    script_path = os.path.join(folder_path, 'sfbpsscript.ps1')
    file = open(script_path, 'w+')
    file.write(bulk_script)
    file.close()
    try:
        # pylint: disable=C0301
        output = subprocess.Popen(
            [r"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe", 'automate/Uploadfiles/sfbpsscript.ps1'],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        output1, error = output.communicate()
        if error:
            msg = False
        elif output1:
            msg = True
        else:
            msg = True
        return msg
    except Exception:  # pylint: disable=W0703
        msg = 'Exception'
        return msg
