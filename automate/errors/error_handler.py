from flask import render_template, Blueprint


error = Blueprint('error', __name__)

class UnhandledException(Exception):
    pass

@error.app_errorhandler(UnhandledException)
def custom_handler(e):
    """
    Function to handle unhandled error during call to functions.
    :return: Exception template with message
    """
    return render_template('Exception/my_custom_error_page.html', error=e)
