"""
This module contains form class for provisioning use case
"""

import re
from flask_wtf import FlaskForm
from wtforms import StringField, validators
from wtforms.validators import ValidationError


# class Add_ad_user(FlaskForm):
#     name_first = StringField('First Name', [validators.DataRequired(),
#     validators.Length(min=3, max=20)])
#     name_last = StringField('Last Name', [validators.DataRequired()])
#     user_id = StringField('User Id', [validators.DataRequired(),
#     validators.Length(min=4, max=35)])
#     mobile = StringField('Contact Number', [validators.DataRequired()])
#     fax = StringField('FAX', [validators.DataRequired()])
#     city = StringField('City', [validators.DataRequired()])
#     company = StringField('Company', [validators.DataRequired()])
#     department = StringField('Department', [validators.DataRequired()])
#     submit = SubmitField('Submit')
#
#     def validate_name_first(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters and numbers")
#     def validate_name_last(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters")
#     def validate_user_id(form, field):
#         regex = re.compile('[@!#$%^&*()<>?/\|}{~:]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("UserId should not contain special characters")
#     def validate_department(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Department should not contain special characters")
#
#
#     def validate_city(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("City should not contain special characters")
#
#
#     def validate_mobile(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Mobile should not contain special characters")
#
#
#     def validate_fax(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Fax should not contain special characters")

# class GetADUser(FlaskForm):
#     user_id= StringField('User Id',[validators.DataRequired()])
#
#     def validate_user_id(form, field):
#         regex = re.compile('[@!#$%^&*()<>?/\|}{~:]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("UserId should not contain special characters")


