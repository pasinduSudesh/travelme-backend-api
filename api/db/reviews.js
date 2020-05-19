const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    analysState: Boolean,
    placeName: String,
    reviews:Array,
    placeId:String

});

module.exports = mongoose.model('Reviews',reviewSchema,'Reviews')