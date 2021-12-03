"""
This module contains SQL handler for logging of application to DB
"""

import traceback
import logging
from automate.models.models import Log
from ..app import db as DB


class SQLAlchemyHandler(logging.Handler):
    """
    Class for logging handler using sqlalchemy
    """
    def emit(self, record):
        trace = None
        exc = record.__dict__['exc_info']
        if exc:
            trace = traceback.format_exc()
        log = Log(
            logger=record.__dict__['name'],
            level=record.__dict__['levelname'],
            trace=trace,
            created_at= record.__dict__['asctime'],
            msg=record.__dict__['msg'],)
        DB.session.add(log)
        DB.session.commit()
