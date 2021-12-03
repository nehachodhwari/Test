$password= ConvertTo-SecureString 'Practice@123456789' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential("admin@ngninnovation.onmicrosoft.com",$password)
Import-Module MSOnline
Connect-MSolService -Credential $Cred
Set-MsolUserLicense -UserPrincipalName issac.ne@ngninnovation.com -AddLicenses reseller-account:TEAMS_EXPLORATORY