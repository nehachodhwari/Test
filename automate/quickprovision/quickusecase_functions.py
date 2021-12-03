"""
Module for performing provision of user based on their profile.
"""

from flask import flash
from ..quickprovision import email_users
from ..quickprovision.config import get_em_pin, get_temp_line
from ..quickprovision.msutils import enable_ms_teams
from ..quickprovision.utils import add_udp_extension, update_user_jabber, add_device_profile
from ..quickprovision.utils import enable_vm, add_jabber, reset_vm_pin, update_user_with_dp
from ..quickprovision.utils import update_user_em_details, update_dp, find_phone
from ..quickprovision.utils import update_phone, list_line, add_new_line, add_new_phone
from ..quickprovision.webexutils import list_web_ex_user, update_web_ex_user
from ..quickprovision.zoomutils import enable_zoom
from ..quickprovision.utils import enable_single_number_reach,update_user_phone_device
from ..projectconfig import common_config as cfg
from ..quickprovision.email_users import email_user_provision_details


def quick_provision_executive_profile(**kwargs):  # pylint: disable=R0912, R0914, R0915
    """
    Function to perform quick provision of user with executive profile
    :param kwargs: Dictionary of arguments with necessary data
    :return: task_data for capturing audit logs
    """
    cfg.logger.info("{} {} Quick provisioning of user {} with executive profile".format(cfg.username, cfg.ipaddress,
                                                                                        kwargs.get('user_id')))
    task_data = []
    provision_data = []
    phone_button_template = kwargs.get('phonebuttontemplate')
    calling_privilege = kwargs.get('calling_privilege')
    if kwargs.get('Mac'):
        mac = 'SEP' + str(kwargs.get('Mac'))
        get_phone = find_phone(mac)
        if 'The specified SEP' in get_phone[0]:
            task_data.append('Getting phone from mac address:Success')
            extension_list = list_line(kwargs.get('location'))
            if extension_list[1]:
                task_data.append('Getting available extensions:Success ')
                directory_number = get_temp_line(extension_list, kwargs.get('location'))
                task_data.append('Getting temp line:Success')
                add_line = add_new_line(directory_number, kwargs.get('alerting_name'),
                                        kwargs.get('location'), calling_privilege)
                if add_line[1]:
                    task_data.append('Adding new line:Success')
                    add_phone = add_new_phone(kwargs.get('user_id'), mac, kwargs.get('product'),
                                              kwargs.get('protocol'), kwargs.get('location'),
                                              calling_privilege, phone_button_template,
                                              kwargs.get('alerting_name'),
                                              kwargs.get('alerting_name'), directory_number)
                    if add_phone[1]:
                        msg = "Phone with mac SEP" + kwargs.get('Mac') + " added:Success"
                        provision_data.append("Phone:   SEP" + kwargs.get('Mac'))
                        task_data.append(msg)
                        update_phn = update_phone(mac)
                        if update_phn[1]:
                            task_data.append('Updating Phone:Success')
                            status = 'Success'
                            update_user_associated_device = update_user_phone_device(kwargs.get('user_id'), mac)
                            if update_user_associated_device[1]:
                                task_data.append("Success")
                            else:
                                status = "Fail"
                                msg = "Update user fail due to exception "+ update_user_associated_device[0]
                                task_data.append(msg)
                        else:
                            status = 'Fail'
                            task_data.append('Updating Phone:Fail')
                            msg = "Unable to update phone with mac SEP" + kwargs.get('Mac') + \
                                  " due to exception:    " + update_phn
                            task_data.append(msg)
                            flash(msg, category='error')
                            return task_data, status
                    else:
                        status = 'Fail'
                        # phone_status = False
                        task_data.append('Adding Phone:Fail')
                        msg = "Unable to add phone with mac SEP" + kwargs.get('Mac') + \
                              " due to exception:    " + add_phone[0]
                        task_data.append(msg)
                        flash(msg, category='error')
                        return task_data, status
                else:
                    status = 'Fail'
                    # phone_status = False
                    task_data.append('Adding Line:Fail')
                    msg = "Unable to provision due to exception raised while adding line:    " \
                          + add_line[0]
                    task_data.append(msg)
                    flash(msg, category='error')
                    return task_data, status
            else:
                status = 'Fail'
                task_data.append("Listing line details: Fail")
                msg = "Listing line details failed due to exception:    " \
                      + extension_list[0]
                task_data.append(msg)
                flash(msg, category='error')
                return task_data, status
        else:
            status = 'Fail'
            task_data.append("Finding phone details: Fail")
            msg = "Unable to find phone details with mac SEP" + kwargs.get('Mac') + \
                  " due to exception:    " + get_phone[0]
            task_data.append(msg)
            flash(msg, category='error')
            return task_data, status
    add_line_udp = add_udp_extension(kwargs.get('extension'), kwargs.get('alerting_name'),
                                     kwargs.get('location'), calling_privilege)
    if add_line_udp[1]:  # pylint: disable=R1702
        task_data.append('Adding line to UDP:Success')
        add_user_device_profile = add_device_profile(
            kwargs.get('user_id'), kwargs.get('product'), kwargs.get('protocol'),
            phone_button_template, kwargs.get('alerting_name'), kwargs.get('alerting_name'),
            kwargs.get('location'), kwargs.get('extension'))
        if add_user_device_profile[1]:
            task_data.append('Adding user device profile:Success')
            update_user_dp = update_user_with_dp(kwargs.get('user_id'))
            if update_user_dp[1]:
                task_data.append('Updating user with device profile:Success')
                em_pin = get_em_pin()
                update_user_em_detail = update_user_em_details(
                    kwargs.get('user_id'), em_pin, kwargs.get('extension'), kwargs.get('location'))
                if update_user_em_detail[1]:
                    task_data.append('updating user extension mobility details:Success')
                    dp_enable_services = update_dp(kwargs.get('user_id'))
                    if dp_enable_services[1]:
                        task_data.append('Device profile services enabling:Success')
                        provision_data.append("Extension mobility is enabled.Login pin:    " + em_pin)
                        if kwargs.get('destination') == None:
                            status = 'Success'
                        else:
                            enable_snr = enable_single_number_reach(kwargs.get('user_id'), kwargs.get('extension'),
                                                                    kwargs.get('destination'), kwargs.get('location'),
                                                                    calling_privilege)
                            if enable_snr[1]:
                                task_data.append("Single Number Reach enabled:Success")
                                status = 'Success'
                            else:
                                status = 'Fail'
                                task_data.append('Enabling SNR: Fail')
                                msg = "Enabling SNR for the user" + kwargs.get(
                                    'user_id').upper() + "failed. Due to exception:   " + enable_snr[0]
                                flash(msg, category='error')
                        enable_voice_mail = enable_vm(kwargs.get('user_id'), kwargs.get('extension'))
                        if enable_voice_mail[1]:
                            task_data.append('Enabling voice mail:Success')
                            reset_voice_mail_pin = reset_vm_pin(kwargs.get('user_id'))
                            if reset_voice_mail_pin[1]:
                                vm_pin = reset_voice_mail_pin[1]
                                task_data.append('Resetting voice mail pin:Success')
                                # provision_data.append("Voice mail enabled. Voice mail Pin:  " + vm_pin)
                                status = 'Success'
                                cfg.logger.info(
                                    "{} {} User {} provision successful".format(cfg.username, cfg.ipaddress,
                                                                                kwargs.get('user_id')))
                                flash("User " + kwargs.get('user_id').upper() + " provision successful",
                                      category='success')
                            else:
                                status = 'Fail'
                                task_data.append('Resetting voice mail pin:Fail')
                                msg = "Resetting voice mail pin for the user" + kwargs.get(
                                    'user_id').upper() + "failed. Due to exception:   " + reset_voice_mail_pin[0]
                                flash(msg, category='error')
                        else:
                            status = 'Fail'
                            task_data.append('Enabling voice mail details:Fail')
                            msg = "Enabling voice mail for the user" + kwargs.get(
                                'user_id').upper() + "failed. Due to exception:   " + enable_voice_mail[0]
                            flash(msg, category='error')
                    else:
                        status = 'Fail'
                        msg = "Unable to update services on device profile " + kwargs.get(
                            'user_id').upper() + " due to exception:     " + dp_enable_services[0]
                        flash(msg, category='error')
                        task_data.append('Device profile services enabling:Fail')
                else:
                    status = 'Fail'
                    msg = "Unable to update device profile due to exception:     " \
                          + update_user_em_detail[0]
                    flash(msg, category='error')
                    task_data.append('updating user extension mobility details:Fail')
            else:
                status = 'Fail'
                msg = "Unable to update user device profile" + kwargs.get(
                    'user_id').upper() + " due to exception:      " + update_user_dp[0]
                flash(msg, category='error')
                task_data.append('Updating user with device profile:Fail')
        else:
            status = 'Fail'
            msg = "Unable to add device profile " + kwargs.get(
                'user_id').upper() + " due to exception:       " + add_user_device_profile[0]
            flash(msg, category='error')
            task_data.append('Adding user device profile:Fail')
    else:
        status = 'Fail'
        msg = "Unable to add extension " + kwargs.get('extension') + \
              " due to exception:      " + add_line_udp[0]
        flash(msg, category='error')
        task_data.append('Adding line to UDP:Fail')
    enable_teams = enable_ms_teams(kwargs.get('user_id'),
                                   kwargs.get('location'))
    if enable_teams[0]:
        task_data.append('Enabling MS Teams for user:Success')
        provision_data.append('Microsoft Teams enabled.')
        teams_status = "Success"
    else:
        teams_status = "Fail"
        task_data.append('Enabling MS Teams for user:Fail')
    provision_status = find_status(status, teams_status)
    if provision_status != "Fail":
        send_email_to_user = email_user_provision_details(kwargs.get('email'), provision_data)
    return task_data, provision_status


