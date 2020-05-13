var fs = require('fs')
let {PythonShell} = require('python-shell')
const files = require('./readJsonFile');
// const db = require('firebase-admin')
const db = require('mongoose');

var Reviews = require('../db/reviews')
var api = require('../models/api');

exports.hotelSpider = function(url,limit){
    //run review sopider
    //input urls as a list
    return new Promise(async (resolve,reject)=>{
        try{
            console.log("1111111111111111")
            const urlString = await urlToString(url);
            console.log("22222222222222222")
            const spider = await runSpiderHotel('hotelSpiderRunner.py',urlString,limit);
            console.log("222233333333333333333333333333")
            resolve(spider)
        }
        catch{
            reject(new Error('Error when running spider'))
        }
    });
    
}

exports.runReviewSpider = function(url){
    //run review sopider
    //input urls as a list
    return new Promise(async (resolve,reject)=>{
        try{
            const urlString = await urlToString(url);
            const spider = await runSpider('reviewSpiderRunner.py',urlString);
            resolve(spider)
        }
        catch{
            reject(new Error('Error when running spider'))
        }
    });
    
}

exports.runPlaceSpider =  function(url){   
    //reun place spider
    //input urls as a list
    return new Promise(async (resolve,reject)=>{
        try{
            const urlString = await urlToString(url)
            const spider = await runSpider('placeSpiderRunner.py',urlString);
            resolve(spider)
        }
        catch{
            reject(new Error('Error when running spider'))
        }
    });
}

function urlToString(url){
    //return a string from url object
    return new Promise((resolve,reject)=>{
        if(typeof(url) == "object"){
            var urlString = ""
            if(url.length>1){
                urlString += url[0]
                for (var i=1;i<url.length;i++){
                    urlString += ","+url[i]
                }
            }else if (url.length == 1){
                urlString = url[0]
            }
            resolve(urlString)
        }else{
            reject(new Error('URL must include in a list'))
        }
    });
}

function runSpider(spiderRunner,urlString){
    //run python script for run crawler
    
    let options = {
            
        pythonOptions: ['-u'], 
        scriptPath: 'pythonScripts',
        args: [urlString]
    };
    return new Promise((resolve,reject)=>{
        PythonShell.run(spiderRunner, options, function (err, results) {
            if(err){
                reject(new Error(err))
            }else{
                resolve(results)
            }
        });
    });
}

function runSpiderHotel(spiderRunner,urlString,limit){
    //run python script for run crawler
    
    let options = {
            
        pythonOptions: ['-u'], 
        scriptPath: 'pythonScripts',
        args: [urlString,limit]
    };
    return new Promise((resolve,reject)=>{
        PythonShell.run(spiderRunner, options, function (err, results) {
            if(err){
                // console.log("errrr")
                console.log(err)
                reject(new Error(err))
            }else{
                console.log(results)
                resolve(results)
            }
        });
    });
}



// ******************************************
//run crawl spider and save result in to database
exports.crawlReviewWithUrls =  function(urls){
    return new Promise(async (resolve,reject)=>{
        try{
            var isCrawled = await runReviewSpider(urls);
            console.log(isCrawled);
            if(isCrawled){
                console.log("inside")
                var reviews = await files.readFile('crawlerResults/reviewSpiderResults.json');
                var listOfPlaces = [];
                var listOfReviews = [];
                reviews['result'].forEach(element => {
                    if(listOfPlaces.includes(element['place'])){
                        var index = listOfPlaces.indexOf(element['place']);
                        listOfReviews[index].push(element['review']);
                    }else{
                        listOfPlaces.push(element['place']);
                        listOfReviews.push(element['review']);
                    }        
                });
                    var allReviews = [];
                    listOfReviews.forEach(async (review,index)=>{
                        var reviewArray = []
                        if(typeof(review) === "object"){                            
                            review.forEach(subReview=>{
                                if(typeof(subReview) === "object"){
                                    subReview.forEach(subSubReview=>{
                                        reviewArray.push(subSubReview);
                                    })
                                }else if (typeof(subReview) === "object"){
        
                                    reviewArray.push(subReview);
                                }                        
                            });
                        }else{
                            reviewArray.push(review);
                            
                        }
                        //save to db
                        await saveToDB(listOfPlaces[index],reviewArray)
                        allReviews.push({
                            place:listOfPlaces[index],
                            reviews:reviewArray,
                            analys_state:false
                        });
                    });                    
                    resolve(allReviews);
                }else{
                    reject(new Error("Review crawler not run"))
                }

            
        }catch(err){
            reject(new Error(err))
        } 
});

    function runReviewSpider(url){
        //run review sopider
        //input urls as a list
        return new Promise(async (resolve,reject)=>{
            try{
                const urlString = await urlToString(url);
                const spider = await runSpider('reviewSpiderRunner.py',urlString);
                resolve(spider)
            }
            catch{
                reject(new Error('Error when running spider'))
            }
        }); 
    }

    function saveToDB(place,reviews){
        return new Promise(async (resolve, reject) => {
            try{
                var r = new Reviews({
                    analysState: false,
                    placeName: place,                        
                    reviews:reviews
                });
                r.save().then(resp=>{
                    resolve()
                }).catch(err=>{
                    reject(new Error(err))
                });
                
            }catch(err){
                reject(new Error(err))
            }
        });
    }
    


}

// ******************************************