from typing import Dict
from flask import Blueprint, request, jsonify
from ..utils.query import get_all_weather_data, get_todays_data
from ..utils.location import get_location_by_city_state
from ..utils.parser import PayloadParser 

bp = Blueprint("weather", __name__, url_prefix="/weather")

@bp.get("/")
def home():
    return "weather endpoint working"

@bp.post("/weather_by_city_state")

def weather_by_city_state():
    #As of now the data that is getting returned is the full payload from the Weather API not the 
    # outlook.json() configured data.
    res = {}
    err = None
    data = None
    try:
        req = request.get_json()
        state, city = (req["State"], req["City"] )
        loc, err = get_location_by_city_state(state, city)
        if err != None: 
            print("1")
            raise err
        data, err =  get_all_weather_data(loc)
        if err != None: 
            raise err
        if data != None: 
            res = PayloadParser(data).outlook.json()
    except Exception as e:
        print(e)
        err = e
    finally:
        return jsonify({"Data": res, "Error": str(err) })

@bp.get("/allWeatherData")
def getAllWeatherData():
    data, err = None, None
    try:
        data = request.get_json()
        loc = data["location"]
        data, err = get_all_weather_data(loc)
        if err != None:
            raise(err)
    except Exception as e:
        print("Raised in [getCityState] endpoint",e) 
    finally:
        return jsonify({ "Error": err, "Data": data })


#def weather_by_city_state():
#    #As of now the data that is getting returned is the full payload from the Weather API not the 
#    # outlook.json() configured data.
#    res = {}
#    err = None
#    data = None
#    try:
#        req = request.get_json()
#        state, city = (req["State"], req["City"] )
#        loc, err = get_location_by_city_state(state, city)
#        if err != None: 
#            print("1")
#            raise err
#        data, err =  get_all_weather_data(loc)
#        # print("data after get all weather", data)
#        if err != None: 
#            print("2")
#            raise err
#        if data != None:
#            data, err = get_todays_data(data)
#            print("got todays data: ", data)
#        if err != None: 
#            print("3")
#            raise err
#        if data != None: 
#            res = PayloadParser(data).outlook.json()
#            print("Data after payload parsing, type: ", res)
#    except Exception as e:
#        err = e
#    finally:
#        return jsonify({"Data": data, "Error": str(err) })
