const express = require('express');
const fs  = require('fs')
const router = express.Router();
const fb = require('firebase-admin');

const db = require('../models/firebase');
const api = require('../models/api');

router.post('/',async function(req,res,next){

    var name = req.body.name;
    var review = req.body.review;
    var place = req.body.place;
    try{
        
        var placeDetails = await api.googlePlaceAPI(place);
        var address = placeDetails['candidates'][0]['formatted_address'];
        var reviewData = {
            address: placeDetails['candidates'][0]['formatted_address'],
            name: placeDetails['candidates'][0]['name'],
            types: placeDetails['candidates'][0]['types'],
            place_id: placeDetails['candidates'][0]['place_id'],
            lat: placeDetails['candidates'][0]['geometry']['location']['lat'],
            lng: placeDetails['candidates'][0]['geometry']['location']['lng'],
            user_name: name,
            review: review,
            analyse_state: false
        }
        var isSaveToDB = await db.saveReviewToDB(reviewData);
        res.status(200).json({
            "STATUS":"OK",
            "message":"Review is saved to DB"
        })

    }catch(err){
        res.status(500).json({
            'error':{'message':err.message}
        });
    }


});

module.exports = router