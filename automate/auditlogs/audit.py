"""
This module contains functions for auditing data of the application
"""

import datetime
import random
import time as ti
from time import time
from functools import wraps
from flask import render_template, Blueprint, request, session
from sqlalchemy import Table
from sqlalchemy import func
from automate.models.models import Audit, TimeCalc
from ..projectconfig.authentication import authorize
from ..app import db, cache
import csv
import io
from ..quickprovision.utils import list_line
from ..projectconfig import common_config as cfg
from sqlalchemy import exc
from ..errors.error_handler import UnhandledException


audit_log = Blueprint('audit_log', __name__)


# def push_data_to_time_calculation():
#     data_group = db.session.query(cast(Timedata.date_of_execution, Date), Timedata.function_name,
#                                  func.count(Timedata.function_name),
#                                  func.sum(Timedata.time_taken)).group_by(
#         Timedata.function_name, cast(Timedata.date_of_execution, Date)).all()
#     for i in data_group:
#         db.session.query(Timecalc).filter(Timecalc.UseCase == i[1]).update(
#             {Timecalc.Automationtime: i[3], Timecalc.totalautomationrun: i[2]}, synchronize_session=False)
#     db.session.commit()

# @cache.cached(timeout=180)
def get_time_save_data():
    """
    Function to get the time saved for the tool
    :return: None or time in form of hours
    """
    cfg.logger.info("{} {} Getting total time saved using the tool data from database".format(cfg.username, cfg.ipaddress))
    retry_flag = True
    retry_count = 0
    while retry_flag and retry_count < 5:
        try:
            data = db.session.query(func.sum(TimeCalc.Timesaved)).first()
            retry_flag = False
            cfg.logger.info("{} {} Total time saved using the tool data is captured from database successfully".format(cfg.username, cfg.ipaddress))
            for time in data:
                return time/60
        except (exc.InterfaceError, exc.OperationalError, exc.ProgrammingError, exc.SQLAlchemyError, exc.DBAPIError, Exception) as error:  # pylint: disable=W0612, W0703
            retry_count = retry_count + 1
            ti.sleep(1)
    return None


# def time_for_execution(func):
#     @wraps(func)
#     def _time_it(*args, **kwargs):
#         start = int(round(time() * 1000))
#         name = func.__name__
#         if request.method == 'POST':
#             try:
#                 return func(*args, **kwargs)
#             finally:
#                 end_ = int(round(time() * 1000)) - start
#                 minutes = (end_ / (1000 * 60)) % 60
#                 new_time = Timedata(name, minutes, datetime.datetime.utcnow())
#                 db.session.add(new_time)
#                 db.session.commit()
#         else:
#             return func(*args, **kwargs)
#     return _time_it


def generate_random_identifier(digit):
    """
    Function to generate a random number of 7 digits
    :param digit: Number of digits to be generated
    :return: random number of digit
    """
    cfg.logger.info("{} {} Generating random 7 digit number".format(cfg.username, cfg.ipaddress))
    begin = pow(10, digit - 1)
    end = pow(10, digit) - 1
    cfg.logger.info("{} {} Random 7 digit number generated successfully".format(cfg.username, cfg.ipaddress))
    return random.randint(begin, end)


# def log_audit(func):
#     @wraps(func)
#     def inner():
#         if request.method == 'POST':
#             name = func.__name__
#             try:
#                 start_time = round(time() * 1000)
#                 converted_time = int(start_time)
#                 out = func()
#                 end_time = round(time() * 1000)
#                 end_ = int(end_time) - converted_time
#                 minutes = (end_ / (1000 * 60)) % 60
#                 unique_id = generate_random_identifier(7)
#                 print (datetime.datetime.now())
#                 new_audit = Audit(unique_id, name, 'pass', datetime.datetime.now())
#                 new_time = Timedata(name, minutes, datetime.datetime.now())
#                 db.session.add(new_audit)
#                 db.session.add(new_time)
#                 db.session.commit()
#                 db.session.close()
#                 return out
#             except Exception as e:
#
#                 unique_id = generate_random_identifier(7)
#                 new_audit = Audit(unique_id, name, 'fail', datetime.datetime.utcnow())
#                 db.session.add(new_audit)
#                 db.session.commit()
#                 db.session.close()
#                 return func()
#         else:
#             return func()
#     return inner


