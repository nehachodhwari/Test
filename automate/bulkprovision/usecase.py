from flask import render_template, request, redirect, url_for, flash, session
from flask import Blueprint
from werkzeug.utils import secure_filename
from .forms import Bulk_provision_form
from flask import current_app as app
import os
from .utils import read_file, provision_users


bulk = Blueprint('bulk', __name__)


@bulk.route('/bulkprovision', methods = ['GET','POST'])
def custom_bulk_provision():
    form = Bulk_provision_form()
    if request.method == 'POST' and form.validate_on_submit():
        filename = secure_filename(form.file.data.filename)
        print(filename)
        file = request.files.get('file')
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash("File upload successful. Provision in process.")
        get_user_list = read_file(str(filename))
        print(type(get_user_list))
        provision_user = provision_users(get_user_list)
        sheet_name = str(provision_user[0])+str('.xlsx')
        print(sheet_name)
        username = session.get('user_id')
        return render_template("bulk_proform.html", username=username, form=form,
                               file_name=sheet_name, FinalReport='Provision Details')
    else:
        username = session.get('user_id')
        return render_template("bulk_proform.html", username=username, form=form)


