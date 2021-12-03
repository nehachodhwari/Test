"""
This module contains the common configurable data to be
used in the different modules af the project.
"""

import os
import socket
import getpass
import logging.config

POWER_SHELL_CONNECTION_CRED = {
    'username': 'developer1',
    'password': 'Pa$$w0rd',
    'host': '172.17.122.101'
}
CISCO_UNITY_CONNECTION_CRED = {
    'username': 'ccmadmin',
    'password': 'Winters@2021',
    'host': '172.17.120.52'
}
CONNECTION_DATA = {
    'usename': 'ccmadmin',
    'password': 'Winters@2021',
    'host': '172.17.120.51'
}
CONNECTION_STRING = {
    'location': 'https://{host}:8443/axl/'.format(host=CONNECTION_DATA['host']),
    'binding': "{http://www.cisco.com/AXLAPIService/}AXLAPIBinding",
    'wsdl': os.path.abspath("automate/WSDLFiles/schema/schema/current/AXLAPI.wsdl")
}

LOCATION_DATA = {
    'NYC': {'devicePoolName': "'uuid':'171fddde-fdf6-06d3-8a19-6fd6294b637e'",
            'routePartitionName': 'NYC_PTT', 'get_routePartitionUuid':
            "'uuid':'1bf8d4b6-db33-27e2-9725-3ecaa937e1d6'", 'cfaCssProfile': 'NYC_CSS',
            'callingSearchSpaceName': 'NYC_CSS', 'voiceMailProfileName': 'NYC_VM',
            'cdcName': 'NYC-CDC', 'mask': '+12123XXXXXXX', 'tempCss': 'NYC_INT_CSS',
            'phn_range': [1000000, 2000001]},
    'LDN': {'devicePoolName': "'uuid':'559cdec0-ab5c-710f-3f74-c5905bd8ab08'",
            'routePartitionName': 'LDN_PTT', 'get_routePartitionUuid':
            "'uuid':'618693a9-1db7-6387-fa2b-1dada313797c'", 'cfaCssProfile': 'LDN_CSS',
            'callingSearchSpaceName': 'LDN_CSS', 'voiceMailProfileName': 'LDN_VM',
            'cdcName': 'LDN-CDC', 'mask': '+44203XXXXXXX', 'tempCss': 'LDN_INT_CSS',
            'phn_range': [2000001, 3000001]},
    'DEL': {'devicePoolName': "'uuid':'de71f371-5ac5-9dec-493e-26870bf9814d'",
            'routePartitionName': 'DEL_PTT', 'get_routePartitionUuid':
            "'uuid':'7e3c7da4-c52f-b3a9-26f8-eaaa62036e10'", 'cfaCssProfile': 'DEL_CSS',
            'callingSearchSpaceName': 'DEL_CSS', 'voiceMailProfileName': 'DEL_VM',
            'cdcName': 'DEL-CDC', 'mask': '+91981XXXXXXX', 'tempCss': 'DEL_INT_CSS',
            'phn_range': [3000001, 4000001]}
}

LIST_PHONE = {'returned_tags': {'name': '', 'description': '', 'product': '', 'model': '',
              'class': '', 'protocol': '', 'callingSearchSpaceName': {'uuid': ''}},
              'keys': ['product', 'uuid', 'callingSearchSpaceName'], 'search': 'phone'}

LIST_USER = {'returned_tags': {'firstName': True, 'lastName': True, 'userid': True, 'mailid': True},
             'search': 'user', 'keys': ['uuid']}

FILTER_DATA = ['name', 'description', 'protocol', 'callingSearchSpaceName', 'devicepoolname']

POWERSHELL_SERVER_IP = '172.17.122.108'

VM_URL = "http://172.17.120.32/vmrest/import/users/ldap?templateAlias=voicemailusertemplate"

SNOW = {
'url': 'https://dev32290.service-now.com/api/now/table/incident',
    'instance': 'dev32290',
    'user': 'admin',
    'password': 'Cognizant@123'
}

GATEWAY_DETAILS = {
    'hostname': '172.17.123.2',
    'username': 'developer',
    'password': 'cisco'
}

