"""
This module contains user authentication functions
"""

import datetime
from functools import wraps
from flask import session, redirect, request
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import load_only
from ..projectconfig import common_config as cfg
from ..models.models import Session
from ..app import db


def authorize(func):
    """
    Decorator function for authorizing user before accessing any route
    :param func: Function on which decorator is applied
    :return: reference object of inner function
    """
    @wraps(func)
    def inner_function(*args, **kwargs):
        """
        Inner function for performing validation functions
        :param args: positional arguments for the function
        :param kwargs: keyword arguments for the function
        :return: function and inner func reference or redirects to home page
        """
        current_time = datetime.datetime.now()
        sess_id = request.args.get('sess_id')
        if sess_id is None:
            sess_id = session.get('sess_id')
            data = get_session_data(sess_id)
            expiry_time = data[0]
            timeout = data[1]
            if check_session_expiry(expiry_time, current_time, sess_id, timeout, False):
                return func(*args, **kwargs)
        session_data = get_session_data(sess_id)
        if session_data:
            expiry_time = session_data[0]
            timeout = session_data[1]
            user_id = session_data[2]
            if check_session_expiry(expiry_time, current_time, sess_id, timeout, True,
                                    user_id=user_id):
                return func(*args, **kwargs)
        return redirect(cfg.INTEGRATION_URL['login_page'])
    return inner_function


def get_session_data(sess_id):
    """
    Function to get session data from database
    @param sess_id: session id
    @return: session data or error if exception
    """
    expiry_time = None
    timeout = None
    user_id = None
    fields = ['SessionTimeout', 'ExpiryDate', 'UserName']
    try:
        db_session_data = db.session.query(Session).filter(Session.SessionID == sess_id).\
            options(load_only(*fields)).all()
    except SQLAlchemyError as sql_error:
        error = str(sql_error.__dict__['orig'])
        return error
    session_data = []
    if db_session_data:
        for data in db_session_data:
            expiry_time = data.ExpiryDate
            timeout = data.SessionTimeout
            user_id = data.UserName
        session_data = [expiry_time, timeout, user_id]
    return session_data


def update_session_expiry_time(sess_id, timeout):
    """
    Function to update the expiry time of session
    @param sess_id: session id
    @param timeout: timeout for session
    @return: Boolean True if success else error
    """
    try:
        db.session.query(Session).filter(Session.SessionID == sess_id).update(
            dict(ExpiryDate=datetime.datetime.now() + datetime.timedelta(minutes=timeout)))
        db.session.commit()
    except SQLAlchemyError as sql_error:
        error = str(sql_error.__dict__['orig'])
        return error
    return True


def check_session_expiry(expiry_time, current_time, sess_id, timeout, flag, user_id=None):
    """
    Function to check if session is valid or not
    @param expiry_time: expiry time of session
    @param current_time: current time
    @param sess_id: session id
    @param timeout: timeout of session in minutes
    @param flag: flag to set session
    @param user_id: user name of session user
    @return: Boolean true if success else redirect to login page
    """
    if expiry_time > current_time:
        if flag:
            session['sess_id'] = sess_id
            session['user_id'] = user_id
        if update_session_expiry_time(sess_id, timeout):
            return True
    else:
        session.clear()
        return redirect(cfg.INTEGRATION_URL['login_page'])