def timer(function):
    """
    A decorator function for calculating time
    :param function: Function on which decorator is applied
    :return: reference object of inner function
    """
    @wraps(function)
    def wrapper_timer(*args, **kwargs):
        """
        Inner wrapper function for decorator
        :param args: positional arguments for the function
        :param kwargs: keyword arguments for the function
        :return: function with args or function execution value
        """
        if request.method == 'POST':
            name = function.__name__
            start_time = round(time() * 1000)
            converted_time = int(start_time)
            try:
                value = function(*args, **kwargs)
            finally:
                end_time = round(time() * 1000)
                end_ = int(end_time) - converted_time
                elapsed_time = (end_ / (1000 * 60)) % 60
                # isInline = True
                # ins = insert(Timedata, isInline, values=(name,
                # round(elapsed_time, 4), datetime.datetime.now()))
                # new_time = Timedata(name, round(elapsed_time, 4),
                # datetime.datetime.now())
                try:
                    users = Table("TimeData", db.Model.metadata, autoload=True)
                    # mapper(Timedata, users)
                    isInline = True  # pylint: disable=C0103
                    ins = users.insert(None, isInline).values(function_name=name,
                                                              time_taken=round(elapsed_time, 4),
                                                              date_of_execution=datetime.datetime.now())
                    #db.session.add(ins)
                    db.session.execute(ins)
                    db.session.commit()
                except exc.OperationalError as error:  # pylint: disable=W0612, W0703
                    db.session.rollback()
                    if error.args[0] in (2006, 2013, 2014, 2045, 2055):
                        msg = 'Sql server has gone away...'
                        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                        raise UnhandledException(msg)
                    else:
                        msg = 'Oops... Issue with the database...'
                        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                        raise UnhandledException(msg)
                except (exc.InterfaceError, exc.ProgrammingError) as error:
                    db.session.rollback()
                    if "Login failed for user" in str(error):
                        msg = 'DB login failed'
                        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                        raise UnhandledException(msg)
                    else:
                        msg = 'Oops... Issue with the database...'
                        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                        raise UnhandledException(msg)
                except (exc.SQLAlchemyError, exc.DBAPIError) as error:
                    db.session.rollback()
                    msg = 'Oops... Issue with the database...'
                    cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                    raise UnhandledException(msg)
                except Exception as error:
                    db.session.rollback()
                    msg = "Internal server error"
                    cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
                    raise UnhandledException(msg)
                finally:
                    db.session.close()
            return value
        return function(*args, **kwargs)
    return wrapper_timer


def capture_audit_log(**kwargs):
    """
    Function to capture the audit logs of function
    :param kwargs: keyword arguments
    :return: None
    """
    try:
        if kwargs['detail'] is None:
            cfg.logger.info("{} {} Capturing new audit log information".format(cfg.username, cfg.ipaddress))
            new_audit = Audit(un=kwargs['un'], name=kwargs['func_name'],
                              status=kwargs['status'], new_date=kwargs['date_of_execution'],
                              detail=kwargs['detail'])
            db.session.add(new_audit)
            cfg.logger.info("{} {} New audit log information added".format(cfg.username, cfg.ipaddress))
        else:
            cfg.logger.info("{} {} Updating existing audit log information".format(cfg.username, cfg.ipaddress))
            db.session.query(Audit).filter(Audit.un == kwargs['un']).update(dict(status=kwargs['status'], detail=kwargs['detail']))
            cfg.logger.info("{} {} Audit log information updated successfully".format(cfg.username, cfg.ipaddress))
        db.session.commit()
    except exc.OperationalError as error:  # pylint: disable=W0612, W0703
        db.session.rollback()
        if error.args[0] in (2006, 2013, 2014, 2045, 2055):
            msg = 'Sql server has gone away...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
        else:
            msg = 'Oops... Issue with the database...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
    except (exc.InterfaceError, exc.ProgrammingError) as error:
        db.session.rollback()
        if "Login failed for user" in str(error):
            msg = 'DB login failed'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
        else:
            msg = 'Oops... Issue with the database...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
    except (exc.SQLAlchemyError, exc.DBAPIError) as error:
        db.session.rollback()
        msg = 'Oops... Issue with the database...'
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)
    except Exception as error:
        db.session.rollback()
        msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)
    finally:
        db.session.close()


@audit_log.route('/audit_data', methods=["GET"])
# @cache.cached(timeout=180)
# @authorize
def get_audit_data():
    """
    Flask route to get the audit data from db and pass to UI
    :return: renders a template
    """
    try:
        cfg.logger.info("{} {} Getting audit data from database".format(cfg.username, cfg.ipaddress))
        result = db.session.query(Audit).all()
        cfg.logger.info("{} {} Audit data is captured from database".format(cfg.username, cfg.ipaddress))
        username = session.get('user_id')
        return render_template('audit_table.html', data=result, username=username)
    except exc.OperationalError as error:  # pylint: disable=W0612, W0703
        if error.args[0] in (2006, 2013, 2014, 2045, 2055):
            msg = 'Sql server has gone away...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
        else:
            msg = 'Oops... Issue with the database...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
    except (exc.InterfaceError, exc.ProgrammingError) as error:
        if "Login failed for user" in str(error):
            msg = 'DB login failed'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
        else:
            msg = 'Oops... Issue with the database...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
    except (exc.SQLAlchemyError, exc.DBAPIError) as error:
        msg = 'Oops... Issue with the database...'
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)
    except Exception as error:
        msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)




