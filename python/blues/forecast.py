from typing import Dict
from flask import Blueprint, request, jsonify
from utils.query import get_all_weather_data, get_todays_data, WeatherResponse
from utils.parser import PayloadParser 

bp = Blueprint("/weather", __name__)


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


@bp.get("/todaysWeatherData")
def getCityState():
    res = WeatherResponse()
    err = None
    try:
        data = request.get_json()
        loc: Dict = data["location"]
        if loc: data, err = get_all_weather_data(loc)
        if data: data, err = get_todays_data(data)
        if data: res.data = PayloadParser(data).outlook
        if err != None:
            res.err = err
            raise(err)
    except Exception as e:
        print("Raised in [getCityState] endpoint",e) 
    finally:
        return jsonify({ "Error": res.err, "Data": res.data })

