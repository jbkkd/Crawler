__author__ = 'LaptOmer'
from pymongo import MongoClient

class BaseDB(object):
    def __init__(self):
        self.db_name = "XpathCrawler"
        self.client = MongoClient()
        self.db = self.client[self.db_name]

    def get_collection(self, collection_name):
        return self.db[collection_name]

    def save_to_collection(self, collection, value):
        return collection.insert(value)

