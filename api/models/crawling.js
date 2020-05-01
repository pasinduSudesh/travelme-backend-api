var searchResult = require('./api');
var spider = require('./spider');
var readFile = require('./readJsonFile');
var db = require('./firebase');

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
                    
                    db.savePlaceCrawlerDet(urls[0],placeDet);
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