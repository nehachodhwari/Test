from flask import Blueprint, flash, request, render_template
from flask import current_app as app
from .forms import Bulk_deprovision_form
from .utils import read_file, deprovision_users
from werkzeug.utils import secure_filename
import os


bulkdepr = Blueprint('bulkdepr', __name__)


@bulkdepr.route('/bulkdeprovision', methods=['GET', 'POST'])
def custom_bulk_deprovision():
    form = Bulk_deprovision_form()
    if request.method == 'POST' and form.validate_on_submit():
        filename = secure_filename(form.file.data.filename)
        print(filename)
        file = request.files.get('file')
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash("File upload successful. Deprovision in process.")
        get_user_list = read_file(str(filename))
        deprovision = deprovision_users(get_user_list)
        sheet_name = str(deprovision[0]) + str('.xlsx')
        print(sheet_name)
        return render_template("bulk_deproform.html", form=form,
                               file_name=sheet_name, FinalReport='Deprovision Details')
    else:
        return render_template("bulk_deproform.html", form=form)

