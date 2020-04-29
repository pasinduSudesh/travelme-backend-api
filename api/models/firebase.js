const firebase = require('firebase-admin')
const fs = require('fs')
const crawlResultFile = require('./readJsonFile');

//************************************* */

exports.saveLinksToReview = function(links){
    return new Promise((resolve,reject)=>{
        var ref = firebase.database().ref('travelme')
        var reviewRef = ref.child('links_to_review');
        links.forEach(value=>{
            reviewRef.push({
                url:value['url'],
                pages_to_review: reviewNumber(value['review_count']),
                crawled_pages: 0

            },(err)=>{
                if (err){
                    reject(new Error(err))
                }
            });

        });
        resolve(true);
    });

    function reviewNumber(str){
        return parseInt(str.split(" ")[0].replace(",",""))/10;
    }
}

//************************************* */

exports.saveReviewToDB = function(data){
    return new Promise((resolve,reject)=>{
        var ref = firebase.database().ref('travelme')
        var reviewRef = ref.child('user_reviews');
        reviewRef.push(data,(err)=>{
            if (err){
                reject(new Error(err))
            }else{
                resolve(true)
            }
        });
    });

    
    
        
    
}

//************************************* */
//save crawling urls to DB

exports.savePlaceCrawlerDet = async function(url,crawlingData){
    // var crawlingData = await crawlResultFile.readFile('crawlerResults/placeSpiderResults.json');
    return new Promise((resolve,reject)=>{
        // console.log(url)
        var ref = firebase.database().ref('travelme');
        var crawlerRef = ref.child('crawler_results_places');
        crawlerRef.push({
            url:url,
            results: crawlingData
        },(err)=>{
            if(err){
                reject(new Error(err))
            }else{
                resolve()
            }
        });
    });
}

// **************************************************************/

exports.checkUrlInDB =  function(url){
    return new Promise((resolve,reject)=>{
        var ref = firebase.database().ref('travelme/crawler_results_places');
        ref.orderByChild('url').equalTo(url).on('value',function(snap){
            var val = snap.val();
            if(val !== null){
                var keys = Object.keys(val);
                resolve(val[keys[0]]['results']);
            }else{
                resolve(false);
            }

        },(err)=>{
            reject(new Error(err))
        });

    });
}
        

    





//************************************* */


exports.savePlaceDetails = function( callback){
    var rd = fs.readFileSync('crawlerResults/placeSpiderResults.json')
    var jsonBody = JSON.parse(rd);
    console.log(jsonBody['last_modified']['time'])
    var ty = Date.parse(jsonBody['last_modified']['date']+ " " +jsonBody['last_modified']['time'])
    console.log(ty)
    console.log(Date.parse(new Date()))

    var savingData = {}
    if(true){
    // if(Date.parse(d['last-modified']['date']+ " " +d['last-modified']['time']) + 5000 >= Date.parse(new Date())){
        var ref = firebase.database().ref('travelme')
        var usersRef = ref.child('locations');
        // var userRef = usersRef.push();
        // var i = 0
        jsonBody['places'].forEach(function(value,index,array){
            // i++
            // var usersRef = ref.child('locations')
            usersRef.push({
                location_name: value['place_name'],
                place_title: value['place_title'],
                review_link: value['review_link']
            });
        });
        callback(false,true)
    }else{
        callback("Places Not updated",false)
    }

}


exports.saveToFirebase = function(data,child,callback){
    var ref = firebase.database().ref('travelme')
    var time = (Date.parse(new Date())).toString()
    var usersRef = ref.child(child).child(time)

    var save = function(data){
        return new Promise(function(resolve,reject ){
            usersRef.set(data).then(resolve,reject);
        });
    }

    save(data).then(
        callback(false,"ook")
    ).catch(function(err){
        callback(err,false)
    }
        
    )
    
    
    
    
}


//*************************************************** */ 

//after crawling reviews this change the links states

exports.afterCrawlChangeLinks = function(urls){
    
    return new Promise(async (resolve,reject)=>{
        for(var i=0;i<urls.length;i++){
            console.log("***********************")
            var get = await getCount(urls[i]);
            var update = await upd(get['key'],get['count']);
        }
        resolve(true);        
    });

    function getCount(url){
        return new Promise((resolve,reject)=>{
            var ref = firebase.database().ref('travelme/links_to_review');
            // var y = "https://www.tripadvisor.com/Attraction_Review-g297896-d447525-Reviews"
            ref.orderByChild('url').startAt(url.substr(0,68)).on('value',function(snap){///////this must be changed
                var val = snap.val();
                if(val !== null){
    
                    key = Object.keys(val)[0];
                    // console.log(Object.keys(val));
                    var count = parseInt(val[key]['crawled_pages']) + 1;
                    resolve({key:key,count:count});
                    
                }
            },(err)=>{
                reject(new Error(err));
            });
        });
    }
    function upd(key,count){
        return new Promise((resolve,reject)=>{
            var ref = firebase.database().ref('travelme/links_to_review');
            var dd = ref.child(key)
            // console.log
            dd.update({
                crawled_pages:count
            });
            resolve(true)
        });
    }

    function updateCount(count,key){
        var ref = firebase.database().ref('travelme/links_to_review');
        var reff = ref.child(key)
        // console.log
        reff.update({
            crawled_pages:count
        });
    }
}

//*************************************************** */ 
//*************************************************** */ 
//get links for crawl reviews
exports.getLinksBeforeCrawl = async function(links){
    // console.log(await getLinkDetails("dd"))
    return new Promise(async (resolve,reject)=>{
        var linkList = []
        for(var i=0;i<links.length;i++){
            // console.log(links[i])
            var linkDet = await getLinkDetails(links[i]);
            if(linkDet){
                if(linkDet['crawled_pages'] < linkDet['pages_to_review']){
                    if(linkDet['crawled_pages'] === 0){
                        linkList.push(linkDet['url']);
                        
                    }
                    else{
                        var pagination = "or" + (linkDet['crawled_pages'] * 5).toString();
                        var splitUrl = linkDet['url'].split("-");
                        var newUrl = splitUrl[0]+"-"+splitUrl[1]+"-"+splitUrl[2]+"-"+splitUrl[3]+"-"+pagination+"-"+splitUrl[4]+"-"+splitUrl[5];
                        linkList.push(newUrl);
                         
                    }
                }
            }
        }
        // console.log(linkList);
        resolve(linkList);
    });
    


    function getLinkDetails(url){
        // var url = 'https://www.tripadvisor.com/Attraction_Review-g297896-d3617497-Reviews-Galle_Fort-Galle_Galle_District_Southern_Province.html';
        return new Promise((resolve,reject)=>{
            var ref = firebase.database().ref('travelme/links_to_review');
            ref.orderByChild('url').equalTo(url).on('value',function(snap){
                var val = snap.val();
                if(val !== null){
                    var keys = Object.keys(val);
                    resolve(val[keys[0]]);
                }else{
                    resolve(false);
                }
            },(err)=>{
                reject(new Error(err));
            });

        });
    }
}
//*************************************************** */ 

//*************************************************** */ 
//SENTIMENT//
exports.getReviewsForAnalyse = function(){
     
}

//*************************************************** */ 