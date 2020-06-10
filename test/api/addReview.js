var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')

chai.should();

chai.use(chaiHttp);

describe('ADD REVIEWS ', ()=>{
    it('ADD REVIES TO DATABSE',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"galle duch fort", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(200)
            res.body.should.have.property('STATUS')
            res.body.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"mathale alu vihare", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(200)
            res.body.should.have.property('STATUS')
            res.body.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"sinharaja rain forest", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(200)
            res.body.should.have.property('STATUS')
            res.body.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"galle international cricket stadium", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(200)
            res.body.should.have.property('STATUS')
            res.body.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"hikkaduwa beach", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(200)
            res.body.should.have.property('STATUS')
            res.body.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"vatadageya", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(400)
            res.body.should.have.property('error')
            res.body.error.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"polonnaruwa gal viharaya", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(200)
            res.body.should.have.property('STATUS')
            res.body.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE WITH WRONG PLACE NAME',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:"", review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(400)
            res.body.should.have.property('error')
            res.body.error.should.have.property('message')

            done()
        })
    }).timeout(120000)

    it('ADD REVIES TO DATABSE WITH WRONG PLACE NAME',(done)=>{
        chai.request(server)
        .post('/addReview').send({name:"Kamal",place:null, review:"Good place"})
        .end((err,res)=>{
            console.log(res.body)
            res.should.have.status(400)
            res.body.should.have.property('error')
            res.body.error.should.have.property('message')

            done()
        })
    }).timeout(120000)


})