const express = require('express');
const fs  = require('fs')
const router = express.Router();

let {PythonShell} = require('python-shell')

var spider = require('../models/spider');
var searchResult = require('../models/customeSearch');



router.get('/',function(req,res,next){
   
    
    let options = {
         // get print results in real-time
        scriptPath: 'pythonScripts',
        args: ["scrapy"]
      };
      PythonShell.run('testPython.py', options, function (err, results) {
        if (err){
           res.status(500).json({
               "err":err
           });
           
        }else{
            res.status(200).json({
                "ddd":results
            });
    
        }       
        
      });

    // let rawdata = fs.readFileSync('crawlerResults/reviewSpiderResults.json');
    // let places = JSON.parse(rawdata);
    // res.status(200).json(places)


    
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