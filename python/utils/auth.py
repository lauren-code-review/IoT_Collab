from pydantic import BaseModel, Field
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from typing import Tuple, Dict, Any
import bcrypt 
import pprint
import uuid


class User:
    def __init__(self, username: str, email, password, date):
        self.id: str = str(uuid.uuid4())
        self.username: str = username
        self.email: str = email
        self.password: str = password
        self.dateCreated: str = date

    def to_db(self):
        return {
            "_id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.hash_password(self.password),
            "dateCreated": self.dateCreated,
        }

        
    def hash_password(self, password: str): 
        if type(password) != type("".encode("utf-8")):
            bytes = password.encode('utf-8') 
            salt = bcrypt.gensalt() 
            hash = bcrypt.hashpassword(bytes, salt) 
            return hash 
        return password

    def check_password(self, pw:str): return bcrypt.checkpw( pw.encode("utf-8"), self.password )

    def __repr__(self) -> str: return f"User( username={self.username}, email={self.email}, password=####, date={self.dateCreated} )"
    
    def __eq__(self, __value) -> bool:
        return ((isinstance(object, User)) and (self.id == __value.id) )

def add_user(user: User): 
    client = MongoClient(uri, server_api=ServerApi("1"))
    try:
        database = client["test"]
        collection = database["test_users"]
        print(collection.insert_one(user.to_db()))
    except Exception as e:
        raise e
    finally: 
        client.close()


def authenticate(cred: Dict[str, str]) -> Tuple[bool, None | Exception]:
    err = None
    res = False
    client = MongoClient(uri, server_api=ServerApi("1"))
    try:
        database = client["test"]
        collection = database["test_users"]
        data = collection.find_one(cred)
        password = "hellom8"
        user = build_user(data)
        res = user.check_password(password)
    except Exception as e:
        err = e
        raise e
    finally:
        client.close()
        return (res, err)

def username_auth(username: str) -> Tuple[bool, None | Exception]: return authenticate({"username": username})

def email_auth(email: str) -> Tuple[bool, None | Exception]: return authenticate({"email": email})

def build_user(data: Dict) -> User: return User( username=data["username"], email=data["email"], password=data["password"], date=data["dateCreated"])

