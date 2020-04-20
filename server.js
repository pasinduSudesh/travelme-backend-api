const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3003;

const server = http.createServer(app);

server.listen(port,function(){
	console.log(`server is running on port ${port}`)
});





// // import express JS module into app 
// // and creates its variable. 
// var express = require('express');
// const bodyParser = require('body-parser'); 
// const fs = require('fs');
// var app = express(); 
// app.use(bodyParser.json());

// // Creates a server which runs on port 3000 and 
// // can be accessed through localhost:3000 



// // Function callName() is executed whenever 
// // url is of the form localhost:3000/name 
// app.get('/name', (req, res)=>{
// 	var count = 0
// 	var spawn = require("child_process").spawn;
// 	var list = ["ss","sssw"]
// 	var process = spawn('python',["./hello.py", list, "perera"] );
// 	process.stdout.on('data', function(data) { 
// 		// await new Promise(resolve => setTimeout(resolve, 10000));
// 		count++
// 		console.log(count)		
// 		console.log(data.toString())
// 		// res.send("fmfmfmfmfm")
// 		var file =  fs.readFileSync('places.json')
// 		var st = JSON.parse(file)		
// 		res.status(200).json(st);
// 	});
// 	// res.send("fmfmfmfmfm")
	

// }); 


// app.listen(3000, function() { 
// 	var pp = 300033
// 	console.log(`server running on port ${pp}`); 
// } ) 




// 	// 	count++
// 	// 	console.log(count)
// 	// 	if(count < 2){
// 	// 		res.send(data)
// 	// 	}
// 	// 	// return res.send("ok")
// 	// } ) 

// // save code as start.js 
