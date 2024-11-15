from typing import Dict, List, no_type_check
from flask import jsonify
from .testing import EscCode


"""
Refactor:
    Serve an array of each hours info that needs to be current such as:
        - Temp
        - Wind Speed / WindDirection
        - FeelsLike
        - Humidity
        - Precipitation
""" 

class Metric:
    count: int = 0
    total: float = 0
    def getAvr(self) -> int: return int(round(self.total / self.count, 2))
    def zero(self): self.count, self.total = 0, 0
    def add(self, n: float) -> None: self.count, self.total = 1, n

# current date/time should be generated on the client side
# There will need to be a general time frame established for 
# which they client side can determine which set of data will be used.
# The payload that we are accessing will always be the 1st index so it will always be the current day.
class Outlook:
    def __init__(self):
        self.feelslike: str = str()
        self.fullMoon: None | str = None
        self.newMoon: None | str = None
        self.high: str = str()
        self.low: str = str()
        self.description: str = str()
        self.moonPhase: str | None = None
        self.sunrise: str | None = None
        self.sunset: str | None = None
        self.hourly = List
        self.forecasts : Dict | None = None
        self.weeklyBreakdown: List = []

    def __repr__(self) -> str:
        return ("Outlook(List[Dict])")

    def json(self):
        return { 
                "moonPhase":self.moonPhase,
                "feelslike":self.feelslike,
                "high":self.high,
                "low":self.low,
                "hourly": self.hourly,
                "forecasts": self.forecasts,
                "description":self.description,
                "sunrise":self.sunrise,
                "sunset":self.sunset,
                "weeklyBreakdown": self.weeklyBreakdown,
                "newMoon": self.newMoon,
                "fullMoon": self.fullMoon,
                }
            

class PayloadParser:
    def __init__(self, load: Dict):
        self.payload = load
        self.icons: List[str] = []
        self.outlook = Outlook()
        self.getCurrentDaysOutlook() 
        self.setForecasts()
    
    def setForecasts(self):
        curDayTemps = [int(i["temp"]) for i in self.payload["days"][0]['hours']]
        nextDayTemps = [int(i["temp"]) for i in self.payload["days"][1]['hours']]
        res = { "morning": f"{min(curDayTemps[6:12])} - {max(curDayTemps[6:12])}", 
               "afternoon": f"{min(curDayTemps[12:18])} - {max(curDayTemps[12:18])}", 
               "evening": f"{min(curDayTemps[18:23])} - {max(curDayTemps[18:23])}", 
               "overnight": f"{min(curDayTemps[23:24] + nextDayTemps[0:5])} - {max(curDayTemps[23:24] + nextDayTemps[0:5])}"}
        self.outlook.forecasts = res

    def getCurrentDaysOutlook(self) -> None:
        cur = self.payload["days"][0]
        self.outlook.description = cur["description"]
        self.outlook.sunset = cur["sunset"]
        self.outlook.sunrise = cur["sunrise"]
        self.outlook.moonPhase = cur["moonphase"]
        self.outlook.low = cur["tempmin"]
        self.outlook.high = cur["tempmax"]
        self.outlook.feelslike = cur["feelslike"]
        self.getWeeklyBreakdown()
        self.getHourlyBreakdown();
        self.checkMoons()
                
    def getWeeklyBreakdown(self):
        weeklyBreakdown = [{
            "condition":self.payload["days"][i]["conditions"],
            "avrTemp":int(round(self.payload["days"][i]["tempmax"] + self.payload["days"][i]["tempmin"]) / 2),
            "feelslike":self.payload["days"][i]["feelslike"],
            "icon":self.payload["days"][i]["icon"],
            "high":self.payload["days"][i]["tempmax"],
            "low":self.payload["days"][i]["tempmin"],
            "date":self.payload["days"][i]["datetime"],
            } for i in range(0, 7)]
        self.outlook.weeklyBreakdown = weeklyBreakdown

    def getHourlyBreakdown(self):
        hours = self.payload["days"][0]["hours"]
        res: List[Dict[str, str]]= [{
            "windDir": i["winddir"],
            "windSpeed": i["windspeed"],
            "feelslike": i["feelslike"],
            "temp": i["temp"],
            "precip": i["precip"],
            "humidity": i["humidity"], 
            "icon": i["icon"],
            } for i in hours]
        self.outlook.hourly = res
    
    def checkMoons(self):
        burner = {"newMoon": {"found": False, "datetime": None}, "fullMoon": {"found": False, "datetime": None}}
        for i in range(len(self.payload["days"])):
            cur = self.payload["days"][i]
            if burner["newMoon"]["found"] and burner["fullMoon"]["found"]: 
                break
            elif float(cur["moonphase"]) == 0.5 and not burner["newMoon"]["found"]: 
                burner["newMoon"]["datetime"] = cur["datetime"]
                burner["newMoon"]["found"] = True
            elif float(cur["moonphase"]) >= 0.97 and not burner["fullMoon"]["found"]: 
                burner["fullMoon"]["datetime"] = cur["datetime"]
                burner["fullMoon"]["found"] = True
        if burner["newMoon"]["found"]:self.outlook.newMoon = burner["newMoon"]["datetime"]
        if burner["fullMoon"]["found"]:self.outlook.fullMoon = burner["fullMoon"]["datetime"]

