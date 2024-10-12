from ..utils.location import get_location_by_city_state, get_location_by_zipcode, LocationResponse
from flask import Blueprint, jsonify, request, Response
from ..app import app

bp = Blueprint("/location", __name__) 

@bp.get("/getByCityState")
def getCityState():
    res = LocationResponse()
    try:
        data = request.get_json()
        city = data["City"]
        state = data["State"]
        res.value, res.err = get_location_by_city_state(state, city)
        if res.err != None:
            raise(res.err)
    except Exception as e:
        print("Raised in [getCityState] endpoint",e) 
    finally:
        return jsonify({ "Error": res.err, "Data": res.value })


@bp.get("/getByZipCode")
def getByZipCode():
    res = LocationResponse()
    try:
        data = request.get_json()
        zip = data["ZipCode"]
        res.value, res.err = get_location_by_zipcode(zip)
        if res.err != None:
            raise(res.err)
    except Exception as e:
        print("Raised in [getCityState] endpoint",e) 
    finally:
        return jsonify({ "Error": res.err, "Data": res.value })

