var fs = require('fs')
let {PythonShell} = require('python-shell')
const files = require('./readJsonFile');
const db = require('./firebase');

function sentimentAnalyze(){
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

module.exports = {sentimentAnalyze}