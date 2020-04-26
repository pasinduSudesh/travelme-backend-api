const express = require('express');
const fs  = require('fs')
const router = express.Router();

var searchResult = require('../models/api');
var spider = require('../models/spider')
var readFile = require('../models/readJsonFile');

router.get('/:place',async function(req,res,next){
    var place = req.params.place;

    try{
        const urls = await searchResult.getCrawlURL(place,0);        
        const places = await spider.runPlaceSpider(urls)

        if(places){
            let places = await readFile.readFile('crawlerResults/placeSpiderResults.json')
            let links = places['links'];
            // const Hasreviews = await spider.runReviewSpider(links);
            await spider.crawlReviewWithUrls(links)
            if(true){
                let reviews = await readFile.readFile('crawlerResults/reviewSpiderResults.json');
                res.status(200).json(reviews);
            }
        }  

    }
    catch(err){
        res.status(500).json({
            error:{message:err.message}
        });
    }

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
    // setTimeout(function(){
    //     let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
    //     let reviews = JSON.parse(rawdata);
    //     res.status(200).json(reviews)
    // },5000)
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