# class QuickProvUser(FlaskForm):
#     user_id = StringField('User Id', [validators.DataRequired(),
#     validators.Length(min=3, max=35)],  id='userid')
#     name_first = StringField('First Name', [validators.DataRequired(),
#     validators.Length(min=3, max=20)], id='fname')
#     name_last = StringField('Last Name', [validators.DataRequired()], id='lname')
#     email = StringField('Email Address', [validators.DataRequired(),
#     validators.Length(min=6, max=35)], id='email')
#     location = StringField('Location', [validators.DataRequired(),
#     validators.Length(min=3, max=35)], id='location')
#     user_profile = SelectField('User Category', default= "", id='drop1',
#     choices = [('0', 'Choose Option'),('1', 'Standard'),('2', 'Contractor')])
#     cucm_check = BooleanField('Cisco UCM', default="",  id= 'cucm_c')
#     skype_check = BooleanField('Skype', default="",  id= 'skype_c')
#     msteams_check = BooleanField('MS Teams', default="",  id= 'msteams_c')
#     webex_check = BooleanField('WebEx Teams', default="",  id= 'webex_c')
#     extension = StringField('Extension', [validators.DataRequired()], id='extension')
#     product = SelectField('Phone Model', choices = [('0', 'Choose Option'),
#     ('1', 'Cisco 7960'), ('2', 'Cisco 7961'), ('3', 'Cisco 7962')])
#     protocol = SelectField('Protocol', choices = [('0', 'Choose Option'),
#     ('1', 'SCCP'), ('2', 'SIP')])
#     phonebuttontemp = SelectField('Phone Template Name', choices = [
#     ('0', 'Choose Option'),('1', 'Standard 7962G SCCP 1L 5SD'),
#     ('2', 'Standard 7962G SCCP 2L 4SD'),('3','Standard 7962G SIP 1L 5SD'),
#     ('4','Standard 962G SIP 2L 4SD'),('5','Standard CIPC SCCP'), ('6','Standard CIPC SIP')])
#     internal_check = BooleanField('Internal', default="",  id= 'internal_c')
#     local_check = BooleanField('Local', default="",  id= 'local_c')
#     national_check = BooleanField('National', default="",  id= 'national_c')
#     international_check = BooleanField('International', default="",  id= 'international_c')
#     check_phone = BooleanField('Phone', default="", id='phone-check')
#     Phone=StringField('MAC')
#     check_extension_mobility = BooleanField('Extension Mobility', default="", id = 'check_em')
#     check_voicemail = BooleanField('Voice Mail', default="", id = 'check_vm')
#     check_single_number_reach = BooleanField('Single Number Reach', default="",  id= 'check_sn')
#     check_im_presence = BooleanField('IM Presence', default="", id= 'check_im')
#     check_skype = BooleanField('IM Presence', default="", id= 'check_im')
#     check_jabber = BooleanField('Skype Chat', default="", id='check_sc')
#     check_ms_teams = BooleanField('MS Teams', default="", id='check_ms')
#     check_webex_teams = BooleanField('WebEx Teams', default="", id='check_webex')
#     submit = SubmitField('Submit')
#
#     def validate_user_id(form, field):
#         regex = re.compile('[!#$%^&*()<>?/\|}{~:]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("UserId should not contain special characters")
#
#     def validate_name_first(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters and numbers")
#     def validate_name_last(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters")
#     def validate_extension(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Extension should not contain special characters")
#
#
#
# class QuickProvUser_Old(FlaskForm):
#     user_id = StringField('User Id', [validators.DataRequired(),
#     validators.Length(min=4, max=35)])
#     name_first = StringField('First Name', [validators.DataRequired(),
#     validators.Length(min=4, max=20)])
#     name_last = StringField('Last Name', [validators.DataRequired()])
#     email = StringField('Email Address', [validators.DataRequired(),
#     validators.Length(min=6, max=35)])
#     extension = StringField('Telephone Number', [validators.DataRequired()])
#     location = SelectField('Location', choices = [('0', 'Choose Option'),('1', 'DEL'),
#     ('2', 'NYC'), ('3', 'LDN')])
#     calling_privilege = SelectField('Calling Privilege', choices = [('0', 'Choose Option'),
#     ('1', 'Internal'), ('2', 'Local'), ('3', 'International'), ('4', 'National')])
#     product = StringField('Phone Model', [validators.DataRequired()])
#     protocol = SelectField('Protocol', choices = [('0', 'Choose Option'),('1', 'SCCP'),
#     ('2', 'SIP')])
#     phonebuttontemp = SelectField('Phone Template Name', choices = [
#     ('0', 'Choose Option'),('1', 'Standard 7962G SCCP 1L 5SD'),
#     ('2', 'Standard 7962G SCCP 2L 4SD'), ('3','Standard 7962G SIP 1L 5SD'),
#     ('4','Standard 962G SIP 2L 4SD'),('5','Standard CIPC SCCP'),('6','Standard CIPC SIP')])
#     user_profile = SelectField('User Category', choices = [('0', 'Choose Option'),
#     ('1', 'Standard'), ('2', 'Contactor')])
#     check_phone = BooleanField('Phone', default="", id='phone-check')
#     check_extension_mobility = BooleanField('Extension Mobility', default=False)
#     check_voicemail = BooleanField('Voice Mail', default=False)
#     Phone=StringField('MAC')
#     check_single_number_reach = BooleanField('Single Number Reach', default=False)
#     check_im_presence = BooleanField('IM Presence', default=False)
#     check_skype_chat = BooleanField('Skype Chat', default=False)
#     check_ms_teams = BooleanField('MS Teams', default=False)
#     check_webex_teams = BooleanField('WebEx Teams', default=False)
#     submit = SubmitField('Submit')
#
#     def validate_user_id(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("UserId should not contain special characters")
#
#     def validate_name_first(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters and numbers")
#     def validate_name_last(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters")
#     def validate_extension(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Extension should not contain special characters")


class SingleUserSfb(FlaskForm):
    """
    Form class for single user sfb provisioning
    """
    user_id = StringField('User Id', [validators.DataRequired(), validators.Length(min=4, max=35)])

    def validate_user_id(form, field): # pylint: disable=E0213, R0201
        """
        Function to validate user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[_!#$%^&*()<>?/\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("UserId should not contain special characters")
