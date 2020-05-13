var spider = require('./spider');
var api = require('./api');
var file = require('./readJsonFile');
var HotelCrawlerResult = require('../db/hotelCrawlerResults');


exports.crawlHotelDetails = function(placeName){
    var urls  = await api.getCrawlURL(placeName,1);
}
