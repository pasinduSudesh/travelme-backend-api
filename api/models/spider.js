var fs = require('fs')
let {PythonShell} = require('python-shell')
const files = require('./readJsonFile');
const db = require('firebase-admin')
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
                resolve(true)
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
            if(isCrawled){
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
                // console.log(listOfPlaces[0]);
                // console.log(listOfReviews[0]);
                
                    var ref = db.database().ref('travelme');
                    var reviewRef = ref.child('reviews');
                    var allReviews = [];
                    listOfReviews.forEach((review,index)=>{
                        reviewArray = []
                        // console.log(typeof(review[0]));
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
                        reviewRef.push({
                            place:listOfPlaces[index],
                            reviews:reviewArray,
                            analys_state:false
                        });
                        allReviews.push({
                            place:listOfPlaces[index],
                            reviews:reviewArray,
                            analys_state:false
                        });
                    });
                }
                resolve(allReviews);
            
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
    


}

// ******************************************