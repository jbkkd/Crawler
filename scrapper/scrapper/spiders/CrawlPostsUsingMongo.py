__author__ = 'LaptOmer'

from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.selector import HtmlXPathSelector
from Crawler.scrapper.scrapper.items import Post, Thread
# from XPaths.XPathsss import XPathsHandler


class CrawlPostsUsingMongo(CrawlSpider):
    name = "CrawlPostsUsingMongo"
    allowed_domains = ["forums.macrumors.com"]
    start_urls = [
        "http://forums.macrumors.com/forumdisplay.php?f=43",
    ]

    rules = [
        Rule(SgmlLinkExtractor(
                allow=('showthread\.php', ),
                # deny=('http://forums\.macrumors\.com/showthread\.php\?t=1493239$', ), # TODO - Make a function that takes the start_urls and generates a regex from them
                restrict_xpaths=("//div[@class='pagenav']", "//*[contains(@id, 'threadbits_forum_')]"),
            ),
            callback='parse_posts',
            follow=True,
        ),
        Rule(SgmlLinkExtractor(
                allow=('forumdisplay\.php', ),
                # deny=('http://forums\.macrumors\.com/forumdisplay.php?f=43$', ), # TODO - Make a function that takes the start_urls and generates a regex from them
                restrict_xpaths=("//div[@class='pagenav']", "//*[starts-with(@id, 'collapseobj_forumbit_')]"),
            ),
            callback='parse_threads',
            follow=True,
        ),
    ]


    def parse_posts(self, response):
        hxs = HtmlXPathSelector(response)

        Handler = XPathsHandler("forums.macrumors.com")  # TODO: is that the current site_name?
        XP = Handler.get_xpath_for_site("Thread")

        page_number = self.get_qs_numeric_value(response.url, "page")
        thread_id = self.get_qs_numeric_value(response.url, "t")

        all_the_posts = hxs.select(XP["htmlelement_that_wraps_a_post"])
        posts = []
        for post_div in all_the_posts:
            if post_div.select('./@id') == 'lastpost':
                continue
            post = Post()
            # post['title'] = post_div.select(".//td[@class='alt1']/div[@class='smallfont']/strong").extract()
            # post['content'] = post_div.select(".//div[starts-with(@id, 'post_message')]/text()").extract()
            # post['username'] = post_div.select(".//a[@class='bigusername']/text()").extract()
            # post['id'] = post_div.select(".//table[@class='tborder']/@id").re("\d+")
            # post['page_number'] = page_number
            # post['thread_id'] = thread_id
            # post['date'] = ""
            post['title'] = post_div.select("." + XP["post_title"]).extract()
            post['content'] = post_div.select("." + XP["post_data"]).extract()
            post['username'] = post_div.select("." + XP["poster_username"]).extract()
            post['id'] = post_div.select(".//table[@class='tborder']/@id").re("\d+")
            post['page_number'] = page_number
            post['thread_id'] = thread_id
            post['date'] = post_div.select("." + XP["post_data"]).extract()
            posts.append(post)

        return posts

    def parse_threads(self, response):
        hxs = HtmlXPathSelector(response)
        page_number = self.get_qs_numeric_value(response.url, "page")
        forum_id = self.get_qs_numeric_value(response.url, "f")
        all_the_threads = hxs.select('//*[@id="threadbits_forum_43"]/tr')
        threads = []
        for thread_td in all_the_threads:
            if thread_td.select('./@id') == 'lastpost':
                continue
            thread = Thread()
            thread['title'] = thread_td.select(".//a[starts-with(@id, 'thread_title_')]/text()").extract()[0]
            thread['replies'] = thread_td.select(".//a[starts-with(@onclick, 'who(')]/text()").extract()[0]
            thread['views'] = thread_td.select(".//td[@class='alt2' and @align='center']/text()").extract()[0]
            thread['id'] = thread_td.select(".//a[starts-with(@id, 'thread_title_')]/@id").re("\d+")
            thread['forum_id'] = forum_id
            thread['page_number'] = page_number
            threads.append(thread)

        return threads

    def parse_start_url(self, response):
        self.parse_threads(response)

    def get_qs_numeric_value(self, url_string, template):
        template += "="
        if template in url_string:
            page_index_id = url_string.index(template) + len(template)
        else:
            return 1
        temp_string = url_string[page_index_id:]
        output = ""
        for i in temp_string:
            if i.isdigit():
                output += i
                continue
            break
        return int(output)