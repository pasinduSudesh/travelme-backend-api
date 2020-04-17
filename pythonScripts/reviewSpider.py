from twisted.internet import reactor
import scrapy
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
# from .spiders.reviewSpider import ReviewSpider
from multiprocessing import Process, Queue
from datetime import datetime
import json

class ReviewSpider(scrapy.Spider):

    name = "review"
    start_urls = [
        'https://www.tripadvisor.com/Attraction_Review-g304140-d3600925-Reviews-Gal_Vihara-Polonnaruwa_North_Central_Province.html',
        'https://www.tripadvisor.com/Attraction_Review-g304140-d3600925-Reviews-or5-Gal_Vihara-Polonnaruwa_North_Central_Province.html'      

    ]
    res = []
    index = 1
    results = []
    time = []

    def __init__(self,start_urls):
        self.start_urls = start_urls

    def parse(self, response):

        if(response.request.url in self.start_urls):
            self.time.append(datetime.now)
            self.res = self.res + response.css('a.location-review-review-list-parts-ReviewTitle__reviewTitleText--2tFRT::attr(href)').extract()
            # print(self.res)
            # print(self.res)
            if(len(self.res) > 0):
                yield response.follow(self.res[0], callback=self.parse)
            else:
                print("Crawler is stop !!!")

        else:
            # print("jfjjfjfjj")
            rt = response.css('.partial_entry::text').extract()
            # create place name start
            place1 = response.request.url.split("-")[-1].split(".")[0].split("_")
            place2 = response.request.url.split("-")[-2].split("_")

            p1 = ""
            p2 = ""

            for x in place1:
                p1+= " "+x
            for y in place2:
                p2 += " "+y
            
            p1 = p1[1:]
            p2 = p2[1:]

            #create place name end

            self.results.append({
                "place" : p2 + ", " + p1,
                "review": rt,
                "review-count": len(rt)
            })

            self.time.append(datetime.now())
            yield {"tr": rt}
            if ( self.index < len(self.res) ):
                self.index += 1
                yield response.follow('https://www.tripadvisor.com'+self.res[self.index - 1], callback=self.parse)
            else:
                print(len(self.results))

                #write result into json file
                with open('crawlerResults/reviewSpiderResults.json', 'w') as output:
                    resultjson = {}
                    resultjson['result'] = self.results
                    # resultjson['review-count'] = len(self.results)
                    resultjson['last-modified'] = {"date": datetime.now().strftime("%m/%d/%Y"),"time":datetime.now().strftime("%H:%M:%S")}
                    resultjson['STATUS'] = "SUCCESS"
                    json.dump(resultjson, output)


