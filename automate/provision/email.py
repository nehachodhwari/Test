"""
This module contains function to send email to users
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app as app
from jinja2 import Environment


def send_email(pin):
    """
    Function to send email to users
    :param pin: voice mail pin
    :return: None
    """
    template = """
    <html>
    <head>
    <title>{{ title }}</title>
    </head>
    <body>
    
    Hi User,
    <br></br>
    Your Pin for voice mail has been reset successfully. <br></br>
    Please use below pin the next time you use voicemail.<br></br><br></br>
    
    <b>pin</b>:"""+"\""+pin+"\""+"""
    
    <br></br>
    <b>change the pin on next use</b>
    <br></br><br></br>
    Thanks,<br></br>
    Administrator

    </body>
    </html>
    """
    msg = MIMEMultipart()
    msg['From'] = app.config['MAIL_DEFAULT_SENDER']
    msg['To'] = 'sales2@nxtgenuc.com'
    msg['Subject'] = 'PInresetsaf'
    msg.attach(MIMEText(Environment().from_string(template).render(
        title='Voice mail pin reset'), 'html'))
    server = smtplib.SMTP(app.config['MAIL_SERVER'])
    server.sendmail(app.config['MAIL_DEFAULT_SENDER'], ['sales2@nxtgenuc.com'], msg.as_string())
    server.quit()
