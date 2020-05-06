const express = require('express');
const router = express.Router();
const fs = require('fs');
var data = fs.readFileSync('./api/config/trip.json')
var config = JSON.parse(data)

var api = require('../models/api');
// var db = require('../models/firebase');
var db = require('../models/mongoose');
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

    var latInt = Math.round(centerPoint['candidates'][0]['geometry']['location']['lat'] * 100)/100;
    var lngInt = Math.round(centerPoint['candidates'][0]['geometry']['location']['lng'] * 100)/100;

    var placesWithDetails = await db.getPlacesForTripFromDB(placeCount,latInt,lngInt);
    // console.log(placesWithDetails);
    console.log(placesWithDetails.length , placeCount*0.6);
    // console.log(placesWithDetails.length > placeCount*0.6);
    var placesFroPlanTrip = []

    if(placesWithDetails.length>0){
        var availablelaceCount =placesWithDetails.length;
        if (availablelaceCount >placeCount*0.6){
            console.log("*************** Has places for plane Trip***************")
            placesFroPlanTrip = placesWithDetails;
            // res.status(200).json(placesFroPlanTrip);
            
        }else{
            console.log("*************** NOT ENOGH PLACES***************")
            var crawledPlaces = await crawling.crawlWithPlaceName(place);

            var newPlacesForTrip = await db.getPlacesForTripFromDB(placeCount,latInt,lngInt)
            if(newPlacesForTrip.length > availablelaceCount){
                console.log("******crawl places*******")
                var linksToCrawlReviews = await db.getLinksBeforeCrawl(crawledPlaces['links']) 
                console.log("******GET LINKS TO CRAWL*******")
                var reviews = await spider.crawlReviewWithUrls(linksToCrawlReviews) 
                console.log("******CRAWL REVIEWS*******")
                var save = await db.afterCrawlChangeLinks(crawledPlaces['links']);
                console.log("******save links after crawling*******")                
                var data = JSON.stringify({
                    reviews:reviews
                })
                fs.writeFileSync('sentimentJson/reviewsForSentiment.json',data)
                                       
                var senti = await sentiment.sentimentAnalyze();

                var sentimentResult = await file.readFile('sentimentJson/sentimentResults.json')

                var analysedPlaces = await db.saveSentiments(sentimentResult)
                placesFroPlanTrip = await db.getPlacesForTripFromDB(placeCount,latInt,lngInt)
                
            }else{
                console.log('NO PLACES TO REVIEW')
                placesFroPlanTrip = newPlacesForTrip;
                // res.status(200).json(placesFroPlanTrip);
            }           
            
            // getNewPlaces

            
            
        }
        
    }else{
        console.log("*************** NO PLACES ***************")
        
        var crawledPlaces = await crawling.crawlWithPlaceName(place);
        console.log(crawledPlaces);
        var linksToCrawlReviews = await db.getLinksBeforeCrawl(crawledPlaces['links'])  

        console.log("******GET LINKS TO CRAWL*******")
            var reviews = await spider.crawlReviewWithUrls(linksToCrawlReviews) 
            console.log("******CRAWL REVIEWS*******")
            var save = await db.afterCrawlChangeLinks(linksToCrawlReviews);
            console.log("******save links after crawling*******")
            // var dataToSave = {reviews:reviews}
            // await file.writeFile('sentimentJson/reviewsForSentiment.json',dataToSave);
            // console.log("******save reviews ti jsn*******")
            // console.log("******sentiment*******")
            
            var data = JSON.stringify({
                reviews:reviews
            })
            fs.writeFileSync('sentimentJson/reviewsForSentiment.json',data)
            
            
            var senti = await sentiment.sentimentAnalyze();


            var sentimentResult = await file.readFile('sentimentJson/sentimentResults.json')

            var analysedPlaces = await db.saveSentiments(sentimentResult)
            
            // getNewPlaces

            
            placesFroPlanTrip = await db.getPlacesForTripFromDB(placeCount,latInt,lngInt);
            // res.status(200).json(placesFroPlanTrip);
    }
    // Math.round(value)

    res.status(200).json(placesFroPlanTrip);

    // console.log(lat,lng);
    // res.status(200).json(placesWithDetails);

    ///have to plan trip
     

});


module.exports = router;