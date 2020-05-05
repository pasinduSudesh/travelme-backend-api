const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    placeName: String,
    address:String,
    bestReview: String,
    placeId:String,
    img:String,
    lat:Number,
    lng:Number,
    negativePresentage:Number,
    positivePresentage:Number,
    naturalPresentage:Number,
    rating:Number,
    totalPolarity:Number,
    totalReviews:Number


});

module.exports = mongoose.model('Place',placeSchema,'Place')