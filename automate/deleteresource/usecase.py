"""
This module contains use cases for deleting resources
"""

from requests.exceptions import ConnectionError  # pylint: disable=W0622
from flask import render_template, request, flash, Blueprint
from .forms import DeletePhone
from .utils import get_phone_data, remove_dn, remove_phone
from ..app import cache
from ..projectconfig.app_caching_setting import cache_key, only_cache_get
from ..projectconfig.authentication import authorize
from ..auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from ..projectconfig.connection import execution_time
import datetime
from ..projectconfig import common_config as cfg

delete = Blueprint('delete', __name__)


@delete.route('/removephone', methods=['GET', 'POST'])
# @cache.cached(timeout=180, key_prefix=cache_key, unless=only_cache_get)
# @authorize
def delete_phone():
    """
    Function to delete phone
    :return: renders a template
    """
    form = DeletePhone()
    task_data = []
    if request.method == "POST" and form.validate_on_submit():
        # date_of_execution = datetime.datetime.now()
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=delete_phone.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        if request.form.get('remove_dn') == 'y':
            cfg.logger.info("{} {} Deleting phone {} from cucm".format(cfg.username, cfg.ipaddress, request.form.get('mac')))
            phone_data = get_phone_data(request.form.get('mac'))
            task_data.append('Getting phone data from MAC:Success')
            if phone_data[0]:
                if phone_data[1] is not None:
                    remove_line = remove_dn(phone_data[1], phone_data[2])
                    if remove_line:
                        flash('Associated DN removed', category='success')
                        task_data.append('Associated DN removed:Success')
                    else:
                        flash('An error occurred while removing line. Check logs for detail',
                              category='info')
                        task_data.append('Associated DN removed:Fail')
                else:
                    flash('No line associated with specified phone', category='info')
                    task_data.append('No line associated with specified phone query executed:Success')
            else:
                phone_exception = phone_data[1]  # pylint: disable=W0612
                flash('Unable to delete phone due to exception: ' + phone_exception, category='error')
                task_data.append('Getting phone data from MAC:Fail')

        task_detail = ", ".join(str(x) for x in task_data)
        capture_audit_log(un=unique_identifier, status='Success', date_of_execution=execution_time(),
                          detail=task_detail)

        remove_phone_data = remove_phone(request.form.get('mac'))
        if remove_phone_data:
            flash('Phone with mac '+request.form.get('mac')+'successfully deleted.',
                  category='success')
            status = 'Success'
            task_data.append('Phone with MAC deleted:Success')
        else:
            flash('Unable to delete phone due to exception: '+remove_phone_data[1],
                  category='error')
            status = 'Fail'
            task_data.append('Phone with MAC deleted:Fail')
        task_detail = ", ".join(str(x) for x in task_data)
        capture_audit_log(un=unique_identifier, status=status, date_of_execution=execution_time(), detail=task_detail)
        return render_template('deleteresource/deletephone.html', form=form)
    return render_template('deleteresource/deletephone.html', form=form)
