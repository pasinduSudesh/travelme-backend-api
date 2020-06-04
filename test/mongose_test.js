var assert = require('chai').assert
const mongoose = require('mongoose')


// var mocha = new Mocha({
//     reporter: 'mocha-junit-reporter',
//     reporterOptions: {
//         mochaFile: './test'
//     }
// });

var db = require('../api/models/mongoose');

describe('connected to database',function(){
    mongoose.connect(
        'mongodb+srv://travelme:travelme@cluster0-2r76h.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,  }
        ).then(resp=>{console.log("COnnected to MOngoDB")}).catch(err=>{console.log(err)});
    
   
})



describe('CHECK FUNCTION => checkUrlInDB',function(){
    mongoose.connect(
        'mongodb+srv://travelme:travelme@cluster0-2r76h.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,  }
        ).then(resp=>{console.log("COnnected to MOngoDB")}).catch(err=>{console.log(err)});

    it('TEST_1',function(done){
        db.checkUrlInDB('https://www.tripadvisor.com/Attractions-g304132-Activities-Anuradhapura_North_Central_Province.html')
        .then(res=>{
            assert.equal(res, false)
            done()
        })
        .catch(err=>{
            console.log(err.message)
            done();
        })

    }).timeout(10000);

    it('TEST_1',function(done){
        db.checkUrlInDB(23)
        .then(res=>{
            assert.equal(res, false)
            done()
        })
        .catch(err=>{
            console.log(err.message)
            done();
        })

    }).timeout(10000);

    it('TEST_1',function(done){
        var result = [
            {
              _id: '5ed49c05c2ec3e30b0007694',
              results: {
                place_count: 10,
                places: [Array],
                links: [Array],
                last_modified: [Object]
              },
              url: 'https://www.tripadvisor.com/Attractions-g304135-Activities-Jaffna_Northern_Province.html',
              __v: 0
            }
          ]
        db.checkUrlInDB('https://www.tripadvisor.com/Attractions-g304135-Activities-Jaffna_Northern_Province.html')
        .then(res=>{
            console.log("No error")
            assert.equal(res, result)
            done()
        })
        .catch(err=>{
            console.error(err.message)
            done();
        })

    }).timeout(10000);
})

describe('CHECKFUNCTION => saveLinksToReview',function(){
    it('TEST_1',function(done){
        db.saveLinksToReview('sdmfn')
        .then(res=>{
            assert.equal(res,null)
            done();
        })
        .catch(err=>{
            console.error(err.message)
            done();
        })
    })
})

kinn 