var searchResult = require('./api');
var spider = require('./spider');
var readFile = require('./readJsonFile');
// var db = require('./firebase');
var db = require('./mongoose');

exports.crawlWithPlaceName =  function(place){

    return new Promise(async (resolve,reject)=>{
        try{
            var urls = await searchResult.getCrawlURL(place,0);
            console.log(urls);
            // console.log(urls)
            var hasCrawled = await db.checkUrlInDB(urls[0]);
            // console.log(hasCrawled)
            if(hasCrawled){
                resolve(hasCrawled);
            }else{
                var places = await spider.runPlaceSpider(urls);   
                  
                if(places){
                    var placeDet = await readFile.readFile('crawlerResults/placeSpiderResults.json');
                    
                    await db.savePlaceCrawlerDet(urls[0],placeDet);
                    var p = placeDet['places']
                    var  linksTosave = []
                    var linksToCrawl = []
                    p.forEach(e => {
                        linksTosave.push({url: e['review_link'], review_count:e['no_of_reviews']});
                        linksToCrawl.push(e['review_link'])
                    });
                    await db.saveLinksToReview(linksTosave);
                    await db.savePlaceDet(p);         
                    
                    resolve(placeDet);
                    
                } 
                
            }       
                    
        }
        catch(err){
            reject(new Error(err))
        }
    });


}


exports.crawlHotelsWithPlaceName = function(place){
    return new Promise(async (resolve, reject) => {
        try{
            var urls = await searchResult.getCrawlURL(place,1);
            console.log(urls);
            var hasCrawled = await db.checkHotelCrawlUrlInDb(urls[0]);
            console.log(hasCrawled)
            if(hasCrawled){
                resolve("CRAWLED PREVIOUSLY")
            }else{
                // console.log("CRAWLING")
                
                await spider.hotelSpider(urls,20);
                // console.log("SAving Urls")
                console.log(urls);
                await db.saveCrawlUrl(urls[0])
                var hotelDet = await readFile.readFile('crawlerResults/hotelResults.json');
                for(var x=0;x<hotelDet['hotelDetails'].length;x++){
                    var fullDet = await searchResult.googlePlaceAPI(hotelDet['hotelDetails'][x]['hotelName']+","+hotelDet['hotelDetails'][x]['address']);
                    // console.log(fullDet);
                    if(fullDet['status'] === 'OK'){
                        var HotelDetailsToSave = {
                            name:hotelDet['hotelDetails'][x]['hotelName'],
                            address:hotelDet['hotelDetails'][x]['address'],
                            hotelUrl:hotelDet['hotelDetails'][x]['hotelUrl'],
                            img:hotelDet['hotelDetails'][x]['imageUrl'],
                            rating:parseFloat(hotelDet['hotelDetails'][x]['rating']),
                            facilities:hotelDet['hotelDetails'][x]['facilities'],
                            placeId:fullDet['candidates'][0]['place_id'],
                            lat:fullDet['candidates'][0]['geometry']['location']['lat'],
                            lng:fullDet['candidates'][0]['geometry']['location']['lng'],
                            latLng:fullDet['candidates'][0]['geometry']['location']['lat'].toString()+","+fullDet['candidates'][0]['geometry']['location']['lng'].toString()
                        }
                        await db.saveHotelDetails(HotelDetailsToSave)
                    }
                    else{
                        console.log("A")
                    }
                }
                resolve("NOW CRAWLED")
            } 
        }catch(err){
            reject(new Error(err));
        }
    });
}