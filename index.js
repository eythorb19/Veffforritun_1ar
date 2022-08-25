'use strict';
const express = require('express'),
			app     = require('./app');

const server = express(),
			port = 3000 || process.env.PORT;


server.use('/api/v1', app);

server.listen(port, () => {
	console.log('Starting server on port ' + port);
});
