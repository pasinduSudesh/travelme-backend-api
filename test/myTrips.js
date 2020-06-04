var assert = require('chai').assert
const mongoose = require('mongoose')

var db = require('../api/models/mongoose');

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

describe('CHECK FUNCTION => addUser',function(){

    // it('connecting to database', function(done){
    //     mongoose.connect(
    //         'mongodb+srv://travelme:travelme@cluster0-2r76h.mongodb.net/testingDatabase?retryWrites=true&w=majority',
    //         {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true,
    //             useCreateIndex: true,  }
    //         ).then(resp=>{done()}).catch(err=>{console.log(err)});
    // }).timeout(10000)

    

    it('add email',function(done){
        db.addUser('nimala11@gmail.com')
        .then(res=>{
            assert.equal(res,undefined)
            done();
        })
        .catch(err=>{
            
            done(err);
        })
    }).timeout(10000)  

    it('Add duplicate user',function(done){
        db.addUser('nimala11@gmail.com')
        .then(res=>{
            assert.equal(res,undefined)
            done();
        })
        .catch(err=>{
            
            done(err);
        })
    }).timeout(10000)   

    it('Adding Number insted string',function(done){
        db.addUser(3)
        .then(res=>{
            assert.equal(res,undefined)
            done();
        })
        .catch(err=>{
            done(err);
        })
    }).timeout(10000)  

    it('add array',function(done){
        db.addUser(['nimala31@gmail.com','nimala21@gmail.com'])
        .then(res=>{
            assert.equal(res,undefined)
            done();
        })
        .catch(err=>{
            done(err);
        })
    }).timeout(10000)  
    
})

describe('CHECK FUNCTION => checkUser',function(){
    it('check avaulable user => should pass',function(done){
        db.checkUser('nimala11@gmail.com')
        .then(res=>{
            assert.equal(res,true)
            done();
        })
        .catch(err=>{
            done(err);
        })
    }).timeout(10000)  

    it('check avaulable user => should fail',function(done){
        db.checkUser('nimala11@gmail.com')
        .then(res=>{
            assert.equal(res,false)
            done();
        })
        .catch(err=>{
            done(err);
        })
    }).timeout(10000)  

    it('check not avaulable user => should pass',function(done){
        db.checkUser('nimala111@gmail.com')
        .then(res=>{
            assert.equal(res,false)
            done();
        })
        .catch(err=>{
            done(err);
        })
    }).timeout(10000)  

    it('check not avaulable user => should fail',function(done){
        db.checkUser('nimala111@gmail.com')
        .then(res=>{
            assert.equal(res,true)
            done();
        })
        .catch(err=>{
            done(err);
        })
    }).timeout(10000)
    
    
})