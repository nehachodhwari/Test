"""
This module contains exception for the application
"""



def get_cucm_error_message(error):
    """
    Function for getting cucm error messages
    :param error: error string
    :return: string message
    """
    if str(error) == 'Unknown fault occured':
        err_msg = "Unknown error occured(cucm credentials might causing issues)"
    elif str(error) == "The first character cannot be a plus sign":
        err_msg = "Extension first character cannot be a plus sign"
    elif str(error) == "Cannot insert or update pattern. A DN exists with the same pattern and partition.":
        err_msg = "A DN exists with the same pattern and partition."
    elif "Failed to authenticate the user" in str(error):
        err_msg = "Failed to authenticate the user"
    elif str(error) == "The specified Security Profile is not valid for this device type (model and protocol).":
        err_msg = "The specified Security Profile is not valid for this device type (model and protocol)"
    elif str(error) == "The specified name has invalid characters or is not formatted correctly for this device type.Valid characters include [a-zA-Z0-9._-]{1,50}":
        err_msg = "The specified name has invalid characters or is not formatted correctly for this device type.Valid characters include [a-zA-Z0-9._-]{1,50}"
    elif str(error) == "Could not insert new row - duplicate value in a UNIQUE INDEX column (Unique Index:).":
        err_msg = "Could not duplicate unique index values"
    elif "Item not valid:" in str(error):
        err_msg = str(error).split(':')[1]
    else:
        err_msg = "Internal server error"
    return err_msg









