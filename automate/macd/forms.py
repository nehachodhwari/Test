"""
This module contains form class for macd use cases
"""


import re
from flask_wtf import FlaskForm
from wtforms import SubmitField, BooleanField, StringField, validators, SelectField
from wtforms.validators import DataRequired, Length, ValidationError


# class add_cucm_user_form(FlaskForm):
#     """
#     Form class for adding user to cucm
#     """
#     name_first = StringField('First Name', [validators.DataRequired(),
#     validators.Length(min=4, max=20)])
#     name_last = StringField('Last Name', [validators.DataRequired()])
#     user_id = StringField('User Id', [validators.DataRequired(),
#     validators.Length(min=4, max=35)])
#     password = PasswordField('Password', [validators.DataRequired(), validators.Length(min=6)])
#     department = StringField('Department', [validators.DataRequired()])
#
#     def validate_name_first(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters and numbers")
#     def validate_name_last(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Name should not contain special characters")
#     def validate_user_id(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("UserId should not contain special characters")
#     def validate_department(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Department should not contain special characters")


# class List_user_form(FlaskForm):
#     name_type = SelectField('', choices = [('1', 'First Name'), ('2', 'Last Name'),
#     ('3', 'User Id'), ('4', 'Department')])
#     start_option = SelectField('', choices = [('1', 'Begins with'), ('2', 'Contains'),
#     ('3', 'Ends with'), ('4', 'Is exactly'), ('5', 'Is empty'), ('6', 'Is not empty')])
#     search_textbox = StringField('', [validators.DataRequired()])
#     submit = SubmitField('Submit')


# class extension_mobility(FlaskForm):
#     device_profile_name = StringField('Device Profile Name', [validators.DataRequired()])
#     product = SelectField('Product', choices = [('0', 'Choose Option'),('1', 'Cisco 7960'),
#     ('2', 'Cisco 7961'), ('3', 'Cisco 7962'), ('4', 'Cisco 7965'), ('5', 'Cisco 7970'),
#     ('6', 'Cisco 7971'), ('7', 'Cisco 7975'), ('8', 'Cisco 7985'), ('9', 'Cisco 8811'),
#     ('10', 'Cisco 8821')])
#     protocol = SelectField('Protocol', choices = [('0', 'Choose Option'),('1', 'SCCP'),
#     ('2', 'SIP')])
#     phone_template_name = SelectField('Phone Template Name', choices = [('0', 'Choose Option'),
#     ('1', 'Standard 7902'), ('2', 'Standard 7905 SCCP'), ('3', 'Standard 7905 SIP'),
#     ('4', 'Standard 7906'), ('5', 'Standard 7905 SIP'),('6', 'Standard 7906'),
#     ('7', 'Standard 7906 SIP'), ('8', 'Standard 7910'), ('9', 'Standard 7911'),
#     ('10', 'Standard 7935')])
#     extension = StringField('Extension', [validators.DataRequired()])
#     route_partition_name = SelectField('Route Partition Name', choices =
#     [('0', 'Choose Option'),('1', 'DEL_PTT'), ('2', 'None'), ('3', 'Global Learned E164 Numbers'),
#     ('4', 'Global Learned E164 Patterns'), ('5', 'Global Learned Enterprise Numbers'),
#     ('6', 'Global Learned Enterprise Patterns'), ('7', 'LDN_PTT'), ('8', 'NYC_PTT'),
#     ('9', 'UCCX'), ('10', 'internal-pt')])
#     calling_search_space = SelectField('Calling Search Space', choices = [('0', 'Choose Option'),
#     ('1', 'DEL_INT_CSS'), ('2', 'None'), ('3', 'DEL_CSS'), ('4', 'LDN_CSS'), ('5', 'LDN_INT_CSS'),
#     ('6', 'NYC_CSS'), ('7', 'NYC_INT_CSS'), ('8', 'UCCX'), ('9', 'internal-css'),
#     ('10', 'vmcss')])
#     alerting_name = StringField('Alerting Name', [validators.DataRequired()])
#
#     submit = SubmitField('Submit')
#     def validate_device_profile_name(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Device Profile should not contain special characters")
#     def validate_extension(form, field):
#         regex = re.compile('[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("Extension should not contain special characters")


