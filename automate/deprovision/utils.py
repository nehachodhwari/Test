from flask import request

from ..models.models import AdUsers, ProfileMapping, ExtensionIdentification, LocationMapping
from ..projectconfig import common_config as cfg
from sqlalchemy import exc
import time as ti
from flask import jsonify
from ..app import db
import re


def get_user_configurations(user_id):
    """
    Function to get the details of user.
    :return: json containing user details
    """
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
                location = data.Location.strip()
                output = {'location': location, 'title': profile_name}
                # return jsonify(output)
                return output
            except exc.SQLAlchemyError as error:
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                err_msg = 'Database connectivity error'
                return jsonify(message=err_msg), 502
            except Exception as error:
                cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                err_msg = 'Internal server error'
                return jsonify(message=err_msg), 500
    cfg.logger.info("{} {} No data found for the user {}".format(cfg.username, cfg.ipaddress, user_id))
    return jsonify(message='No User data found for the user'), 404


def get_form_data(form, user_profile):
    """
    Function to get required form data.
    """

    b = request.form
    print(b)
    x = request.form.get('check_ms_teams')
    print(x)
    mapped_location = db.session.query(LocationMapping.SiteCode).filter(
        LocationMapping.Location == request.form.get('location')).first().SiteCode
    extension = request.form.get('extension')
    if extension in ['', 'NA']:
        extension = None
    else:
        extension = extension
    route_partition = request.form.get('route_partition')
    if route_partition in ['', 'NA']:
        route_partition = None
    else:
        route_partition = route_partition
    user_dp = request.form.get('device_profile')
    if user_dp in ['', 'NA']:
        user_dp = None
    else:
        user_dp = user_dp
    phone = request.form.get('phone')
    if phone in ['', 'NA']:
        phone = None
    else:
        phone = phone
    remote_destination = request.form.get('remote_dp')
    if remote_destination in ['', 'NA']:
        remote_destination = None
    else:
        remote_destination = remote_destination
    output = {'first_name': request.form.get('name_first'),
              'last_name': request.form.get('name_last'),
              'user_id': request.form.get('user_id'),
              'email': request.form.get('email'),
              'location': mapped_location,
              'device_profile': user_dp,
              'phone_mac': phone,
              'remote_dp': remote_destination,
              'extension': extension,
              'route_partition': route_partition,
              'voice_mail': request.form.get('voice_mail_state'),
              'meet_webex_teams': request.form.get('meeting_webex_teams'),
              'meet_ms_teams': request.form.get('meeting_ms_teams'),
              'meet_skype': request.form.get('meeting_skype'),
              'im_webex_teams': request.form.get('im_presence_webex_teams'),
              'im_ms_teams': request.form.get('im_presence_ms_teams'),
              'im_skype': request.form.get('im_presence_skype'),
              'voicemail_cuc': request.form.get('vm_cuc'),
              'voicemail_exchange': request.form.get('vm_exchange')
              }
              # 'ms_teams': 'y'}
    return output


# def format_extension(extension):
#     pattern = r'(?:\\\+)'
#     replacement = r'\+'
#     if re.search(pattern, extension) is not None:
#         formatted_dn = re.sub(pattern, replacement, extension)
#     else:
#         formatted_dn = extension
#     return formatted_dn

