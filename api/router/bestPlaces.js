const express = require('express');
const fs  = require('fs')
const router = express.Router();
const firebase = require('firebase-admin');

const db = require('../models/firebase')


router.get('/',function(req,res,next){
     // var placeName = "place_1"
    var ref = firebase.database().ref('travelme/analyzed_places');

    ref.orderByChild("place").on("value", function(snapshot) {
      var val = snapshot.val();
        var keys = Object.keys(val)
        console.log(keys);
        var  places = [];
        keys.forEach(key=>{
          places.push(val[key])
        })
        res.status(200).json({
          bestPlaces:places
        })
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
})

module.exports = router