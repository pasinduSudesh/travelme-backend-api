const express = require('express');
const fs  = require('fs')
const router = express.Router();

let {PythonShell} = require('python-shell')

var spider = require('../models/spider');
var searchResult = require('../models/api');



router.get('/',function(req,res,next){
    console.log("Start")
    hello()
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