var assert = require('chai').assert
const mongoose = require('mongoose')

var db = require('../api/models/mongoose');
var spider = require('../api/models/spider')

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

describe.skip('CHECK FUNCTION =>hotelSpider',function(){
    it('with urls and limit', function(done){
        spider.hotelSpider(['https://www.tripadvisor.com/Hotels-g297896-Galle_Galle_District_Southern_Province-Hotels.html'],20)
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('with urls and limit', function(done){
        spider.hotelSpider(['https://www.tripadvisor.com/Hotels-g297896-Galle_Galle_District_Southern_Province-Hotels.html'],20)
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('with urls and limit 20', function(done){
        spider.hotelSpider(['https://www.tripadvisor.com/Hotels-g297896-Galle_Galle_District_Southern_Province-Hotels.html'],20)
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('with urls and limit 15', function(done){
        spider.hotelSpider(['https://www.tripadvisor.com/Hotels-g297896-Galle_Galle_District_Southern_Province-Hotels.html'],15)
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('with urls and limit 10', function(done){
        spider.hotelSpider(['https://www.tripadvisor.com/Hotels-g297896-Galle_Galle_District_Southern_Province-Hotels.html'],10)
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('with urls and limit 5', function(done){
        spider.hotelSpider(['https://www.tripadvisor.com/Hotels-g297896-Galle_Galle_District_Southern_Province-Hotels.html'],5)
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)
})


describe.skip('CHECK FUNCTION=> runReviewSpider', function(){
    it('run riview spider', function(done){
        spider.runReviewSpider(['https://www.tripadvisor.com/Attraction_Review-g1027209-d5877603-Reviews-Mirijjawila_Botanic_Gardens-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run riview spider', function(done){
        spider.runReviewSpider(['https://www.tripadvisor.com/Attraction_Review-g1027209-d6903423-Reviews-Dry_Zone_Botanic_Gardens_Hambantota-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.runReviewSpider(['https://www.tripadvisor.com/Attraction_Review-g1027209-d5877603-Reviews-Mirijjawila_Botanic_Gardens-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.runReviewSpider(['https://www.tripadvisor.com/Attraction_Review-g1027209-d12133619-Reviews-Walawe_River_Safari-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.runReviewSpider(['https://www.tripadvisor.com/Attraction_Review-g1027209-d12982477-Reviews-Agro_Technology_Park-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.runReviewSpider(['https://www.tripadvisor.com/Attraction_Review-g1027209-d7119257-Reviews-Birds_Research_Center_Resort-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.runReviewSpider(['https://www.tripadvisor.com/Attraction_Review-g1027209-d5955858-Reviews-Mahapelessa_Hot_Springs-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run riview spider must fail', function(done){
        spider.runReviewSpider('https://www.tripadvisor.com/Attraction_Review-g1027209-d5955858-Reviews-Mahapelessa_Hot_Springs-Hambantota_Tangalle_Southern_Province.html')
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)
    
    
})

describe.skip('CHECK FUNCTION => runPlaceSpider', function(){
    it('run place spider', function(done){
        spider.runPlaceSpider(['https://www.tripadvisor.com/Attractions-g297896-Activities-Galle_Galle_District_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run place spider', function(done){
        spider.runPlaceSpider(['https://www.tripadvisor.com/Attractions-g304134-Activities-Hikkaduwa_Galle_District_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run place spider', function(done){
        spider.runPlaceSpider(['https://www.tripadvisor.com/Attractions-g946553-Activities-Matara_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run place spider', function(done){
        spider.runPlaceSpider(['https://www.tripadvisor.com/Attractions-g1027209-Activities-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run place spider', function(done){
        spider.runPlaceSpider(['https://www.tripadvisor.com/Attractions-g293962-Activities-Colombo_Western_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run place spider enter String insted array must fail', function(done){
        spider.runPlaceSpider('https://www.tripadvisor.com/Attractions-g293962-Activities-Colombo_Western_Province.html')
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)
})

describe('CHECK FUNCTION=> runReviewSpider', function(){
    it('run riview spider', function(done){
        spider.crawlReviewWithUrls(['https://www.tripadvisor.com/Attraction_Review-g1027209-d5877603-Reviews-Mirijjawila_Botanic_Gardens-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run riview spider', function(done){
        spider.crawlReviewWithUrls(['https://www.tripadvisor.com/Attraction_Review-g1027209-d6903423-Reviews-Dry_Zone_Botanic_Gardens_Hambantota-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.crawlReviewWithUrls(['https://www.tripadvisor.com/Attraction_Review-g1027209-d5877603-Reviews-Mirijjawila_Botanic_Gardens-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.crawlReviewWithUrls(['https://www.tripadvisor.com/Attraction_Review-g1027209-d12133619-Reviews-Walawe_River_Safari-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.crawlReviewWithUrls(['https://www.tripadvisor.com/Attraction_Review-g1027209-d12982477-Reviews-Agro_Technology_Park-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.crawlReviewWithUrls(['https://www.tripadvisor.com/Attraction_Review-g1027209-d7119257-Reviews-Birds_Research_Center_Resort-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)


    it('run riview spider', function(done){
        spider.crawlReviewWithUrls(['https://www.tripadvisor.com/Attraction_Review-g1027209-d5955858-Reviews-Mahapelessa_Hot_Springs-Hambantota_Tangalle_Southern_Province.html'])
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('run riview spider must fail', function(done){
        spider.crawlReviewWithUrls('https://www.tripadvisor.com/Attraction_Review-g1027209-d5955858-Reviews-Mahapelessa_Hot_Springs-Hambantota_Tangalle_Southern_Province.html')
        .then(res=>{
            console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(120000)
    
    
})