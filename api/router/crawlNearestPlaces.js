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
        var hasCrawled = await db.checkUrlInDB(urls[0]);

        if(hasCrawled){
            res.status(200).json(hasCrawled)
        }else{
            var places = await spider.runPlaceSpider(urls);         

            if(places){
                var placeDet = await readFile.readFile('crawlerResults/placeSpiderResults.json');
                res.status(200).json(placeDet);
                db.savePlaceCrawlerDet(urls[0],placeDet)
                var links = placeDet['links']
                db.saveLinksToReview(links);
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