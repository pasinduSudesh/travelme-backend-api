const mongoose = require('mongoose');

const api = require('../models/api');

const LinksToReview = require('../db/linksToReview');
const PlaceCrawlerResult = require('../db/placeCrawlerResults');
const Places = require('../db/places');
const Reviews = require('../db/reviews');

// ***********************************************************************************
//  PLACE CRAWLER ACTIVIRES
// ***********************************************************************************
// ***********************************************************************************
//ckeck url in db

exports.checkUrlInDB = function(url){
    return new Promise((resolve,reject)=>{
        PlaceCrawlerResult.find({
            url:url
        }).then(response=>{
            // console.log(response);
            // console.log(response.length);
            if(response.length === 1){
                resolve(response[0]['results']);
            }else{
                resolve(false);
            }
        }).catch(err=>{reject(new Error(err))})
    });
}

// ***********************************************************************************
//save crawler result 

exports.savePlaceCrawlerDet = function(url,results){
    return new Promise((resolve,reject)=>{
        var placeCrawlerRes = new PlaceCrawlerResult({
            results:results,
            url:url
        });
        placeCrawlerRes.save()
            .then(response=>{resolve()})
            .catch(err=>{reject(new Error(err))})
    });
}

exports.saveLinksToReview = function(links){
    return new Promise((resolve,reject)=>{
        errors = []
        links.forEach(link=>{
            var ltr = new LinksToReview({
                url:link['url'],
                pagesToReview:reviewNumber(link['review_count']),
                crawledPages:0

            })
            ltr.save()
            .then(respo=>{})
            .catch(err=>{
                errors.push = err
                console.log(err);
            })
        });
        // console.log(errors);
        resolve()
    });

    function reviewNumber(str){
        return parseInt(str.split(" ")[0].replace(",",""))/10;
    }
}


exports.savePlaceDet = function(places){
    return new Promise((resolve,reject)=>{
        var errors = null
        places.forEach(async (place)=>{
            try{
                var placeDetFromGoogle =  await api.googlePlaceAPI(place['place_name']);
                var hasPlace = await hasPlaceInDB(placeDetFromGoogle['candidates'][0]['place_id']);
            }catch(err){
                errors = err
            }
            if(! hasPlace){
                var place = new Places({
                    placeName: placeDetFromGoogle['candidates'][0]['name'],
                    address:placeDetFromGoogle['candidates'][0]['formatted_address'],
                    bestReview: 'Dest Place for Travel',
                    placeId:placeDetFromGoogle['candidates'][0]['place_id'],
                    img:place['img'],
                    lat:placeDetFromGoogle['candidates'][0]['geometry']['location']['lat'],
                    lng:placeDetFromGoogle['candidates'][0]['geometry']['location']['lng'],
                    negativePresentage:0,
                    positivePresentage:0,
                    naturalPresentage:0,
                    rating:0,
                    totalPolarity:0,
                    totalReviews:0
                });
                place.save().then(response=>{}).catch(err=>{errors = err});
                
            }
        });

        if(errors === null){
            resolve(true);
        }else{
            reject(new Error(errors));
        }
    });



}

function hasPlaceInDB(placeId){
    return new Promise((resolve,reject)=>{
        Places.find({placeId:placeId})
        .then(response=>{
            if(response.length === 1){
                resolve(true);
            }else{
                resolve(false)
            }
        })
        .catch(err=>{
            reject(new Error(err));
        })
    });
}

// exports.afterCrawlChangeLinks = function(links){
//     return new Promise((resolve, reject) => {
//         links.forEach(link=>{
//             count = 0 
//             LinksToReview.findOne({url:link})
//                 .then(result=>{count = result['crawledPages']})
//                 .catch(err=>{console.log('Error',err.message)});
            
//             LinksToReview.findOneAndUpdate({url:link},{crawledPages:count+1})
//                 .then(result=>{console.log("Updated")})
//                 .catch(err=>{console.log('Error',err.message)});
//         });
//         resolve();
//     });
// }




// ###################################################################################


// ***********************************************************************************
//  Trip plane activities
// ***********************************************************************************
// ***********************************************************************************

exports.getPlacesForTripFromDB = function(placeCount,lat,lng){
    return new Promise((resolve, reject) => {
        Places.find({
            lat:{$gt:lat-0.5 , $lt: lat+0.5},
            lng:{$gt:lng-0.5 , $lt: lng+0.5}
        })
        .sort('rating')
        .limit(placeCount)
        .exec()
        .then(res=>{resolve(res)}).catch(err=>{console.log(err)});
        // resolve();
    });
    
}

exports.getLinksBeforeCrawl = function(links){
    return new Promise(async (resolve, reject) => {
        var resultList = []
        try{
            for(var i=0;i<links.length;i++){
                var ss  = await getLinkDet(links[i]);
                var l = createLink(ss);
                resultList.push(l);               

            }
            resolve(resultList);
        }catch(err){
            reject(new Error(err));
        }     
    });

    function getLinkDet(link){
        return new Promise((resolve, reject) => {
            LinksToReview.findOne({
                url:link
            })
            .then(resp=>{
                resolve(resp)               
            })
            .catch(err=>{
                reject(new Error(err));
            })
        });
    }

    function createLink(doc){
        
        if(doc['crawledPages'] < doc['pagesToReview']){
            if(doc['crawledPages'] === 0){
                return doc['url']
            }else{
                var pagination = "or" + (doc['crawledPages'] * 5).toString();
                var splitUrl = doc['url'].split("-");
                var newUrl = splitUrl[0]+"-"+splitUrl[1]+"-"+splitUrl[2]+"-"+splitUrl[3]+"-"+pagination+"-"+splitUrl[4]+"-"+splitUrl[5];
                return newUrl;        
            }
        }
    }
}

exports.afterCrawlChangeLinks = function(links){
    return new Promise(async(resolve, reject) => {
       try{
           var t = []
           var docs = null;
           for(var i=0;i<links.length;i++){
                docs = null
                docs = await getFromDB(links[i]);
                if(docs !==null){
                    await updateDB(docs)
                    t.push(docs);
                }

           }
           resolve(t)


       }catch(err){
            reject(new Error(err))
       }
    });


    function getFromDB(link){
        return new Promise((resolve, reject) => {
            LinksToReview.findOne({url:link})
            .then(doc=>{
                resolve(doc);
            })
            .catch(err=>{
                reject(new Error(err));
            });
        });
    }
    function updateDB(doc){
        return new Promise((resolve, reject) => {            
            LinksToReview.updateOne({url:doc['url']},{crawledPages:doc['crawledPages']+1})
            .then(result=>{
                resolve(true);
            })
            .catch(err=>{
                reject(new Error(err));
            })
        });
    }


    // if(docs !== null){
    //     var c = docs['crawledPages'] + 1
    //     LinksToReview.findOneAndUpdate({url:link},{crawledPages:c})
    //     .then()
    //     .catch()
    // }
}
// ###################################################################################

// ***********************************************************************************
//  SENTIMENR ACTIVITIES
// ***********************************************************************************
// ***********************************************************************************

exports.saveSentiments = function(data){
    return new Promise((resolve, reject) => {
        for(var i = 0;i<data['analyse'].length;i++){
            var placeDet = api.googlePlaceAPI(data['analyse'][i]);
            if(placeDet['status'] === 'OK'){
                var placeId = placeDet['candidates'][0]['place_id'];
                await getPlaceDet()///
                await SaveNewPlaceDet()///
            }
        }
    });
}



// ###################################################################################