"""
This module contains use case for msteams
"""

import datetime
import winrm
from flask import render_template, request, Blueprint, flash
from zeep.exceptions import Fault

from ..app import cache
from ..auditlogs.audit import capture_audit_log, timer
from ..msteams import utils
from ..msteams.forms import MeetingMigration, MeetingMigrationStatus, UpgradeToTeams
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.authentication import authorize
from ..auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from ..projectconfig.connection import execution_time
from ..projectconfig import common_config as cfg


teams = Blueprint('teams', __name__)


@teams.route("/meetingmigration", methods=['POST', 'GET'])
@timer
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
@authorize
def msteams_meeting_migration():
    """
    Function for migration of msteams
    :return: renders template
    """
    form = MeetingMigration()
    if request.method == 'POST' and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=msteams_meeting_migration.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        task_data = []
        user_id = request.form.get('user_id')
        auth_details = utils.get_auth_details()
        migration_script = utils.get_script_mm(user_id)
        task_data.append('Getting MS Teams meeting migration Script:Success')
        try:
            cfg.logger.info("{} {} Migrating user {} to ms teams".format(cfg.username, cfg.ipaddress, user_id))
            sess = winrm.Session('172.17.122.108', auth=auth_details, transport='ntlm')
            run_powershell_script = sess.run_ps(migration_script)
            if run_powershell_script.std_err:
                cfg.logger.warning("{} {} User {} migration to ms teams failed".format(cfg.username, cfg.ipaddress, user_id))
                flash('Task Failed. Please check logs for details.', category='error')
                task_data.append('MS Teams meeting migration powershell script executed:Fail')
                status = 'Fail'
            else:
                status = 'Success'
                task_data.append('MS Teams meeting migration powershell script executed:Success')
                cfg.logger.info(
                    "{} {} User {} successfully migrated to ms teams".format(cfg.username, cfg.ipaddress, user_id))
                flash('Task Successful', category='success')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template('meetingmigration.html', form=form)
        except Fault as error:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            flash("Internal server error occurred. Please check logs for more details.",
                  category='error')
            status = 'Fail'
            task_data.append(str(error.message) + ":Fail")
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template('meetingmigration.html', form=form)
    return render_template('meetingmigration.html', form=form)


@teams.route("/meetingmigrationstatus", methods=['POST', 'GET'])
@timer
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
@authorize
def msteams_meeting_migration_status():
    """
    Function for checking meeting migration status
    :return: renders template
    """
    form = MeetingMigrationStatus()
    if request.method == 'POST' and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=msteams_meeting_migration_status.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        task_data = []
        # date_of_execution = datetime.datetime.now()
        user_id = request.form.get('user_id')
        auth_details = utils.get_auth_details()
        migration_status_script = utils.get_script_mms(user_id)
        try:
            cfg.logger.info("{} {} Validating ms teams meeting migration status of user {}".format(cfg.username, cfg.ipaddress, user_id))
            sess = winrm.Session('172.17.122.108', auth=auth_details, transport='ntlm')
            run_powershell_script = sess.run_ps(migration_status_script)
            if run_powershell_script.std_err:
                cfg.logger.warning(
                    "{} {} Ms teams meeting migration of user {} failed".format(cfg.username, cfg.ipaddress, user_id))
                status = 'Fail'
                task_data.append('MS Teams meeting migration status powershell script executed:Fail')
                flash('Task failed. Please check logs for details.', category='error')
            else:
                cfg.logger.info(
                    "{} {} Ms teams meeting migration of user {} successful".format(cfg.username, cfg.ipaddress,
                                                                                    user_id))
                status = 'Success'
                task_data.append('MS Teams meeting migration status powershell script executed:Success')
                flash('Task Successful.', category='success')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template("meetingmigrationstatus.html", form=form)
        except Fault as error:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            status = 'Fail'
            flash("Intenal server error occured. Please check logs for more details.",
                  category='error')
            task_data.append(str(error.message) + ':Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template("meetingmigrationstatus.html", form=form)
    return render_template('meetingmigrationstatus.html', form=form)


@teams.route("/upgradetoteams", methods=['POST','GET'])
@timer
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
@authorize
def msteams_upgrade_toteams():
    """
    Function to upgrade to msteams
    :return: renders template
    """
    form = UpgradeToTeams()
    pn_script = None
    if request.method == 'POST' and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=msteams_upgrade_toteams.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        task_data = []
        # date_of_execution = datetime.datetime.now()
        auth_details = utils.get_auth_details()
        try:
            pn_script = utils.get_script_upgrade_to_teams(request.form.get('user_id'))
        except Exception as error:  # pylint: disable=W0703
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            status = 'fail'
        try:
            cfg.logger.info("{} {} Upgrading user {} to ms teams ".format(cfg.username, cfg.ipaddress, request.form.get('user_id')))
            sess = winrm.Session('172.17.122.108', auth=auth_details, transport='ntlm')
            run_powershell_script = sess.run_ps(pn_script)

            if run_powershell_script.std_err:
                cfg.logger.info("{} {} Upgrading user {} to ms teams task is failed".format(cfg.username, cfg.ipaddress,
                                                                                            request.form.get(
                                                                                                'user_id')))
                status = 'Fail'
                task_data.append('upgrade to ms teams powershell script executed:Fail')
                error = run_powershell_script.std_err.decode('utf-8').split('\n')[0]
                flash(error, category='error')
            else:
                cfg.logger.info(
                    "{} {} Upgrading user {} to ms teams task is successful".format(cfg.username, cfg.ipaddress,
                                                                                    request.form.get('user_id')))
                status = 'Success'
                task_data.append('upgrade to ms teams powershell script executed:Success')
                flash('Task Successful', category='success')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template("upgrade_to_teams.html", form=form)
        except Fault as error:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            status = 'Fail'
            flash('An internal server error occured. Please check logs', category='error')
            task_data.append(str(error.message) + ':Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status,
                              date_of_execution=execution_time(), detail=task_detail)
            return render_template("upgrade_to_teams.html", form=form)
    return render_template('upgrade_to_teams.html', form=form)
