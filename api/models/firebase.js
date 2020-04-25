const firebase = require('firebase-admin')
const fs = require('fs')
const crawlResultFile = require('./readJsonFile');

//************************************* */

exports.saveLinksToReview = function(links){
    return new Promise((resolve,reject)=>{
        var ref = firebase.database().ref('travelme')
        var reviewRef = ref.child('links_to_review');
        links.forEach(value=>{
            reviewRef.push({url:value},(err)=>{
                if (err){
                    reject(new Error(err))
                }
            });

        });
        resolve(true);
    });
}

//************************************* */

exports.saveReviewToDB = function(data){
    return new Promise((resolve,reject)=>{
        var ref = firebase.database().ref('travelme')
        var reviewRef = ref.child('user_reviews');
        reviewRef.push(data,(err)=>{
            if (err){
                reject(new Error(err))
            }else{
                resolve(true)
            }
        });
    });

    
    
        
    
}

//************************************* */
//save crawling urls to DB

exports.savePlaceCrawlerDet = async function(url,crawlingData){
    // var crawlingData = await crawlResultFile.readFile('crawlerResults/placeSpiderResults.json');
    return new Promise((resolve,reject)=>{
        // console.log(url)
        var ref = firebase.database().ref('travelme');
        var crawlerRef = ref.child('crawler_results_places');
        crawlerRef.push({
            url:url,
            results: crawlingData
        },(err)=>{
            if(err){
                reject(new Error(err))
            }else{
                resolve()
            }
        });
    });
}

// **************************************************************/

exports.checkUrlInDB =  function(url){
    return new Promise((resolve,reject)=>{
        var ref = firebase.database().ref('travelme/crawler_results_places');
        ref.orderByChild('url').equalTo(url).on('value',function(snap){
            var val = snap.val();
            if(val !== null){
                var keys = Object.keys(val);
                resolve(val[keys[0]]['results']);
            }else{
                resolve(false);
            }

        },(err)=>{
            reject(new Error(err))
        });

    });
}
        

    





//************************************* */


exports.savePlaceDetails = function( callback){
    var rd = fs.readFileSync('crawlerResults/placeSpiderResults.json')
    var jsonBody = JSON.parse(rd);
    console.log(jsonBody['last_modified']['time'])
    var ty = Date.parse(jsonBody['last_modified']['date']+ " " +jsonBody['last_modified']['time'])
    console.log(ty)
    console.log(Date.parse(new Date()))

    var savingData = {}
    if(true){
    // if(Date.parse(d['last-modified']['date']+ " " +d['last-modified']['time']) + 5000 >= Date.parse(new Date())){
        var ref = firebase.database().ref('travelme')
        var usersRef = ref.child('locations');
        // var userRef = usersRef.push();
        // var i = 0
        jsonBody['places'].forEach(function(value,index,array){
            // i++
            // var usersRef = ref.child('locations')
            usersRef.push({
                location_name: value['place_name'],
                place_title: value['place_title'],
                review_link: value['review_link']
            });
        });
        callback(false,true)
    }else{
        callback("Places Not updated",false)
    }

}


exports.saveToFirebase = function(data,child,callback){
    var ref = firebase.database().ref('travelme')
    var time = (Date.parse(new Date())).toString()
    var usersRef = ref.child(child).child(time)

    var save = function(data){
        return new Promise(function(resolve,reject ){
            usersRef.set(data).then(resolve,reject);
        });
    }

    save(data).then(
        callback(false,"ook")
    ).catch(function(err){
        callback(err,false)
    }
        
    )
    
    
    
    
}