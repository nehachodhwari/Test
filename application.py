"""
This module contains application run point
"""

from automate.app import create_app, configure_scheduler

app = create_app()
if __name__ == '__main__':
    app.jinja_env.cache = {}
    # configure_schedulr(app)
    app.run(host='172.17.122.121', use_reloader=False, port=5001)
