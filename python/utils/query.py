from typing import Dict
import json
import datetime
import requests
import sys
from .parser import Outlook

VC_API_KEY = ""

#Exception used when the date found in the JSON is not the current date
class InvalidDate(Exception):
    pass

def get_current_date() -> str: return str(datetime.date.today())

#Checks to make sure that he date found in the JSON is the current date as the JSON may not always be correct
def check_date(data: Dict) -> bool: return data["datetime"] == get_current_date()

#Takes in a location Hash which will be used in a URL query for JSON on the locations weather 
def get_all_weather_data(location: Dict) -> tuple[Dict | None, Exception | None]:
    err = None
    data = {}
    try:
        URL = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ \
                {location['lat']},{location['long']}?unitGroup=us&key={VC_API_KEY}"
        res = requests.get(URL)
        data = res.json()
    except Exception as e:
        err = e  
    return data, err

#Find matching object based on current date
def get_todays_data(data: Dict) -> tuple[Dict | None, Exception | None]:
    if data["days"][0]: return (data["days"][0], None)
    else: return (None, Exception("Days[0] is not a key..."))

class WeatherResponse:
    def __init__(self):
        self.data: Outlook|None = None
        self.err: None|Exception = None

