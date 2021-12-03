$password= ConvertTo-SecureString 'Practice@12345' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential("admin@ngninnovation.onmicrosoft.com",$password)
Import-Module AzureAD -UseWindowsPowerShell
Connect-AzureAD -Credential $Cred
Set-AzureADUser -ObjectId Junaid.Za@ngninnovation.com -UsageLocation GB