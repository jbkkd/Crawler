__author__ = 'LaptOmer'

from DB.UrlAdapter import *

class UrlsHandler(object):
    def __init__(self):
        self.url_adapter = UrlAdapter()

    def save_url(self, url):
         url_document = self.url_adapter.get_url(url)
         if url_document is None:
            self.url_adapter.save_url_to_download(url)
