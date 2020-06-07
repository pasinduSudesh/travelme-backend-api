const express = require('express');
const router = express.Router();
const db =  require('../models/mongoose');
const tripPlan =  require('../models/path');

router.post('/',async function(req,res,next){
    try{
        var places = req.body.places
        days = Math.floor(places.length/4) +1;
        console.log(days)
        // aa = ["ChIJvRyxtadz4ToRr00BDS936P0","ChIJb18YIdFs4ToR3oQM95nNBb4","ChIJewdvsyVZ4joR58SE2_jbA0s","ChIJV3xYFeJY4joR1YC_WwtEHEQ","ChIJ_yzbpKRz4ToRiG99Z-qKcNM"]
        var placesDetForTrip = await db.getPlacesForCustomTripPlan(places);
        
        var detForTripPlan = tripPlan.createList(placesDetForTrip);
        console.log(detForTripPlan)
        var placeOrder = tripPlan.path(detForTripPlan['p'],detForTripPlan['p1'],detForTripPlan['p2'],detForTripPlan['d'],days);    
        console.log(placeOrder)
        var trip = await tripPlan.fullTripPlan(placeOrder,placesDetForTrip);
    
        var ss = tripPlan.timePlan(trip['trip'],trip['travelDetails'],days)
        res.status(200).json({trip:ss,"distances":trip['travelDetails'] })

        if(typeof req.session.email !== 'undefined' && req.session.email !== null){
            await db.addMyTrip(req.session.email,ss,trip['travelDetails'],days,"CUSTOMIZE TRIP")
        }else if(req.body.email){
            await db.addMyTrip(req.body.email, ss, trip['travelDetails'], days, place)
        }

    }catch(err){
        res.status(500).json({
            error:{message:err.message}
        })
    }

}); 

module.exports = router