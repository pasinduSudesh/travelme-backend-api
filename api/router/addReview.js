const express = require('express');
const fs  = require('fs')
const router = express.Router();
const fb = require('firebase-admin');

const db = require('../models/mongoose');
const api = require('../models/api');
const sentiment = require('../models/sentiment')
const file = require('../models/readJsonFile')

router.post('/',async function(req,res,next){

    var name = req.body.name;
    var review = req.body.review;
    var place = req.body.place;
    try{
        
        var placeDetails = await api.googlePlaceAPI(place);
        if(placeDetails['status'] === 'OK'){
            var reviewData = {
                address: placeDetails['candidates'][0]['formatted_address'],
                placeName: placeDetails['candidates'][0]['name'],
                types: placeDetails['candidates'][0]['types'],
                placeId: placeDetails['candidates'][0]['place_id'],
                lat: placeDetails['candidates'][0]['geometry']['location']['lat'],
                lng: placeDetails['candidates'][0]['geometry']['location']['lng'],
                userName: name,
                review: review,
                analyseState: false
            }            
    
            var data = JSON.stringify({
                reviews:[{
                    "place": placeDetails['candidates'][0]['name'],
                    "reviews": [review],
                    "analys_state": false,
                    "placeId": placeDetails['candidates'][0]['place_id']
                }]
            })
            fs.writeFileSync('sentimentJson/reviewsForSentiment.json',data);
            await sentiment.sentimentAnalyze();
            var sentimentResult = await file.readFile('sentimentJson/sentimentResults.json');
            var hasPlace = await db.getPlacesWithPlaceId( placeDetails['candidates'][0]['place_id']);
            if(hasPlace.length === 1){
                await db.saveSentiments(sentimentResult);
                reviewData.analyseState = true;
                var isSaveToDB = await db.saveReviewToDB(reviewData);
                res.status(200).json({
                    "STATUS":"OK",
                    "message":`Your review is saved. Rating is ${Math.round((sentimentResult.analyse[0].totalPolarity+1)*50*100)/100} %`
                })
            }else{
                var isSaveToDB = await db.saveReviewToDB(reviewData);
                res.status(200).json({
                    "STATUS":"OK",
                    "message":"Review is saved to DB"
                })
            }          
    
            
        }else{
            res.status(400).json({
                'error':{'message':`'${place}' is not a place name`}
            });
        }
        

    }catch(err){
        // console.log(err);
        res.status(500).json({
            'error':{'message':err.message}
        });
    }


});

module.exports = router