class EmUserId(FlaskForm):
    """
    Form class for extension mobility
    """
    user_id = StringField('User Id', [validators.DataRequired(), validators.Length(min=3, max=35)])
    submit = SubmitField('Submit')

    def validate_user_id(form, field):  # pylint: disable=E0213, R0201
        """
        Function to validate user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
        if regex.search(field.data) is not None:
            raise ValidationError("UserId should not contain special characters")


class AddDeviceProfile(FlaskForm):
    """
    Form class for adding device profile
    """
    device_profile_name = StringField('Device Profile Name', [validators.DataRequired()])
    product = StringField('Product', [validators.DataRequired()])
    protocol = StringField('Protocol', [validators.DataRequired()])
    phone_template_name = StringField('Phone Template Name',[validators.DataRequired()])
    extension = StringField('Extension', [validators.DataRequired()])
    route_partition_name = StringField('Route Partition Name', [validators.DataRequired()])
    calling_search_space = StringField('Calling Search Space', [validators.DataRequired()])
    alerting_name = StringField('Alerting Name', [validators.DataRequired()])
    submit = SubmitField('Submit')

    def validate_device_profile_name(form, field):  # pylint: disable=E0213, R0201
        """
        Function to validate device profile name
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[@_!#$%^&*()<>?/\|}{~:0-9]')
        if regex.search(field.data) is not None:
            raise ValidationError("Device Profile should not contain special characters")

    def validate_extension(form, field):  # pylint: disable=E0213, R0201
        """
        Function to validate extension
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
        if regex.search(field.data) is not None:
            raise ValidationError("Extension should not contain special characters")


# class QuickProvUser(Form):
#     user_id = StringField('User Id', [validators.DataRequired(),
#     validators.Length(min=4, max=35)])
#     name_first = StringField('First Name', [validators.DataRequired(),
#     validators.Length(min=4, max=20)])
#     name_last = StringField('Last Name', [validators.DataRequired()])
#     email = StringField('Email Address', [validators.DataRequired(), validators.Email(),
#     validators.Length(min=6, max=35)])
#     telephone = StringField('Telephone Number', [validators.DataRequired()])
#     location = SelectField('Location', choices = [('0', 'Choose Option'),
#     ('1', 'DEL'), ('2', 'NYC'), ('3', 'LDN')])
#     calling_privilege = SelectField('Calling Privilege', choices = [
#     ('0', 'Choose Option'),('1', 'Internal'),
#     ('2', 'TollFree'), ('3', 'All')])
#     phone_model = StringField('Phone Model', [validators.DataRequired()])
#     phone_protocol = SelectField('Protocol', choices = [
#     ('0', 'Choose Option'),('1', 'SCCP'), ('2', 'SIP')])
#     phone_template_name = SelectField('Phone Template Name', choices = [('0', 'Choose Option'),
#     ('1', '2 lines 4 Speed Dials'), ('2', '1 line 5 Speed Dials')])
#     user_category = SelectField('User Category', choices = [
#     ('0', 'Choose Option'),('1', 'Standard'),
#     ('2', 'Guest')])
#     check_phone = BooleanField('Phone', default=False)
#     check_extension_mobility = BooleanField('Extension Mobility', default=False)
#     check_voicemail = BooleanField('Voice Mail', default=False)
#     check_single_number_reach = BooleanField('Single Number Reach', default=False)
#     check_im_presence = BooleanField('IM Presence', default=False)
#     check_skype_chat = BooleanField('Skype Chat', default=False)
#     check_ms_teams = BooleanField('MS Teams', default=False)
#     check_webex_teams = BooleanField('WebEx Teams', default=False)
#     user_profile = StringField('User Profile', [validators.DataRequired()])
#     submit = SubmitField('Submit')


# class QuickProvUser(FlaskForm):
#     user_id = StringField('User Id', [validators.DataRequired(),
#     validators.Length(min=4, max=35)])
#     name_first = StringField('First Name', [validators.DataRequired(),
#     validators.Length(min=4, max=20)])
#     name_last = StringField('Last Name', [validators.DataRequired()])
#     email = StringField('Email Address', [validators.DataRequired(),
#     validators.Length(min=6, max=35)])
#     telephone = StringField('Telephone Number', [validators.DataRequired()])
#     location = SelectField('Location', choices = [('0', 'Choose Option'),('1', 'DEL'),
#     ('2', 'NYC'), ('3', 'LDN')])
#     calling_privilege = SelectField('Calling Privilege', choices = [('0', 'Choose Option'),
#     ('1', 'Internal'),
#     ('2', 'Local'), ('3', 'International'), ('4', 'National')])
#     phone_model = StringField('Phone Model', [validators.DataRequired()])
#     phone_protocol = SelectField('Protocol', choices = [('0', 'Choose Option'),('1', 'SCCP'),
#     ('2', 'SIP')])
#     phone_template_name = SelectField('Phone Template Name', choices = [('0', 'Choose Option'),
#     ('1', 'Standard 7962G SCCP 1L 5SD'), ('2', 'Standard 7962G SCCP 2L 4SD'),
#     ('3','Standard 7962G SIP 1L 5SD'),
#     ('4','Standard 962G SIP 2L 4SD'),('5','Standard CIPC SCCP'),('6','Standard CIPC SIP')])
#     user_category = SelectField('User Category', choices = [('0', 'Choose Option'),
#     ('1', 'Standard'),
#     ('2', 'Contactor')])
#     check_phone = BooleanField('Phone', default="", id='phone-check')
#     check_extension_mobility = BooleanField('Extension Mobility', default=False)
#     check_voicemail = BooleanField('Voice Mail', default=False)
#     check_single_number_reach = BooleanField('Single Number Reach', default=False)
#     check_im_presence = BooleanField('IM Presence', default=False)
#     check_skype_chat = BooleanField('Skype Chat', default=False)
#     check_ms_teams = BooleanField('MS Teams', default=False)
#     check_webex_teams = BooleanField('WebEx Teams', default=False)
#     user_profile = StringField('User Profile', [validators.DataRequired()])
#     submit = SubmitField('Submit')


class AddPhone(FlaskForm):
    """
    Form class for adding phone
    """
    Name = StringField('Name', validators=[DataRequired(), Length(min=4, max=18)])
    Description = StringField('Description', validators=[DataRequired(), Length(min=4, max=18)])
    Line = StringField('Line', validators=[DataRequired(), Length(min=4, max=18)])
    Protocol = SelectField('Protocol', choices=[('0', 'Choose Option'), ('1', 'SCCP'),
                                                ('2', 'SIP')], validators=[DataRequired()])
    Phone_Type = SelectField('Phone_Type', choices=[('0', 'Choose Option'), ('1', 'Cisco 7960'),
                                                  ('2', 'Cisco 7961'), ('3', 'Cisco 7962'),
                                                  ('4', 'Cisco IP Communicator')],
                             validators=[DataRequired()])
    CSS = SelectField('CSS', choices=[('0', 'Choose Option'), ('1', 'UCCX'), ('2', 'internal-css'),
                                    ('3', 'jlt_local'), ('4', 'jlt_pstn'), ('5', 'DEL_CSS'),
                                    ('6', 'LDN_CSS'), ('7', 'NYC_CSS'), ('8', 'NYC_INT_CSS'),
                                    ('9', 'DEL_INT_CSS'), ('10', 'LDN_INT_CSS'), ('11', 'vmcss')],
                      validators=[DataRequired()])
    DevicePool = SelectField('DevicePool', choices=[('0', 'Choose Option'), ('1', 'Default'),
                                                    ('2', 'test'), ('3', 'DEL-DP'), ('4', 'LDN-DP'),
                                                    ('5', 'NYC-DP')], validators=[DataRequired()])
    LocationName = SelectField('LocationName', choices=[('0', 'Choose Option'), ('1', 'Phantom'),
                                                        ('2', 'Shadow'), ('3', 'Hub_None'),
                                                        ('4', 'DEL'), ('5', 'NYC'), ('6', 'LDN')],
                               validators=[DataRequired()])
    SecurityProfileName = SelectField('SecurityProfileName', choices=[
        ('0', 'Choose Option'), ('1', 'Cisco 7962 - Standard SCCP Non-Secure Profile'),
        ('2', 'Cisco 7962 - Standard SIP Non-Secure Profile'),
        ('3', ' Cisco 7961 - Standard SCCP Non-Secure Profile'),
        ('4', 'Cisco 7961 - Standard SIP Non-Secure Profile'),
        ('5', 'Cisco 7960 - Standard SCCP Non-Secure Profile'),
        ('6', 'Cisco 7960 - Standard SIP Non-Secure Profile'),
        ('7', 'Cisco IP Communicator - Standard SCCP Non-Secure Profile'),
        ('8', 'Cisco IP Communicator - Standard SIP Non-Secure Profile')],
                                      validators=[DataRequired()])
    PhoneButtonTemplate = SelectField('PhoneButtonTemplate', choices=[
        ('0', 'Choose Option'), ('1', 'Standard 7960 SCCP'), ('2', 'Standard 7960 SIP'),
        ('3', 'Standard 7961 SCCP'), ('4', 'Standard 7961 SIP'), ('5', 'Standard 7962G SCCP'),
        ('6', 'Standard 7962G SIP')], validators=[DataRequired()])
    RoutePartition = SelectField('RoutePartition', choices=[
        ('0', 'Choose Option'), ('1', 'Directory URI'), ('2', 'Global Learned Enterprise Numbers'),
        ('3', 'Global Learned E164 Numbers'), ('4', 'Global Learned Enterprise Patterns'),
        ('5', 'Global Learned E164 Patterns'), ('6', 'UCCX'), ('7', 'internal-pt'),
        ('8', 'jlt_internal'), ('9', 'jlt_local'), ('10', 'jlt_ITSP'), ('11', 'DEL_PTT'),
        ('12', 'LDN_PTT'), ('13', 'NYC_PTT')], validators=[DataRequired()])
    UserID = SelectField('UserID', choices=[
        ('0', 'Choose Option'), ('1', 'noida.test'), ('2', 'Weasley.Ro')],
                         validators=[DataRequired()])
    SIPProfile = SelectField('SIPProfile', choices=[
        ('0', 'Choose Option'), ('1', 'Standard SIP Profile'),
        ('2', 'Standard SIP Profile for Mobile Device'),
        ('3', 'Standard SIP Profile For TelePresence Conferencing'),
        ('4', 'Standard SIP Profile For Cisco VCS'),
        ('5', 'Standard SIP Profile For TelePresence Endpoint'),
        ('6', 'Standard SIP Profile -CUC'), ('7', 'Standard SIP Profile - IMP'),
        ('8', 'Standard SIP Profile - Interop'), ('9', 'Standard SIP Profile -CUCM2'),
        ('10', 'Cisco Jabber SIP Profile'),
        ('11', 'Standard SIP Profile for Webex Hybrid Calling')],
                             validators=[DataRequired()])
    ExtensionMobility = BooleanField('ExtensionMobility')
    submit = SubmitField('Submit')

    def validate_Line(form, field):  # pylint: disable=E0213, R0201, C0103
        """
        Function to validate line
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[@_!#$%^&*()<>?/.\|}{~:A-Za-z]')
        if regex.search(field.data) is not None:
            raise ValidationError("Line/Extension should not contain special characters")

    def validate_UserID(form, field):  # pylint: disable=E0213, R0201, C0103
        """
        Function to validate user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("Userid should not contain special characters")