@audit_log.route('/audit_plot', methods=["GET"])
# @cache.cached(timeout=180)
def build_plot():
    """
    FLask route to get the success and failure count of use cases
    :return: dictionary containing data
    """
    cfg.logger.info("{} {} Building plot".format(cfg.username, cfg.ipaddress))
    retry_flag = True
    retry_count = 0
    query_result = None
    while retry_flag and retry_count < 5:
        try:
            query_result = cache.get('success_fail')
            if query_result is None:
                cfg.logger.info("{} {} Getting success/failure count of use cases from database".format(cfg.username,
                                                                                                        cfg.ipaddress))
                query_result = db.session.query(Audit.status, Audit.name, func.count(Audit.name),
                                                func.count(Audit.status)).group_by(Audit.status,
                                                                                   Audit.name).all()
                #cache.set('success_fail', query_result)
                cfg.logger.info("{} {} Captured success/failure count of use cases from database".format(cfg.username,
                                                                                                        cfg.ipaddress))
            retry_flag = False
        except (exc.InterfaceError, exc.OperationalError, exc.ProgrammingError, exc.SQLAlchemyError, exc.DBAPIError, Exception) as error:  # pylint: disable=W0612, W0703
            retry_count = retry_count + 1
            ti.sleep(1)
    fail = 0
    success = 0
    output_data = {}
    for i in query_result:
        if 'fail' in i[0].strip().lower():
            fail = fail + i[len(i) - 1]
        elif 'success' in i[0].strip().lower():
            success = success + i[len(i) - 1]
    output_data['fail'] = fail
    output_data['pass'] = success
    return output_data


@audit_log.route('/top_case', methods=["GET"])
# @cache.cached(timeout=180)
def top_use_case():
    """
    Flask function to get the list of top use cases executed
    :return: dictionary of data
    """
    cfg.logger.info("{} {} Getting list of top use cases executed from database".format(cfg.username, cfg.ipaddress))
    retry_flag = True
    response = None
    retry_count = 0
    while retry_flag and retry_count < 5:
        try:
            response = cache.get('top_cases')
            if response is None:
                response = db.session.query(Audit.name, func.count(Audit.name)).order_by(
                    func.count(Audit.name).desc()).group_by(Audit.name).limit(5).all()
                cache.set('top_cases', response)
                cfg.logger.info("{} {} Captured list of top use cases executed from database".format(cfg.username,
                                                                                                        cfg.ipaddress))
            retry_flag = False
        except (exc.InterfaceError, exc.OperationalError, exc.ProgrammingError, exc.SQLAlchemyError, exc.DBAPIError, Exception) as error:  # pylint: disable=W0612, W0703
            retry_count = retry_count + 1
            ti.sleep(1)
    return dict(response)


# @audit_log.route('/audit_download', methods=["GET"])
# def download_audit_data():
#     result = Audit.query.all()
#     columns = Audit.__table__.columns.keys()
#     data_list = []
#     for user in result:
#         data_list.append([user.name, user.status, user.new_date, user.un])
#     si = io.StringIO()
#     writer = csv.writer(si)
#     writer.writerows(columns)
#     writer.writerows(data_list)
#     output = make_response(si.getvalue())
#     output.headers["Content-Disposition"] = "attachment; filename=export.csv"
#     output.headers["Content-type"] = "text/csv"
#     return output


# @audit_log.route('/get_cucm', methods=["GET"])
# def get_cucm_data():
#     if len(request.args.get('searchValue')) >= 3:
#         userid = request.args.get('searchValue')
#         retry_flag = True
#         retry_count = 0
#         result = None
#         while retry_flag and retry_count < 5:
#             try:
#                 result = db.session.query(CUCM.Userid).filter(
#                 CUCM.Userid.contains(userid)).all()
#                 retry_flag = False
#             except:
#                 retry_count = retry_count + 1
#                 ti.sleep(1)
#             finally:
#                 db.session.close()
#         if result:
#             data_list = {}
#             j = 1
#             for i in result:
#                 data_list[j] = i[0]
#                 j = j + 1
#             return jsonify(data_list)
#         else:
#             s = {'i': 'No record matches for given search key'}
#             return jsonify(s)
#     return jsonify({})


