var assert = require('chai').assert
const mongoose = require('mongoose')




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

describe('test2',function(){
    it('testing 1', function(done){
        db.checkUrlInDB('https://www.tripadvisor.com/Attractions-g304132-Activities-Anuradhapura_North_Central_Province.html')
        .then(rs=>{
            console.log(rs);
            assert.equal(rs,true);
            done();
        })
       
    }).timeout(10000)

    it('testing 2', function(done){
        db.testfunctionForMocha('://www.tripadvisor.com/Attractions-g304132-Activities-Anuradhapura_North_Central_Province.html')
        .then(rs=>{
            assert.equal(rs,true);
            done();
        })
       
    }).timeout(10000)

    it('testing 3', function(done){
        db.testfunctionForMocha('//www.tripadvisor.com/Attractions-g304132-Activities-Anuradhapura_North_Central_Province.html')
        .then(rs=>{
            assert.equal(rs,false);
            done();
        })
       
    }).timeout(10000)
})