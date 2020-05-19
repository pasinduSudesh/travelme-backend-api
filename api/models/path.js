var api = require('./api');


exports.path = function(locationList, place_1List, place_2List, distanecList, numOfDays) {
    var totalDistance = 0;                                                                 //to take the total distance of the journey
    var r = 0;                                                                             //variable for easy
    var lst1 = [locationList[0]];//the list that contain the locations selected to visit.here I took first element of the location list as the firts visiting place.but it should bee the most rating place 
    var limitDistance=numOfDays*320000;             //suppose that a traveler travels 320000 meters per day. If the distance table distances in km, this should 320

    
        for (var i = 0; i < locationList.length - 1; i++) {                 //for the elements in location table
            var indexOfLocation = 0;                                        //to take the index of the selected location in location list
            var selectedLocation = '';                                                     //to take the selected location
            var distanceValue = 10000000000000;                                         //just a variable to check the distance between two locations
            if(totalDistance<limitDistance){                                //check whether total distance of the trip passed or not
                    for (var j = 0; j < place_1List.length; j++) {          //loop to take the nearest place among other places
                        if (locationList[r] == place_1List[j]) {            //to check whether a matching place from place _1 list
                            if (lst1.includes(place_2List[j])) {            //to remove places that already have selected
                                indexOfLocation = indexOfLocation;          
                            }
                            else {                                          //to take places that doesn't selected yet
                                if (distanceValue > parseInt(distanecList[j])) {    //check for minimum distance 
                                    distanceValue = parseInt(distanecList[j]);      //assign the minimum value of distance
                                    selectedLocation = place_2List[j];              //take the relevent place relevent to the minimum distance from place_2 list
                                    indexOfLocation = locationList.indexOf(selectedLocation);;  // to take the index of the selected location from location list
                                }
                            }
                        }
                        else if (locationList[r] == place_2List[j]) {       //same thing as above to check matching place from place_2 list
                            if (lst1.includes(place_1List[j])) {
                                indexOfLocation = indexOfLocation;
                            }
                            else {
                                if (distanceValue > parseInt(distanecList[j])) {
                                    distanceValue = parseInt(distanecList[j]);
                                    selectedLocation = place_1List[j];
                                    indexOfLocation = locationList.indexOf(selectedLocation);
                                }
                            }
                        }
                        else {
                            indexOfLocation = indexOfLocation;          //if there's no matching places
                            selectedLocation = selectedLocation;
                        }
                    }
                    lst1.push(selectedLocation);                        //entering of the selected places to the list
                    totalDistance=totalDistance+distanceValue;          //counting the total distance
                    r = indexOfLocation;                                
                }
        }

        // for (var k = 0; k < lst1.length; k++) {                             //printing process of the selected places in order
        //     console.log( lst1[k]);
                               
        // }
        return lst1

        // for (var k = 0; k < lst1.length; k++) {                             //printing process of the selected places
        //     print((k + 1) + ".  " + lst1[k]);                               //printing of the place name
        //     var val = locationList.indexOf(lst1[k]);                       
        //     print(reviewList[val]);                                         //printing of the location name
        // }

    
}

exports.createList = function(placeList){
    var locations = []
    var place1 = [];
    var place2 = [];
    var distance = [];
    for(var x=0;x<placeList.length;x++){
        locations.push(placeList[x]['placeId']);
        for(var y=x;y<placeList.length;y++){
            if(placeList[x]['placeId'] !== placeList[y]['placeId']){
                place1.push(placeList[x]['placeId']);
                place2.push(placeList[y]['placeId']);
                var d = getDistanceFromLatLonInKm(placeList[x]['lat'],placeList[x]['lng'],placeList[y]['lat'],placeList[y]['lng']);
                distance.push(d);
            }
        }
    }
    return {p:locations,p1:place1,p2:place2,d:distance};

}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

exports.fullTripPlan = function(placeIdOrder,placeDetList){
    return new Promise(async (resolve, reject) => {
        try{
            
            var trip = [];
            var travelDet = []
            for(var i=0;i<placeIdOrder.length-1;i++){
                var place1;
                var place2;
                placeDetList.forEach(placeDet => {
                    if(placeIdOrder[i] === placeDet['placeId']){
                        place1 = placeDet;
                    }else if(placeIdOrder[i+1] === placeDet['placeId']){
                        place2 = placeDet
                    }
                });
                var startLatLng = place1['lat']+","+place1['lng'];
                var endLatLng = place2['lat']+","+place2['lng'];
                var directionDet = await api.derectionAPI(startLatLng,endLatLng);
                var distance = directionDet['route']['distance'];
                var timeStr = directionDet['route']['formattedTime'];
                // console.log(distance,timeStr);
                var t = timeStr.split(":");
                console.log(t);
                
                var time = parseInt(t[0])*60*60 + parseInt(t[1])*60 + parseInt(t[2]);
                console.log(time);
                travelDet.push({distance:distance, time:time})
                trip.push(place1);
                console.log("pushed");
            }            
            resolve({trip:trip,travelDetails:travelDet});
        }catch(err){
            reject(new Error(err));
        }
    });
}

