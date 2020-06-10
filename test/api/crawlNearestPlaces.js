var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')

chai.should();

chai.use(chaiHttp);

describe('CCRAWL NEAREST PLACES', ()=>{
    describe('GET',()=>{

        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/galle')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)

        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/matara')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)

        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/colombo')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)


        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/anuradhapura')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)

        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/polonnaruwa')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)


        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/badulla')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)


        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/sigiriya')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)


        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/mathale')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)

        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/numara eliya')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)


        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/mahanuwara')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)


        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/ampara')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)

        it('GET METHO WITH CORRECT INPUTS',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlaces/hambanthota')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('place_count')
                resp.body.should.have.property('places')
                resp.body.should.have.property('links')
                resp.body.should.have.property('last_modified')
                done()
            })
        }).timeout(120000)



        it('GET METHO WITH WRONG PATH',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlace/galle')
            .end((err,resp)=>{
                resp.should.have.status(404)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')
                done()
            })
        }).timeout(10000)

        it('GET METHO WITH WRONG PATH',(done)=>{
            chai.request(server)
            .get('/crawlNearestPlace/galle')
            .end((err,resp)=>{
                resp.should.have.status(404)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')
                done()
            })
        }).timeout(10000)
    })
})