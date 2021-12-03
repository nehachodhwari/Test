"""
This module contains the utility functions for msteams use cases
"""


def get_script_mm(user_id):
    """
    Function to get the meeting migration script
    :param user_id: user id of user
    :return: string script
    """
    # pylint: disable=C0301, C0303
    ps_script = """Import-Module "C:\Program Files\Common Files\Skype for Business Online\Modules\SkypeOnlineConnector\SkypeOnlineConnector.psd1" 
    Import-Module SkypeOnlineConnector 
    $password= ConvertTo-SecureString "Practice@123456789" -AsPlainText -Force
    $cred = New-Object System.Management.Automation.PSCredential("admin@ngninnovation.onmicrosoft.com",$password)
    $cssession = New-CsOnlineSession -Credential $cred
    Import-PSSession $cssession -AllowClobber
    Start-CsExMeetingMigration -Identity """+"\""+user_id+"\""+""" -TargetMeetingType Teams -Confirm:$false
    Remove-PSSession -Session $cssession """
    return str(ps_script)


def get_auth_details():
    """
    Function to get the authentication credentials
    :return: tuple of credentials
    """
    auth = ('developer', 'Pa$$w0rd')
    return auth


def get_script_mms(user_id):
    """
    Function to get the meeting migration status script
    :param user_id: user id of user
    :return: string script
    """
    # pylint: disable=C0301, C0303
    ps_script = """Import-Module "C:\Program Files\Common Files\Skype for Business Online\Modules\SkypeOnlineConnector\SkypeOnlineConnector.psd1" 
    Import-Module SkypeOnlineConnector 
    $password= ConvertTo-SecureString "Practice@123456789" -AsPlainText -Force
    $cred = New-Object System.Management.Automation.PSCredential("admin@ngninnovation.onmicrosoft.com",$password)
    $cssession = New-CsOnlineSession -Credential $cred
    Import-PSSession $cssession -AllowClobber
    Get-CsMeetingMigrationStatus -Identity """+"\""+user_id+"\""+"""
    Remove-PSSession -Session $cssession """
    return str(ps_script)


def get_script_upgrade_to_teams(user_id):
    """
    Function to get upgrade to teams script
    :param user_id: user id of user
    :return: string script
    """
    # pylint: disable=C0301, C0303
    ps_script = """Import-Module "C:\Program Files\Common Files\Skype for Business Online\Modules\SkypeOnlineConnector\SkypeOnlineConnector.psd1" 
    Import-Module SkypeOnlineConnector 
    $password= ConvertTo-SecureString "Practice@123456789" -AsPlainText -Force
    $cred = New-Object System.Management.Automation.PSCredential("admin@ngninnovation.onmicrosoft.com",$password)
    $cssession = New-CsOnlineSession -Credential $cred
    Import-PSSession $cssession -AllowClobber
    Grant-CsTeamsUpgradePolicy -PolicyName UpgradetoTeams -Identity """ + "\"" + user_id + "\"" + """
    Remove-PSSession -Session $cssession"""
    return str(ps_script)
