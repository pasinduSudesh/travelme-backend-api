const express = require('express');
const fs  = require('fs')
const router = express.Router();

var spider = require('../models/spider');
var searchResult = require('../models/customeSearch');



router.get('/',function(req,res,next){
   
    
    let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
    let places = JSON.parse(rawdata);
    res.status(200).json(places)
    
    // var st = JSON.parse(file)		
})

router.post('/',function(req,res,next){   
    var url = req.body.url;
    spider.runReviewSpider(url,function(err,resul){
        if(err){
            res.status(500).json({
                "STATUS": "ERROR",
                "error":{"message": err}
            });
        }else{
            let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
            let reviews = JSON.parse(rawdata);
            res.status(200).json(reviews)
        }
    });
})

module.exports = router