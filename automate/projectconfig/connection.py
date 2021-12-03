
from zeep import Client
from zeep.cache import SqliteCache
from zeep.transports import Transport
from requests import Session
from requests.auth import HTTPBasicAuth
from urllib3 import disable_warnings
from urllib3.exceptions import InsecureRequestWarning
from zeep.plugins import HistoryPlugin
from . import common_config as cfg
from pypsrp.client import Client as powershell_client
from .common_config import POWER_SHELL_CONNECTION_CRED as ps_cred
import datetime

def create_sess():
    disable_warnings(InsecureRequestWarning)
    session = Session()
    session.verify = False
    session.auth = HTTPBasicAuth(cfg.CONNECTION_DATA['usename'], cfg.CONNECTION_DATA['password'])
    history = HistoryPlugin()
    transport = Transport(cache=SqliteCache(), session=session, timeout=100)
    client = Client(wsdl=cfg.CONNECTION_STRING['wsdl'], transport=transport, plugins=[history])
    service = client.create_service(cfg.CONNECTION_STRING['binding'], cfg.CONNECTION_STRING['location'])
    return service



def create_ps_conn():
    client = powershell_client(ps_cred['host'], username=ps_cred['username'], password=ps_cred['password'], ssl=False)
    return client


def execution_time():
    date_of_execution = datetime.datetime.now()
    return date_of_execution