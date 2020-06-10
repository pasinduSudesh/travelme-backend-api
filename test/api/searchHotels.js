var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')

chai.should();

chai.use(chaiHttp);


describe('CHECK TRIP PLAN', function(){
    it('check with wrong url' , function(done){
        chai.request(server)
        .get('/searchHotels/galle')
        .end((err,resp)=>{
            resp.should.have.status(404)
            resp.body.should.have.property('error')
            resp.body.error.should.have.property('message')
            done()
        })
    }).timeout(120000)

    it('check with no place name' , function(done){
        chai.request(server)
        .get('/searchHotel/ ')
        .end((err,resp)=>{
            resp.should.have.status(404)
            resp.body.should.have.property('error')
            resp.body.error.should.have.property('message')
            done()
        })
    }).timeout(120000)

    it('check null' , function(done){
        chai.request(server)
        .get('/searchHotel/null')
        .end((err,resp)=>{
            resp.should.have.status(400)
            resp.body.should.have.property('error')
            resp.body.error.should.have.property('message')
            done()
        })
    }).timeout(120000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/galle')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/galle')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/matara')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/colombo')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/anuradhapura')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/polonnaruwa')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/badulla')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/sigiriya')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    it('check place name' , function(done){
        chai.request(server)
        .get('/searchHotel/matale')
        .end((err,resp)=>{
            console.log
            resp.should.have.status(200)
            resp.body[0].should.have.property('facilities')
            resp.body[0].should.have.property('name')
            resp.body[0].should.have.property('address')
            resp.body[0].should.have.property('hotelUrl')
            resp.body[0].should.have.property('img')
            resp.body[0].should.have.property('rating')
            resp.body[0].should.have.property('placeId')
            resp.body[0].should.have.property('lat')
            resp.body[0].should.have.property('lng')
            resp.body[0].should.have.property('latLng')           
            done()
        })
    }).timeout(240000)

    
})