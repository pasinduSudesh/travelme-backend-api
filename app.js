const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//const requre router path
const reviewRouter = require('./api/router/review')
const crawlNearestPlaceRouter = require('./api/router/crawlNearestPlaces');
const crawlReviewsRouter = require('./api/router/crawlReviews');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//const use routers
app.use('/reviews', reviewRouter)
app.use('/crawlNearestPlaces',crawlNearestPlaceRouter);
app.use('/crawlReviews',crawlReviewsRouter);

app.use((req,res,next)=>{
    const error = new Error('404 Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            massage: error.message
        }
    });
});

module.exports = app;