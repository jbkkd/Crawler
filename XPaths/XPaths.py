__author__ = 'LaptOmer'

from DB.XPathAdapter import *

def save_xpath():
    xpathAdapter_instance = XPathAdapter()
    xpathAdapter_instance.save_xpath("forums.macrumors.com", "forum", "thread_title", "thread[]")
    print xpathAdapter_instance.get_xpath_for_site("forums.macrumors.com", "forum")

save_xpath()