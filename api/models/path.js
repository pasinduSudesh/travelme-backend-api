



// //const placeList = document.querySelector('#display');

// var place_1List = []; //locations in place_1 attribute of distance table
// var place_2List = [];//locations in place_2 attribute of distance table
// var distanecList = [];//distances between place_1 and place_2 in distance table
// var locationList = [];//locations in location attribute of location table
// var reviewList = [];//description of locations from review table

// //getting data from distance table of the database
// function renderDistance(doc) {
//     let li = document.createElement('li');
//     let place_1 = document.createElement('span');
//     let place_2 = document.createElement('span');
//     let distance = document.createElement('span');

//     li.setAttribute('data-id', doc.id);
//     place_1.textContent = doc.data().place_1;
//     place_2.textContent = doc.data().place_2;
//     distance.textContent = doc.data().distance;

//     place_1List.push(place_1.textContent);// entering place_1 attribute in to the list
//     place_2List.push(place_2.textContent);// entering place_2 attribute in to the list
//     distanecList.push(distance.textContent);// entering distance attribute in to the list
// }



// //getting data from location table of the database
// function renderLocation(doc) {
//     let li = document.createElement('li');
//     let location_name = document.createElement('span');
//     let category = document.createElement('span');


//     li.setAttribute('data-id', doc.id);
//     location_name.textContent = doc.data().location_name;
//     category.textContent = doc.data().category;

//     locationList.push(location_name.textContent);// entering places to the list

// }

// //getting place description from review table of the database


// function renderReview(doc) {
//     let li = document.createElement('li');
//     let locationName = document.createElement('span');
//     let review = document.createElement('span');


//     li.setAttribute('data-id', doc.id);
//     locationName.textContent = doc.data().locationName;
//     review.textContent = doc.data().review;

//     reviewList.push(review.textContent);// entering descriptions of places in to the list

// }


// //printing methord
// function print(s) {
//     s = s || '';
//     document.getElementById('demo').innerHTML += s + '<br>' + '<br>'; // print in the demo region of the HTML file
// }



// mainFunction();

// function mainFunction() {
//     var numOfDays = document.getElementById("days").value; // getting number of days from the user."days" is the id of text input where user enter the number of days
    
//     //getting data
//     if (parseInt(numOfDays) != null){ // check whether number of days is not null

//         db.collection('distance').get().then(snapshot => { //taking data from distance table of the DB by using function renderDistance
//             snapshot.docs.forEach(doc => {
//                 renderDistance(doc);
//             });

//             db.collection('locations').orderBy('location_name').get().then(snapshot => {    //here ordered by name, but it should be ordered by rating;
//                 snapshot.docs.forEach(doc => {
//                     renderLocation(doc);                                                    //taking data from location table of the DB by using function renderLocation
//                 });
//                 db.collection('review').get().then(snapshot => {                            //taking data from review table of the DB by using function renderReview
//                     snapshot.docs.forEach(doc => {
//                         renderReview(doc);
//                     });
                      
//                     Path(locationList, place_1List, place_2List, distanecList, reviewList, numOfDays);  //call Path function to calculate the optimum path

//                 });
//             });

//         });
//     }
//     else{
//         print ("enter a valid number of days"); 
//     }
// }


// //finding optimum path
// function Path(locationList, place_1List, place_2List, distanecList, reviewList, numOfDays) {
//     var totalDistance = 0;                                                                 //to take the total distance of the journey
//     var r = 0;                                                                             //variable for easy
//     var lst1 = [locationList[0]];//the list that contain the locations selected to visit.here I took first element of the location list as the firts visiting place.but it should bee the most rating place 
//     var limitDistance=numOfDays*320000;             //suppose that a traveler travels 320000 meters per day. If the distance table distances in km, this should 320

    
//         for (var i = 0; i < locationList.length - 1; i++) {                 //for the elements in location table
//             var indexOfLocation = 0;                                        //to take the index of the selected location in location list
//             var selectedLocation = '';                                                     //to take the selected location
//             var distanceValue = 10000000000000;                                         //just a variable to check the distance between two locations
//             if(totalDistance<limitDistance){                                //check whether total distance of the trip passed or not
//                     for (var j = 0; j < place_1List.length; j++) {          //loop to take the nearest place among other places
//                         if (locationList[r] == place_1List[j]) {            //to check whether a matching place from place _1 list
//                             if (lst1.includes(place_2List[j])) {            //to remove places that already have selected
//                                 indexOfLocation = indexOfLocation;          
//                             }
//                             else {                                          //to take places that doesn't selected yet
//                                 if (distanceValue > parseInt(distanecList[j])) {    //check for minimum distance 
//                                     distanceValue = parseInt(distanecList[j]);      //assign the minimum value of distance
//                                     selectedLocation = place_2List[j];              //take the relevent place relevent to the minimum distance from place_2 list
//                                     indexOfLocation = locationList.indexOf(selectedLocation);;  // to take the index of the selected location from location list
//                                 }
//                             }
//                         }
//                         else if (locationList[r] == place_2List[j]) {       //same thing as above to check matching place from place_2 list
//                             if (lst1.includes(place_1List[j])) {
//                                 indexOfLocation = indexOfLocation;
//                             }
//                             else {
//                                 if (distanceValue > parseInt(distanecList[j])) {
//                                     distanceValue = parseInt(distanecList[j]);
//                                     selectedLocation = place_1List[j];
//                                     indexOfLocation = locationList.indexOf(selectedLocation);
//                                 }
//                             }
//                         }
//                         else {
//                             indexOfLocation = indexOfLocation;          //if there's no matching places
//                             selectedLocation = selectedLocation;
//                         }
//                     }
//                     lst1.push(selectedLocation);                        //entering of the selected places to the list
//                     totalDistance=totalDistance+distanceValue;          //counting the total distance
//                     r = indexOfLocation;                                
//                 }
//         }

//         for (var k = 0; k < lst1.length; k++) {                             //printing process of the selected places in order
//             println( lst1[k]);
//             if  (k<(lst1.length-1))    {
//                 println("==>");
//             }                     
//         }

//         for (var k = 0; k < lst1.length; k++) {                             //printing process of the selected places
//             print((k + 1) + ".  " + lst1[k]);                               //printing of the place name
//             var val = locationList.indexOf(lst1[k]);                       
//             print(reviewList[val]);                                         //printing of the location name

//         }

    
// }

// //printing methord
// function println(s) {
//     s = s || '';
//     document.getElementById('demo1').innerHTML += s ; // print in the demo region of the HTML file
// }
// func.txt
// Displaying func.txt.