exports.timePlan = function (trip,travelDet,dates){
    var totalTime = 0
    var day = 8*60*60; 
    var time = 0
    for(var x=0;x<trip.length;x++){
        // console.log(x)

        if(trip[x]['positivePresentage']<50){time = 60*60;}
        else if(trip[x]['positivePresentage']<75){time = 90*60;}
        else{time = 120*60}        
        totalTime += time;
        // console.log(totalTime,"m",time)
        if(x<travelDet.length){
            totalTime +=  (Math.floor(travelDet[x]['time']/(30*60)) + 1) * 30*60
            // console.log(totalTime,"fff ");
        }        
    }
    console.log(totalTime,"totoltime",dates*day*1.2);
    if(totalTime < dates*day*1.2){
        console.log("aaaa")
        var maxpd = Math.round(trip.length/dates);
        
        console.log(maxpd,"max places")
        // ssssssss
        var placeCount = 0
        var totalTripTime = 0
        var currentDay = 1
        var hour = 9
        var min = 0
        var fullTripDet = []
        var oneDayTripDet = []
        for(var x=0;x<trip.length;x++){
            if(currentDay<=dates){               
                if(totalTripTime < day/60){                    
                    var timee = 0;
                    var startTimeH= hour;
                    var startTimeM = min;
                    if(trip[x]['positivePresentage']<50){timee = 60;}
                    else if(trip[x]['positivePresentage']<75){ timee = 90;}
                    else{timee = 120}
                    totalTripTime += timee
                    console.log(totalTripTime);
                    var t = addTimes(hour,min,timee);
                    var endTimeH = t['h'];
                    var endTimeM = t['m'];
                    hour = endTimeH;
                    min = endTimeM;
                    var place = {
                        placeName:trip[x]['placeName'],
                        bestReview:trip[x]['bestReview'],
                        placeId:trip[x]['placeId'],
                        img:trip[x]['img'],
                        lat:trip[x]['lat'],
                        lng:trip[x]['lng'],
                        negativePresentage:trip[x]['negativePresentage'],
                        positivePresentage:trip[x]['positivePresentage'],
                        naturalPresentage:trip[x]['naturalPresentage'],
                        rating:trip[x]['rating'],
                        startTimeH:startTimeH,
                        startTimeM:startTimeM,
                        endTimeH:endTimeH,
                        endTimeM:endTimeM,
                        latLng:trip[x]['lat']+","+trip[x]['lng'],
                        day:currentDay
                       }
                    console.log(place);
                    fullTripDet.push(place);
                    placeCount +=1;
                    if(x<travelDet.length){
                        var tm =travelDet[x]['distance']/60;
                        var a = (Math.floor(tm/30)+1)*30
                        totalTripTime += a
                        var tt = addTimes(hour,min,a);
                        hour = tt['h'];
                        min = tt['m'];
                    }
                    if(placeCount>=maxpd){
                        currentDay+=1;
                        totalTripTime = 0;
                        hour = 9;
                        min = 0;
                        placeCount = 0
                    }
                }else{
                    currentDay += 1;
                    totalTripTime = 0;
                    hour = 9;
                    min = 0;
                }
            }
        }
        return fullTripDet
        // ssssssss

    }else{
        console.log("bbbb")
        var totalTripTime = 0
        var currentDay = 1
        var hour = 9
        var min = 0
        var fullTripDet = []
        var oneDayTripDet = []
        for(var x=0;x<trip.length;x++){
            if(currentDay<=dates){               
                if(totalTripTime < day/60){                    
                    var timee = 0;
                    var startTimeH= hour;
                    var startTimeM = min;
                    if(trip[x]['positivePresentage']<50){timee = 60;}
                    else if(trip[x]['positivePresentage']<75){ timee = 90;}
                    else{timee = 120}
                    totalTripTime += timee
                    console.log(totalTripTime);
                    var t = addTimes(hour,min,timee);
                    var endTimeH = t['h'];
                    var endTimeM = t['m'];
                    hour = endTimeH;
                    min = endTimeM;
                    var place = {
                        placeName:trip[x]['placeName'],
                        bestReview:trip[x]['bestReview'],
                        placeId:trip[x]['placeId'],
                        img:trip[x]['img'],
                        lat:trip[x]['lat'],
                        lng:trip[x]['lng'],
                        negativePresentage:trip[x]['negativePresentage'],
                        positivePresentage:trip[x]['positivePresentage'],
                        naturalPresentage:trip[x]['naturalPresentage'],
                        rating:trip[x]['rating'],
                        startTimeH:startTimeH,
                        startTimeM:startTimeM,
                        endTimeH:endTimeH,
                        endTimeM:endTimeM,
                        latLng:trip[x]['lat']+","+trip[x]['lng'],
                        day:currentDay
                       }
                    fullTripDet.push(place);
                    if(x<travelDet.length){
                        // console.log(travelDet[x])
                        console.log(hour,min,"df")
                        var tm =travelDet[x]['time']/60;
                        console.log(tm);
                        var a = (Math.floor(tm/30)+1)*30
                        console.log(a);
                        totalTripTime += a
                        var tt = addTimes(hour,min,a);
                        hour = tt['h'];
                        min = tt['m'];
                        console.log(hour,min,"as")
                    }
                }else{
                    currentDay += 1;
                    totalTripTime = 0;
                    hour = 9;
                    min = 0;
                } 
            }
        }
        return fullTripDet;

    }
    
}

function addTimes(ch,cm,m){
    var mins = m%60;
    var hours = Math.floor(m/60); 

    if(cm + mins >= 60){
        var extra = Math.floor((cm+mins)/60);
        var ms = (cm+mins)%60
        return {h:ch+hours+extra,m:ms}
    }
    else{
        return {h:ch+hours,m:mins}
    }
}


exports.distanceOfToPlaces= function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;

    function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
  }
  
  

