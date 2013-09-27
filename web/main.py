#!\Python27\python
# coding=utf-8
#
from bs4 import BeautifulSoup as Soup
import urllib2
from HTML_of_target_site import site_stringy
import os
from XPaths.XPaths import XPathsHandler
from Urls.Urls import UrlsHandler
from bottle import route, run, default_app, request, template, static_file, SimpleTemplate

import time
result = {'success': 'true'}
application = default_app()
SimpleTemplate.defaults["get_url"] = application.get_url


# Get url and post back the html, if not posted return the default
@application.post('/a')
def build_page():
    if request.json is not None and "newURL" in request.json.keys():  # User asks for new url
        new_url = request.json["newURL"]

    elif request.json is not None and "site_link" in request.json.keys():  # User sending DataToDB
        DBHandler = XPathsHandler(request.json["site_link"])
        new_data = request.json
        del new_data["site_link"]
        DBHandler.save_xpaths(request.json["page_type"], new_data)
        return "Tnx for the data. We WILL use it!"
    else:
        new_url = 'http://www.iphoneforums.net/forum/hacking-tutorials-guides-68/how-downgrade-your-iphone4s-ipad2-ipad3-39409/'

    user_agent = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36"  # Or any valid user agent from a real browser
    headers = {"User-Agent": user_agent}
    req = urllib2.Request(new_url, headers=headers)
    forumHTML = urllib2.urlopen(req)

    # forumHTML = site_stringy()

    page = Soup(forumHTML)

    for e in page.findAll(['script', '']):
        e.extract()
    return str(page)

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')


@route('/getxpath')
def getTags():
    output = template(os.path.realpath("views\\getxpath.tpl"))
    return output

@route('/geturl')
def getURLs():
    # urls_handler = UrlsHandler()
    # x = urls_handler.get_all_urls()
    output = template(os.path.realpath("views\\geturl.tpl"))
    return output

@route('/admin')
def admin():
    # TODO: scrapy Setting and Start option.
    return None

@route('/showitem')
def showitem():
    output = template(os.path.realpath("views\\showitem.tpl"))
    return output

@route('/xpath')
def showitem():
    output = template(os.path.realpath("xpath.html"))
    return output


run(application, host='localhost', port=8080, reloader=True)
