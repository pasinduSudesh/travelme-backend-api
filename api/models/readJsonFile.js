const fs = require('fs');


exports.readFile = function(filePathFromRoot){
    return new Promise((resolve,reject)=>{
            if(fs.existsSync(filePathFromRoot)){
                let rawdata = fs.readFileSync(filePathFromRoot);
                let places = JSON.parse(rawdata);
                resolve(places)
            }else{
                reject(new Error(`File path ${filefilePathFromRoot} doesnt have a file`))
            }

        
        
    });
    
}