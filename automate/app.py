"""
This module contains the set up part of the application
"""
import datetime
import os
import logging
from flask import Flask
from flask_bootstrap import Bootstrap
from flask_wtf.csrf import CSRFProtect
from flask_caching import Cache
from apscheduler.schedulers.background import BackgroundScheduler
from .extension import db
from .config import DevelopmentConfig


__all__ = ['create_app']
UPLOAD_FOLDER = 'automate/Uploadfiles/'
cache = Cache(config={'CACHE_TYPE': 'filesystem', 'CACHE_DIR': '/automate/cache', 'CACHE_DEFAULT_TIMEOUT': 1200,
                      'CACHE_THRESHOLD': 10})


def create_app():
    """
    Function for creating flask app instance for application
    :return: flask app instance
    """
    app = Flask(__name__, template_folder='templates', static_folder='static')
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
    app.config.from_object(DevelopmentConfig)
    configure_extensions(app)
    register_blueprints(app)
    from .projectconfig.common_config import CONTENT_SECURITY_POLICY

    @app.after_request
    def add_headers(response):
        then = datetime.datetime.now() + datetime.timedelta(hours=1)
        # response.headers.add('Expires', then.strftime("%a, %d %b %Y %H:%M:%S GMT"))
        # response.headers['Cache-Control'] = 'public, max-age=3600'
        response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        response.headers.set('Access-Control-Allow-Origin', '*')
        response.headers["X-Frame-Options"] = "SAMEORIGIN"
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Content-Security-Policy'] = f"style-src {CONTENT_SECURITY_POLICY['style-src']}"
        response.headers['Content-Security-Policy'] = f"style-src-elem {CONTENT_SECURITY_POLICY['style-src-elem']}"
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        return response
    # logger = logging.getLogger(__name__)
    # logger.setLevel(logging.INFO)
    #from .auditlogs.handler import SQLAlchemyHandler
    #ch = SQLAlchemyHandler()
    #ch.setLevel(logging.INFO)
    #formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    #ch.setFormatter(formatter)
    #app.logger.addHandler(ch)
    return app


def configure_extensions(app):
    """
    Function for configuring extension for the application
    :param app: current flask app instance
    :return: None
    """
    with app.app_context():
        Bootstrap(app)
        CSRFProtect(app)
        cache.init_app(app)
        db.init_app(app)
        db.reflect(app=app)


def configure_scheduler(app):
    """
    Function to initialize apscheduler for scheduling quick custom provision to execute at specific time
    :param app:
    :return: None
    """
    from apscheduler.schedulers.background import BackgroundScheduler

    sched = BackgroundScheduler(daemon=True)
    from .quickprovision.scheduler import job_details
    sched.add_job(job_details, 'cron', args=[sched,app], minute='*')
    sched.start()


def register_blueprints(app):
    """
    Function for registering blueprints for the application
    :param app: flask app instance
    :return: None
    """
    from .main.mains import main
    from .unityconnection.usecase import unityconn
    from .macd.cucm import macdcucm
    from .provision.provisionusecase import prov
    from .quickprovision.quickusecase import quick
    from .msteams.msteamsusecase import teams
    from .auditlogs.audit import audit_log
    from .selfheal.selfhealupdated import heal
    from .discoverticketanalysis.ticketanalysis import ticket_analysis
    from .createresource.usecase import create
    from .deleteresource.usecase import delete
    from .deprovision.usecase import deprovision
    from .errors.error_handler import error
    from .bulkprovision.usecase import bulk
    from .bulkdeprovision.usecase import bulkdepr
    app.register_blueprint(create, url_prefix='/unifiedcommunication')
    app.register_blueprint(delete, url_prefix='/')
    app.register_blueprint(main, url_prefix='/')
    app.register_blueprint(unityconn, url_prefix='/unity')
    app.register_blueprint(macdcucm, url_prefix ='/unifiedcommunication')
    app.register_blueprint(prov, url_prefix ='/bulkrovisioning')
    app.register_blueprint(bulk, url_prefix='/bulkprovision')
    app.register_blueprint(quick, url_prefix='/provisioning')
    app.register_blueprint(deprovision, url_prefix='/deprovision')
    app.register_blueprint(bulkdepr, url_prefix='/bulkdeprovision')
    app.register_blueprint(teams, url_prefix ='/Ucaas')
    app.register_blueprint(audit_log, url_prefix='/audit')
    app.register_blueprint(heal, url_prefix='/heal')
    app.register_blueprint(ticket_analysis, url_prefix='/tktanalysis')
    app.register_blueprint(error)

