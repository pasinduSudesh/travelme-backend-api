var assert = require('chai').assert
var expect = require('chai').expect
const mongoose = require('mongoose')

var sentiment = require('../api/models/sentiment');

describe('CHECK FUNCTION => sentiment', function(){
    it('check sentiment analize', function(done){
        sentiment.sentimentAnalyze()
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('check sentiment analize', function(done){
        sentiment.sentimentAnalyze()
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('check sentiment analize', function(done){
        sentiment.sentimentAnalyze()
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('check sentiment analize', function(done){
        sentiment.sentimentAnalyze()
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('check sentiment analize', function(done){
        sentiment.sentimentAnalyze()
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('check sentiment analize', function(done){
        sentiment.sentimentAnalyze()
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('check sentiment analize', function(done){
        sentiment.sentimentAnalyze()
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
    
})