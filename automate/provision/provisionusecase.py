"""
This module contains use cases for provisioning use cases
"""

import os
import datetime
from flask import current_app as app, session
from flask import render_template, request, redirect, flash, Blueprint
from werkzeug.utils import secure_filename
from automate.auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from automate.provision import utils as ut
from automate.projectconfig.connection import create_sess
from automate.provision.forms import SingleUserSfb
from ..app import cache
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.authentication import authorize
from ..projectconfig.connection import execution_time
from ..projectconfig import common_config as cfg

service = create_sess()

prov = Blueprint('prov', __name__)


@prov.route("/singlesfbprov", methods=['POST', 'GET'])
@timer
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
@authorize
def single_user_sfb_provision():
    """
    Flask route for provisioning of single user for sfb
    :return: renders a template
    """
    # date_of_execution = datetime.datetime.now()
    form = SingleUserSfb()
    task_data = []
    if request.method == "POST" and form.validate_on_submit():
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=single_user_sfb_provision.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        try:
            # capture_audit_log(un=unique_identifier, func_name=single_user_sfb_provision.__name__, status='Executing',
            #                   date_of_execution=date_of_execution, detail=None)
            user_id = request.form.get('user_id')
            cfg.logger.info("{} {} Provisioning user {} for sfb".format(cfg.username, cfg.ipaddress, user_id))
            enable_sfb = ut.single_user_sfb_script(user_id)
            if enable_sfb[0]:
                cfg.logger.info("{} {} User {} provisioning completed successfully".format(cfg.username, cfg.ipaddress, user_id))
                status = 'Success'
                flash('Task successful.', category='success')
                task_data.append('Running script:Success')
                flash(enable_sfb[1], category='info')
            elif not enable_sfb[0]:
                cfg.logger.warning("{} {} User {} provisioning failed".format(cfg.username, cfg.ipaddress, user_id))
                status = 'Fail'
                flash('Task failed.', category='error')
                flash(enable_sfb[1], category='info')
                task_data.append('Running script:Fail')
            else:
                status = 'Fail'
                flash('An internal server error occurred.', category='error')
                task_data.append('Running script:Fail')
            task_detail = ", ".join(str(x) for x in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            return render_template("single_user_sfb_provisioning.html", form=form)
        except Exception as error:  # pylint: disable=W0703
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            status = 'Fail'
            flash('An internal server error occurred. Please check logs for more details.',
                  category='error')
            task_data.append('Exception occurred while processing request:Fail ')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            return render_template("single_user_sfb_provisioning.html", form=form)
    return render_template("single_user_sfb_provisioning.html", form=form)


@prov.route("/bulkprovisioning", methods=['POST', 'GET'])
@timer
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
@authorize
def bulk_prov():
    """
    Function for bulk provisioning of users
    :return: renders template or redirects to same page in case of error
    """
    if request.method == 'POST':
        task_data = []
        # date_of_execution = datetime.datetime.now()
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=bulk_prov.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        file = request.files['file']
        cfg.logger.info("{} {} Bulk provisioning of users task executing".format(cfg.username, cfg.ipaddress))
        if file.filename == '':
            cfg.logger.warning("{} {} No file selected for uploading".format(cfg.username, cfg.ipaddress))
            flash('No file selected for uploading')
            status = 'Fail'
            task_data.append('No file selected in upload:Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            return redirect(request.url)
        if file and ut.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            cfg.logger.info("{} {} File uploaded successfully".format(cfg.username, cfg.ipaddress))
            flash('File successfully uploaded')
            try:
                ut.prov_bulk_user(str(filename))
                status = 'Success'
                cfg.logger.info(
                    "{} {} Bulk provisioning of users task is successful".format(cfg.username, cfg.ipaddress))
                task_data.append('User bulk provisioning:Success')
            except Exception as error:  # pylint: disable=W0703
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                flash('Some exception occured')
                status = 'Fail'
                task_data.append('User bulk provisioning:Fail')
                task_detail = ", ".join(str(data) for data in task_data)
                capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                                  detail=task_detail)
                username = session.get('user_id')
                return render_template("bulk_proform.html", username=username)
            task_detail = ", ".join(str(x) for x in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            username = session.get('user_id')
            return render_template("bulk_proform.html", myresult="Task Successful", username=username)
        flash('Allowed file type is csv')
        status = 'Fail'
        task_data.append('Bulk provisioning File type Error:Fail')
        task_detail = ", ".join(str(data) for data in task_data)
        capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                          detail=task_detail)
        return redirect(request.url)
    username = session.get('user_id')
    return render_template("bulk_proform.html", username=username)


@prov.route("/bulkprovisioningsfb", methods=['POST', 'GET'])
@timer
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
@authorize
def bulk_prov_sfb():
    """
    Function for bulk provisioning of users in sfb
    :return: renders template or redirects to same page in case of error
    """
    if request.method == 'POST':
        # date_of_execution = datetime.datetime.now()
        task_data = []
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=bulk_prov_sfb.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        file = request.files['file']
        cfg.logger.info("{} {} SFB bulk provisioning of users task executing".format(cfg.username, cfg.ipaddress))
        if file.filename == '':
            status = 'Fail'
            task_data.append('SFB bulk provisioning file found:Fail')
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            flash('No file selected for uploading')
            cfg.logger.warning("{} {} No file selected for uploading".format(cfg.username, cfg.ipaddress))
            return redirect(request.url)
        if file and ut.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            task_data.append('SFB bulk provisioning file found:Success')
            flash('File successfully uploaded')
            cfg.logger.info("{} {} File uploaded successfully".format(cfg.username, cfg.ipaddress))
            try:
                task_data.append('File upload:Success')
                cfg.logger.info("{} {} SFB bulk provisioning of users task is successful".format(cfg.username, cfg.ipaddress))
                ut.sfb_bulk_prov(str(filename))
                task_data.append('SFB User bulk Provisioning:Success')
                status = 'Success'
            except Exception as error:  # pylint: disable=W0703
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddressm, error))
                flash('Some exception occurred')
                status = 'Fail'
                task_data.append('SFB user bulk Provisioning:Fail')
                task_detail = ", ".join(str(data) for data in task_data)
                capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                                  detail=task_detail)
                username = session.get('user_id')
                return render_template("bulk_proform_sfb.html", username=username)
            task_detail = ", ".join(str(data) for data in task_data)
            capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                              detail=task_detail)
            username = session.get('user_id')
            return render_template("bulk_proform_sfb.html", myresult="Task Successful", username=username)
        flash('Allowed file type is csv')
        status = 'Fail'
        task_data.append('File upload:Fail')
        task_detail = ", ".join(str(data) for data in task_data)
        capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(),
                          detail=task_detail)
        return redirect(request.url)
    username = session.get('user_id')
    return render_template("bulk_proform_sfb.html", username=username)
