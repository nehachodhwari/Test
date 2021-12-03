"""
This module contains the main entry point for the application user interface
"""

from flask import render_template, Blueprint, session, redirect
from ..auditlogs.audit import get_time_save_data
from ..projectconfig import common_config as cfg
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.authentication import authorize
# from ..app import cache
from ..errors.error_handler import UnhandledException

main = Blueprint('main', __name__)


# pylint: disable=C0103
@main.route("/")
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def automate_home():
    """
    Function for home page redirection
    :return: template for home page
    """
    try:
        cfg.logger.info("{} {} Automate home dashboard loading".format(cfg.username, cfg.ipaddress))
        data = round(get_time_save_data(), 2)
        username = session.get('user_id')
        cfg.logger.info("{} {} Automate home dashboard loaded successfully".format(cfg.username, cfg.ipaddress))
        return render_template("dashboard1.html", data=data, username=username)
    except TypeError as error:
        msg = 'Dashboard loading failed'
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)



@main.route("/prv_home")
#@cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def provisioning_home():
    """
    Function for provisioning home page redirection
    :return: template for provisioning home page
    """
    try:
        cfg.logger.info("{} {} Provisioning home dashboard loading".format(cfg.username, cfg.ipaddress))
        data = round(get_time_save_data(), 2)
        username = session.get('user_id')
        cfg.logger.info("{} {} Provisioning home dashboard loaded successfully".format(cfg.username, cfg.ipaddress))
        return render_template("dashboard2.html", data=data, username=username)
    except TypeError as error:
        msg = 'Dashboard loading failed'
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)


@main.route("/deprov_home")
#@cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def deprovisioning_home():
    """
    Function for provisioning home page redirection
    :return: template for provisioning home page
    """
    try:
        cfg.logger.info("{} {} Deprovisioning home dashboard loading".format(cfg.username, cfg.ipaddress))
        data = round(get_time_save_data(), 2)
        username = session.get('user_id')
        cfg.logger.info("{} {} Deprovisioning home dashboard loaded successfully".format(cfg.username, cfg.ipaddress))
        return render_template("dashboard4.html", data=data, username=username)
    except TypeError as error:
        msg = 'Dashboard loading failed'
        cfg.logger.error("{} {} {}".format(cfg.username, cfg.ipaddress, error))
        raise UnhandledException(msg)

#main_routing
a=0
@main.route("/post_login")
# @authorize
def post_login_url():
    """
    Function to return the post login page
    @return: post login page
    """
    session_id = session.get('sess_id')
    url = cfg.INTEGRATION_URL['post_login'].format(session_id)
    session.clear()
    return redirect(url)


@main.route("/settings_page")
# @authorize
def settings_page_url():
    """
    Function to return the settings page
    @return: settings page
    """
    session_id = session.get('sess_id')
    url = cfg.INTEGRATION_URL['settings_page'].format(session_id)
    session.clear()
    return redirect(url)


@main.route("/help_page")
# @authorize
def help_page_url():
    """
    Function to return the help page
    @return: help page
    """
    session_id = session.get('sess_id')
    url = cfg.INTEGRATION_URL['help_page'].format(session_id)
    session.clear()
    return redirect(url)


@main.route("/logout")
# @authorize
def logout():
    """
    Function for logging out user from the application
    :return: None
    """
    session.clear()
    # cache.clear()
    cfg.logger.info("{} {} logout successful".format(cfg.username, cfg.ipaddress))
    return redirect(cfg.INTEGRATION_URL['login_page'])
