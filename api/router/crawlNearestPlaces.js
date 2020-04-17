const express = require('express');
const fs  = require('fs')
const router = express.Router();

var searchResult = require('../models/customeSearch');
var spider = require('../models/spider')


router.post('/',function(req,res,next){
    //this router for get nearest place details
    var place = req.body.place;
    searchResult.getCrawlURL(place,0,function(err,result){
        if(err){
            res.status(500).json({
                "err":err
            })
        }else{
            spider.runPlaceSpider(result,function(err,result){
                if(err){
                    res.status(500).json({
                        "err":err
                    })
                }else{
                    let rawdata = fs.readFileSync('crawlerResults/placeSpiderResults.json');
                    let places = JSON.parse(rawdata);
                    res.status(200).json(places)
                    ///dml
                }
            });
        }
    });
});

module.exports = router