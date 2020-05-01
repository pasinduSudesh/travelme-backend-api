const express = require('express');
const router = express.Router();
const fs = require('fs');
var data = fs.readFileSync('./api/config/trip.json')
var config = JSON.parse(data)

var api = require('../models/api');
var db = require('../models/firebase')

router.post('/',async function(req,res,next){
    
    var place = req.body.place;
    var days = parseInt(req.body.days);
    console.log(days)

    var placeCount = config['place'][days]
    // console.log(placeCount);

    // centerPoint = await api.googlePlaceAPI(place);

    var centerPoint = {
        "candidates": [
            {
                "formatted_address": "Galle, Sri Lanka",
                "geometry": {
                    "location": {
                        "lat": 6.0535185,
                        "lng": 80.2209773
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 6.0881332,
                            "lng": 80.2518654
                        },
                        "southwest": {
                            "lat": 6.023649900000001,
                            "lng": 80.1721287
                        }
                    }
                },
                "name": "Galle",
                "place_id": "ChIJ4_wyabtz4ToRA0zG-QO5NUo"
            }
        ],
        "status": "OK"
    } 

    var latInt = Math.round(centerPoint['candidates'][0]['geometry']['location']['lat'] * 100)/100;
    var lngInt = Math.round(centerPoint['candidates'][0]['geometry']['location']['lng'] * 100)/100;

    var placesWithDetails = await db.getPlacesForTripFromDB(placeCount,latInt,lngInt);
    var placesFroPlanTrip = []

    if (placesWithDetails.length >placeCount*0.8){
        placesFroPlanTrip = placesWithDetails;
    }else{
        
    }
    // Math.round(value)



    // console.log(lat,lng);
    res.status(200).json(placesWithDetails);

    ///have to plan trip
     

});


module.exports = router;