var fs = require('fs')
let {PythonShell} = require('python-shell')

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