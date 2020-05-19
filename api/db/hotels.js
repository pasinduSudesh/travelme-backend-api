const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: String,
    address: String,
    img:String,
    rating:Number,
    facilities:Array,
    placeId:{type:String,unique:true},
    lat:Number,
    lng:Number,
    latLng:String,
    hotelUrl:String
});

module.exports = mongoose.model('Hotels',hotelSchema,'Hotels')