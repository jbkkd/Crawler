__author__ = 'LaptOmer'
from DBBaseClass import BaseDB
from datetime import datetime

class XPathAdapter(BaseDB):
    def __init__(self):
        super(XPathAdapter, self).__init__()
        self.xpath_collection = self.get_collection("xpath_collection")

    def save_xpath(self, site_main_url, page_type, key, xpath):
        url_entry = dict(site_main_url=site_main_url, page_type=page_type, key=key, xpath=xpath, inserted_on=datetime.now())
        self.xpath_collection.insert(url_entry)

    def get_xpath_for_site(self, site_main_url, page_type):
        return self.xpath_collection.find_one({'site_main_url': site_main_url, 'page_type': page_type})
