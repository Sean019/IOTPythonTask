// Base gateway code for MEng in IoT Assignment
// Handles GET & POST requests

var http = require('http');
var fs = require('fs');
var url = require('url');

//Handle HTTP requests
function handle_incoming_request (req, res) {

    console.log("INCOMING REQUEST: " + req.method + " " + req.url);
	
	 if(req.method == 'POST') {
		console.log("POST");
		switch(req.url){
			case '/sendreading':
				var receivedReading = '';
				req.on('data', function(chunk) {
					receivedReading += chunk;
					console.log("Received data chunk " + receivedReading);
					write_sensor_data(receivedReading)
				});
				req.on('end', function() {
					//receivedReading += data;	
					console.log("Received Data: " + receivedReading);
				});
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end('post received');
				break;
			default:
				res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
				res.end('Not found');
				console.log("[404] " + req.method + " to " + req.url);
				break;
		}
    }
	
	
	if(req.method == 'GET')
	{

		load_sensor_data(function(err, readings){
		if (err) { 

			console.log("Couldn't read file");

		}
			console.log(readings);
			res.writeHead(200, { "Content-Type" : "application/text" });
			res.end(readings); 
		});
	}
}

function write_sensor_data(readingsToWrite) {

   fs.appendFile(

	"sensorlog.txt",readingsToWrite + '\n', function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("The sesnor Readings were saved!");
	}); 
}


function load_sensor_data(callback) {

   fs.readFile(

	"sensorlog.txt",'utf8',

	function (err, readings) {

		if (err) {

			callback(err);

			return;
		}

	callback(null, readings);
	});
}

//Create http server
var s = http.createServer(handle_incoming_request);
console.log("HTTP Server created");
s.listen(8080);
console.log("listening on port 8080");
console.log("HTTP Server created");
