const fs = require('fs');


exports.readFile = function(filePathFromRoot){
    return new Promise((resolve,reject)=>{
        let rawdata = fs.readFileSync(filePathFromRoot);
        let places = JSON.parse(rawdata);
        resolve(places)

        
        
    });
    
}

exports.writeFile = function(filePathFromRoot,data){
    return new Promise((resolve,reject)=>{
        var json = JSON.stringify(data);
        fs.writeFileSync(filePathFromRoot,json);
        resolve();
    })
}