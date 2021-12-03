"""
This module contains form class for the creation of resources
"""

import re
from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, PasswordField, validators
from wtforms.validators import ValidationError
from .cisco_utils import get_cucm_user

class CucmAddUserForm(FlaskForm):
    """
    Form class for adding cucm user
    """
    name_first = StringField('First Name', [validators.DataRequired(),
                                            validators.Length(min=3, max=20)])
    name_last = StringField('Last Name', [validators.DataRequired()])
    user_id = StringField('User Id', [validators.DataRequired(),
                                      validators.Length(min=4, max=35)])
    password = PasswordField('Password', [validators.DataRequired(), validators.Length(min=6),
                                          validators.EqualTo('confirm',
                                                             message='Passwords must match')])
    confirm = PasswordField('Confirm Password', [validators.DataRequired()])
    department = StringField('Department', [validators.DataRequired()])

    def validate_name_first(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate first name
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/.\|}{~:0-9]')
        if regex.search(field.data) is not None:
            raise ValidationError("Name should not contain special characters and numbers")

    def validate_name_last(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate last name
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/.\|}{~:0-9]')
        if regex.search(field.data) is not None:
            raise ValidationError("Name should not contain special characters")

    def validate_user_id(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/\|}{~:0-9]')
        user = get_cucm_user(field.data)
        print(user)
        if regex.search(field.data) is not None:  # pylint: disable=R1720
            raise ValidationError("UserId should not contain special characters")
        elif user[0]:
            raise ValidationError("User already exists")

    def validate_department(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate department
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/\|}{~:0-9]')
        if regex.search(field.data) is not None:
            raise ValidationError("Department should not contain special characters")

class MicrosoftAdAddUser(FlaskForm):
    """
    Form class for adding microsoft active directory users
    """
    name_first = StringField('First Name', [validators.DataRequired(),
                                            validators.Length(min=3, max=20)])
    name_last = StringField('Last Name', [validators.DataRequired()])
    user_id = StringField('User Id', [validators.DataRequired(),
                                      validators.Length(min=4, max=35)])
    mobile = StringField('Contact Number', [validators.DataRequired()])
    fax = StringField('FAX', [validators.DataRequired()])
    city = StringField('City', [validators.DataRequired()])
    company = StringField('Company', [validators.DataRequired()])
    department = StringField('Department', [validators.DataRequired()])
    submit = SubmitField('Submit')

    def validate_name_first(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate first name
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/.\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("Name should not contain special characters and numbers")

    def validate_name_last(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate last name
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/.\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("Name should not contain special characters")

    def validate_user_id(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@!#$%^&*()<>?/\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("UserId should not contain special characters")

    def validate_department(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate department
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/\|}{~:0-9]')
        if regex.search(field.data) is not None:
            raise ValidationError("Department should not contain special characters")

    def validate_city(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate city
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/\|}{~:0-9]')
        if regex.search(field.data) is not None:
            raise ValidationError("City should not contain special characters")

    def validate_mobile(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate mobile
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
        if regex.search(field.data) is not None:
            raise ValidationError("Mobile should not contain special characters")

    def validate_fax(form, field):  # pylint: disable=E0213,R0201
        """
        Function to validate fax
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile(r'[@_!#$%^&*()<>?/\|}{~:A-Za-z]')
        if regex.search(field.data) is not None:
            raise ValidationError("Fax should not contain special characters")

# class GetADUser(FlaskForm):
#     user_id= StringField('User Id',[validators.DataRequired()])
#
#     def validate_user_id(form, field):
#         regex = re.compile('[@!#$%^&*()<>?/\|}{~:]')
#         if (regex.search(field.data) != None):
#             raise ValidationError("UserId should not contain special characters")
