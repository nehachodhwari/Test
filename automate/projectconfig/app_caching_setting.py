"""
This module contains functions for caching data of application
"""

from urllib.parse import urlencode
import flask
from flask import request


def only_cache_get(*args, **kwargs):  # pylint: disable=W0613
    """
    Function to cache only GET request
    @param args: positional arguments if any
    @param kwargs: keyword arguments if any
    @return: Boolean value
    """
    if request.method == 'GET':
        return False
    return True


def cache_key():
    """
    Function to generate cache key name
    @return: string key
    """
    args = flask.request.args
    key = flask.request.path + '?' + urlencode([
        (k, v) for k in sorted(args) for v in sorted(args.getlist(k))
    ])
    return key
