__author__ = 'OrDuan'

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector


class TestSpider(BaseSpider):
    name = "testsipder"
    allowed_domains = ["macrumors.com"]
    start_urls = [
        "http://forums.macrumors.com/showthread.php?t=1611153",
    ]

    def parse(self, response):
        hxs = HtmlXPathSelector(response)
        print hxs.select('//title').extract()