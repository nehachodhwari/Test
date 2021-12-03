import msal as msal
import requests

def get_user_details(userid):
    """
    Function get user details.
    """
    request_headers = msgraph_auth()
    graphURI = 'https://graph.microsoft.com'
    resource = graphURI + '/v1.0/users/' + str(userid)
    try:
        results = requests.get(resource, headers=request_headers)
        output = results.json()
        print(type(results.status_code))
        print("User DETAILS ", output)
        if results.status_code == 200:
            id = output['id']
            resp = [True, id]
        else:
            resp = [False, None]
    except Exception as e:
        print(e)
        resp = [False, e]
    return resp


def get_user_presence(userid):
    """
    Get user presence details.
    """
    resp = None
    user_id = get_user_details(userid)
    if user_id[0]:
        id = user_id[1]
        request_headers = msgraph_auth()
        graphURI = 'https://graph.microsoft.com'
        resource = graphURI + '/v1.0/users/' + str(id) + '/presence'
        try:
            results = requests.get(resource, headers=request_headers)
            output = results.json()
            print(results.status_code)
            print(output)
            resp = True
        except Exception as e:
            print(e)
            resp = False
    else:
        resp = False
    return resp


def get_user_license_details(userid):
    """
    Function to check if any license
    is associated with user.
    """
    resp = None
    request_headers = msgraph_auth()
    graphURI = 'https://graph.microsoft.com'
    resource = graphURI + '/v1.0/users/' + str(userid) + '/licenseDetails'
    try:
        results = requests.get(resource, headers=request_headers)
        output = results.json()
        print(type(output))
        print(output)
        if output['value']:
            license_id = output['value'][0]["skuId"]
            if str(license_id) == "cd2925a3-5076-4233-8931-638a8c94f773":
                resp = True
            else:
                resp = False
        else:
            resp = False
    except Exception as error:
        print(error)
        resp = False
    return resp


def remove_ms_teams_license(userid):
    """
    Function to remove license to ms teams
    :param userid: user id of user for whom ms teams needs to be removed
    :return: Boolean if success else exception
    """
    results = None
    request_headers = msgraph_auth()
    body = {
        "addLicenses": [],
        "removeLicenses": ["cd2925a3-5076-4233-8931-638a8c94f773"]
    }
    graphURI = 'https://graph.microsoft.com'
    resource = graphURI + '/v1.0/users/' + str(userid) + '/assignLicense'
    try:
        results = requests.post(resource, json=body, headers=request_headers)
        print(results)
    except Exception as error:
        print(error)
    return results


def msgraph_auth():
    requestHeaders = None
    tenantID = 'f94fdb9a-ddf7-4aa2-b2e5-a7c6aeabcd7a'
    authority = 'https://login.microsoftonline.com/' + tenantID
    clientID = 'eab5d9d0-53cd-445d-8ed6-bb83a47fcd01'
    clientSecret = 'ZIVR9cl~-1.HaWTAr-qFC7wn5RV7.293cg'
    scope = ['https://graph.microsoft.com/.default']

    app = msal.ConfidentialClientApplication(clientID, authority=authority, client_credential=clientSecret)

    try:
        accessToken = app.acquire_token_silent(scope, account=None)
        if not accessToken:
            try:
                accessToken = app.acquire_token_for_client(scopes=scope)
                if accessToken['access_token']:
                    requestHeaders = {'Authorization': 'Bearer ' + accessToken['access_token']}
                else:
                    return 'Error aquiring authorization token. Check your tenantID, clientID and clientSecret.'
            except:
                pass
        else:
            return None
    except Exception as err:
        return str(err)
    return requestHeaders