def quick_provision_knowledge_worker(**kwargs):
    """
    Function to perform quick provision of user with knowledge worker profile
    :param kwargs: Dictionary of arguments with necessary data
    :return: task_data for capturing audit logs
    """
    cfg.logger.info("{} {} Quick provisioning of user {} with worker profile".format(cfg.username, cfg.ipaddress,
                                                                                     kwargs.get('user_id')))
    task_data = []
    provision_data = []
    calling_privilege = kwargs.get('calling_privilege')
    add_line_udp = add_udp_extension(kwargs.get('extension'), kwargs.get('alerting_name'),
                                     kwargs.get('location'), calling_privilege)
    if add_line_udp[1]:
        task_data.append('Adding line for UDP:Success')
        jabber = add_jabber(
            kwargs.get('first_name'), kwargs.get('user_id'), kwargs.get('alerting_name'),
            kwargs.get('alerting_name'), kwargs.get('extension'), kwargs.get('location'),
            calling_privilege)
        if jabber[1]:
            task_data.append('Adding jabber for User:Success')
            update_jabber = update_user_jabber(kwargs.get('user_id'),
                                               'CSF' + str(kwargs.get('user_id')))
            if update_jabber[1]:
                task_data.append('Updating jabber for User:Success')
                provision_data.append("Jabber profile " + 'CSF' + kwargs.get('user_id') + "created")
                enable_voice_mail = enable_vm(kwargs.get('user_id'), kwargs.get('extension'))
                if enable_voice_mail[1]:
                    task_data.append('Enabling voice mail for User:Success')
                    reset_voice_mail_pin = reset_vm_pin(kwargs.get('user_id'))
                    if reset_voice_mail_pin[1]:
                        task_data.append('Resetting voice mail pin for user:Success')
                        vm_pin = reset_voice_mail_pin[0]
                        provision_data.append("Voice mail enabled. Voice mail Pin:  " + vm_pin)
                        status = 'Success'
                        cfg.logger.info("{} {} User {} provision successful".format(cfg.username, cfg.ipaddress,
                                                                                    kwargs.get('user_id')))
                        flash("User " + kwargs.get('user_id').upper() + " provision successful",
                              category='success')
                    else:
                        status = 'Fail'
                        task_data.append('Resetting voice mail pin:Fail')
                        msg = "Resetting voice mail pin for the user" + kwargs.get(
                            'user_id').upper() + "failed. Due to exception:   " + reset_voice_mail_pin[0]
                        flash(msg, category='error')
                else:
                    status = 'Fail'
                    task_data.append('Enabling voice mail details:Fail')
                    msg = "Enabling voice mail for the user" + kwargs.get(
                        'user_id').upper() + "failed. Due to exception:   " + enable_voice_mail[0]
                    flash(msg, category='error')
            else:
                status = 'Fail'
                msg = "Update user fail due to exception " + update_jabber[0]
                task_data.append('Updating jabber for User:Fail')
                flash(msg, category='error')
        else:
            status = 'Fail'
            msg = "Unable to add Jabber due to exception " + jabber[0]
            task_data.append('Adding jabber for User:Fail')
            flash(msg, category='error')
    else:
        status = 'Fail'
        msg = "Unable to add extension " + kwargs.get('extension') + \
              " due to exception:      " + add_line_udp[0]
        flash(msg, category='error')
        task_data.append('Adding line to UDP:Fail')
    if status == 'Success':
        send_email_to_user = email_user_provision_details(kwargs.get('email'), provision_data)
    return task_data, status


