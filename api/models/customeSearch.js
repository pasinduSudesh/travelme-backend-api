const request = require('request')
const fs = require('fs')
var data = fs.readFileSync('./api/config/keys.json')
var config = JSON.parse(data)    

exports.getCrawlURL = async function(place, placeType){
    //arguments*************
    // place - place to be search
    //placeType - place types 0 - for attraction places
    var API_KEY = config['API_KEY']
    var CX = config['CX']
    var SEARCH_QUERY = place + " " + config['PLACE_TYPES'][placeType]
    console.log(SEARCH_QUERY)

    const searchResult = await customSearchAPI(API_KEY,CX,SEARCH_QUERY,placeType);

    return new Promise((resolve,reject)=>{
        if(searchResult){
            resolve(searchResult)
        }else{
            reject(new Error('Cant get search result'))
        }
    })

    

}

function customSearchAPI(API_KEY,CX,SEARCH_QUERY,placeType){
    return new Promise((resolve,reject)=>{
        request.get(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${SEARCH_QUERY}`,function(err,response,body){
            if(err){
                reject(new Error("Can't reach custom search API"))
            }else{
                var jsonBody = JSON.parse(body)
                if(parseInt(jsonBody['queries']['request'][0]['totalResults']) > 0){
                    var links = getSearchResult(jsonBody['items'],placeType)
                    resolve(links)
                }else{
                    reject(new Error('No search results found'))
                }

            }
        });
    });
}

function getSearchResult(jsonBody,searchType){
    var result = []
    jsonBody.forEach(function(value,index,array){
        var link = value['link']
        var splitedLink = link.split("-")
        // console.log(config['SEARCH_FILTER'][searchType][0])
        // splitedLink[0] == config['SEARCH_FILTER']['${searchType}'][0]
        if((splitedLink[0] == config['SEARCH_FILTER'][searchType][0]) && (splitedLink[2] == config['SEARCH_FILTER'][searchType][1]) && splitedLink.length == 4 ){
            result.push(link)
            // console.log(result);
        }
    });
    return result;
}