"""
This module contains the form classes for msteams use case
"""

import re
from flask_wtf import FlaskForm
from wtforms import SubmitField, validators, StringField
from wtforms.validators import ValidationError


class MeetingMigration(FlaskForm):
    """
    Form class for meeting migration
    """
    user_id = StringField('User Id', [validators.DataRequired(), validators.Length(min=4, max=35)])
    submit = SubmitField('Submit')

    def validate_user_id(form, field):  # pylint: disable=E0213, R0201
        """
        Validator for validating user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[_!#$%^&*()<>?/\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("UserId should not contain special characters")


class MeetingMigrationStatus(FlaskForm):
    """
    Form class for meeting migration status
    """
    user_id = StringField('User Id', [validators.DataRequired(), validators.Length(min=4, max=35)])
    submit = SubmitField('Submit')

    def validate_user_id(form, field):  # pylint: disable=E0213, R0201
        """
        Validator for validating user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[_!#$%^&*()<>?/\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("UserId should not contain special characters")


class UpgradeToTeams(FlaskForm):
    """
    Form class for upgrading to teams
    """
    user_id = StringField('User Id', [validators.DataRequired(), validators.Length(min=4, max=35)])
    submit = SubmitField('Submit')

    def validate_user_id(form, field):  # pylint: disable=E0213, R0201
        """
        Validator for validating user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[_!#$%^&*()<>?/\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("UserId should not contain special characters")
