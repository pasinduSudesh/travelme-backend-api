const mongoose = require('mongoose');

const crawlerResultSchema = mongoose.Schema({
    url:String
});

module.exports = mongoose.model('HotelCrawlerResult',crawlerResultSchema,'HotelCrawlerResult')