"""
This module contains form class for unity connection use case
"""

import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class EnableVoiceMailForm(FlaskForm):
    """
    Form class for enabling voice mail
    """
    userid = StringField('UserId', validators=[DataRequired()])

    def validate_userid(form, field):  # pylint: disable=E0213, R0201
        """
        Function to validate user id
        :param field: form field
        :return: validation error if validation fails
        """
        regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]')
        if regex.search(field.data) is not None:
            raise ValidationError("UserId should not contain special characters")
