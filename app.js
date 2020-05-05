const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
const mongoose = require('mongoose');

//firebase service account json file import
var serviceAccount = require("./serviceAccountKey.json");

//initialize firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://travelme-29ae1.firebaseio.com"
  });

//   connect to mongo db
mongoose.connect(
    'mongodb+srv://travelme:travelme@cluster0-2r76h.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,  }
    ).then(resp=>{console.log("COnnected to MOngoDB")}).catch(err=>{console.log(err)});

// mongoose.Promise = global.Promise;

//const requre router path
const homeRouter = require('./api/router/home');
const reviewRouter = require('./api/router/review')
const crawlNearestPlaceRouter = require('./api/router/crawlNearestPlaces');
const crawlReviewsRouter = require('./api/router/crawlReviews');
const save = require('./api/router/save');
const addReviewRouter = require('./api/router/addReview');
const bestPlaceRouter = require('./api/router/bestPlaces');
const createTripPlanRouter = require('./api/router/tripPlan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");//this can allow to domain for access API
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
});

//const use routers
app.use('/',homeRouter);
app.use('/reviews', reviewRouter);
app.use('/crawlNearestPlaces',crawlNearestPlaceRouter);
app.use('/crawlReviews',crawlReviewsRouter);
app.use('/save',save);
app.use('/addReview',addReviewRouter);
app.use('/bestPlaces',bestPlaceRouter);
app.use('/planTrip',createTripPlanRouter);


//handdle 404 error 
app.use((req,res,next)=>{
    const error = new Error('404 Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    }); 
});

module.exports = app;