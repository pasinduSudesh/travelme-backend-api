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
    return new Promise(async (resolve,reject)=>{
        try{
            for (var x= 0; x<links.length;x++){
                await saveLinksToReview(links[x]['url'],links[x]['review_count']);
            }
            resolve()
        }
        catch(err){
            reject(new Error(err));
        }

    });

    function saveLinksToReview(url,reviewCount){
        return new Promise((resolve, reject) => {
            var ltr = new LinksToReview({
                url:url,
                pagesToReview:reviewNumber(reviewCount),
                crawledPages:0

            })
            ltr.save()
            .then(respo=>{
                console.log(respo)
                resolve()
            })
            .catch(err=>{
                reject(new Error(err));
            })
        });
    }

    function reviewNumber(str){
        return parseInt(str.split(" ")[0].replace(",",""))/10;
    }
}


exports.savePlaceDet = function(places){
    return new Promise(async (resolve,reject)=>{
        try{
            for(var x=0; x<places.length;x++){
                var placeDetFromGoogle =  await api.googlePlaceAPI(places[x]['place_name']);
                var hasPlace = await hasPlaceInDB(placeDetFromGoogle['candidates'][0]['place_id']);
                if(! hasPlace){
                    await savePlace(placeDetFromGoogle,places[x])
                }
            }
            resolve();
        }catch(err){
            reject(new Error(err));
        }

        
    });

    function savePlace(placeDetFromGoogle,place){
        return new Promise((resolve, reject) => {
            var placeDet = new Places({
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
                totalReviews:0,
                analyseState:false,
                time:2
                
            });
            placeDet.save().then(response=>{console.log('place saved');resolve();}).catch(err=>{reject(new Error(err))});            
        });
    }
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
                console.log(links[i],"ssssssss");
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
    return new Promise(async (resolve, reject) => {
        try{
            var placesAlaysed = []
            for(var i = 0;i<data['analyse'].length;i++){
                var placeDet = await api.googlePlaceAPI(data['analyse'][i]['placeName']);
                if(placeDet['status'] === 'OK'){
                    console.log("ss");
                    var placeId = placeDet['candidates'][0]['place_id'];
                    console.log(placeId), "placeid";
                    var placeDet = await getPlaceDet(placeId);
                    console.log(placeDet);
                    console.log(data['analyse'][i])
                    
                    var saveDat = addSentimentDet(placeDet,data['analyse'][i])
                    console.log(saveDat);
                    placesAlaysed.push(saveDat);
                    await saveData(saveDat,placeId);
                }
            }
            resolve(placesAlaysed);
        }catch (err){
            reject(new Error(err));
        }
    });
}

function getPlaceDet(placeId){
    return new Promise((resolve, reject) => {
        Places.findOne({placeId:placeId})
        .then(doc=>{
            resolve(doc);
        })
        .catch(err=>{
            reject(new Error(err))
        })
    });
}

function addSentimentDet(oldData,newData){
    var dd;
    if(oldData['totalReviews'] === 0 ){
        dd = {
            positivePresentage:(((oldData['totalReviews']*oldData['positivePresentage']/100) + (newData['totalReviews']*newData['positivePresentage']/100)) / (oldData['totalReviews']+newData['totalReviews']))*100,
            naturalPresentage:(((oldData['totalReviews']*oldData['naturalPresentage']/100) + (newData['totalReviews']*newData['naturalPresentage']/100)) / (oldData['totalReviews']+newData['totalReviews']))*100,
            negativePresentage:(((oldData['totalReviews']*oldData['negativePresentage']/100) + (newData['totalReviews']*newData['negativePresentage']/100)) / (oldData['totalReviews']+newData['totalReviews']))*100,
            totalReviews:oldData['totalReviews']+newData['totalReviews'],
            bestReview:newData['bestReview'],
            totalPolarity: newData['totalPolarity'],
            rating: (newData['totalPolarity']*100)/newData['totalReviews'],
            analyseState:true
    
            }

    }else{
        dd = {
            positivePresentage:(((oldData['totalReviews']*oldData['positivePresentage']/100) + (newData['totalReviews']*newData['positivePresentage']/100)) / (oldData['totalReviews']+newData['totalReviews']))*100,
            naturalPresentage:(((oldData['totalReviews']*oldData['naturalPresentage']/100) + (newData['totalReviews']*newData['naturalPresentage']/100)) / (oldData['totalReviews']+newData['totalReviews']))*100,
            negativePresentage:(((oldData['totalReviews']*oldData['negativePresentage']/100) + (newData['totalReviews']*newData['negativePresentage']/100)) / (oldData['totalReviews']+newData['totalReviews']))*100,
            totalReviews:oldData['totalReviews']+newData['totalReviews'],
            bestReview:newData['bestReview'],
            totalPolarity: ((newData['totalPolarity']/newData['totalReviews'])+(oldData['totalPolarity']/oldData['totalReviews']))*(newData['totalReviews']+oldData['totalReviews']),
            rating: (((newData['totalPolarity']/newData['totalReviews'])+(oldData['totalPolarity']/oldData['totalReviews']))*(newData['totalReviews']+oldData['totalReviews']))*100
    
            }
    }
    return dd;
}

function saveData(data,placeId){
    return new Promise((resolve, reject) => {
        Places.update({placeId:placeId},data)
        .then(doc=>{
            resolve();
        }).catch(err=>{
            reject(new Error(err));
        })
    });
}



// ###################################################################################