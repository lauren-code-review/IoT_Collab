from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pprint

class Code:
    def __init__(self, code) -> None:
        self.code: str = code 
        self.end = "\033[0m"

    def print(self, text): print( f"{self.code}{text}{self.end}" )
    def ret(self, text): return ( f"{self.code}{text}{self.end}" )

    
class EscCode:
    green = Code("\033[32m")
    red = Code("\033[31m")
    cyan = Code("\033[36m")
    yellow = Code("\033[33m")
    blue = Code("\033[34m")
    magenta = Code("\033[35m")



# uri = "mongodb+srv://<username>:<password>@iot.gu6vz.mongodb.net/?retryWrites=true&w=majority&appName=IoT"

# Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi("1"))
# try:
#     collection = client["sample_training"]
#     some = collection.name
#     print(pprint.pprint(collection.find_one()))
#     print(some)
# except Exception as e:
#     print(e)
