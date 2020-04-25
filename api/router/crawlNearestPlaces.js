const express = require('express');
const fs  = require('fs')
const router = express.Router();

var searchResult = require('../models/api');
var spider = require('../models/spider');
var readFile = require('../models/readJsonFile');

router.get('/:place',async function(req,res,next){
    const place = req.params.place;

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