# Python API


## `app.py`
This file handles only 2 tasks
  1. **Initializing** the Flask API 
  2. **Adding blueprints** to the API
The `app` variable is created by instantiating a new Flask object
Cross Origin Resource Sharing is initialized
A home route (`/`) is created to test if the server is running
Blueprints are added using the `Flask.register_blueprint` method

## In the top-level ("python") directory there are 3 sub directories:
1. **/blues** - This directory holds the blueprint modules that will be added in the app.py file
2. **/utils** - A directory that holds needed functions for the API to work
3. **/venv** - A directory that holds information specific to starting an isolated terminal environment
---
# `/blues`
The `__init__.py` file is a blank file that allows python to import needed variable/function from this directory into other directories
`location.py` and `forecast.py` are files that house the creation of **Flask API blueprints**
---
## `location.py`
> After import needed utilities from the upper-level `/utils` directory we also import a `Blueprint` class as well as some useful Flask class methods from the Flask library.
`bp = Blueprint("location", __name__, url_prefix="/location")`
1. `bp` variable is set to an instantiation of the Blueprint class from the Flask library with the name of the blueprint being specified first as "location".
2. This blueprint if used will run when the program is ran i.e. `__name__` getting added as the second parameter.
3. The URL prefix that will be attached to the following endpoints it specified here but doesn't need to be. In this case the url that will need to be touched to access the getCityState function is: `http://<domain_name>.com/location/get_by_city_state/`.
(For a testing example the URL would look like this: `localhost:<port>/location/get_by_city_state/`.)
(Also the slash at the end is not needed when querying this endpoint)
### `/get_by_city_state`:
> Requires JSON be sent in the request containing a 'City' key/value pair and a 'State' key/value pair.
Returns the lat/long values of the location.
### `/get_by_zipcode`:
> Requires JSON be sent in the request containing a 'ZipCode' key/value pair.
  Returns the lat/long value of the location.
### `/get_list_of_cities`:
> Requires JSON be sent in the request containing a 'State' key/value pair.
  Returns a list of cities in that state.
---
## `forecast.py`
With a similar pattern for the start of the file the URL location that will need to be reached in order to access the `home` function would be: `http://<domain_name>.com/weather/`
### `/allWeatherData`:
> Requires JSON be sent in the request with a `location` key whose value includes a 'lat' key for latitude value and a 'long' key for longitude value.
  These values are then used in the `get_all_weather_data` function imported from utils which then queries an API to get the all weather data for the specified location.
### `todaysWeatherData`:
> Requires the same JSON be sent in the request as the `allWeatherData` endpoint.
  This endpoint will return only the Forecast for the current day
---
# `/utils`
The `__init__.py` file is a blank file that allows python to import needed variable/function from this directory into other directories.
## `location.py`
### `get_location_by_city_state(state: str, city: str) -> tuple[Dict, None | Exception]:
> This function uses the geopy library to get the lat/long coordinates of a given state and city.
  If the function runs into an error it will then return the error and a null dictionary.
  Otherwise, the longitude and latitude values are returned in their respective key/value pairs.

### `get_location_by_zipcode(zipcode: str) -> tuple[Dict, None | Exception]:
> This function does the same as `get_location_by_city_state` using only a zipcode.

### `get_cities_in_state(state: str) -> tuple[None | List[str] , None | Exception]:
> This function cites a list of cities to be used in the Cities search bar.
> This function sends a request to an external API endpoint that returns a list of cities in that state rather than hard coding all of those cities on a system.

## `parser.py`
> This file includes a few data classes that are used to concisely handle the information that comes from the weather API.

### `Metric`
> The `Metric` class is just to take the count of data points that will be used to find an average as well as the rolling total as we move through the data.

### `Forecast`
> The `Forecast` class is used to develop a few useful metrics and make them easily accessible. These will usually be for certain times of day such as "Morning"/"Afternoon" and the values will be filled with Metric.getAvr() values.

### `Outlook`
> The `Outlook` is the structure the data will be in at it's final stage. This will include the currently needed data with averages for each of the desired metrics put in Forecasts for different times of day as well as a few other data points that we would like to keep track of but will only need to be accessed once while traversing the data from the response.

### `PayloadParser`
### This is the worker class that does the construction of the data that will be served.
### To begin we are taking in a JSON object that will be the response from the external weather API and setting that equal to `self.payload`. We will be traversing this payload later to build our `Outlook`.
> Then we start by instantiating an `Outlook` object that will then be filled with `Forecast` objects before being finalized and used to send a response to the client.
 We then create `Metric` objects for each of the data points that we would like to keep track of throughout the process. 
  This class has a few useful methods that may need to be changed as data needs change.
### `addTemp`, `addWindSpeed`, `addPrecipitation`, `addHumidities`, and `addFeelslike` will act as our "Setters" for this class used only to set the objects properties to new values.
> In these methods we are just accessing the `Metric` for each of the properties adding 1 to the number of values that we have added to the `count` and then adding the value to the `total`.
### In the `getAverages` method we will be returning a Forecast type object.
> First we create a instantiate `Forecast` object, and then for each of the metrics that we have been tracking we add the averages of all of the numbers added to them using the return value of the Metric.getAvr method.
### In the `buildOutlook` method, we can easily set the first 2 values of the object by accessing the "sunset" & "sunrise" keys in the JSON payload that we have gotten from the weather API. 
> Then we create a counter for the hours that we have looped in the JSON data and for each hour we take the values that we have created `Metric` objects for from the JSON and add them to their respective object.As we traverse the data we are using the hours counter to make sure that we build our Forecast objects for each time of day. E.g. from 12am to 4am we will be taking in values for the Overnight Forecast and so on and so forth.
### In `buildForecast` we are just setting the values in the Forecast equal to their averages and then zeroing out the Metric objects in the Outlook object so that we can begin tracking these for a new Forecast.
