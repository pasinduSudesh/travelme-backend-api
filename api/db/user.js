const mongoose = require('mongoose');

const user = mongoose.Schema({
    email:{type:String,unique:true}
});

module.exports = mongoose.model('Users',user,'Users')