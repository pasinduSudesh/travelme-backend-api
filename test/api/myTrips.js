var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')

chai.should();

chai.use(chaiHttp);


describe('CHECK GET GET MY TRIPS', function(){

    it('check with wrong url', function(done){
        chai.request(server)
            .get('/myTrip/sahan@gmail.com')
            .end((err,resp)=>{   
                console.log(resp.body)             
                resp.should.have.status(404)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')
                done()
            })
    }).timeout(120000)

    it('check with wrong url', function(done){
        chai.request(server)
            .get('/myTrips/')
            .end((err,resp)=>{   
                console.log(resp.body)             
                resp.should.have.status(400)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')
                done()
            })
    }).timeout(120000)

    it('check with correct url', function(done){
        chai.request(server)
            .get('/myTrips/sahan@gmail.com')
            .end((err,resp)=>{   
                console.log(resp.body)             
                resp.should.have.status(200)
                resp.body.trips[0].should.have.property('trip')
                resp.body.trips[0].should.have.property('distances')
                resp.body.trips[0].should.have.property('email')
                resp.body.trips[0].should.have.property('topic')
                done()
            })
    }).timeout(120000)
    
    
    it('check with correct url wrong email', function(done){
        chai.request(server)
            .get('/myTrips/sahan@gmil.com')
            .end((err,resp)=>{   
                console.log(resp.body)             
                resp.should.have.status(200)
                resp.body.should.have.property('trips')
                done()
            })
    }).timeout(120000)

})