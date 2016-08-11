'use strict';

const Hapi = require('hapi');

//Create a server with a host and port
const server = new Hapi.Server();
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
	method:'GET',
	path:'/fetch-stream',
	handler: function (request, reply) {
		return reply('Hound should fetch files from providers and stream the products to the api');
	}
});

// Start the server
server.start((err) => {
	if (err) {
		throw err; // should add better error handler
	}

	console.log('Server running at:', server.info.uri);
});
