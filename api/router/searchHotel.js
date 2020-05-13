const express = require('express');
const fs  = require('fs')
const router = express.Router();

const crawling = require('../models/crawling');
const api = require('../models/api');
const db = require('../models/mongoose');

router.get('/:places',async function(req,res,next){
    try{
        var place = req.params.places;
        await crawling.crawlHotelsWithPlaceName(place);
        var placeDet = await api.googlePlaceAPI(place);
        if(placeDet['status'] === 'OK'){
            var placeId = placeDet['candidates'][0]['place_id'];
            var lat = Math.round(placeDet['candidates'][0]['geometry']['location']['lat'] * 10000)/10000
            var lng = Math.round(placeDet['candidates'][0]['geometry']['location']['lng'] * 10000)/10000
            // console.log(lat,lng)
            HotelsResult = await db.getNearestHotels(lat,lng);
            console.log(HotelsResult.length)            
            res.status(200).json(HotelsResult)           

        }else{
            res.status(500).json({
                error:{
                    message: `No Hotels found with seach query ${place}`
                }
            })
        }
        
    }catch(err){
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    }


});
    

module.exports = router