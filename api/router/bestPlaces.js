const express = require('express');
const fs  = require('fs')
const router = express.Router();
const firebase = require('firebase-admin');

const db = require('../models/firebase')


router.get('/',function(req,res,next){
     // var placeName = "place_1"
    var ref = firebase.database().ref('travelme/analyzed_places');

    ref.orderByChild("place").on("value", function(snapshot) {
        res.status(200).json(snapshot.val())
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
})

module.exports = router