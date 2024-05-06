from pymongo import MongoClient

def dbConnect():
    # Connect to database
    client = MongoClient('mongodb://localhost:27017/')
    db = client['WinSprint']
    if db != '':
         print("* Database connected! **"+str(db))
    return db