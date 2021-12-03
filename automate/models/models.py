"""
This module contains the database model classes for the application
"""

from flask_login import UserMixin
from automate.app import db


class User(db.Model, UserMixin):
    """
    user model class for mapping users session
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['Users']

    def __init__(self, id, name, email):  # pylint: disable=W0622
        self.id = id  # pylint: disable=C0103
        self.name = name  # pylint: disable=C0103
        self.email = email  # pylint: disable=C0103

    def __repr__(self):
        return '<User %r>' % self.name


class Audit(db.Model):  # pylint: disable=R0903
    """
    Audit model class for mapping audit data to database
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['audit']

    def __init__(self, un, name, status, new_date, detail):
        self.un = un  # pylint: disable=C0103
        self.name = name
        self.status = status
        self.new_date = new_date
        self.detail = detail

    def __repr__(self):
        return '<User %r>' % self.name


class Timedata(object):  # pylint: disable=R0205, R0903
    """
    Proxy timedata model class for mapping to database
    """
    pass  # pylint: disable=W0107


class TimeCalc(db.Model):  # pylint: disable=R0903
    """
    Time calculation model class for database
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['timecalculation']
    __table_args__ = {'implicit_returning': False}

    def __init__(self, UseCase, Manualtime, Automationtime, totalautomationrun, Timesaved):
        self.UseCase = UseCase  # pylint: disable=C0103
        self.Manualtime = Manualtime  # pylint: disable=C0103
        self.Automationtime = Automationtime  # pylint: disable=C0103
        self.totalautomationrun = totalautomationrun  # pylint: disable=C0103
        self.Timesaved = Timesaved  # pylint: disable=C0103

    def __repr__(self):
        return '<USecase %r>' % self.UseCase


class IspProvider(db.Model):  # pylint: disable=R0903
    """
    ISP provider model class
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['IspProvider']

    def __init__(self, Interface, CircuitID, ISP):
        self.Interface = Interface  # pylint: disable=C0103
        self.CircuitID = CircuitID  # pylint: disable=C0103
        self.ISP = ISP  # pylint: disable=C0103

    def __repr__(self):
        return '<Interface %r>' % self.Interface


class Log(db.Model):
    """
    Log model class for storing application logs to database
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['application_logs']

    def __init__(self, logger=None, level=None, trace=None, msg=None, created_at=None):
        self.logger = logger
        self.level = level
        self.trace = str(trace)
        self.msg = msg
        self.created_at = created_at

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class CUCM(db.Model):
    """
    CUCM model class for mapping CUCM database data
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['Rendezvous_CiscoCM_users']

    def __init__(self, FirstName, LastName, Userid, TelephoneNumber, Mailid, PrimaryExtension):
        self.FirstName = FirstName  # pylint: disable=C0103
        self.LastName = LastName  # pylint: disable=C0103
        self.Userid = Userid  # pylint: disable=C0103
        self.TelephoneNumber = TelephoneNumber  # pylint: disable=C0103
        self.Mailid = Mailid  # pylint: disable=C0103
        self.PrimaryExtension = PrimaryExtension  # pylint: disable=C0103

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class AdUsers(db.Model):  # pylint: disable=R0902
    """
    Model class for mapping active directory data to database
    """
    __bind_key__ = "session_db"
    __table__ = db.Model.metadata.tables['Rendezvous_ADUsers']

    def __init__(self, Id, samAccountName, FirstName, LastName, Email, Location, Title,
                 TelephoneNumber, WorkphoneNumber, flag):
        self.Id = Id  # pylint: disable=C0103
        self.samAccountName = samAccountName  # pylint: disable=C0103
        self.FirstName = FirstName  # pylint: disable=C0103
        self.LastName = LastName  # pylint: disable=C0103
        self.Email = Email  # pylint: disable=C0103
        self.Location = Location  # pylint: disable=C0103
        self.Title = Title  # pylint: disable=C0103
        self.TelephoneNumber = TelephoneNumber  # pylint: disable=C0103
        self.WorkphoneNumber = WorkphoneNumber  # pylint: disable=C0103
        self.flag = flag

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class ProfileMapping(db.Model):
    """
    Model class for mapping profiles to title of users
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['ProfileMapping']

    def __init__(self, Title, ProfileName, PhoneModel):
        self.Title = Title  # pylint: disable=C0103
        self.ProfileName = ProfileName  # pylint: disable=C0103
        self.PhoneModel = PhoneModel

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class ExtensionIdentification(db.Model):
    """
    Model class for fetching extension identification information
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['ExtensionIdentification']

    def __init__(self, Extensionlocation):
        self.Extensionlocation = Extensionlocation  # pylint: disable=C0103

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class ExtensionNumbers(db.Model):
    """
    Model class for keeping the extension number data
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['ExtensionNumbers']

    def __init__(self, Location, Didnumber, Availability):
        self.Location = Location  # pylint: disable=C0103
        self.Didnumber = Didnumber  # pylint: disable=C0103
        self.Availability = Availability  # pylint: disable=C0103

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class ExtensionRange(db.Model):
    """
    Model class for having the extension range based on locations
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['ExtensionRange']

    def __init__(self, SiteCode, DID_range_begin, DID_range_end):
        self.SiteCode = SiteCode  # pylint: disable=C0103
        self.DID_range_begin = DID_range_begin  # pylint: disable=C0103
        self.DID_range_end = DID_range_end  # pylint: disable=C0103

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class CallingPriviledges(db.Model):
    """
    Model class for storing calling privileges
    """
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['Callingprivilegemapping']

    def __init__(self, profilename, callingprivileges):
        self.profilename = profilename  # pylint: disable=C0103
        self.callingprivileges = callingprivileges  # pylint: disable=C0103

    def __unicode__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Log: %s - %s>" % (self.created_at.strftime('%m/%d/%Y-%H:%M:%S'), self.msg[:50])


class Session(db.Model):
    """
    Model class for storing session information
    """
    __bind_key__ = "session_db"
    __table__ = db.Model.metadata.tables['Rendezvous_Base_Sessions']

    def __init__(self, SessionID, ExpiryDate, SessionTimeout, UserName):
        self.SessionID = SessionID
        self.ExpiryDate = ExpiryDate
        self.SessionTimeout = SessionTimeout
        self.UserName = UserName

    def __repr__(self):
        return "session id is %s" % self.SessionID


class Scheduler(db.Model):
    __table__ = db.Model.metadata.tables['scheduler']

    def __init__(self, job_id, next_runtime, job_status):
        self.job_id = job_id
        self.next_runtime = next_runtime
        self.job_status = job_status

    def __repr__(self):
        return "Job id is %s" % self.job_id


class DirectoryNumbers(db.Model):
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['Unassigned_Directory_Number']
    __table_args__ = {'autoload': True}


class LocationMapping(db.Model):
    __bind_key__ = "flask_db"
    __table__ = db.Model.metadata.tables['Country_Code_Mapping']
    __table_args__ = {'autoload': True}
