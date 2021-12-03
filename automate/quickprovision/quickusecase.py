"""
Module for functioning of quick custom provision of users
"""

import time as ti
import datetime
from requests.exceptions import ConnectionError  # pylint: disable=W0622
from flask import render_template, request, jsonify, Blueprint, make_response, session
from sqlalchemy import exc
from .quickusecase_functions import quick_provision_executive_profile, \
    quick_provision_knowledge_worker, quick_provision_sales, quick_provision_account_manager
from automate.models.models import AdUsers, ProfileMapping, ExtensionIdentification, LocationMapping
from ..projectconfig.authentication import authorize
from ..quickprovision.utils import list_line, check_valid_extension, get_new_line, get_form_data
from ..projectconfig.connection import create_sess
from ..quickprovision.forms import QuickProvUser
from ..auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from ..app import db
from ..projectconfig.connection import execution_time
from ..projectconfig import common_config as cfg
from .utils import find_phone as fp

service = create_sess()

quick = Blueprint('quick', __name__)


# @quick.errorhandler(ConnectionError)
# def conn_err():
#     """
#     Function to handle connection error during call to functions.
#     :return: Exception template with message
#     """
#     return render_template('Exception/exception.html')


@quick.route("/quickcustomprovision", methods=['GET', 'POST'])
@timer
# @authorize
def quick_custom_provision():
    """
    Function to provision a user using quick provision option
    :return: quick provision template on success or failure with message
    """
    result = None
    form = QuickProvUser()
    if request.method == 'POST' and form.validate_on_submit():
        # date_of_execution = datetime.datetime.now()
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=quick_custom_provision.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        user_profile = (dict(form.user_profile.choices).get(form.user_profile.data))
        if user_profile == "Executive":
            output = get_form_data(form, user_profile)
            result = quick_provision_executive_profile(**output)

        elif user_profile == "Knowledge Worker":
            output = get_form_data(form, user_profile)
            result = quick_provision_knowledge_worker(**output)

        elif user_profile == "Sales":
            output = get_form_data(form, user_profile)
            result = quick_provision_sales(**output)

        elif user_profile == "Account Manager":
            output = get_form_data(form, user_profile)
            result = quick_provision_account_manager(**output)
        user = request.form.get('user_id')
        task_detail = ", ".join(str(x) for x in result[0])
        capture_audit_log(un=unique_identifier, status=result[1], detail=task_detail)
        if result[1] == 'Fail':
            return render_template("quickcustomprovision.html", form=form)
        username = session.get('user_id')
        return render_template("quickcustomprovision.html", form=form, FinalReport="User Details", username=username,
                               user_id=user)
    username = session.get('user_id')
    return render_template("quickcustomprovision.html", username=username, form=form)


@quick.route('/get_user', methods=["GET"])
# @authorize
def get_users():
    """
    Function to get user details from AD when user id id entered in quick custom form
    :return: list of users found else None
    """
    if len(request.args.get('searchValue')) >= 3:
        user_id = request.args.get('searchValue')
        looking_for = '{0}%'.format(user_id)
        retry_flag = True
        retry_count = 0
        db_users = None
        while retry_flag and retry_count < 5:
            try:
                cfg.logger.info("{} {} Getting user {} details from active directory".format(cfg.username, cfg.ipaddress, user_id))
                db_users = db.session.query(AdUsers.samAccountName).filter(
                    AdUsers.samAccountName.ilike(looking_for)).all()
                cfg.logger.info("{} {} User {} details captured successfully".format(cfg.username, cfg.ipaddress, user_id))
                retry_flag = False
            except exc.SQLAlchemyError as error:
                cfg.logger.info("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                retry_count = retry_count + 1
                ti.sleep(1)
                if retry_count == 4:
                    err_msg = "Database connectivity error"
                    return jsonify(message=err_msg), 500
            except Exception as error:
                cfg.logger.info("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                retry_count = retry_count + 1
                ti.sleep(1)
                if retry_count == 4:
                    err_msg = 'Internal server error'
                    return jsonify(message=err_msg), 500
            finally:
                db.session.close()
        if db_users:
            user_list = {}
            count = 1
            for users in db_users:
                user_list[count] = users[0].strip()
                count = count + 1
            return jsonify(user_list)
        no_users = {'users': 'No record matches for given search key'}
        return jsonify(no_users)
    return jsonify({})


@quick.route('/get_details', methods=["GET"])
#@authorize
def get_user_details():
    """
    Function to get the details of user.
    :return: json containing user details
    """
    user_id = request.args.get('userid')
    retry_flag = True
    retry_count = 0
    user_data = None
    cfg.logger.info("{} {} Getting user {} details".format(cfg.username, cfg.ipaddress, user_id))
    while retry_flag and retry_count < 5:
        try:
            user_data = AdUsers.query.filter(AdUsers.samAccountName == user_id).all()
            cfg.logger.info("{} {} User {} details captured successfully".format(cfg.username, cfg.ipaddress, user_id))
            retry_flag = False
        except exc.SQLAlchemyError as error:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            retry_count = retry_count + 1
            ti.sleep(1)
            if retry_count == 4:
                err_msg = "Database connectivity error"
                return jsonify(message=err_msg), 502
        except Exception as error:
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            retry_count = retry_count + 1
            ti.sleep(1)
            if retry_count == 4:
                err_msg = "Internal server error"
                return jsonify(message=err_msg), error.code
        finally:
            db.session.close()
    if user_data:
        for data in user_data:
            try:
                profile_name = db.session.query(ProfileMapping).filter(data.Title == ProfileMapping.Title).\
                    first().ProfileName
                extension_pick = db.session.query(ExtensionIdentification.Extensionlocation).\
                    first().Extensionlocation
                location = data.Location.strip()
                mapped_location = db.session.query(LocationMapping.SiteCode).filter(LocationMapping.Location == location).first().SiteCode
                extension = data.TelephoneNumber if extension_pick == 'TelephoneNumber' else \
                    (data.WorkphoneNumber if extension_pick == 'WorkPhone' else '')
                if not check_valid_extension(extension, mapped_location):
                    extension_list = list_line(mapped_location)
                    if extension_list[1]:
                        extension = get_new_line(extension_list[0], mapped_location)
                    else:
                        return jsonify(message=extension_list[0]), 500
                output = {'fname': data.FirstName.strip(), 'lname': data.LastName.strip(),
                          'email': data.Email.strip(), 'location': location, 'extension': extension,
                          'title': profile_name}
                return jsonify(output)
            except exc.SQLAlchemyError as error:
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                err_msg = 'Database connectivity error'
                return jsonify(message=err_msg), 502
            except Exception as error:
                print(error)
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                err_msg = 'Internal server error'
                return jsonify(message=err_msg), 500
    cfg.logger.info("{} {} No data found for the user {}".format(cfg.username, cfg.ipaddress, user_id))
    return jsonify(message='No User data found for the user'), 404


@quick.route('/get_mac', methods=["GET"])
def find_device():
    """
    function to check if phone exist in cucm
    """
    mac = request.args.get('searchValue')
    search_phone = fp('SEP'+mac)
    if search_phone[1]:
        return jsonify(message='Device already exist. Enter new device.'), 409
    else:
        return jsonify(message=''), 200
    return None



