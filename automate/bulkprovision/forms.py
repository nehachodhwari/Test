from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms.validators import ValidationError
from .utils import allowed_file


class Bulk_provision_form(FlaskForm):
    file = FileField()


    def validate_file(form,field):
        print(form.file.data.filename)
        if not allowed_file(form.file.data.filename):
            raise ValidationError("Please upload CSV file only.")

