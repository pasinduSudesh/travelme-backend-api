var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')

chai.should();

chai.use(chaiHttp);


describe('CHECK TRIP PLAN', function(){


    it('check with wrong url', function(done){
        chai.request(server)
            .post('/planTripx')
            .send({place:"matara", days:"2", email:"kamal@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(404)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')
               
                done()
            })
    })

    it('check with wrong input place', function(done){
        chai.request(server)
            .post('/planTripx')
            .send({place:"", days:"2", email:"kamal@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(400)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')
               
                done()
            })
    })

    it('check with wrong input days', function(done){
        chai.request(server)
            .post('/planTripx')
            .send({place:"galle", days:"", email:"kamal@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(400)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')               
                done()
            })
    })

    it('check with wrong input null email', function(done){
        chai.request(server)
            .post('/planTripx')
            .send({place:"galle", days:"", email:""})
            .end((err,resp)=>{
                resp.should.have.status(400)
                resp.body.should.have.property('error')
                resp.body.error.should.have.property('message')               
                done()
            })
    })

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"galle", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                console.log(resp.body)
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"matara", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"hambanthota", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"colombo", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"mahanuwara", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)
    
    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"kandy", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"anuradhapura", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"polonnaruwa", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"ampara", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"sigiriya", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)

    it('check with wrong changing place name', function(done){
        chai.request(server)
            .post('/planTrip')
            .send({place:"mathale", days:"3", email:"sahan@gmail.com"})
            .end((err,resp)=>{
                resp.should.have.status(200)
                            
                done()
            })
    }).timeout(30000)
})