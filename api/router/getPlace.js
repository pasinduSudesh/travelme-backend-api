const express = require('express');
const router = express.Router();
const db =  require('../models/mongoose');
const api = require('../models/api');

router.get('/all',async function(req,res,next){
    try{
        var allPaces = await  db.getAllPlaces();
        res.status(200).json(allPaces)

    }catch(err){
        res.status(500).json({
            error:{message:err.message}
        })
    }    

});

router.get('/:placeName',async function(req,res,next){
    try{
        var place = req.params.placeName;
        var placeDet = await api.googlePlaceAPI(place)
        if(placeDet.status === 'OK'){
            var lat = placeDet['candidates'][0]['geometry']['location']['lat']
            var lng = placeDet['candidates'][0]['geometry']['location']['lng']
            var places = await db.getNearestPlacesWithLatLng(lat,lng,0.5);
            if(places.length>0){
                res.status(200).json(places)
            }else{
                res.status(500).json({
                    error:{message:`No Places Found '${place}'`}
                })
           }
        }else{
            res.status(500).json({
                error:{message:`No Places Found '${place}'`}
            })
        }


    }catch(err){
        res.status(500).json({
            error:{message:err.message}
        })
    }    

});

module.exports = router
