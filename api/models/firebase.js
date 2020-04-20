const firebase = require('firebase-admin')
const fs = require('fs')


exports.savePlaceDetails = function( callback){
    var rd = fs.readFileSync('crawlerResults/placeSpiderResults.json')
    var jsonBody = JSON.parse(rd);
    console.log(jsonBody['last-modified']['time'])
    var ty = Date.parse(jsonBody['last-modified']['date']+ " " +jsonBody['last-modified']['time'])
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
                location_name: value['place-name'],
                place_title: value['place-title'],
                review_link: value['review-link']
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