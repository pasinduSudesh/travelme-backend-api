const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    address: String,
    placeName: String,
    types:Array,
    placeId:String,
    lat:Number,
    lng:Number,
    userName:String,
    review:String,
    analyseState:Boolean

});

module.exports = mongoose.model('UserReviews',reviewSchema,'UserReviews')