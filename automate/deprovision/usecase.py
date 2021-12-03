"""
Module containing deprovisioning use case.
"""

from flask import request, render_template
from flask import Blueprint
from .forms import DeprovisionForm
from .usecase_functions import deprovision_any_user
from ..auditlogs.audit import capture_audit_log, timer, generate_random_identifier
from ..projectconfig.connection import execution_time
from .cucm_utils import get_user_data

from ..projectconfig import common_config as cfg
from .utils import get_user_configurations, get_form_data



deprovision = Blueprint('deprovision', __name__)


@deprovision.route('/deprovision', methods=['GET', 'POST'])
def deprovision_user():
    """
    Function for deprovisioning of user
    :return: None
    """
    result = None
    form = DeprovisionForm()
    if request.method == 'POST' and form.validate_on_submit():

        msteams = request.form.get('check_ms_teams')
        print(msteams)
        unique_identifier = generate_random_identifier(7)
        capture_audit_log(un=unique_identifier, func_name=deprovision_user.__name__, status='Executing',
                          date_of_execution=execution_time(), detail=None)
        user_profile = (dict(form.user_profile.choices).get(form.user_profile.data))
        cfg.logger.info("{} {} User {} de-provisioning initiated".format(cfg.username, cfg.ipaddress, request.form.get('user_id')))
        if user_profile != None:
            output = get_form_data(form, user_profile)
            result = deprovision_any_user(**output)

        task_detail = ", ".join(str(x) for x in result[2])
        capture_audit_log(un=unique_identifier, date_of_execution=execution_time(), status=result[0], detail=task_detail)
        return render_template("deprovision.html", form=form)
    cfg.logger.info("{} {} User {} de-provisioned successfully".format(cfg.username, cfg.ipaddress, request.form.get('user_id')))
    return render_template("deprovision.html", form=form)



@deprovision.route('/get_details', methods=['GET'])
def get_User_Details():
    """
    Function for finding user details to deprovision
    """

    user_id = request.args.get('userid')
    user_data = get_user_data(user_id)
    print(user_data)
    user_basic_details = get_user_configurations(user_id)
    print(user_basic_details)
    output = user_data.copy()
    if user_basic_details:
        output.update(user_basic_details)
    return output


