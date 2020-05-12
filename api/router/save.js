const express = require('express');
const fs  = require('fs')
const firebase = require('firebase-admin')
const router = express.Router();

const fb = require('../models/firebase');
// const mongo = require('../db/test'   );
const dd = require('../models/mongoose');
const places = require('../db/places')
var file = require('../models/readJsonFile');
var patha =  require('../models/path');
var api = require('../models/api');
var spider = require('../models/spider')

router.get('/',async function(req,res,next){

var s =await api.getCrawlURL("matara",1);
console.log(s);

await spider.hotelSpider(['https://www.tripadvisor.com/Hotels-g297896-Galle_Galle_District_Southern_Province-Hotels.html'],3)

//     var s = {a:12}
//     s['b'] = "ff";
//     console.log(s)
// for (var i =0;i<10;i++){

//     var sas = await api.derectionAPI('6.0250143,80.2180408','6.0400638,80.1985902');
//     console.log(sas);
// }
// res.send("dddd");

// console.log("dddddddddddddddddddddddddddddddddddddddddd");
// console.log(sas);

// var l = ['A','B','C','D'];
// var lis1 = ['A','A','A','B','B','C'];
// var lis2 = ['B','C','D','C','D','D'];
// var des = [3,5,2,5,6,3]; 
// // patha.path(l,lis1,lis2,des,"e",2);
// var ss= patha.createList(l);
// console.log(ss);
// patha.path(l,ss['p1'],ss['p2'],des,"cccc",1);

function pat(locationList, place_1List, place_2List, distanecList, reviewList, numOfDays) {
    var totalDistance = 0;                                                                 //to take the total distance of the journey
    var r = 0;                                                                             //variable for easy
    var lst1 = [locationList[0]];//the list that contain the locations selected to visit.here I took first element of the location list as the firts visiting place.but it should bee the most rating place 
    var limitDistance=numOfDays*320000;             //suppose that a traveler travels 320000 meters per day. If the distance table distances in km, this should 320

    
        for (var i = 0; i < locationList.length - 1; i++) {                 //for the elements in location table
            var indexOfLocation = 0;                                        //to take the index of the selected location in location list
            var selectedLocation = '';                                                     //to take the selected location
            var distanceValue = 10000000000000;                                         //just a variable to check the distance between two locations
            if(totalDistance<limitDistance){                                //check whether total distance of the trip passed or not
                    for (var j = 0; j < place_1List.length; j++) {          //loop to take the nearest place among other places
                        if (locationList[r] == place_1List[j]) {            //to check whether a matching place from place _1 list
                            if (lst1.includes(place_2List[j])) {            //to remove places that already have selected
                                indexOfLocation = indexOfLocation;          
                            }
                            else {                                          //to take places that doesn't selected yet
                                if (distanceValue > parseInt(distanecList[j])) {    //check for minimum distance 
                                    distanceValue = parseInt(distanecList[j]);      //assign the minimum value of distance
                                    selectedLocation = place_2List[j];              //take the relevent place relevent to the minimum distance from place_2 list
                                    indexOfLocation = locationList.indexOf(selectedLocation);;  // to take the index of the selected location from location list
                                } 
                            }
                        }
                        else if (locationList[r] == place_2List[j]) {       //same thing as above to check matching place from place_2 list
                            if (lst1.includes(place_1List[j])) {
                                indexOfLocation = indexOfLocation;
                            }
                            else {
                                if (distanceValue > parseInt(distanecList[j])) {
                                    distanceValue = parseInt(distanecList[j]);
                                    selectedLocation = place_1List[j];
                                    indexOfLocation = locationList.indexOf(selectedLocation);
                                }
                            }
                        }
                        else {
                            indexOfLocation = indexOfLocation;          //if there's no matching places
                            selectedLocation = selectedLocation;
                        }
                    }
                    lst1.push(selectedLocation);                        //entering of the selected places to the list
                    totalDistance=totalDistance+distanceValue;          //counting the total distance
                    r = indexOfLocation;                                
                }
        }

        for (var k = 0; k < lst1.length; k++) {                             //printing process of the selected places in order
            console.log( lst1[k]);
            if  (k<(lst1.length-1))    {
                console.log("==>");
            }                     
        } 

        // for (var k = 0; k < lst1.length; k++) {                             //printing process of the selected places
        //     print((k + 1) + ".  " + lst1[k]);                               //printing of the place name
        //     var val = locationList.indexOf(lst1[k]);                       
        //     print(reviewList[val]);                                         //printing of the location name
        // }

    
}

//    var ss = await dd.getPlacesForTripFromDB(2,6,80);
//    var asas = ["https://www.tripadvisor.com/Attraction_Review-g297896-d3617497-Reviews-Galle_Fort-Galle_Galle_District_Southern_Province.html",
//    "https://www.tripadvisor.com/Attraction_Review-g297896-d447525-Reviews-Sinharaja_Forest_Reserve-Galle_Galle_District_Southern_Province.html"]
//    try{

//        await file.writeFile('sentimentJson/reviewsForSentiment.json',{namw:"sssss",kdd:"dddd"})
//        res.status(200).json("d");
//     }catch(err){
//         res.status(500).json(new Error(err));

//    }
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