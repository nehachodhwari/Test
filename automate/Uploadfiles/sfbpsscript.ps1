$upns=Get-Content -Path "C:\Users\developer\PycharmProjects\Rendezvous-Automate(30-May-2020)\automate\Uploadfiles\sfbprov.csv"
foreach( $upn in $upns ){
Enable-CsUser -identity $upn -sipaddresstype samaccountname -registrarpool "pool1.nxtgenuc.com" -sipdomain "nxtgenuc.com"}