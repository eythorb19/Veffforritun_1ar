const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to db
mongoose.connect(
	'mongodb://localhost/veff',
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
);

const routes = require('./routes')();
app.use('/', routes);

module.exports = app;