# @audit_log.route('/get_cucm', methods=["GET"])
# def get_cucm_data():
#     if len(request.args.get('searchValue')) >= 3:
#         userid = request.args.get('searchValue')
#         looking_for = '{0}%'.format(userid)
#         retry_flag = True
#         retry_count = 0
#         result = None
#         while retry_flag and retry_count < 5:
#             try:
#                 result = db.session.query(AdUsers.samAccountName).filter(
#                 AdUsers.samAccountName.ilike(looking_for)).all()
#                 retry_flag = False
#             except:
#                 retry_count = retry_count + 1
#                 ti.sleep(1)
#             finally:
#                 db.session.close()
#         if result:
#             data_list = {}
#             j = 1
#             for i in result:
#                 data_list[j] = i[0].strip()
#                 j = j + 1
#             return jsonify(data_list)
#         else:
#             s = {'i': 'No record matches for given search key'}
#             return jsonify(s)
#     return jsonify({})


# @audit_log.route('/get_user', methods=["GET"])
# def get_user():
#     userid = request.args.get('userid')
#     retry_flag = True
#     retry_count = 0
#     result = None
#     while retry_flag and retry_count < 5:
#         try:
#             result = CUCM.query.filter(CUCM.samAccountName==userid).all()
#             retry_flag = False
#         except:
#             retry_count = retry_count + 1
#             ti.sleep(1)
#         finally:
#             db.session.close()
#     if result:
#         for i in result:
#             return {'fname': i.FirstName, 'lname': i.LastName, 'email': i.Mailid,
#             'location': i.location, 'extension': i.extension}
#     return jsonify(message=''), 500


# @audit_log.route('/get_user', methods=["GET"])
# def get_user():
#     userid = request.args.get('userid')
#     retry_flag = True
#     retry_count = 0
#     result = None
#     while retry_flag and retry_count < 5:
#         try:
#             result = AdUsers.query.filter(AdUsers.samAccountName==userid).all()
#             retry_flag = False
#         except:
#             retry_count = retry_count + 1
#             ti.sleep(1)
#         finally:
#             db.session.close()
#     if result:
#         for i in result:
#             profile_name = ProfileMapping.query.filter(i.Title == ProfileMapping.Title).
#             first().ProfileName
#             extension_pick = db.session.query(ExtensionIdentification.Extensionlocation).
#             first().Extensionlocation
#             extension = i.TelephoneNumber if extension_pick == 'TelephoneNumber' else
#             (i.WorkPhone if extension_pick == 'WorkPhone' else '')
#             if not extension.strip():
#                 # extension = db.session.query(ExtensionNumbers.Didnumber).filter(
#                 #     and_(ExtensionNumbers.Location == i.Location, ExtensionNumbers.
#                 Availability == 'Yes')).first()
#                 extension_list = list_line(i.Location.strip())
#                 extension = get_newline(extension_list, i.Location.strip())
#             else:
#                 if check_valid_extension(extension, i.Location):
#                     extension = extension
#                 else:
#                     extension_list = list_line(i.Location.strip())
#                     extension = get_newline(extension_list, i.Location.strip())
#             return {'fname': i.FirstName.strip(), 'lname': i.LastName.strip(),
#             'email': i.Email.strip(), 'location': i.Location.strip(),
#             'extension': extension, 'title': profile_name}
#     return jsonify(message=''), 500


@audit_log.route('/getdetail/<string:audit_id>', methods=["GET", "POST"])
# @authorize
def get_audit_detail(audit_id):
    """
    Function to get the details of the audit
    :param audit_id: id of the audit data
    :return: renders a template
    """
    cfg.logger.info("{} {} Getting details of audit log".format(cfg.username, cfg.ipaddress))
    try:
        if cache.get('audit_id') == audit_id:
            data = cache.get('Audit_detail')
            if data is None:
                data = db.session.query(Audit.un, Audit.detail).filter(Audit.un == audit_id).all()
                cfg.logger.info("{} {} Audit log information captured successfully".format(cfg.username, cfg.ipaddress))
                cache.set('Audit_detail', data)
        else:
            cache.set('audit_id', audit_id)
            data = db.session.query(Audit.un, Audit.detail).filter(Audit.un == audit_id).all()
            cfg.logger.info("{} {} Audit log information captured successfully".format(cfg.username, cfg.ipaddress))
            cache.set('Audit_detail', data)
        username = session.get('user_id')
        return render_template('audit_detail.html', id=data[0][0], detail=data[0][1],  username=username)
    except exc.OperationalError as error:  # pylint: disable=W0612, W0703
        if error.args[0] in (2006, 2013, 2014, 2045, 2055):
            msg = 'Sql server has gone away...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
        else:
            msg = 'Oops... Issue with the database...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
    except (exc.InterfaceError, exc.ProgrammingError) as error:
        if "Login failed for user" in str(error):
            msg = 'DB login failed'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
        else:
            msg = 'Oops... Issue with the database...'
            cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
            raise UnhandledException(msg)
    except (exc.SQLAlchemyError, exc.DBAPIError) as error:
        msg = 'Oops... Issue with the database...'
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)
    except Exception as error:
        msg = "Internal server error"
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)

