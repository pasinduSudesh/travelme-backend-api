const express = require('express');
const fs  = require('fs')
const router = express.Router();
const db = require('../models/mongoose');

router.get('/:placeId',async function(req,res,next){
    try{
        var placeId = req.params.placeId;
        var reviews = await db.getReviewsWithPlaceId(placeId);
        var p = await db.getPlacesWithPlaceId(placeId);
        p=p[0]
        reviewsList =[]
        reviews.forEach(element => {
            reviewsList.push(element.reviews)
        });
        res.status(200).json({
            placeName:p.placeName,
            address:p.address,
            bestReview:p.bestReview,
            placeId:p.placeId,
            img:p.img,
            lat:p.lat,
            lng:p.lng,
            negativePresentage:p.negativePresentage,
            positivePresentage:p.positivePresentage,
            naturalPresentage:p.naturalPresentage,
            rating:p.rating,
            reviews:reviewsList
        })
    }catch(err){
        res.status(500).json({
            error:{
                message:err.message
            }
        })
    }
        

});

module.exports = router