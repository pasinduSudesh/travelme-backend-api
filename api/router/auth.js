const express = require('express');
const router = express.Router();
const db = require('../models/mongoose');

router.post('/login',async function(req,res,next){
    try{
        var email = req.body.email;
        console.log(email)
        req.session.email = email;
        console.log(req.session)
        if(typeof email !== 'undefined'){
            var hasUser = await db.checkUser(email);
            console.log(hasUser)
            if(!hasUser){
                await db.addUser(email);
            }
            res.status(200).json({
                message:"Logged In"
            })
        }else{
            res.status(500).json({
                error:{message:"Enter email"}
                
            })
        }
    }catch(err){

    }
});

router.get('/logout',function(req,res,next){

    req.session.email = null;
    res.status(200).json({
        message:"Logged Out"
    })

});

module.exports = router;