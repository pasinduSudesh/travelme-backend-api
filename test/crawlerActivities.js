var assert = require('chai').assert
var expect = require('chai').expect
const mongoose = require('mongoose')

var db = require('../api/models/mongoose');
var placeCrawlerResult = {
    "place_count": 10,
    "places": [{
        "place_name": "Mulgirigala Raja Maha Vihara",
        "no_of_reviews": "713 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g304142-d2012330-Reviews-Mulgirigala_Raja_Maha_Vihara-Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/0f/4c/1f/bd/photo0jpg.jpg"
    }, {
        "place_name": "Ridiyagama Safari Park",
        "no_of_reviews": "92 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g1027209-d10229106-Reviews-Ridiyagama_Safari_Park-Hambantota_Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/14/14/df/ba/ridiyagama-safari-park.jpg"
    }, {
        "place_name": "Goyambokka Beach (Sriyanga Sanjeewa)",
        "no_of_reviews": "515 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g304142-d4068286-Reviews-Goyambokka_Beach_Sriyanga_Sanjeewa-Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/0a/88/46/6e/20160229-161927-largejpg.jpg"
    }, {
        "place_name": "Mirijjawila Botanic Gardens",
        "no_of_reviews": "18 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g1027209-d5877603-Reviews-Mirijjawila_Botanic_Gardens-Hambantota_Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/05/31/79/03/mirijjawila-botanic-gardens.jpg"
    }, {
        "place_name": "Dry Zone Botanic Gardens - Hambantota",
        "no_of_reviews": "33 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g1027209-d6903423-Reviews-Dry_Zone_Botanic_Gardens_Hambantota-Hambantota_Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/0e/fd/4e/61/decorations.jpg"
    }, {
        "place_name": "Ashram Sri Lanka - Sri Lanka itinerary",
        "no_of_reviews": "41 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g304142-d10240178-Reviews-Ashram_Sri_Lanka_Sri_Lanka_itinerary-Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/13/5e/23/4a/relaxing-at-the-ashram.jpg"
    }, {
        "place_name": "Tangalle Lagoon",
        "no_of_reviews": "244 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g304142-d1748074-Reviews-Tangalle_Lagoon-Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/0a/65/ee/af/tangalle-lagoon.jpg"
    }, {
        "place_name": "Walawe River Safari",
        "no_of_reviews": "13 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g1027209-d12133619-Reviews-Walawe_River_Safari-Hambantota_Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/0e/5f/7a/1d/getlstd-property-photo.jpg"
    }, {
        "place_name": "Agro Technology Park",
        "no_of_reviews": "10 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g1027209-d12982477-Reviews-Agro_Technology_Park-Hambantota_Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/15/ef/0f/36/green-pea-hen.jpg"
    }, {
        "place_name": "Birds Research Center & Resort",
        "no_of_reviews": "45 reviews",
        "review_link": "https://www.tripadvisor.com/Attraction_Review-g1027209-d7119257-Reviews-Birds_Research_Center_Resort-Hambantota_Tangalle_Southern_Province.html",
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/0e/84/6e/d9/macaw.jpg"
    }],
    "links": ["https://www.tripadvisor.com/Attraction_Review-g304142-d2012330-Reviews-Mulgirigala_Raja_Maha_Vihara-Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g1027209-d10229106-Reviews-Ridiyagama_Safari_Park-Hambantota_Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g304142-d4068286-Reviews-Goyambokka_Beach_Sriyanga_Sanjeewa-Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g1027209-d5877603-Reviews-Mirijjawila_Botanic_Gardens-Hambantota_Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g1027209-d6903423-Reviews-Dry_Zone_Botanic_Gardens_Hambantota-Hambantota_Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g304142-d10240178-Reviews-Ashram_Sri_Lanka_Sri_Lanka_itinerary-Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g304142-d1748074-Reviews-Tangalle_Lagoon-Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g1027209-d12133619-Reviews-Walawe_River_Safari-Hambantota_Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g1027209-d12982477-Reviews-Agro_Technology_Park-Hambantota_Tangalle_Southern_Province.html", "https://www.tripadvisor.com/Attraction_Review-g1027209-d7119257-Reviews-Birds_Research_Center_Resort-Hambantota_Tangalle_Southern_Province.html"],
    "last_modified": {
        "date": "06/04/2020",
        "time": "12:17:48"
    }
}   
var links = [
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g304142-d2012330-Reviews-Mulgirigala_Raja_Maha_Vihara-Tangalle_Southern_Province.html',
      review_count: '713 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g1027209-d10229106-Reviews-Ridiyagama_Safari_Park-Hambantota_Tangalle_Southern_Province.html',
      review_count: '92 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g304142-d4068286-Reviews-Goyambokka_Beach_Sriyanga_Sanjeewa-Tangalle_Southern_Province.html',
      review_count: '515 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g1027209-d5877603-Reviews-Mirijjawila_Botanic_Gardens-Hambantota_Tangalle_Southern_Province.html',
      review_count: '18 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g1027209-d6903423-Reviews-Dry_Zone_Botanic_Gardens_Hambantota-Hambantota_Tangalle_Southern_Province.html',
      review_count: '33 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g304142-d10240178-Reviews-Ashram_Sri_Lanka_Sri_Lanka_itinerary-Tangalle_Southern_Province.html',
      review_count: '41 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g304142-d1748074-Reviews-Tangalle_Lagoon-Tangalle_Southern_Province.html',
      review_count: '244 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g1027209-d12133619-Reviews-Walawe_River_Safari-Hambantota_Tangalle_Southern_Province.html',
      review_count: '13 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g1027209-d12982477-Reviews-Agro_Technology_Park-Hambantota_Tangalle_Southern_Province.html',
      review_count: '10 reviews'
    },
    {
      url: 'https://www.tripadvisor.com/Attraction_Review-g1027209-d7119257-Reviews-Birds_Research_Center_Resort-Hambantota_Tangalle_Southern_Province.html',
      review_count: '45 reviews'
    }
  ]


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

describe.skip('CHECK FUNCTION => savePlaceCrawlerDet',function(){
    it('save data',function(done){
        db.savePlaceCrawlerDet("urlString",placeCrawlerResult)
        .then(res=>{
            assert.equal(res,undefined)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)
})

describe.skip('CHECK FUNCTION => checkUrlInDB',function(){
    it('with wrong url => should pass',function(done){
        db.checkUrlInDB("urlStriang")
        .then(res=>{
            assert.equal(res,false)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('with correct  url => should pass',function(done){
        db.checkUrlInDB("urlString")
        .then(res=>{
            expect(res).to.contain.property('places')
            expect(res).to.contain.property('place-count')
            expect(res).to.contain.property('links')
            expect(res).to.contain.property('last-modified')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)
})

describe.skip('CHECK FUNCTION => saveLinksToReview', function(){
    it('with correct data => should pass',function(done){
        db.saveLinksToReview(links)
        .then(res=>{
           assert.equal(res,undefined)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('with incorrect data => should fail',function(done){
        db.saveLinksToReview("dddd")
        .then(res=>{
           assert.equal(res,undefined)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)
})

describe.skip('CHECK FUNCTION => savePlaceDet',function(){
    it('with correct data',function(done){
        db.savePlaceDet(placeCrawlerResult['places'])
        .then(res=>{
           assert.equal(res,undefined)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(30000)

    it('with incorrect data',function(done){
        db.savePlaceDet("dmfj")
        .then(res=>{
           assert.equal(res,undefined)
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)
})

