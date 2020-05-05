const express = require('express');
const fs  = require('fs')
const firebase = require('firebase-admin')
const router = express.Router();

const fb = require('../models/firebase');
// const mongo = require('../db/test'   );
const dd = require('../models/mongoose');
const Test = require('../db/te')
var file = require('../models/readJsonFile');

router.get('/',async function(req,res,next){


//    var ss = await dd.getPlacesForTripFromDB(2,6,80);
//    var asas = ["https://www.tripadvisor.com/Attraction_Review-g297896-d3617497-Reviews-Galle_Fort-Galle_Galle_District_Southern_Province.html",
//    "https://www.tripadvisor.com/Attraction_Review-g297896-d447525-Reviews-Sinharaja_Forest_Reserve-Galle_Galle_District_Southern_Province.html"]
   try{

       await file.writeFile('sentimentJson/reviewsForSentiment.json',{namw:"sssss",kdd:"dddd"})
       res.status(200).json("d");
    }catch(err){
        res.status(500).json(new Error(err));

   }
    // var resps = []
    // var errs = []
    // var name = "kamalaaa"
    // for(var i=0;i<4;i++){
    //     var dd = new Test({
            
    //         bool:true,
    //         name:name,
    //         age:20 + i
    //     });
    //     console.log(i)
    //     dd.save().then(resp=>{resps.push(resp);
    //                         console.log(resp);}).catch(err=>{errs.push(err);})
    // } 
    
    // console.log(resps);
    // console.log(errs);
    // var s = await dd.checkUrlInDB("hfhhfhfhffh");
    // console.log(s)
    // var ss  = new mongo({
    //     id:"123",
    //     age:"malak",
    //     array:['ss','ddkk','djdhd']
    // })

    // // mongo.updateOne({id:'123'},{id:'1234'}).exec().then(response=>{res.send(response)}).catch(err=>{res.send(err)});
    // mongo.find().then(response=>{res.send(response)}).catch(err=>{res.send(err)});

    // function dff(){

    // }

    // var der = fs.readFileSync('sentimentJson/sentimentResults.json');
    // var ss = JSON.parse(der)
    // // res.status(200).json(ss);
    // fb.saveSentimentDetails(ss);
    // fb.savePlaceDetails(function(err,result){
    //     if(err){
    //         res.send(err)
    //     }else{
    //         res.send("success..!")
    //     }
    // });
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