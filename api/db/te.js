const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    
    bool: Boolean,
    name: String,
    age:{
        type:Number,
        unique:true
    },
    ii:{
        type:String,
        unique:true
    }

});

module.exports = mongoose.model('Test',reviewSchema,'Test')