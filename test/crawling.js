var assert = require('chai').assert
const mongoose = require('mongoose')

var db = require('../api/models/mongoose');
var crawler = require('../api/models/crawling')

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

describe.skip('CHECKING FUNCTION => crawlWithPlaceName',function(){
    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("matara")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("galle")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("hikkaduwa")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("polonnaruwa")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("anuradhapura")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("jaffna")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("sigiriya")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("dabulla")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("kandy")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("colombo")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("trincomale")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("ampara")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("hambanthota")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("badulla")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("bandaravela")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("vilpattuwa")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("udawalave")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("rathnapura")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlWithPlaceName("vavniya")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)
})


describe('CHECKING FUNCTION => crawlHotelsWithPlaceName',function(){
    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("matara")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("galle")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("hikkaduwa")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("polonnaruwa")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("anuradhapura")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("jaffna")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("sigiriya")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("dabulla")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("kandy")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("colombo")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("trincomale")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("ampara")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("hambanthota")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("badulla")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("bandaravela")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("vilpattuwa")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("udawalave")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("rathnapura")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)

    it('check ckrawlwe with place name', function(done){
        crawler.crawlHotelsWithPlaceName("vavniya")
        .then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done(err)
        })
    }).timeout(120000)
})