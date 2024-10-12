import sys
print(sys.path)
sys.path.append("../api/")
from flask_cors import CORS
from flask import Flask
from blues.forecast import bp as forecastBP
from blues.location import bp as locationBP

def createApp():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(locationBP)
    app.register_blueprint(forecastBP)

    return app

def main():
    app = createApp()
    app.run("127.0.0.1", port=5885)

if __name__ == "__main__":
    main()
