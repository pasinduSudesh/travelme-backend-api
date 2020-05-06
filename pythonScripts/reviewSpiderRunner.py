import sys 
import time
import sys, os.path, io
sys.path.append('D:/home/python364x86/Lib/site-packages')
from twisted.internet import reactor
import scrapy
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from reviewSpider import ReviewSpider

urlList = []
urlList = sys.argv[1].split(",")

newUrlList = []
for url in urlList:
    if(len(url) > 1):
        newUrlList.append(url)

configure_logging({'LOG_FORMAT': '%(levelname)s: %(message)s'})
runner = CrawlerRunner()

d = runner.crawl(ReviewSpider,newUrlList)
d.addBoth(lambda _: reactor.stop())
reactor.run()







# save the script as hello.py 
