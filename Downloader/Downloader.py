__author__ = 'LaptOmer'
import re
import urllib2

from bs4 import BeautifulSoup as Soup


baseHTML = 'http://forums.macrumors.com/'
baseForum = 'forumdisplay.php?f=109'
postsCollection = []


def get_url_to_download():
    url = db_get_url_to_download()
    download_page(url)

def download_page(url):
    page_HTML = urllib2.urlopen(url).read()
    save_html(page_HTML)


def
    page = Soup(forumHTML)

    threadLinks = []

    for link in page.find_all("a", id=re.compile("thread_title_.*")):
        linkName = re.search('thread_title_(\d+)', link['id']).group(1)
        threads_collection.append({"ID": linkName, "link": link['href']})

    for i in xrange(1):
        thread = threads_collection[i]
        postPage = Soup(urllib2.urlopen(baseHTML + thread["link"]))
        postsPart = postPage.find("div", {"id": "posts"})
        print baseHTML + thread["link"]
        for table in postsPart.findAll("table", id=re.compile("post.*")):
            newPost = dict.fromkeys(['date', 'title', 'text'])
            newPost['title'] = ''
            newPost['threadID'] = thread['ID']
            for tcat in table.findAll("td", {"class": "tcat"}):
                if len(tcat.findAll("a", {"name": table['id']})) > 0:
                    newPost['date'] = tcat.text.strip()
            dataTab = table.find("td", {"class": "alt1"})
            if dataTab is not None:
                if dataTab.find("strong"):
                    newPost['title'] = dataTab.find("strong").text.strip()
                for textTab in dataTab.findAll("div"):
                    if textTab.has_attr("id"):
                        if textTab['id'].startswith("post_message"):
                            newPost['text'] = textTab.text.strip()
                postsCollection.append(newPost)

        for post in postsCollection:
            print "date: " + post['date']
            print "title: " + post['title']
            print "text: " + post['text']
            print "############################"

def download_thread_page():
    postsCollection = []


download_forum_page()

