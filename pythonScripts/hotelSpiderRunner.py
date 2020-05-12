import os
import sys, os.path, io 
import time

sys.path.append('D:/home/python364x86/Lib/site-packages')

from twisted.internet import reactor
import scrapy
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from hotelSpider import HotelSpider

urlList = []
urlList = sys.argv[1].split(",")
limit = int(sys.argv[2])

newUrlList = []
for url in urlList:
    if(len(url) > 1):
        newUrlList.append(url)

configure_logging({'LOG_FORMAT': '%(levelname)s: %(message)s'})
runner = CrawlerRunner()

d = runner.crawl(HotelSpider,newUrlList,limit)
d.addBoth(lambda _: reactor.stop())
reactor.run()