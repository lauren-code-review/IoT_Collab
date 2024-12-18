from ..utils.location import get_location_by_city_state, get_location_by_zipcode, get_cities_in_state
from flask import Blueprint, jsonify, request, Response

bp = Blueprint("location", __name__, url_prefix="/location") 

@bp.get("/")
def home():
    return "location endpoint working"

@bp.get("/get_by_city_state")
def getCityState():
    value = {"": ""}
    err = None
    try:
        data = request.get_json()
        city = data["City"]
        state = data["State"]
        value, err = get_location_by_city_state(state, city)
        if err != None:
            raise(err)
    except Exception as e:
        print("Raised in [getCityState] endpoint",e) 
    finally:
        return jsonify({ "error": err, "Data": value })


@bp.get("/get_by_zipcode")
def getByZipCode():
    value = {"": ""}
    err = None
    try:
        data = request.get_json()
        zip = data["ZipCode"]
        value, err = get_location_by_zipcode(zip)
        if err != None:
            raise(err)
    except Exception as e:
        print("Raised in [getCityState] endpoint",e) 
    finally:
        return jsonify({ "error": err, "Data": value })

@bp.post("/get_list_of_cities")
def getListOfCities():
    cities = None
    err = None
    try:
        data = request.get_json()
        state = data["State"]
        cities, err = get_cities_in_state(state) 
        if err != None:
            raise(err)
    except Exception as e:
        print( "Exceptions raised in [get_list_of_cities]", e)
    finally:
        return jsonify({"error": err, "cities": cities})




