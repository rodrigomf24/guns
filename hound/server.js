'use strict';

const Hapi = require('hapi');
const Handlers = require('./handlers/entry.js');

const fileUploadPayloadSettings = {
	output:'stream',
	parse:true,
	maxBytes:52428800,
	allow:'multipart/form-data'
};

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
	path:'/api/v1/mapping/extractheaders',
	config:{
		payload:fileUploadPayloadSettings,
		handler: Handlers.mapping.extractHeaders
	}
});

server.route({
	method:'POST',
	path:'/api/v1/mapping/create',
	config: {
		handler: Handlers.mapping.createMapping
	}
});

server.route({
	method:'POST',
	path:'/api/v1/import/fromprovider',
	config: {
		payload: fileUploadPayloadSettings,
		handler: Handlers._import.importFromProvider
	}
});

// Start the server
server.start((err) => {
	if (err) {
		throw err; // should add better error handler
	}

	console.log('Server running at:', server.info.uri);
});
