from cgitb import text

import scrapy
import json
from datetime import datetime
# from ..text.ss import fun


class GoogleSpider(scrapy.Spider):
    name = "place"
    # allowed_domains = ['https://www.tripadvisor.com']
    start_urls = []


    def __init__(self, urls):
        self.start_urls = urls
        # self.allowed_domains = allowed_domains

    def parse(self, response):
        # main_divs = response.css('div.attractions-attraction-overview-pois-PoiGrid__wrapper--2H3Mo')

        main_divs = response.css('#FILTERED_LIST')
        # place_title = main_divs.css('._21qUqkJx::text').extract()
        place_name = main_divs.css('h3::text').extract()[1::2]
        number_of_revewis = main_divs.css('.styleguide-bubble-rating-BubbleRatingWithReviewCount__reviewCount--37tMc::text').extract()
        place_review_link = main_divs.css('::attr(href)').extract()[::3]
        img = response.css('source::attr(srcset)').extract()[-10::]

        data = {}
        data['place_count'] = len(place_name)
        data['places'] = []
        data['links']  = []

        print(place_review_link)

        for x in range(len(place_name)):
            try:
                data['places'].append({
                    'place_name': place_name[x],
                    'no_of_reviews': number_of_revewis[x],
                    'review_link': 'https://www.tripadvisor.com' + place_review_link[x],
                    'img': img[x].split(",")[2].split(" ")[1]
                })
                data['links'].append('https://www.tripadvisor.com' + place_review_link[x])
            except:
                print("error")
        
        data['last_modified'] = {"date": datetime.now().strftime("%m/%d/%Y"),"time":datetime.now().strftime("%H:%M:%S")}

        with open('crawlerResults/placeSpiderResults.json', 'w') as output:
            json.dump(data, output)
        print("ok")

        yield data
