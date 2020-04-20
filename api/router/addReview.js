const express = require('express');
const fs  = require('fs')
const router = express.Router();

const db = require('../models/firebase')
    


router.post('/',function(req,res,next){
    var name = req.body.name;
    var place = req.body.place;
    var review = req.body.review

    var data = {
        name: name,
        place: place,
        review: review
    }

    db.saveToFirebase(data,'user_reviews',function(err,result){
        if(err){
            res.status(500).json({
                "STATUS":"ERROR",
                "massage":err
        });
        }else{
            res.status(200).json({
                "STATUS":"OK",
                "massage":result
            })
        }
    })


});

module.exports = router