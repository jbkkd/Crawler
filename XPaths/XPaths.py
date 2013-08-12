__author__ = 'LaptOmer'

from DB.XPathAdapter import *
from Urls.Urls import *


class XPathsHandler(object):
    def __init__(self, site_main_url):
        self.xpath_adapter = XPathAdapter()
        self.site_main_url = site_main_url

    def save_xpaths(self, page_type, xpaths):
        urls_handler = UrlsHandler()
        urls_handler.save_url(self.site_main_url)
        for xpath_key in xpaths:
            xpath_value = xpaths[xpath_key]
            self.xpath_adapter.save_xpath(self.site_main_url, page_type, xpath_key, xpath_value)

    def get_xpath_for_site(self, page_type):
        self.xpath_adapter.get_xpath_for_site(self.site_main_url, page_type)
