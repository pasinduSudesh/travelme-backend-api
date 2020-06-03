const mongoose = require('mongoose');

const user = mongoose.Schema({
    email:String
});

module.exports = mongoose.model('Users',user,'Users')