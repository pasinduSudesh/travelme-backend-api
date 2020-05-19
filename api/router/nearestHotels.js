const express = require('express');
const fs  = require('fs')
const router = express.Router();

const crawling = require('../models/crawling');
const api = require('../models/api');
const db = require('../models/mongoose');
const path = require('../models/path');

router.get('/:latLng',async function(req,res,next){
    var latLng = req.params.latLng;
    var lat = parseFloat(latLng.split(",")[0]);
    var lng = parseFloat(latLng.split(",")[1]);
    console.log(lat,lng)
});

router.post('/',async function(req,res,next){
    try{
        var place = req.body.place;
        var lat = parseFloat(req.body.lat);
        var lng = parseFloat(req.body.lng);
        await crawling.crawlHotelsWithPlaceName(place);
        console.log(lat,lng,"A")
        hotelsResult = await db.getNearestHotels(lat,lng);
        console.log(hotelsResult);
        var distanceList = []
        for(var x=0;x<hotelsResult.length;x++){
            distanceList.push({distance:path.distanceOfToPlaces(lat,lng,hotelsResult[x]['lat'],hotelsResult[x]['lng']), id:hotelsResult[x]['placeId']});
        }
        console.log(distanceList);

        
        var minDis = distanceList[0].distance;
        var min2Dis = distanceList[0].distance;
        var min3Dis = distanceList[0].distance;
        var minID,min2ID,min3ID;
        distanceList.forEach(e=>{
            if(e.distance<=minDis){
                minDis = e.distance;
                minID = e.id;
            }
        })
        distanceList.forEach(e=>{
            if(minDis<e.distance && e.distance<=min2Dis){
                min2Dis = e.distance;
                min2ID = e.id;
            }
        })
        distanceList.forEach(e=>{
            if(min2Dis<e.distance && e.distance<=min3Dis){
                min3Dis = e.distance;
                min3ID = e.id
            }
        })

        
        var h = await db.getHotelsWithID(minID,min2ID,min3ID);
        res.status(200).json(h)


        // s = distanceList[0];

        // for( var y=0;y<distanceList.length-1;y++){
        //     for(var z=0;z<distanceList-1;z++){
        //         if(distanceList[z]['distance']<distanceList[z+1]['distance']){
        //             var temp = distanceList[z]['distance'];
        //             distanceList[z] = distanceList[z+1];
        //             distanceList[z+1] = temp;
        //         }
        //     }
        // }
        // console.log(distanceList);

        // for(var a=0;a<distanceList.length;a++){
        //     distanceList[a] ==s 
        // }

        // console.log(distanceList);

    }catch(err){

    }
   
});
module.exports = router