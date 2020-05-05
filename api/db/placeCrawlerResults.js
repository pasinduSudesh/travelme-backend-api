const mongoose = require('mongoose');

const crawlerResultSchema = mongoose.Schema({
    results: Object,
    url:String

});

module.exports = mongoose.model('PlaceCrawlerResult',crawlerResultSchema,'PlaceCrawlerResult')