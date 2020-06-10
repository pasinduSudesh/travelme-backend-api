var assert = require('chai').assert
var expect = require('chai').expect
const mongoose = require('mongoose')

var automate = require('../api/models/automate');

describe('COONNECT TO DATABASE',function(){
    it('connecting to database', function(done){
        mongoose.connect(
            'mongodb+srv://travelme:travelme@cluster0-2r76h.mongodb.net/testingDatabase?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,  }
            ).then(resp=>{done()}).catch(err=>{console.log(err)});
    }).timeout(10000)

})

describe('CHECK FUNCTION=> automateCrawlerReviews', function(){
    it('check function', function(done){
        automate.automateCrawlReviews()
        done();
    }).timeout(120000)

    it('check function', function(done){
        automate.automateCrawlReviews()
        done();
    }).timeout(120000)
})