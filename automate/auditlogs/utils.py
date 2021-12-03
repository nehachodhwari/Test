'''
This module contains the utility function used audit logs and db query
'''

from automate.projectconfig.connection import create_sess
from ..app import db
from automate.models.models import ExtensionRange

service = create_sess()


def get_newline(listofline, location):
    """
    Fetches new extension number based on location and available
    lines.
    :param listofline: List of used Extensions
    :param location: used to fetch DID range for particular location
    :return: DID extension
    """
    line = None
    # pylint: disable=E1101
    extension_range_db = db.session.query(
        ExtensionRange.DID_range_begin, ExtensionRange.DID_range_end).filter(
            ExtensionRange.Location == location).all()
    for db_data in extension_range_db:
        begin = db_data[0][-4:len(db_data[0])]
        end = db_data[1][-4:len(db_data[1])]
        line = list(set(range(int(begin), int(end), 1)) - set(listofline))[0]
        if line:
            line = str(db_data[0][0:-4])+str(line)
            break
    return line.strip()


def check_valid_extension(extension, location):
    """
    Function to check if the given extension is correct.
    :param extension: DID number fetched using database
    :param location:  Location in which DID number exists.
    :return: Boolean True if exist else false.
    """
    ext = int(extension.strip('+'))
    is_valid = False
    # pylint: disable=E1101
    extension_range_db = db.session.query(
        ExtensionRange.DID_range_begin, ExtensionRange.DID_range_end).filter(
            ExtensionRange.Location == location).all()
    for db_range in extension_range_db:
        begin = db_range[0].strip('+')
        end = db_range[1].strip('+')
        extension_range = set(range(int(begin), (int(end)+1)))
        if ext in extension_range:
            is_valid = True
            break
    return is_valid
