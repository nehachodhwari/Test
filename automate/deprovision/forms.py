"""
This module contains form classes for deprovisioning use case
"""


from flask_wtf import FlaskForm
from wtforms import SubmitField, BooleanField, StringField, validators, SelectField, HiddenField
from wtforms.validators import ValidationError
from ..quickprovision.utils import get_user_cucm



class DeprovisionForm(FlaskForm):
    """
    Class for creating a form for quick custom provisioning use case
    """
    user_id = StringField('User Id', [validators.DataRequired(), validators.Length(min=3, max=35)],
                          id='userid')
    name_first = StringField('First Name', [validators.DataRequired(),
                                            validators.Length(min=1, max=20)], id='fname')
    name_last = StringField('Last Name', [validators.DataRequired()], id='lname')
    email = StringField('Email Address', [validators.DataRequired(),
                                          validators.Length(min=6, max=35)], id='email')
    location = StringField('Location', [validators.DataRequired(),
                                        validators.Length(min=3, max=35)], id='location')
    user_profile = SelectField('User Profile', default="", id='drop1',
                               choices=[('0', 'Choose Option'), ('1', 'Executive'), ('2', 'Sales'),
                                        ('3', 'Account Manager'), ('4', 'Knowledge Worker'),
                                        ('5', 'External Partner')])
    user_profile_hidden = HiddenField('myhidden')
    # cucm_check = BooleanField('Cisco UCM', default="", id='cucm_c')
    # skype_check = BooleanField('Skype', default="", id='skype_c')
    # msteams_check = BooleanField('MS Teams', default="", id='msteams_c')
    # webex_check = BooleanField('WebEx Teams', default="", id='webex_c')
    extension = StringField('Extension',  id='extension')
    route_partition = StringField('Partition', id='route_partition')
    device_profile = StringField('Device Profile', id='deviceprofile')
    phone = StringField('Phone', id='phones')
    remote_dp = StringField('Remote Destination', id='rdp')
    meeting_state = BooleanField('Meetings', id='meeting_state')
    meeting_ms_teams = BooleanField('MS Teams', id='meeting_ms_teams')
    meeting_skype = BooleanField('Skype', id='meeting_skype')
    meeting_webex_teams = BooleanField('WebEx Teams', id='meeting_webex_teams')
    meeting_zoom = BooleanField('Zoom', id='meeting_zoom')
    im_presence_ms_teams = BooleanField('MS Teams', id='im_presence_ms_teams')
    im_presence_webex_teams = BooleanField('WebEx Teams', id='im_presence_webex_teams')
    im_presence_skype = BooleanField('Skype', id='im_presence_skype')
    im_presence_state = BooleanField('IM Presence', id='im_presence_state')
    voice_mail_state = BooleanField('Voice mail', id='voice_mail_state')
    vm_cuc = BooleanField('Cisco Unity Connection', id='vm_cuc')
    vm_exchange = BooleanField('Exchange', id='vm_exchange')
    """Phone Line dialer configuration for phone button template."""
    # phonelinedialer = SelectField('Phone Line',
    #                               choices=[('0', 'Choose Option'), ('1', '1Line 5Speed Dial'),
    #                                        ('2', '2Line 4Speed Dial')])
    # phonelinedialer1 = SelectField('Phone Line',
    #                                choices=[('0', 'Choose Option'), ('1', '1Line 5Speed Dial'),
    #                                         ('2', '2Line 4Speed Dial')])
    # internal_check = BooleanField('Internal', default="", id='internal_c')
    # local_check = BooleanField('Local', default="", id='local_c')
    # national_check = BooleanField('National', default="", id='national_c')
    # international_check = BooleanField('International', default="", id='international_c')
    # check_phone = BooleanField('IP Phone', default="", id='phone-check')
    # enterprise_voice_check = BooleanField('Enterprise Voice', default="", id='entr-voice')
    # cucm_ent = BooleanField('CUCM', default="", id='cucm-ent-check')
    # msteams_ent = BooleanField('MS Teams', default="", id='msteams-ent-check')
    # webexteams_ent = BooleanField('WebEx Teams', default="", id='webexteams-ent-check')
    # check_jabber_ent = BooleanField('Jabber', default="", id='jabber-ent-check')
    # check_extension_mobility = BooleanField('Extension Mobility', default="", id='check_em')
    # check_voicemail = BooleanField('Voice Mail', default="", id='check_vm')
    # check_single_number_reach = BooleanField('Single Number Reach', default="", id='check_sn')
    # check_im_presence = BooleanField('IM Presence', default="", id='check_im')
    # check_meeting = BooleanField('Meetings', default="", id='check_meet')
    # check_skype = BooleanField('IM Presence', default="", id='check_sk')
    # check_jabber = BooleanField('Skype Chat', default="", id='check_jb')
    # check_ms_teams = BooleanField('MS Teams', default='', id='check_ms')
    # check_webex_teams = BooleanField('WebEx Teams', default="", id='check_webex')
    # skype
    # check_im_p = BooleanField('IM & P', default="", id='check_imp')
    # check_s2sa_call = BooleanField('Skype to Skype Audio Calls', default="", id='check_skypea_call')
    # check_s2sv_call = BooleanField('Skype to Skype Video Calls', default="", id='check_skypev_call')
    # check_s2s_conf = BooleanField('Skype to Skype Conferencing', default="", id='check_s2s_confr')
    # check_pstn_call = BooleanField('PSTN Calls', default="", id='check_pstn')
    # check_audio_conf = BooleanField('Audio Conferencing', default="", id='check_audio_confr')
    # check_en_vm = BooleanField('Enable Voicemail', default="", id='check_vm')
    # # MS Teams
    # check_t2ta_call = BooleanField('Teams to Teams Audio Calls', default="", id='check_teamsa_call')
    # check_t2tv_call = BooleanField('Teams to Teams Video Calls', default="", id='check_teamsv_call')
    # check_t2t_conf = BooleanField('Teams to Teams Conferencing', default="", id='check_t2t_confr')
    # # WebEx Teams
    # check_webex_meeting = BooleanField('WebEx Meetings', default="", id='check_webex_meet')
    submit = SubmitField('Submit')

    def validate_user_id(form, field):  # pylint: disable=R0201
        """
        Validator function to check user id
        :param form: form class instance
        :param field: user id field name
        :return: validation error if found
        """
        # user_profile = (dict(form.user_profile.choices).get(form.user_profile.data))
        user_profile = form.user_profile_hidden.data
        # if user_profile == 'Executive':
        #     find_user_in_cucm = get_user_cucm(field.data)
        #     find_user_in_ms = True
        #     find_user_in_cuc = True
        #     if [[find_user_in_cuc and find_user_in_cucm] and find_user_in_ms] is False:
        #         raise ValidationError("User not found. Please try after 24 hours. ")
        # elif user_profile == 'Sales':
        #     find_user_in_cucm = get_user_cucm(field.data)
        #     find_user_in_ms = True
        #     # finduserin_webex = list_web_ex_user(form.name_first.data, form.name_last.data,
        #     #                                    form.email.data)
        #     if [find_user_in_cucm and find_user_in_ms] is False:
        #         raise ValidationError("User not found. Please try after 24 hours. ")
        # elif user_profile == 'Account Manager':
        #     find_user_in_cucm = get_user_cucm(field.data)
        #     find_user_in_cuc = True
        #     find_user_in_ms = True
        #     # find_user_in_webex = list_web_ex_user(form.name_first.data, form.name_last.data,
        #     #                                      form.email.data)
        #     # if [[[find_user_in_cucm and find_user_in_webex] and
        #     #      find_user_in_ms] and find_user_in_cuc] is False:
        #         raise ValidationError("User not found. Please try after 24 hours. ")
        # elif user_profile == 'Knowledge Worker':
        #     find_user_in_cucm = get_user_cucm(field.data)
        #     find_user_in_cuc = True
        #     if [find_user_in_cucm and find_user_in_cuc] is False:
        #         raise ValidationError("User not found. Please try after 24 hours. ")

