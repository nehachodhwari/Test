"""
This module contains use cases for creating resources on microsoft and cisco
"""

import datetime
from requests.exceptions import ConnectionError  # pylint: disable=W0622
from flask import render_template, request, redirect, url_for, flash, Blueprint, session
from .forms import CucmAddUserForm, MicrosoftAdAddUser
from .cisco_utils import add_user, get_cucm_user
from .microsoft_utils import add_new_user_ad, get_ad_user, mylist_to_dict
from ..app import cache
from ..auditlogs.audit import capture_audit_log
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.authentication import authorize
from ..auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from ..projectconfig.connection import execution_time
from ..projectconfig import common_config as cfg


create = Blueprint('create', __name__)


@create.route('/cucmaddenduser', methods=['GET', 'POST'])
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def cucm_add_user():
    """
    Function to add users to cucm
    :return: renders a template
    """
    task_data = []
    form = CucmAddUserForm()
    if request.method == 'POST' and form.validate_on_submit():
        # date_of_execution = datetime.datetime.now()
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=cucm_add_user.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        add_user_cuc = add_user(request.form.get('name_first'), request.form.get('name_last'),
                                request.form.get('user_id'), request.form.get('password'),
                                request.form.get('department'))
        userid = request.form.get('user_id')
        if add_user_cuc[0]:
            capture_audit_log(un=unique_identifier, status='Success', date_of_execution=execution_time(),
                              detail='User creation in CUCM:Success')
            flash("User with user id "+(request.form.get('user_id').upper())+
                  " successfully created.", category='success')
            username = session.get('user_id')
            return render_template('createresource/cucmadduser.html', form=form, userid=userid,username=username,
                                   FinalReport='Click here to get user details')
        flash(add_user_cuc[1], category='error')
        capture_audit_log(un=unique_identifier, status='Fail', date_of_execution=execution_time(),
                          detail='User creation in CUCM:Fail')
        username = session.get('user_id')
        return render_template('createresource/cucmadduser.html', form=form, username=username)
    username = session.get('user_id')
    return render_template('createresource/cucmadduser.html', form=form,username=username)


@create.route("/activedirectoryadduser", methods=['POST', 'GET'])
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def add_ad_user():
    """
    Function to add user in AD
    :return: renders a template
    """
    task_data = []
    # date_of_execution = datetime.datetime.now()
    form = MicrosoftAdAddUser()
    if request.method == "POST" and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        try:
            capture_audit_log(un=unique_identifier, func_name=add_ad_user.__name__, status='Executing',
                              date_of_execution=execution_time(), detail=None)
            add_user_ad = add_new_user_ad(request.form)
            task_data.append('Add AD user powershell script executed:Success')
            username = request.form.get('user_id')
            if add_user_ad[1] == 'Task Successful':
                flash('Task successful', category='success')
                status = 'Success'
                task_data.append('User added in AD:Success')
                task_detail = ", ".join(str(data) for data in task_data)
                capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                                  detail=task_detail)
                return render_template("createresource/add_aduser.html", form=form,
                                       username=username, FinalReport="User Details")
            msg = add_user_ad[0]
            flash(msg, category='error')
            if msg == 'The specified account already exists':
                status = 'Success'
                task_data.append('User already exists:Success')
                task_detail = ", ".join(str(data) for data in task_data)
                capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                                  detail=task_detail)
                return render_template("createresource/add_aduser.html", form=form, username=username,
                                       FinalReport="User Details")
        except Exception as error:  # pylint: disable=W0703
            status = 'Fail'
            task_data.append(str(error) + ':Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(), detail=task_detail)
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            return render_template('Exception/exception.html')
    return render_template("createresource/add_aduser.html", form=form)

@create.route('/getcucmuser/<userid>', methods=['get', 'post'])
# @authorize
def get_cucm_user_data(userid):
    """
    Function to fetch the cucm user
    :param userid: user id of user
    :return: renders a template
    """
    # date_of_execution = datetime.datetime.now()
    user_details = get_cucm_user(userid)
    if user_details[0]:
        return render_template('createresource/getcucmuser.html', myresult=user_details[1])
    else:
        flash(user_details[1], category='error')
        return redirect(url_for('create.cucm_add_user'))


@create.route('/getaduser/<userid>', methods=['get', 'post'])
# @authorize
def get_ad_user_data(userid):
    """
    Function to get Ad user details
    :param userid: user id of user
    :return: renders a template
    """
    # date_of_execution = datetime.datetime.now()
    task_data = []
    try:
        getuser = get_ad_user(userid)
        if getuser[1]:
            task_data.append('Get AD user from API completed:Success')
            get_user_data = getuser[0].split('\n')
            userdata = [item for item in get_user_data if item]
            user_details_list = mylist_to_dict(userdata)
            return render_template('createresource/getaduser.html', myresult=user_details_list)
        else:
            flash(getuser[0], category='error')
            return redirect(url_for('create.add_ad_user'))
    except Exception as error:  # pylint: disable=W0703
        flash("Internal Server error. Please try after some time.", category='error')
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        return redirect(url_for('create.add_ad_user'))
