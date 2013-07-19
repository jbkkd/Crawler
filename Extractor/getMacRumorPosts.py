import re
import urllib2


from bs4 import BeautifulSoup as Soup


baseHTML = 'http://forums.macrumors.com/'
baseForum = 'forumdisplay.php?f=109'
postsCollection = []


def find_threads_links(html):
    threads = []
    for link in html.find_all("a", id=re.compile("thread_title_.*")):
        linkName = re.search('thread_title_(\d+)', link['id']).group(1)
        threads.append({"ID": linkName, "link": link['href']})

    save_thread_links(threads)

def iterateForumMessages():
    threads = []

    forumHTML = urllib2.urlopen(baseHTML + baseForum).read()
    page = Soup(forumHTML)


    for link in page.find_all("a", id=re.compile("thread_title_.*")):
        linkName = re.search('thread_title_(\d+)', link['id']).group(1)
        threads.append({"ID": linkName, "link": link['href']})

    for i in xrange(1):
        thread = threads[i]
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


iterateForumMessages()
