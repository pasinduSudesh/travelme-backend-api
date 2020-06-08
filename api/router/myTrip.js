const express = require('express');
const router = express.Router();
const db = require('../models/mongoose');

router.get('/',async function(req,res,next){
    try{
        console.log(req.session)
        if(typeof req.session.email !== 'undefined' && req.session.email !== null){
            var trips = await db.getMyTrips(req.session.email);
            res.status(200).json({
                trips:trips
            })
        }else{
            res.status(400).json({
                error:{message:"Not Logged in"}
            })
        }

    }catch(err){
        res.status(500).json({
            error:{message:err.message}
            
        })
    }
    
});

router.get('/:email',async function(req,res,next){
    try{
        var trips = await db.getMyTrips(req.params.email);
        res.status(200).json({
            trips:trips
        })
    }catch(err){
        res.status(500).json({
            error:{message:err.message}
            
        })
    }
    
});

module.exports = router;