def quick_provision_sales(**kwargs):  # pylint: disable=R0912, R0915, R0914
    """
    Function to perform quick provision of user with sales profile
    :param kwargs: Dictionary of arguments with necessary data
    :return: task_data for capturing audit logs
    """
    cfg.logger.info("{} {} Quick provisioning of user {} with sales profile".format(cfg.username, cfg.ipaddress,
                                                                                    kwargs.get('user_id')))
    task_data = []
    provision_data = []
    phone_button_template = kwargs.get('phonebuttontemplate')
    calling_privilege = kwargs.get('calling_privilege')
    add_line_udp = add_udp_extension(kwargs.get('extension'), kwargs.get('alerting_name'),
                                     kwargs.get('location'), calling_privilege)
    if add_line_udp[1]:  # pylint: disable=R1702
        task_data.append('Adding line for UDP:Success')
        add_user_device_profile = add_device_profile(
            kwargs.get('user_id'), kwargs.get('product'), kwargs.get('protocol'),
            phone_button_template, kwargs.get('alerting_name'), kwargs.get('alerting_name'),
            kwargs.get('location'), kwargs.get('extension'))
        if add_user_device_profile[1]:
            task_data.append('Adding user device profile:Success')
            update_user_dp = update_user_with_dp(kwargs.get('user_id'))
            if update_user_dp[1]:
                task_data.append('Updating user device profile:Success')
                em_pin = get_em_pin()
                update_user_em_detail = update_user_em_details(kwargs.get('user_id'),
                                                               em_pin, kwargs.get('extension'),
                                                               kwargs.get('location'))
                if update_user_em_detail[1]:
                    task_data.append('Updating user extension mobility details:Success')
                    provision_data.append('Em pin is : '+em_pin)
                    dp_enable_services = update_dp(kwargs.get('user_id'))
                    if dp_enable_services[1]:
                        task_data.append('Enabling device profile services:Success')
                    else:
                        status = 'Fail'
                        msg = "Unable to update services on device profile " + kwargs.get(
                            'user_id').upper() + " due to exception:     " + dp_enable_services[0]
                        flash(msg, category='error')
                        task_data.append('Enabling device profile services:Fail')
                else:
                    status = 'Fail'
                    msg = "Unable to update device profile due to exception:     " \
                          + update_user_em_detail[0]
                    flash(msg, category='error')
                    task_data.append('updating user extension mobility details:Fail')
            else:
                status = 'Fail'
                msg = "Unable to update user device profile" + kwargs.get(
                    'user_id').upper() + " due to exception:      " + update_user_dp[0]
                flash(msg, category='error')
                task_data.append('Updating user with device profile:Fail')
        else:
            status = 'Fail'
            msg = "Unable to add device profile " + kwargs.get(
                'user_id').upper() + " due to exception:       " + add_user_device_profile[0]
            flash(msg, category='error')
            task_data.append('Adding user device profile:Fail')
    else:
        status = 'Fail'
        msg = "Unable to add extension " + kwargs.get('extension') + \
              " due to exception:      " + add_line_udp[0]
        flash(msg, category='error')
        task_data.append('Adding line to UDP:Fail')

    enable_teams = enable_ms_teams(kwargs.get('user_id'), kwargs.get('location'))
    if enable_teams[1]:
        task_data.append('Enabling MS Teams:Success')
    else:
        status = 'Fail'
        task_data.append('Enabling MS Teams for user:Fail')
        msg = "Enabling ms team failed. Due to exception" + enable_teams[0]
        flash(msg, category='error')

    # get_user_web_ex = list_web_ex_user(kwargs.get('first_name'), kwargs.get('last_name'), kwargs.get('email'))
    # if get_user_web_ex is None:
    #     status = 'Fail'
    #     msg = "Unable to enable WebEx due to exception: User {} {} not found ".format(
    #         kwargs.get('first_name'), kwargs.get('last_name'))
    #     task_data.append('Enabling WebEx:Fail')
    # elif get_user_web_ex[1]:
    #     task_data.append('Getting webex user details: Success')
    #     update_user_web_ex = update_web_ex_user(get_user_web_ex[0])
    #     if update_user_web_ex[1]:
    #         status = 'Success'
    #         cfg.logger.info(
    #             "{} {} User {} provision successful".format(
    #                 cfg.username, cfg.ipaddress, kwargs.get('user_id')))
    #         flash("User " + kwargs.get('user_id').upper() +
    #               " provision successful",
    #               category='success')
    #         task_data.append('Updating WebEx information:Success')
    #     else:
    #         status = 'Fail'
    #         msg = "Unable to enable WebEx due to exception: " \
    #               + update_user_web_ex[0]
    #         task_data.append('Updating WebEx information:Fail')
    #         flash(msg, category='error')
    # else:
    #     status = 'Fail'
    #     msg = "Unable to enable WebEx due to exception: " \
    #           + get_user_web_ex[0]
    #     task_data.append('Enabling WebEx:Fail')
    #     flash(msg, category='error')
    enable_zoom_service = enable_zoom(kwargs.get('first_name'),
                                      kwargs.get('last_name'),
                                      kwargs.get('email'))
    if enable_zoom_service[1]:
        task_data.append('Enabling Zoom services:Success')
    else:
        status = 'Fail'
        msg = "Unable to enable Zoom meeting due to exception: " \
              + enable_zoom_service[0]
        task_data.append('Enabling Zoom services:Fail')
        flash(msg, category='error')
    return task_data
    # return task_data, status


