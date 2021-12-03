"""
This module contains form class for deleting resources
"""

from flask_wtf import FlaskForm
from wtforms import BooleanField, StringField, validators
from wtforms.validators import ValidationError
from .utils import get_phone_data


class DeletePhone(FlaskForm):
    """
    Form class for deleting phone
    """
    mac = StringField('Phone Mac', [validators.DataRequired()])
    remove_dn = BooleanField('Delete directory number', default=True)

    def validate_mac(form, field):  # pylint: disable=E0213, R0201
        """
        Function to validate mac address
        :param field: form field
        :return: validation error if validation fails
        """
        phone=get_phone_data(field.data)
        if not phone[0]:
            raise ValidationError("Phone not found.")
