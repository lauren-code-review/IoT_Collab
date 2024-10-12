import geopy.geocoders
import sys
from flask import Response
from typing import Dict

#These endpoints will be useful for locations in the USA 
#For future api usage from other countries a specifier  \
# will need to be added for the County of origin

class LocationResponse(): 
    #Class made to handle the response sent from the following endpoints
    def __init__(self):
        self.err: None|Exception = None
        self.value: Dict[str,str] = {}

    def __repr__(self):
       return "" 


def get_location_by_city_state(state: str, city: str) -> tuple[Dict, None | Exception]:
    err = None
    location = {"":""}
    try:
        loc = geopy.geocoders.Nominatim(user_agent="app")

        cords = loc.geocode({"state": state, "city": city})
        if cords == None: 
            print("No latitude/longitude found")
            sys.exit()
        
        location = {
                "long": cords.longitude, 
                "lat": cords.latitude
                }
    except Exception as e:
        err = e
    finally:
        return (location, err)

def get_location_by_zipcode(zipcode: str) -> tuple[Dict, None | Exception]: 
    err = None
    location: Dict[str, str] = {"": ""}
    try:
        loc = geopy.geocoders.Nominatim(user_agent="app")

        cords = loc.geocode({"country": "USA", "postalcode": zipcode})
        if cords == None:
            print("No latitude/longitude found")
            sys.exit()

        location = {
                "long": cords.longitude, 
                "lat": cords.latitude 
                }

    except Exception as e:
        err = e
    finally:
        return (location, err)

