const Hapi = require('hapi');
const Mongoose = require('mongoose');

// Create a server with a host and port
const server = new Hapi.Server();

var mongoUri = process.env.MONGODB_URI || 'mongodb://YOUR_MONGO_URI';
var serverPort = process.env.PORT || 8080;

Mongoose.connect(mongoUri, function(err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	server.connection({
		port: serverPort
	});

	// GET locations route
	server.route({
		method: 'GET',
		path:'/hello',
		handler: function (request, reply) {
			return reply("Hello, this is my API");
		}
	});

	// Start the server
	server.start((err) => {

		if (err) {
			throw err;
		}
		console.log('Server running at:', server.info.uri);
	});
});