var db = require('./mongoose');
var spider = require('./spider')
var sentiment = require('./sentiment')
var file = require('./readJsonFile')
var fs = require('fs')

exports.automateCrawlReviews = async function(){
    try{
        var ss = await db.getLinksToAutomateCrawl()
        if(ss.length > 0){
            var links = []
            ss.forEach(element => {
                links.push(element.url)
            });
            console.log(links)
            var linksToCrawl = await db.getLinksBeforeCrawl(links)
            var reviews = await spider.crawlReviewWithUrls(linksToCrawl)
            var save = await db.afterCrawlChangeLinks(linksToCrawl)
            console.log(reviews.length,"111")
            var data = JSON.stringify({
                reviews:reviews
            })
            console.log(reviews.length,"222")
            fs.writeFileSync('sentimentJson/reviewsForSentiment.json',data)  
            var senti = await sentiment.sentimentAnalyze();
            var sentimentResult = await file.readFile('sentimentJson/sentimentResults.json')
            var analysedPlaces = await db.saveSentiments(sentimentResult)
            console.log("done")
        }else{
            console.log("nothing");
        }
        
    }catch(err){
        console.log(err.message)
    }
}
    