# pylint: disable=C0301
TICKET_ANALYSIS_URL = {
    'get_incident_notes': 'https://dev79271.service-now.com/api/now/table/sys_journal_field?sysparm_query=element_id={0}^work_notes=comments',
    'list_incident': 'https://dev79271.service-now.com/api/now/table/incident?&sysparm_limit=10000&sysparm_query=category=unified communications^ORcategory=ucaas',
    'list_assigned_group': 'https://dev79271.service-now.com/api/now/table/sys_user_group?sysparm_limit=100000',
    'list_assigned_to': 'https://dev79271.service-now.com/api/now/table/sys_user?&sysparm_limit=100000',
    'opened_ticket': 'https://dev79271.service-now.com/api/now/table/incident?sysparm_query=opened_atBETWEENjavascript%3Ags.dateGenerate({0})%40javascript%3Ags.dateGenerate({1})^category=ucaas^ORcategory=unified communications&sysparm_limit=10000',
    'closed_ticket': 'https://dev79271.service-now.com/api/now/table/incident?sysparm_query=closed_atBETWEENjavascript%3Ags.dateGenerate({0})%40javascript%3Ags.dateGenerate({1})^category=ucaas^ORcategory=unified communications&sysparm_limit=10000',
    'resolved_ticket': 'https://dev79271.service-now.com/api/now/table/incident?sysparm_query=resolved_atBETWEENjavascript%3Ags.dateGenerate({0})%40javascript%3Ags.dateGenerate({1})^category=ucaas^ORcategory=unified communications&sysparm_limit=10000',
    'all_ticket': 'https://dev79271.service-now.com/api/now/table/incident?&sysparm_limit=10000&sysparm_query=category=unified communications^ORcategory=ucaas'

}

if not os.path.exists("Logs"):
    os.makedirs("Logs")

log_filename = "Logs/applog.log"
LOGGER_CONFIGURATION = {
    "version": 1,
    "disable_existing_loggers": "false",
    "formatters": {
        "basic": {
            "class": "logging.Formatter",
            "datefmt": "%Y-%m-%d %H:%M:%S",
            "format": "%(asctime)s %(levelname)s %(filename)s [line:%(lineno)d]: %(message)s"
                 }
                  },
    "handlers": {
        "file":   {
            "class": "logging.handlers.TimedRotatingFileHandler",
            "level": "INFO",
            "formatter": "basic",
            "filename":  log_filename,
            "backupCount": 30,
            "encoding": "utf8",
            "when": "midnight",
            "interval": 1
                  }
                },
    "loggers": {
        "logger": {
            "handlers": ["file"],
            "level": "INFO",
            "propagate": False
                }
               }
}


hostname = socket.gethostname()
ipaddress = socket.gethostbyname(hostname)
username = getpass.getuser()
logging.config.dictConfig(LOGGER_CONFIGURATION)
logger = logging.getLogger("logger")

for handler in logger.handlers:
    if handler.get_name() == 'file':
        handler.namer = lambda name: name.replace(log_filename, "applog") + ".log"

# pylint: disable=C0301
CONTENT_SECURITY_POLICY = {
    'style-src': "'sha256-kH6Hvc+XPcPbZFWcEeTH4NrJ0pe/DdqW2hYuTxQ1ucs=' 'sha256-BUw/awTA+rYFGYcHZKYacFfTXTLkJrxF045tOY9hEys=' 'sha256-f0q0j3nN+2vhpqwSD9ulSrsvCDwdKIQjXHS7TRQYRj0=' 'sha256-nCqx3KEgb0zk5HmNNgcQRFOg1d4renLv//htBhj4TUQ=' 'sha256-xyn/FAwxCzZN/S96KoiURFf0t3gD6D7bJNdK913Fki8=' 'sha256-wrBixc/ouAEK7S4/NyDCaHjac0i3ZBRCofZseqw8GyA='",
    'style-src-elem': "'self' 'sha256-f0q0j3nN+2vhpqwSD9ulSrsvCDwdKIQjXHS7TRQYRj0=' 'sha256-kH6Hvc+XPcPbZFWcEeTH4NrJ0pe/DdqW2hYuTxQ1ucs=' 'sha256-f0q0j3nN+2vhpqwSD9ulSrsvCDwdKIQjXHS7TRQYRj0=' 'sha256-f0q0j3nN+2vhpqwSD9ulSrsvCDwdKIQjXHS7TRQYRj0=' 'sha256-z7zcnw/4WalZqx+PrNaRnoeLz/G9WXuFqV1WCJ129sg=' 'sha256-f0q0j3nN+2vhpqwSD9ulSrsvCDwdKIQjXHS7TRQYRj0=' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-hF9bPsNivrlGMmEDF7AxlScU5yZttTItaAtkU4Ihvo0=' 'sha256-haRkCTubOM0G2oeKOCUlGydBqgJ0r8AQNavsb5RrMwM=';"
}

INTEGRATION_URL = {
    'post_login': 'https://172.17.122.110:81/Home/PostLogin?sess_id={}',
    'help_page': 'https://172.17.122.110:81/Home/Help?sess_id={}',
    'settings_page': 'https://172.17.122.110:81/Settings/ManageRoles?sess_id={}',
    'login_page': 'https://172.17.122.110:81/'
}
