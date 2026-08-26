from pydantic import BaseModel

class student(BaseModel):
    full_name : str
    age : int
    date_of_birth: date
    phone_number: str
    email: str


class Guardian(BaseModel):
    full_name: str
    phone_number: str
    email: str

class tutor(BaseModel):
    full_name: str
    phone_number: str
    email: str

class classes(BaseModel):
    day : str
    model: str
    location: str   
    subjects: str
    