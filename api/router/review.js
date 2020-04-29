const express = require('express');
const fs  = require('fs')
const router = express.Router();

let {PythonShell} = require('python-shell')

var spider = require('../models/spider');
var searchResult = require('../models/api');
var firebase = require('firebase-admin');
// const db = require('../models/firebase');
const db = require('firebase-admin');



router.get('/',async function(req,res,next){
    // console.log("Start");
    // var urls = ['https://www.tripadvisor.com/Attraction_Review-g297896-d3617497-Reviews-Galle_Fort-Galle_Galle_District_Southern_Province.html',
    // 'https://www.tripadvisor.com/Attraction_Review-g297896-d447525-Reviews-Sinharaja_Forest_Reserve-Galle_Galle_District_Southern_Province.html']
    // // await db.afterCrawlChangeLinks(urls);
    // var aa = await db.getLinksBeforeCrawl(urls);
    // res.send(aa);
    // hello()
    // try {
    //     res.send(await rrr())
    // }catch(err){
    //     res.send(err);
    // }
    // saveRevs();
    res.send(await rrr());
    function saveRevs(){
        var ref = db.database().ref('travelme/reviews')
        ref.orderByChild("place").limitToFirst(10).on('value',snap=>{
            var val = snap.val()
            keys = Object.keys(val)
            var reviewArray = []
            keys.forEach(key => {
                reviewArray.push(val[key])
            });
            var data = JSON.stringify({
                reviews:reviewArray
            })
            fs.writeFileSync('sentimentJson/reviewsForSentiment.json',data)

        })
    }
    function rrr(){
        let options = {
            
            pythonOptions: ['-u'], 
            scriptPath: 'pythonScripts',
            args: []
        };
        return new Promise((resolve,reject)=>{
            PythonShell.run('sentimentTest.py', options, function (err, results) {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(results)
                }
            });
        });
    }

    

    // var s = await spider.crawlReviewWithUrls("dd");
    // if(s){res.send("fkfkf")}
    async function hello(){
        const a = await aa();
        const d = await bb();

    }
    // getUser(1)
    //     .then(user=> getRepos(user.username))
    //     .then(repos => getCommits(repos[0]))
    //     .then(comits => console.log(comits))
    async function aa(){
        const user = await getUser(1);
        const repos = await getRepos(user.username);
        return new Promise((resolve,reject)=>{
            resolve(repos);
        })
        // const comits = await getCommits(repos[0])
    }
    async function bb(){
        const comits = await getCommits('assa');
        const details = await getDetails("dkkfk")
        return new Promise((resolve,reject)=>{
            resolve(details);
        })
    }





    function getUser(id){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("Getting user from DB");
                resolve({id:id,username:"kamal"})
            },2000);
        });
    }

    function getRepos(username){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("Getting repos from DB");
                resolve(['repo1','repo2','repo3']);
            },2000);
        });
    }

    function getCommits(repo){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("Getting commits from DB");
                resolve(['commit']);
            },2000);
        });
    }

    function getDetails(comits){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("Getting details from DB");
                resolve(['details']);
            },2000)
        });
    }
   
    async function fun1(){
        try{
            await a();
            await b();
        }catch{

        }
    }
    
    async function fun2(){
        try{
            await c();
            await d();
        }catch{

        }

    }
    
    function a(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("AAAAAAAAAAAAAAAA")
            },2000)
        });
    }
        
    
    function b(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("BBBBBBBBBBBB")
            },2000)
        });
    }
    
    function c(){
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                console.log("CCCCCCCCCCCC")
            },5000)
        });
    }
    
    function d(){
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                console.log("DDDDDDDDDDDDDDDDD")
            },5000)
        });
    }
    
    // let options = {
    //      // get print results in real-time
    //     scriptPath: 'pythonScripts',
    //     args: ["scrapy"]
    //   };
    //   PythonShell.run('testPython.py', options, function (err, results) {
    //     if (err){
    //        res.status(500).json({
    //            "err":err
    //        });
           
    //     }else{
    //         res.status(200).json({
    //             "ddd":results
    //         });
    
    //     }       
        
    //   });

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