const express = require('express');
const fs  = require('fs')
const router = express.Router();

var searchResult = require('../models/customeSearch');
var spider = require('../models/spider')

router.get('/:place',function(req,res,next){
    var place = req.params.place;
    // searchResult.getCrawlURL(place,0,function(err,result){
    //     if(err){
    //         res.status(500).json({
    //             "err":err
    //         })
    //     }else{
    //         spider.runPlaceSpider(result,function(err,result){
    //             if(err){
    //                 res.status(500).json({
    //                     "err":err
    //                 })
    //             }else{
    //                 let rawdata = fs.readFileSync('crawlerResults/placeSpiderResults.json');
    //                 let places = JSON.parse(rawdata);
    //                 let urls = places['links']
    //                 spider.runReviewSpider(urls,function(err,resul){
    //                     if(err){
    //                         res.status(500).json({
    //                             "STATUS": "ERROR",
    //                             "error":{"message": err}
    //                         });
    //                     }else{
    //                         let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
    //                         let reviews = JSON.parse(rawdata);
    //                         res.status(200).json(reviews)
    //                     }
    //                 });

    //             }
    //         });
    //     }
    // });
    setTimeout(function(){
        let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
        let reviews = JSON.parse(rawdata);
        res.status(200).json(reviews)
    },5000)
});


router.post('/',function(req,res,next){
    //this router for get nearest place details
    var place = req.body.place;
    // searchResult.getCrawlURL(place,0,function(err,result){
    //     if(err){
    //         res.status(500).json({
    //             "err":err
    //         })
    //     }else{
    //         spider.runPlaceSpider(result,function(err,result){
    //             if(err){
    //                 res.status(500).json({
    //                     "err":err
    //                 })
    //             }else{
    //                 let rawdata = fs.readFileSync('crawlerResults/placeSpiderResults.json');
    //                 let places = JSON.parse(rawdata);
    //                 let urls = places['links']
    //                 spider.runReviewSpider(urls,function(err,resul){
    //                     if(err){
    //                         res.status(500).json({
    //                             "STATUS": "ERROR",
    //                             "error":{"message": err}
    //                         });
    //                     }else{
    //                         let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
    //                         let reviews = JSON.parse(rawdata);
    //                         res.status(200).json(reviews)
    //                     }
    //                 });

    //             }
    //         });
    //     }
    // });
    setTimeout(function(){
        let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
        let reviews = JSON.parse(rawdata);
        res.status(200).json(reviews)
    },5000)
});

module.exports = router