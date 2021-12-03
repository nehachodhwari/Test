"""
This module contains configuration for the flask application
"""

import os
from sqlalchemy.pool import NullPool
from urllib import parse
from dotenv import load_dotenv
load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))
#params = urllib.parse.quote_plus("DRIVER={SQL Server};SERVER=tcp:ngnsql.database.windows.net;
# DATABASE=OctoVoice;UID=AdminNgn;PWD=Practice@12345")
params = parse.quote_plus("DRIVER={ODBC Driver 17 for SQL Server};"
                                 "SERVER=tcp:ngnsql.database.windows.net;DATABASE=OctoVoice;"
                                 "UID=AdminNgn;PWD=Practice@12345")

sess_db_url = parse.quote_plus("DRIVER={ODBC Driver 17 for SQL Server};"
                                "SERVER=tcp:ngnsql.database.windows.net;DATABASE=RendezvousDB;"
                                 "UID=AdminNgn;PWD=Practice@12345")


class BaseConfig:
    """
    Class containing the base configuration for application
    """
    SQLALCHEMY_MAX_OVERFLOW = 20
    SQLALCHEMY_POOL_SIZE = 10
    SQLALCHEMY_POOL_TIMEOUT = 20000
    SQLALCHEMY_POOL_RECYCLE = 28000
    WTF_CSRF_ENABLED = True
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = "b9cd34268d4e4e739da0218d5be785c1"
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')
    MAIL_SUBJECT = 'Pin Reset'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    SQLALCHEMY_MAX_OVERFLOW = 20
    SQLALCHEMY_POOL_SIZE = 10
    SQLALCHEMY_POOL_TIMEOUT = 20000
    SQLALCHEMY_POOL_RECYCLE = 28000
    SQLALCHEMY_DATABASE_URI = "mssql+pyodbc:///?odbc_connect=%s" % params
    SQLALCHEMY_BINDS = {
        "flask_db": SQLALCHEMY_DATABASE_URI,
        "session_db": "mssql+pyodbc:///?odbc_connect=%s" % sess_db_url
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(BaseConfig):
    """
    Class for production configuration of application
    """
    DEBUG = False


class DevelopmentConfig(BaseConfig):
    """
    Class for development configuration of application
    """
    DEVELOPMENT = True
    DEBUG = True
    WTF_CSRF_ENABLED = True
