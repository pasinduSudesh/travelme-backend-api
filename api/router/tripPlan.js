const express = require('express');
const router = express.Router();
const fs = require('fs');
var data = fs.readFileSync('./api/config/trip.json')
var config = JSON.parse(data)

var api = require('../models/api');
var db = require('../models/firebase');
var crawling = require('../models/crawling');
var spider = require('../models/spider')
var file = require('../models/readJsonFile');
var sentiment = require('../models/sentiment');


router.post('/',async function(req,res,next){
    
    var place = req.body.place;
    var days = parseInt(req.body.days);
    // console.log(days)

    var placeCount = config['place'][days]
    // console.log(placeCount);

    centerPoint = await api.googlePlaceAPI(place);
    console.log(centerPoint);

    // var centerPoint = {
    //     "candidates": [
    //         {
    //             "formatted_address": "Galle, Sri Lanka",
    //             "geometry": {
    //                 "location": {
    //                     "lat": 6.0535185,
    //                     "lng": 80.2209773
    //                 },
    //                 "viewport": {
    //                     "northeast": {
    //                         "lat": 6.0881332,
    //                         "lng": 80.2518654
    //                     },
    //                     "southwest": {
    //                         "lat": 6.023649900000001,
    //                         "lng": 80.1721287
    //                     }
    //                 }
    //             },
    //             "name": "Galle",
    //             "place_id": "ChIJ4_wyabtz4ToRA0zG-QO5NUo"
    //         }
    //     ],
    //     "status": "OK"
    // }
    // ChIJ_yzbpKRz4ToRiG99Z-qKcNM

    var latInt = Math.round(centerPoint['candidates'][0]['geometry']['location']['lat'] * 100)/100;
    var lngInt = Math.round(centerPoint['candidates'][0]['geometry']['location']['lng'] * 100)/100;

    var placesWithDetails = await db.getPlacesForTripFromDB(placeCount,latInt,lngInt);
    // console.log(placesWithDetails);
    console.log(placesWithDetails.length , placeCount*0.6);
    // console.log(placesWithDetails.length > placeCount*0.6);
    var placesFroPlanTrip = []

    if(placesWithDetails){
        if (placesWithDetails.length >placeCount*0.6){
            console.log("*************** Has places for plane Trip***************")
            placesFroPlanTrip = placesWithDetails;
            res.status(200).json(placesFroPlanTrip);
            
        }else{
            console.log("*************** NOT ENOGH PLACES***************")
            var crawledPlaces = await crawling.crawlWithPlaceName(place);
            console.log("******crawl places*******")
            var linksToCrawlReviews = await db.getLinksBeforeCrawl(crawledPlaces['links']) 
            console.log("******GET LINKS TO CRAWL*******")
            var reviews = await spider.crawlReviewWithUrls(linksToCrawlReviews) 
            console.log("******CRAWL REVIEWS*******")
            var save = await db.afterCrawlChangeLinks(linksToCrawlReviews);
            console.log("******save links after crawling*******")
            
            var data = JSON.stringify({
                reviews:reviews
            })
            fs.writeFileSync('sentimentJson/reviewsForSentiment.json',data)

            // await file.writeFile('sentimentJson/reviewsForSentiment.json',dataToSave);
            // console.log("******save reviews ti jsn*******")
            // var senti = await sentiment.sentimentAnalyze();
            // console.log("******sentiment*******")

            // var resss = await file.readFile('sentimentJson/sentimantResults.json')


            
            res.status(200).json(reviews);
            
        }
        
    }else{
        console.log("*************** NO PLACES ***************")
        var crawledPlaces = await crawling.crawlWithPlaceName(place);
        var linksToCrawlReviews = await db.getLinksBeforeCrawl(crawledPlaces['links'])  

        console.log("******GET LINKS TO CRAWL*******")
            var reviews = await spider.crawlReviewWithUrls(linksToCrawlReviews) 
            console.log("******CRAWL REVIEWS*******")
            var save = await db.afterCrawlChangeLinks(linksToCrawlReviews);
            console.log("******save links after crawling*******")
            // var dataToSave = {reviews:reviews}
            // await file.writeFile('sentimentJson/reviewsForSentiment.json',dataToSave);
            // console.log("******save reviews ti jsn*******")
            // var senti = await sentiment.sentimentAnalyze();
            // console.log("******sentiment*******")


            // var resss = await file.readFile('sentimentJson/sentimantResults.json')

            res.status(200).json(reviews);
    }
    // Math.round(value)



    // console.log(lat,lng);
    // res.status(200).json(placesWithDetails);

    ///have to plan trip
     

});


module.exports = router;