__author__ = 'OrDuan'

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
# from scrapper.items import Post


class TestSpider(BaseSpider):
    name = "testspider"
    allowed_domains = ["macrumors.com"]
    start_urls = [
        "http://forums.macrumors.com/showthread.php?t=1611153",
    ]

    def parse(self, response):
        hxs = HtmlXPathSelector(response)
        all_the_posts = hxs.select('//*[@id="posts"]/div')
        counter = 0
        Posts = []
        for post_div in all_the_posts:
            counter += 1
            post = Post()
            # post['post_title'] = hxs.select('/div[0]/div[0]/div[0]/table[0]/tbody[0]/tr[1]/td[1]//div[1]/strong').extract()
            post['title'] = post_div.select(".//td[@class='alt1']/div[@class='smallfont']/strong").extract()
            post['content'] = post_div.select(".//div[starts-with(@id, 'post_message')]/text()").extract()
            post['username'] = post_div.select(".//a[@class='bigusername']/text()").extract()
            post['id'] = post_div.select(".//table[@class='tborder']/@id").re("\d+")
            Posts.append(post)

        return Posts