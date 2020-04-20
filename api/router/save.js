const express = require('express');
const fs  = require('fs')
const firebase = require('firebase-admin')
const router = express.Router();

const fb = require('../models/firebase')

router.get('/',function(req,res,next){

    fb.savePlaceDetails(function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send("success..!")
        }
    });
    // var placeName = "place_1"
    // var ref = firebase.database().ref('places');

    // ref.orderByChild("name").on("value", function(snapshot) {
    //     console.log(snapshot.val());
    //   }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //   });
    
    // var usersRef = ref.child('users');
    // // Create a new ref and log it’s push key
    // var userRef = usersRef.push();
    // console.log('user key', userRef.key);
    // // Create a new ref and save data to it in one step
    // var userRef = usersRef.push(
    //     {
    // name: 'kalao',
    // description: 'I eat too much cice cream'
    // })
    // var userRef = usersRef.push(
    //     {
    // name: 'laka222',
    // description: 'I eat too much cice cream'
    // }).then(

    //    res.send("cckck")
    // )

});

module.exports = router;