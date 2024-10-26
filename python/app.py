import sys
from dotenv import load_dotenv
import os
from flask_cors import CORS
from flask import Flask
from .blues.forecast import bp as forecastBP
from .blues.location import bp as locationBP

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
load_dotenv() # take environemnt variables from .env 


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/")
    def home():
        return "Server is Running"

    app.register_blueprint(locationBP)
    app.register_blueprint(forecastBP)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run("localhost", port=5885)
