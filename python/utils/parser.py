from typing import Dict, List
from flask import jsonify
from .testing import EscCode

#There is a key for currentConditions.temp in the response from the weather API as well. TODO

#To be implemented: 
#TODO Wind direction, Moonphase, Moonrise, Next full/new moon

class Metric:
    count: int = 0
    total: float = 0

    def getAvr(self) -> int: return int(round(self.total / self.count, 2))

    def zero(self): self.count, self.total = 0, 0

    def add(self, n: float) -> None: self.count, self.total = 1, n

class Forecast:
    feelslike: int
    temp: int
    precipitation: float
    humidity: int
    icon: str #TODO
    # Icon will be determined by taking each given icon value 
    # from the payload and taking the max(count(icons: List[str]))
    def get_icon(self, icons: List[str]) -> None:
        seen = [] 
        leader = ""
        leader_total = 0
        for i in icons:
            if i not in seen:
                total = icons.count(i)
                if total > leader_total:
                    leader_total = total
                    seen.append(i)
                    leader = i
        self.icon = leader

    def __repr__(self) -> str:
        return (
                f""" 
            {EscCode.blue.ret('Feels Like:')} {EscCode.green.ret(self.feelslike)}
            {EscCode.blue.ret('Temperature:')} {EscCode.green.ret(self.temp)}
            {EscCode.blue.ret('Precipitation:')} {EscCode.green.ret(self.precipitation)}
            {EscCode.blue.ret('Humidity:')} {EscCode.green.ret(self.humidity)}
                """
                )

    def json(self):
        return {
            "feelslike": self.feelslike,
            "temp": self.temp,
            "precipitation": self.precipitation,
            "humidity": self.humidity,
                }

# current date/time should be generated on the client side
# There will need to be a general time frame established for 
# which they client side can determine which set of data will be used.
# The payload that we are accessing will always be the 1st index so it will always be the current day.
class Outlook:
    def __init__(self):
        self.high: str = str()
        self.low: str = str()
        self.windDir: str = str()
        self.windSpeed: str = str()
        self.description: str = str()
        self.moonPhase: str | None = None
        self.sunrise: str | None = None
        self.sunset: str | None = None
        self.morning = Forecast()
        self.afternoon = Forecast()
        self.evening = Forecast()
        self.overnight = Forecast()
        self.weeklyBreakdown: List = []

    def __repr__(self) -> str:
        return (
                f"""
            {EscCode.red.ret('Days Outlook:')}
            {EscCode.blue.ret('Sunrise:')}{EscCode.green.ret(self.sunrise)}
            {EscCode.blue.ret('Sunset:')}{EscCode.green.ret(self.sunset)}
            Morning: 
            -------
                {self.morning}
            Afternoon: 
            -------
                {self.afternoon}
            Evening: 
            -------
                {self.evening}
            Overnight: 
            -------
                {self.overnight}
            {EscCode.blue.ret('WindSpeed:')} {EscCode.green.ret(self.windSpeed)}
            {EscCode.blue.ret('WindDirection:')} {EscCode.green.ret(self.windSpeed)}
                """
                )

    def json(self):
        return { 
                "moonPhase":self.moonPhase,
                "description":self.description,
                "sunrise":self.sunrise,
                "sunset":self.sunset,
                "morning": self.morning.json(),
                "afternoon": self.afternoon.json(),
                "windDir": self.windDir,
                "windSpeed": self.windSpeed,
                "evening": self.evening.json(),
                "overnight":self.overnight.json(),
                "weeklyBreakdown": self.weeklyBreakdown
                }
            
            

class PayloadParser:
    def __init__(self, load: Dict):
        self.payload = load
        self.icons: List[str] = []
        self.outlook = Outlook()
        self.temps = Metric()
        self.precipitations = Metric()
        self.humidities = Metric()
        self.feelslikes = Metric()
        self.getCurrentDaysOutlook() 


    def getAverages(self) -> Forecast:
        final = Forecast()
        final.temp = self.temps.getAvr()
        final.precipitation = self.precipitations.getAvr()
        final.humidity = self.humidities.getAvr()

        return final

    def getCurrentDaysOutlook(self) -> None:
        cur = self.payload["days"][0]
        self.outlook.windDir = cur["winddir"]
        self.outlook.windSpeed = cur["windspeed"]
        self.outlook.description = cur["description"]
        self.outlook.sunset = cur["sunset"]
        self.outlook.sunrise = cur["sunrise"]
        self.outlook.moonPhase = cur["moonphase"]
        self.outlook.low = cur["tempmin"]
        self.outlook.high = cur["tempmax"]
        self.outlook.weeklyBreakdown = self.getWeeklyBreakdown()
        hoursCount = 0
        while hoursCount < len(cur["hours"]):
            self.icons.append(cur["icon"])
            self.humidities.add(cur["hours"][hoursCount]["humidity"])
            self.precipitations.add(cur["hours"][hoursCount]["precipprob"])
            self.temps.add(cur["hours"][hoursCount]["temp"])
            self.feelslikes.add(cur["hours"][hoursCount]["feelslike"])
            match hoursCount:
                case 5: self.buildForecast(self.outlook.overnight)
                case 11: self.buildForecast(self.outlook.morning)
                case 16: self.buildForecast(self.outlook.afternoon)
                case 23: self.buildForecast(self.outlook.evening)
            hoursCount += 1

    def buildForecast(self, fore: Forecast):
        self.outlook.description = self.payload["description"]
        fore.get_icon(self.icons) 
        fore.humidity = self.humidities.getAvr()
        self.humidities.zero()
        fore.precipitation = self.precipitations.getAvr()
        self.precipitations.zero()
        fore.temp = self.temps.getAvr()
        self.temps.zero()
        fore.feelslike = self.feelslikes.getAvr()
        self.feelslikes.zero()
                
    def getWeeklyBreakdown(self):
        # - 7 Day Temp Forecast TODO
        # - Average Temp, Conditions for each day TODO
        # - High/Low Temp TODO
        weeklyBreakdown = [{
            "condition":self.payload["days"][i]["conditions"],
            "avrTemp":int(round(self.payload["days"][i]["tempmax"] + self.payload["days"][i]["tempmin"]) / 2),
            "icon":self.payload["days"][i]["icon"],
            "high":self.payload["days"][i]["tempmax"],
            "low":self.payload["days"][i]["tempmin"],
            "date":self.payload["days"][i]["datetime"],
        } for i in range(0, 7)]

        return weeklyBreakdown

    # - Current Conditions, Temp TODO
    # - - Ask the group how they think we should do this


"""
[
  Moon Phase,
  Sunrise & Sunset Times,
  Morning (*6:00 - 11:00*): ,
  Afternoon ( *12:00 - 16:00* ): 
  Evening ( *17:00 - 23:00* ): 
  Overnight (*Next Day 01:00 - 05:00*):
]
"""
