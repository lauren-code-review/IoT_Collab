from flask import Flask, Blueprint
from blues import forecast, location
import sys, os
from flask_cors import CORS

def createApp():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(location.bp)
    app.register_blueprint(forecast.bp)

    return app




