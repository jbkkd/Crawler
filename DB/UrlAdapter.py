__author__ = 'LaptOmer'
from DBBaseClass import BaseDB
from datetime import datetime


class UrlAdapter(BaseDB):
    def __init__(self):
        super(UrlAdapter, self).__init__()
        self.url_collection = self.get_collection("url_collection")

    def save_url_to_download(self, url):
        url_document = self.url_collection.find_one({'url': url})
        if url_document is None:
            url_document = {'url': url, 'inserted_on': datetime.now(), 'downloaded_on': '', 'html': ''}
            self.url_collection.insert(url_document)

    def get_url(self, url):
        return self.url_collection.find_one({'url': url})

    def get_url_to_download(self):
        self.url_collection.find_and_modify({'downloaded_on': ""}, update={'$set': {'downloaded_on': datetime.now()}})

    def save_html_of_url(self, url, html):
        url_document = self.url_collection.find_one({'url': url})
        if url_document is None:
            self.url_collection.insert()