def quick_provision_account_manager(**kwargs):  # pylint: disable=R0912, R0915, R0914
    """
    Function to perform quick provision of user with account manager profile
    :param kwargs: Dictionary of arguments with necessary data
    :return: task_data for capturing audit logs
    """
    cfg.logger.info("{} {} Quick provisioning of user {} with manager profile".format(cfg.username, cfg.ipaddress,
                                                                                      kwargs.get('user_id')))
    task_data = []
    phone_button_template = kwargs.get('phonebuttontemplate')
    calling_privilege = kwargs.get('calling_privilege')
    add_line_udp = add_udp_extension(kwargs.get('extension'), kwargs.get('alerting_name'),
                                     kwargs.get('location'), calling_privilege)
    if add_line_udp[1]:  # pylint: disable=R1702
        task_data.append('Adding Line to UDP:Success')
        add_user_device_profile = add_device_profile(kwargs.get('user_id'), kwargs.get('product'),
                                                     kwargs.get('protocol'), phone_button_template,
                                                     kwargs.get('alerting_name'),
                                                     kwargs.get('alerting_name'),
                                                     kwargs.get('location'),
                                                     kwargs.get('extension'))
        if add_user_device_profile[1]:
            task_data.append('Adding user device profile:Success')
            update_user_dp = update_user_with_dp(kwargs.get('user_id'))
            if update_user_dp[1]:
                task_data.append('Updating user with UDP:Success')
                em_pin = get_em_pin()
                update_user_em_detail = update_user_em_details(kwargs.get('user_id'), em_pin,
                                                               kwargs.get('extension'),
                                                               kwargs.get('location'))
                if update_user_em_detail[1]:
                    task_data.append('Updating users extension mobility details:Success')
                    dp_enable_services = update_dp(kwargs.get('user_id'))
                    if dp_enable_services[1]:
                        task_data.append('Enabling device profile services:Success')
                        enable_voice_mail = enable_vm(kwargs.get('user_id'), kwargs.get('extension'))
                        if enable_voice_mail[1]:
                            task_data.append('Enabling voice mail:Success')
                            reset_voice_mail_pin = reset_vm_pin(kwargs.get('user_id'))
                            if reset_voice_mail_pin[1]:
                                task_data.append('Resetting voice mail pin:Success')
                                vm_pin = reset_voice_mail_pin[0]
                                enable_teams = enable_ms_teams(
                                    kwargs.get('user_id'), kwargs.get('location'))
                                if enable_teams[1]:
                                    task_data.append('Enabling MS teams:Success')
                                    email_users.send_email(em_pin, vm_pin)
                                    task_data.append('Sending email:Success')
                                    enable_zoom_service = enable_zoom(kwargs.get('first_name'),
                                                                      kwargs.get('last_name'))
                                    if enable_zoom_service[1]:
                                        status = 'Success'
                                        task_data.append('Enabling zoom service:Success')
                                        cfg.logger.info(
                                            "{} {} User {} provision successful".format(
                                                cfg.username, cfg.ipaddress, kwargs.get('user_id')))
                                        flash("User " + kwargs.get('user_id').upper() +
                                              " provision successful.", category='success')
                                    else:
                                        status = 'Fail'
                                        msg = "Unable to enable Zoom meeting due to exception: " \
                                              + enable_zoom_service[0]
                                        task_data.append('Enabling zoom service:Fail')
                                        flash(msg, category='error')
                                else:
                                    status = 'Fail'
                                    task_data.append('Enabling MS Teams for user:Fail')
                                    msg = "Enabling ms team failed. Due to exception" + enable_teams[0]
                                    flash(msg, category='error')
                            else:
                                status = 'Fail'
                                task_data.append('Resetting voice mail pin:Fail')
                                msg = "Resetting voice mail pin for the user" + kwargs.get(
                                    'user_id').upper() + "failed. Due to exception:   " + reset_voice_mail_pin[0]
                                flash(msg, category='error')
                        else:
                            status = 'Fail'
                            task_data.append('Enabling voice mail details:Fail')
                            msg = "Enabling voice mail for the user" + kwargs.get(
                                'user_id').upper() + "failed. Due to exception:   " + enable_voice_mail[0]
                            flash(msg, category='error')
                    else:
                        status = 'Fail'
                        msg = "Unable to update services on device profile " + kwargs.get(
                            'user_id').upper() + " due to exception:     " + dp_enable_services[0]
                        flash(msg, category='error')
                        task_data.append('Enabling device profile services:Fail')
                else:
                    status = 'Fail'
                    msg = "Unable to update device profile due to exception:     " \
                          + update_user_em_detail[0]
                    flash(msg, category='error')
                    task_data.append('updating user extension mobility details:Fail')
            else:
                status = 'Fail'
                msg = "Unable to update user device profile" + kwargs.get(
                    'user_id').upper() + " due to exception:      " + update_user_dp[0]
                flash(msg, category='error')
                task_data.append('Updating user with device profile:Fail')
        else:
            status = 'Fail'
            msg = "Unable to add device profile " + kwargs.get(
                'user_id').upper() + " due to exception:       " + add_user_device_profile[0]
            flash(msg, category='error')
            task_data.append('Adding user device profile:Fail')
    else:
        status = 'Fail'
        msg = "Unable to add extension " + kwargs.get('extension') + \
              " due to exception:      " + add_line_udp[0]
        flash(msg, category='error')
        task_data.append('Adding line to UDP:Fail')
    return task_data, status


def find_status(*status):
    if "Fail" not in status:
        provision_status = "Success"
    elif "Success" in status:
        provision_status = "Partial Provisioned"
    else:
        provision_status = "Fail"
    return provision_status


