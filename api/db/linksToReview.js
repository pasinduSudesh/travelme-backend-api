const mongoose = require('mongoose');

const LinksToReviewSchema = mongoose.Schema({
    crawledPages: Number,
    pagesToReview: Number,
    url:String

});

module.exports = mongoose.model('LinksToReview',LinksToReviewSchema,'LinksToReview')