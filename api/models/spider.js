var fs = require('fs')
let {PythonShell} = require('python-shell')

exports.runReviewSpider = function(url,callback){

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
    
        let options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: 'pythonScripts',
            args: [urlString]
          };
          PythonShell.run('reviewSpiderRunner.py', options, function (err, results) {
            if (err){
                console.log(err);
                callback(err,false);
            }else{
                callback(null,true);
            }       
            
          });

    }else{
        callback("Wrong input type. Input must be object", false)
    }
}


exports.runPlaceSpider = function(url,callback){
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

        let options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: 'pythonScripts',
            args: [urlString]
          };
          PythonShell.run('placeSpiderRunner.py', options, function (err, results) {
            if (err){
                console.log(err);
                callback(err,false);
            }else{
                console.log(results)
                callback(false,true);
            }       
            
        });
    }
}