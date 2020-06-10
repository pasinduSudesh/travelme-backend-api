const request = require('request')
const fs = require('fs')
var data = fs.readFileSync('./api/config/keys.json')
var config = JSON.parse(data)    


// *****************************************************/

exports.googlePlaceAPI = async function(placeName){
    return new Promise((resolve,reject)=>{
        var PLACE_API_KEY = config['PLACE_API_KEY']
        var query = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=name,formatted_address,geometry,place_id&key=${PLACE_API_KEY}`;
        request.get(query,function(err,response,body){
            // console.log(body)
            // console.log("********************************************")
            if(err){
                reject(new Error(err));
            }else{
                if(response.statusCode === 200){
                    resolve(JSON.parse(body))
                }else{
                    reject(new Error('Error while connectiong place API'))
                }
            }
        });
    });
}

// *****************************************************/

exports.getCrawlURL = async function(place, placeType){
    //arguments*************
    // place - place to be search
    //placeType - place types 0 - for attraction places
    var API_KEY = config['API_KEY']
    var CX = config['CX']
    var SEARCH_QUERY = place + " " + config['PLACE_TYPES'][placeType]
    // console.log(SEARCH_QUERY)

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
        if(searchType === 0){
            if((splitedLink[0] == config['SEARCH_FILTER'][searchType][0]) && (splitedLink[2] == config['SEARCH_FILTER'][searchType][1]) && splitedLink.length == 4 ){
                result.push(link)
            }
        }else if(searchType === 1){
            if((splitedLink[0] === config['SEARCH_FILTER'][searchType][0]) && (splitedLink[3] === config['SEARCH_FILTER'][searchType][1])){
                result.push(link)
            }
            // console.log(result);
        }
    });
    return result;
}

// *****************************************************/
exports.derectionAPI = function(start,end){
    return new Promise((resolve, reject) => {
        var API_KEY = config['DIRECTION_API_KEY'];
        var query = `https://www.mapquestapi.com/directions/v2/route?key=${API_KEY}&from=${start}&to=${end}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false&unit=k`;
        request.get(query,function(err,response,body){
            if(err){
                // console.log(err.message)
                reject(new Error(err));

            }else{
                // console.log(response.statusCode)
                if(response.statusCode === 200){
                    resolve(JSON.parse(body))
                }else{
                    reject(new Error('Error while connectiong place API'))
                }
            }
        });
    });
}
// *****************************************************/