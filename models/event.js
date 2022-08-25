const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Booking = require('./booking');

const EventSchema = new Schema({
	name        : { type: String, default: '' },
	description : { type: String, default: '' },
	location    : { type: String, default: '' },
	capacity    : { type: Number, default: 0 },
	startDate   : { type: Date, default  : Date.now() },
	endDate     : { type: Date, default  : Date.now() },
	bookings    : [ Booking.schema ],
});



module.exports = mongoose.model('Event', EventSchema);
