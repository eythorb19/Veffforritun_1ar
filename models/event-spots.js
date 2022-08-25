const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const BookingSchema = new Schema({
	firstName : { type: String, default: '' },
	lastName  : { type: String, default: '' },
	spots     : { type: Number, default: 0 },
	email     : { type: String, default: '' },
	tel       : { type: String, default: '' },
});

module.exports = mongoose.model('Booking', BookingSchema);

