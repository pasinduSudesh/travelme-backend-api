const express = require('express');
const fs  = require('fs')
const router = express.Router();
const firebase = require('firebase-admin');

const db = require('../models/firebase');
const places = require('../db/places');


router.get('/',function(req,res,next){
     

  places.find().sort({rating:-1}).limit(3).exec()
  .then(resp=>{
    var places = []
    resp.forEach(place=>{
      // console.log(place)
      var det = {
        description:place.bestReview,
        img:place.img,
        place:place.placeName,
        rating:place.rating
      }
      places.push(det)
    });
    res.status(200).json({
      "bestPlaces":places
    })

  })
  .catch(err=>{
    res.status(500).json({
      "error":{
        "message":err.msg
      }
    })
  })

    
})

module.exports = router