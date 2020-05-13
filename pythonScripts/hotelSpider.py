import scrapy
import json
import datetime

class HotelSpider(scrapy.Spider):
    name = "hotels"
    start_urls = []
    linkList = []
    index = 1
    data = {}
    data["hotelDetails"] = []
    currentDT = []
    limit = 2

    def __init__(self, urls, limit):
        self.start_urls = urls
        self.limit = limit

    def parse(self, response):
        # self.currentDT.append(datetime.datetime.now().time())
        
        if(response.request.url in self.start_urls):
            print("InSide")
            mainDev = response.css('div.ui_column.is-8.main_col.allowEllipsis')
            links = mainDev.css('a.property_title.prominent::attr(href)').extract()
            # name = response.css('.ZVAUHZqh').extract()
            # print(name,"namesssssssssssssssssss")
            for link in links:
                self.linkList.append('https://www.tripadvisor.com'+link)
            if(len(self.linkList) > 0):
                # print(self.linkList[0])
                yield response.follow(self.linkList[0], callback=self.parse)

            else:
                print("FAIL")

        else:
            print("inside2")
            name = response.css('#HEADING::text').extract()
            rating = response.css('.hotels-hotel-review-about-with-photos-Reviews__overallRating--vElGA::text').extract()
            facilities = response.css('.hotels-hr-about-amenities-Amenity__amenity--3fbBj::text').extract()
            address = response.css('.public-business-listing-ContactInfo__level_4--3JgmI::text').extract()
            imgs = response.css('.ZVAUHZqh::attr(style)').extract()
            # parice = response.css('.hotels-hotel-offers-DominantOffer__price--D-ycN').extract()
            # print(parice)
            images = []
            for img in imgs:
                if "background-image:none" not in img:
                    images.append((img))

            # print("111")
            # print(name)
            if(len(rating)>0 and len(name)>0 and len(address)>0 and len(images)>0):
                imgUrl = images[0].split('"')


                self.data["hotelDetails"].append({
                    "hotelName":name[0],
                    "rating":rating[0],
                    "facilities":facilities,
                    "address":address[0],
                    "imageUrl":imgUrl[1],
                })
            yield {"name":name,"rating":rating,"fac":facilities,"address":address}

            if(self.index < len(self.linkList) and self.index < self.limit):
                self.index += 1
                yield response.follow(self.linkList[self.index-1], callback=self.parse)
            else:
                self.data["lastUpdated"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                with open('crawlerResults/hotelResults.json', 'w') as output:
                    json.dump(self.data, output)
                print("OK")








