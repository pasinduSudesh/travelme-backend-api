var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')

chai.should();

chai.use(chaiHttp);

describe('CHECK BEST PLACES', function(){
    it('GET REVIEWS BEST', function(){
        chai.request(server)
        .get('/bestPlaces')
        .end((err,resp)=>{
            // console.log(resp.body)
            resp.should.have.status(200)
            resp.body.should.have.property('bestPlaces')
            resp.body.bestPlaces[0].should.have.property('description')
            resp.body.bestPlaces[0].should.have.property('img')
            resp.body.bestPlaces[0].should.have.property('place')
            resp.body.bestPlaces[0].should.have.property('rating')
        })
    })

    it('GET REVIEWS BEST', function(){
        chai.request(server)
        .get('/bestPlaces')
        .end((err,resp)=>{
            // console.log(resp.body)
            resp.should.have.status(200)
            resp.body.should.have.property('bestPlaces')
            resp.body.bestPlaces[1].should.have.property('description')
            resp.body.bestPlaces[1].should.have.property('img')
            resp.body.bestPlaces[1].should.have.property('place')
            resp.body.bestPlaces[1].should.have.property('rating')
        })
    })

    it('GET REVIEWS BEST', function(){
        chai.request(server)
        .get('/bestPlaces')
        .end((err,resp)=>{
            // console.log(resp.body)
            resp.should.have.status(200)
            resp.body.should.have.property('bestPlaces')
            resp.body.bestPlaces[2].should.have.property('description')
            resp.body.bestPlaces[2].should.have.property('img')
            resp.body.bestPlaces[2].should.have.property('place')
            resp.body.bestPlaces[2].should.have.property('rating')
        })
    })

    it('GET REVIEWS BEST ERONG PATH', function(){
        chai.request(server)
        .get('/bestPlacesA')
        .end((err,resp)=>{
            // console.log(resp.body)
            resp.should.have.status(404)
        })
    })
})