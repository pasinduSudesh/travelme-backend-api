const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    
    name:{type:String,unique : true},
    age:Number

});

module.exports = mongoose.model('Test',reviewSchema,'Test')