'use strict';

const Hapi = require('hapi');

const HoundReader = require('./modules/CsvReader.js');
const HoundTools = require('./modules/Tools.js');

//Create a server with a host and port
const server = new Hapi.Server({debug:{request:['error']}});
server.connection({
	host:'localhost',
	port:8888
});

//Routes *Move to route.js file and reference through require
server.route({
	method:'GET',
	path:'/',
	handler: function (request, reply) {
		return reply('Hound v0.0.1');
	}
});

server.route({
	method:'POST',
	path:'/importfromprovider',
	config: {
		payload: {
			output:'stream',
			parse:true,
			maxBytes:52428800,
			allow:'multipart/form-data'
		},
		handler: function (request, reply) {
			HoundTools.handleFileUpload(request.payload).then(function(filepath) {
				if(filepath) {
					HoundReader.getData(filepath).then(function(response) {
						HoundTools.cleanDataFromObject(response).then(function(response) {
							reply(response);
						}, function(err) { reply(err); });
	                	        }, function(err) {
        		                        console.log(err);
						reply(JSON.stringify(err));
	        	                });
				}				
			}, function(err) {
				console.log(err);
				reply(JSON.stringify(err));
			});
		}
	}
});

// Start the server
server.start((err) => {
	if (err) {
		throw err; // should add better error handler
	}

	console.log('Server running at:', server.info.uri);
});
