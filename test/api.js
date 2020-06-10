var assert = require('chai').assert
var expect = require('chai').expect
const mongoose = require('mongoose')

var api = require('../api/models/api');

describe('CHECKING FUNCTION => goooglePlaceAPI', function(){



    it('check place api with place name', function(done){
        api.googlePlaceAPI("galle").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("galle").then(res=>{
            // console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            expect(res.candidates[0]).to.contain.property('formatted_address')
            expect(res.candidates[0]).to.contain.property('geometry')
            expect(res.candidates[0]).to.contain.property('name')
            expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("galle").then(res=>{
            // console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            expect(res.candidates[0]).to.contain.property('formatted_address')
            expect(res.candidates[0]).to.contain.property('geometry')
            expect(res.candidates[0]).to.contain.property('name')
            expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with spaces', function(done){
        api.googlePlaceAPI("   ").then(res=>{
            console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            // expect(res.candidates[0]).to.contain.property('formatted_address')
            // expect(res.candidates[0]).to.contain.property('geometry')
            // expect(res.candidates[0]).to.contain.property('name')
            // expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with with null', function(done){
        api.googlePlaceAPI(null).then(res=>{
            console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            // expect(res.candidates[0]).to.contain.property('formatted_address')
            // expect(res.candidates[0]).to.contain.property('geometry')
            // expect(res.candidates[0]).to.contain.property('name')
            // expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("mathale ").then(res=>{
            // console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            expect(res.candidates[0]).to.contain.property('formatted_address')
            expect(res.candidates[0]).to.contain.property('geometry')
            expect(res.candidates[0]).to.contain.property('name')
            expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("galle sri lanka").then(res=>{
            // console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            expect(res.candidates[0]).to.contain.property('formatted_address')
            expect(res.candidates[0]).to.contain.property('geometry')
            expect(res.candidates[0]).to.contain.property('name')
            expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name with numbers', function(done){
        api.googlePlaceAPI("12342").then(res=>{
            // console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            // expect(res.candidates[0]).to.contain.property('formatted_address')
            // expect(res.candidates[0]).to.contain.property('geometry')
            // expect(res.candidates[0]).to.contain.property('name')
            // expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name with wrong place name', function(done){
        api.googlePlaceAPI("dfdfdf").then(res=>{
            // console.log(res);
            expect(res).to.contain.property('candidates')
            expect(res).to.contain.property('status')
            // expect(res.candidates[0]).to.contain.property('formatted_address')
            // expect(res.candidates[0]).to.contain.property('geometry')
            // expect(res.candidates[0]).to.contain.property('name')
            // expect(res.candidates[0]).to.contain.property('place_id')
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with same place name different types', function(done){
        api.googlePlaceAPI("GALLE").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with same place name different types', function(done){
        api.googlePlaceAPI("GalLE").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with same place name different types', function(done){
        api.googlePlaceAPI("galle town").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with same place name different types', function(done){
        api.googlePlaceAPI("galle city").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with same place name different types', function(done){
        api.googlePlaceAPI("galle district").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with same place name different types', function(done){
        api.googlePlaceAPI("galle fort").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with same place name different types', function(done){
        api.googlePlaceAPI("galle sri lanka").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("matara").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("hambantota").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("dfff").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("dfdfd").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("anuradapura vatadageya").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("polonnaruwa").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("sinharaya forest").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("dikwella beach").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("ruwanweliseya").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name', function(done){
        api.googlePlaceAPI("thuparamaya").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name different language', function(done){
        api.googlePlaceAPI("yapanaya").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name dufferent language', function(done){
        api.googlePlaceAPI("jaffna").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name with numbers', function(done){
        api.googlePlaceAPI("1123").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })

    it('check place api with place name with numbers', function(done){
        api.googlePlaceAPI("11239487").then(res=>{
            // console.log(res);
            done();
        }).catch(err=>{
            done(err)
        })
    })
})

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

describe('CHECK FUNCTION =>getCrawlURL', function(){
    it('get crawl url from custome seaarch engine', function(done){
        api.getCrawlURL("matara", 0)
        .then(res=>{
            // console.log(res)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('get crawl url from custome seaarch engine get hotels', function(done){
        api.getCrawlURL("fdegtt", 1)
        .then(res=>{
            res.length.should.equal.to(0)
            // console.log(res)
           
        })
        .catch(err=>{
            done(err)
        })
    })

    it('get crawl url from custome seaarch engine get hotels', function(done){
        api.getCrawlURL("galle", 0)
        .then(res=>{
            if(res.length>0){
                done()
            }else{
                done("did not get urls")
            }
            // console.log(res)
           
        })
        .catch(err=>{
            done(err)
        })
    })

    it('get crawl url from custome seaarch engine get hotels', function(done){
        api.getCrawlURL("marata", 1)
        .then(res=>{
            if(res.length>0){
                done()
            }else{
                done("did not get urls")
            }
            // console.log(res)
           
        })
        .catch(err=>{
            done(err)
        })
    })

    
    it('get crawl url from custome seaarch engine get places, with null input', function(done){
        api.getCrawlURL(null, 0)
        .then(res=>{
            if(res.length>0){
                done()
            }else{
                done("did not get urls")
            }
            // console.log(res)
           
        })
        .catch(err=>{
            done(err)
        })
    })

    it('get crawl url from custome seaarch engine get hotels, with null inputs', function(done){
        api.getCrawlURL(null, 1)
        .then(res=>{
            if(res.length>0){
                done()
            }else{
                done("did not get urls")
            }
            // console.log(res)
           
        })
        .catch(err=>{
            done(err)
        })
    })

    it('get crawl url from custome seaarch engine get places, with correct input', function(done){
        api.getCrawlURL('polonnaruwa', 0)
        .then(res=>{
            if(res.length>0){
                done()
            }else{
                done("did not get urls")
            }
            // console.log(res)
           
        })
        .catch(err=>{
            done(err)
        })
    })

    it('get crawl url from custome seaarch engine get hotels, with correct inputs', function(done){
        api.getCrawlURL('polonnaruwa', 1)
        .then(res=>{
            if(res.length>0){
                done()
            }else{
                done("did not get urls")
            }
            // console.log(res)
           
        })
        .catch(err=>{
            done(err)
        })
    })

    

})

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


describe('CHECK FUNCTION=> derectionAPI', function(){
    it('derection api with input place names', function(done){
        api.derectionAPI('galle', 'matara')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input place names', function(done){
        api.derectionAPI('galle', 'matara')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input place locations', function(done){
        api.derectionAPI('80.1,7.8', '80.1,6.8')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input both places are same', function(done){
        api.derectionAPI('80.1,7.8', '80.1,7.8')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input both places are null', function(done){
        api.derectionAPI('', '')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input one place null', function(done){
        api.derectionAPI('galle', '')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input place names', function(done){
        api.derectionAPI('galle', 'matara')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input place names', function(done){
        api.derectionAPI('galle', 'matara')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input place locations', function(done){
        api.derectionAPI('80.1,7.8', '80.1,6.8')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input both places are same', function(done){
        api.derectionAPI('80.1,7.8', '80.1,7.8')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input both places are null', function(done){
        api.derectionAPI('', '')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)

    it('derection api with input one place null', function(done){
        api.derectionAPI('galle', '')
        .then(res=>{
            expect(res).to.contain.property('route')
            expect(res.route).to.contain.property('distance')
            expect(res.route).to.contain.property('time')
            expect(res.route).to.contain.property('time')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }).timeout(10000)
})