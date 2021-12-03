"""
This module contains the email sending facility to users
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app as app
from jinja2 import Environment
from O365 import Account

def email_user_provision_details(emailid,provision_data_list):
    credentials = ('550755c1-0a9b-4d70-b5df-851f1f977636', '0k71py.6V-~i-jLrvB040_k.qhI_H3aeU5')
    # the default protocol will be Microsoft Graph
    account = Account(credentials, auth_flow_type='credentials', tenant_id='f94fdb9a-ddf7-4aa2-b2e5-a7c6aeabcd7a')
    if account.authenticate():
        m = account.new_message(resource='diksha@nxtgenuc.onmicrosoft.com')
        m.to.add(emailid)
        m.subject = 'Provision Successful'
        m.body = message_body(provision_data_list)
        m.send()


def message_body(data_list):
    message = 'Hi User, \n' \
              'Your account has been provisioned successfully. Below are the features enabled for you: \n'
    for item in data_list:
        message += item+'\n'
    return message
    # msg = "Test from provision"
    # send_mail = smtplib.SMTP('smtp.office365.com', 587)
    # send_mail.ehlo()
    # send_mail.starttls()
    # send_mail.login('admin@ngninnovation.onmicrosoft.com', 'Practice@12345')
    # send_mail.sendmail('admin@ngninnovation.onmicrosoft.com', emailid, msg)
    # send_mail.quit()

# def send_email(em_pin, vm_pin):
#     """
#     Function to send email to users upon successful enablement of extension mobility
#     and reset of voice mail pin
#     :param em_pin: Extension mobility pin of user
#     :param vm_pin: voice mail pin of user
#     :return: None
#     """
#     template = """
#     <html>
#     <head>
#     <title>{{ title }}</title>
#     </head>
#     <body>
#
#     Hi User,
#     <br></br>
#     Extension mobility enabled successfully. <br></br>
#     Please use below pin for login.<br></br><br></br>
#
#     <b>Extension Mobility Pin</b>:"""+"\""+em_pin+"\""+"""
#     <br></br>
#     Your Pin for voice mail has been enabled successfully. <br></br>
#     Please use below pin the next time you use voicemail.<br></br><br></br>
#
#     <b>Voicemail Pin</b>:"""+"\""+vm_pin+"\""+"""
#
#     <br></br>
#     <b>change the pin on next use</b>
#     <br></br><br></br>
#     Thanks,<br></br>
#     Administrator
#
#     </body>
#     </html>
#     """
#     msg = MIMEMultipart()
#     msg['From'] = app.config['MAIL_DEFAULT_SENDER']
#     msg['To'] = 'sales2@nxtgenuc.com'
#     msg['Subject'] = 'Pin reset successful'
#     msg.attach(MIMEText(Environment().from_string(template).render(title='Voice mail pin reset'),
#                         'html'))
#     send_mail = smtplib.SMTP(app.config['MAIL_SERVER'])
#     send_mail.sendmail(app.config['MAIL_DEFAULT_SENDER'], ['sales2@nxtgenuc.com'], msg.as_string())
#     send_mail.quit()
#
#
# def send_email_touser(data):
#     """
#     Function to send email to user upon successful provision along with details
#     :param data: details of facilities provided to user
#     :return: None
#     """
#     template = """
#     <html>
#     <head>
#     <title>{{ title }}</title>
#     </head>
#     <body>
#
#     Hi User,
#     <br></br>
#     Provision successful.
#     <br></br>
#     <b>Features:</b>
#     {% for item in data %}
#             <tr>
#                 <td>{{ item }}</td>
#             </tr>
#     {% endfor %}
#     <br></br><br></br>
#     Thanks,<br></br>
#     Administrator
#
#     </body>
#     </html>
#     """
#     msg = MIMEMultipart()
#     msg['From'] = app.config['MAIL_DEFAULT_SENDER']
#     msg['To'] = 'sales2@nxtgenuc.com'
#     msg['Subject'] = 'Provision successful'
#     print(msg['Subject'])
#     msg.attach(MIMEText(
#         Environment().from_string(template).render(
#             title='Provision Details', data=data
#         ), 'html'))
#     send_mail = smtplib.SMTP(app.config['MAIL_SERVER'])
#     send_mail.sendmail(app.config['MAIL_DEFAULT_SENDER'], ['sales2@nxtgenuc.com'], msg.as_string())
#     send_mail.quit()

def send_webex_mail(emailid, vm_pin, em_pin):
    credentials = ('550755c1-0a9b-4d70-b5df-851f1f977636', '0k71py.6V-~i-jLrvB040_k.qhI_H3aeU5')
    # the default protocol will be Microsoft Graph
    account = Account(credentials, auth_flow_type='credentials', tenant_id='f94fdb9a-ddf7-4aa2-b2e5-a7c6aeabcd7a')
    if account.authenticate():
        m = account.new_message(resource='diksha@nxtgenuc.onmicrosoft.com')
        m.to.add(emailid)
        m.subject = 'Provision Successful'
        m.body = "Hi User, \n" \
                 "Your account has been provisioned successfully. Below are the features enabled for you: \n" \
                 "Voice mail pin: "+vm_pin+"\n"\
                 "Extension Mobility Pin: "+em_pin
        m.send()
    # msg = "Provision succesful. Your Voice mail pin is:"+vm_pin+"and your extension mobility pin is:"+em_pin
    # send_mail = smtplib.SMTP('smtp.office365.com', 587)
    # send_mail.ehlo()
    # send_mail.starttls()
    # send_mail.login('diksha@nxtgenuc.onmicrosoft.com', 'Pa$$w0rd')
    # send_mail.sendmail('diksha@nxtgenuc.onmicrosoft.com', emailid, msg)
    # send_mail.quit()

