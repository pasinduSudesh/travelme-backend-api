var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')

chai.should();

chai.use(chaiHttp);


describe('CHECK NEAREST HOTEL', function(){

    it('GET HEAREST HOTELS WRONG URL',(done)=>{
        chai.request(server)
        .post('/nearestHotel').send({place:"colombo",lat:"6.916708099999999", lng:"79.85673709999999"})
        .end((err,res)=>{
            console.log(res.body)  
            res.should.have.status(404)         
            done()
        })
    }).timeout(120000)

    it('GET HEAREST WITH NULL VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"",lat:"6.916708099999999", lng:"79.85673709999999"})
        .end((err,res)=>{             
            res.should.have.status(500)  
            res.body.should.have.property('error')       
            res.body.error.should.have.property('message')       
            done()
        })
    }).timeout(120000)

    it('GET HEAREST WITH NULL VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"colombo",lat:"", lng:"79.85673709999999"})
        .end((err,res)=>{             
            res.should.have.status(500)  
            res.body.should.have.property('error')       
            res.body.error.should.have.property('message')       
            done()
        })
    }).timeout(120000)

    it('GET HEAREST WITH NULL VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"colombo",lat:"6.916708099999999", lng:""})
        .end((err,res)=>{             
            res.should.have.status(500)  
            res.body.should.have.property('error')       
            res.body.error.should.have.property('message')       
            done()
        })
    }).timeout(120000)


    it('GET HEAREST WITH NULL VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"",lat:"", lng:""})
        .end((err,res)=>{             
            res.should.have.status(500)  
            res.body.should.have.property('error')       
            res.body.error.should.have.property('message')       
            done()
        })
    }).timeout(120000)




    it('GET HEAREST HOTELS CORRECT VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"colombo",lat:"6.916708099999999", lng:"79.85673709999999"})
        .end((err,res)=>{
            console.log(res.body[0])  
            res.should.have.status(200) 
            res.body[0].should.have.property('name') 
            res.body[0].should.have.property('address') 
            res.body[0].should.have.property('hotelUrl') 
            res.body[0].should.have.property('img') 
            res.body[0].should.have.property('rating') 
            res.body[0].should.have.property('placeId') 
            res.body[0].should.have.property('lat') 
            res.body[0].should.have.property('lng') 
            res.body[0].should.have.property('latLng')                   
            done()
        })
    }).timeout(120000)

    it('GET HEAREST HOTELS CORRECT VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"matara",lat:"5.9408955", lng:"80.5709447"})
        .end((err,res)=>{
            console.log(res.body[0])  
            res.should.have.status(200) 
            res.body[0].should.have.property('name') 
            res.body[0].should.have.property('address') 
            res.body[0].should.have.property('hotelUrl') 
            res.body[0].should.have.property('img') 
            res.body[0].should.have.property('rating') 
            res.body[0].should.have.property('placeId') 
            res.body[0].should.have.property('lat') 
            res.body[0].should.have.property('lng') 
            res.body[0].should.have.property('latLng')                   
            done()
        })
    }).timeout(120000)

    it('GET HEAREST HOTELS CORRECT VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"galle",lat:"6.027155", lng:"80.2152036"})
        .end((err,res)=>{
            console.log(res.body[0])  
            res.should.have.status(200) 
            res.body[0].should.have.property('name') 
            res.body[0].should.have.property('address') 
            res.body[0].should.have.property('hotelUrl') 
            res.body[0].should.have.property('img') 
            res.body[0].should.have.property('rating') 
            res.body[0].should.have.property('placeId') 
            res.body[0].should.have.property('lat') 
            res.body[0].should.have.property('lng') 
            res.body[0].should.have.property('latLng')                   
            done()
        })
    }).timeout(120000)

    it('GET HEAREST HOTELS CORRECT VALUES',(done)=>{
        chai.request(server)
        .post('/nearestHotels').send({place:"polonnaruwa",lat:"7.936691", lng:"81.0030294"})
        .end((err,res)=>{
            console.log(res.body[0])  
            res.should.have.status(200) 
            res.body.should.have.property('name') 
            res.body.should.have.property('address') 
            res.body.should.have.property('hotelUrl') 
            res.body.should.have.property('img') 
            res.body.should.have.property('rating') 
            res.body.should.have.property('placeId') 
            res.body.should.have.property('lat') 
            res.body.should.have.property('lng') 
            res.body.should.have.property('latLng')                   
            done()
        })
    }).timeout(120000)


    
})