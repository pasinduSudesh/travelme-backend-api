const express = require('express');
const fs  = require('fs')
const router = express.Router();

var searchResult = require('../models/api');
var spider = require('../models/spider');
var readFile = require('../models/readJsonFile');
var db = require('../models/firebase');

router.get('/:place',async function(req,res,next){
    const place = req.params.place;
    try{
        var urls = await searchResult.getCrawlURL(place,0);
        // console.log(urls)
        var hasCrawled = await db.checkUrlInDB(urls[0]);
        // console.log(hasCrawled)
        if(hasCrawled){
            res.status(200).json(hasCrawled);            
        }else{
            var places = await spider.runPlaceSpider(urls);   
            // console.log(places)  
            // console.log("runs spider ")    
            if(places){
                var placeDet = await readFile.readFile('crawlerResults/placeSpiderResults.json');
                // res.status(200).json(placeDet);
                db.savePlaceCrawlerDet(urls[0],placeDet);
                var p = placeDet['places']
                var  links = []
                p.forEach(e => {
                   links.push({url: e['review_link'], review_count:e['no_of_reviews']});
                });
                await db.saveLinksToReview(links);
                await db.savePlaceDet(p)               
                // await spider.crawlReviewWithUrls(placeDet['links']);
                // await db.afterCrawlChangeLinks(placeDet['links']);
                // console.log("ending...........")
                res.status(200).json(placeDet);
                console.log("end")
                
            } 
            
        }       
                
    }
    catch(err){
        res.status(500).json({
            error:{message:err.message}
        });
    }

});


router.post('/',async function(req,res,next){
    //this router for get nearest place details
    var place = req.body.place;
    try{
        const urls = await searchResult.getCrawlURL(place,0);        
        const places = await spider.runPlaceSpider(urls)

        if(places){
            let places = await readFile.readFile('crawlerResults/placeSpiderResults.json')
            res.status(200).json(places)
        }        
    }
    catch(err){
        res.status(500).json({
            error:{message:err.message}
        });
    }
});

module.exports = router