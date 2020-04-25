const express = require('express');
const fs  = require('fs')
const router = express.Router();

router.get('/',function(req,res,next){
    res.status(200).json({
        "Requests":[
            {
                "Method":"GET",
                "URL": "https://noderestapp.azurewebsites.net/crawlNearestPlaces/<place_name>",
                "Responce": "Return nearest tourist attraction placess for given place"
                
            },
            {
                "Method":"GET",
                "URL": "https://noderestapp.azurewebsites.net/crawlreviews/<place_name>",
                "Responce": "Return reviews of nearest tourist attraction placess for given place"
            },
            {
                "Method":"GET",
                "URL": "https://noderestapp.azurewebsites.net/bestPlaces",
                "Responce": "return best places which have high reviews"
            }
        ]
    })
});

module.exports = router;