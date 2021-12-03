"""
This module contains functions for unity connection use cases
"""

from flask import render_template, request, Blueprint, flash, session
from ..auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from ..unityconnection import utils
from ..unityconnection.forms import EnableVoiceMailForm
from ..projectconfig.authentication import authorize
from ..projectconfig.connection import execution_time


unityconn = Blueprint('unityconn', __name__)


@unityconn.route("/enablevoicemail", methods=['POST', 'GET'])
# @timer
# @authorize
def enable_voice_mail():
    """
    Function to enable voice mail for users
    :return: render a template
    """
    form = EnableVoiceMailForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        # date_of_execution = datetime.datetime.now()
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=enable_voice_mail.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        task_data = []
        status = None
        data = request.form.to_dict()
        userid = data['userid']
        user_exist = utils.get_cuc_user(userid)
        if user_exist is None:
            task_data.append('Checking user exists in CUCM:Success')
            search_user_in_import = utils.find_user_in_import_section(userid)
            if search_user_in_import is None:
                flash(userid+" User Not Found", category='error')
                status = 'Success'
                task_data.append('Finding user in import section:Success')
            elif not search_user_in_import[0]:
                status = 'fail'
                flash(search_user_in_import[1], category='error')
                task_data.append(search_user_in_import[1]+':Fail')
            else:
                vm_enable_during_import = utils.import_ldap_user_with_vm_enabled(userid)
                task_data.append('Importing LDAP users:Success')
                if not vm_enable_during_import[1]:
                    status = 'Fail'
                    flash(vm_enable_during_import[0], category='error')
                    task_data.append(vm_enable_during_import[0]+':Fail')
                elif vm_enable_during_import[1]:
                    flash("VM Enabled", category='success')
                    status = 'Success'
                    task_data.append('Importing LDAP users:Success')
                    task_data.append('Enabling voice mail:Success')
        elif user_exist[1]:
            status = 'Success'
            flash("Voice Mail Already enabled", category='info')
            task_data.append('Voice Mail Already enabled:Success')
        elif not user_exist[1]:
            status = 'Fail'
            flash(user_exist[0], category='error')
            task_data.append(user_exist[0]+':Fail')
        task_detail = ", ".join(str(x) for x in task_data)
        capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(), detail=task_detail)
        username = session.get('user_id')
        return render_template('unityconntemp/enablevm.html', form=form, username=username)
    username = session.get('user_id')
    return render_template('unityconntemp/enablevm.html', form=form, username=username)


@unityconn.route("/resetvoicemailpin", methods=['GET', 'POST'])
# @timer
# @authorize
def reset_voice_mail_pin():
    """
    Function to reset voice mail pin for users
    :return: renders template
    """
    form = EnableVoiceMailForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        # date_of_execution = datetime.datetime.now()
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=reset_voice_mail_pin.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        task_data = []
        data = request.form.to_dict()
        userid = data['userid']
        user_exist = utils.get_cuc_user(userid)
        if user_exist is None:
            status = 'Success'
            flash(userid+" User Not Found", category='error')
            task_data.append('Finding user in CUC:Success')
        elif not user_exist[1]:
            status = 'Fail'
            flash(user_exist[0], category='error')
            task_data.append(user_exist[0] + ':Fail')
        else:
            reset_pin = utils.reset_voicemail_pin(userid)
            task_data.append('Finding user in CUC:Success')
            if reset_pin[0]:
                # email.send_email(reset_pin[0])
                flash("Pin Reset Successful", category='success')
                task_data.append('Resetting voice mail pin:Success')
                status = 'Success'
            else:
                status = 'Fail'
                flash("Unable to reset. Please check logs ", category='error')
                task_data.append('Resetting voice mail pin:Fail')
        task_detail = ", ".join(str(data) for data in task_data)
        capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(), detail=task_detail)
        username = session.get('user_id')
        return render_template('unityconntemp/resetvmpin.html', form=form, username=username)
    username = session.get('user_id')
    return render_template('unityconntemp/resetvmpin.html', form=form, username=username)
