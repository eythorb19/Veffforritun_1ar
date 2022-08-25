const mongoose = require('mongoose');
const Event = require('./models/event');
const Booking = require('./models/booking');
const getAvailableSeats = require('./get-available-seats');

exports.home = (req, res, next) => {
	console.log('someone made a root query');
	res.json({ message: 'ok, hello!' });
};

/** EVENTS **/
exports.allEvents = async (req, res) => {
	const events = await Event.find({}, (err, events) => {
		if(err){{ res.status(500).json({ error: err }); return }
		return events;
	});
	res.status(200).json(events);
};

exports.getEvent = async (req, res) => {
	const id = req.params.id;
	const singleEvent = await Event.findById(id, (err, event) => {
		if(err){ res.status(500).json({ error: err }); return }
		return event;
	});
	if(singleEvent === null){
		res.status(404).json({ message: 'Event not found.' });
		return;
	}
	res.status(200).json(singleEvent);
}

exports.newEvent = async (req, res) => {
	console.log(req.body);
	if(parseInt(req.body.capacity) <= 0){
		res.status(500).json({ message: 'Capacity must be 1 or more.'});
		return;
	}
	const newEvent = await Event.create(req.body, (err, event) => {
		if(err){ res.status(500).json({ error: err }); return }
		return event;
	});
	res.status(201).json(newEvent);
};

exports.updateEvent = async (req, res) => {
	const id = req.params.id;
	const updatedEvent = await Event.updateOne({ _id: id }, req.body, (err, event) => {
		/** gera allt svona **/
		if(err){ res.status(500).json({ error: err }); return }
		return event;
	});
	res.status(201).json(updatedEvent);
};

exports.deleteEvent = async (req, res) => {
	const id = req.params.id;
	const deletedEvent = await Event.deleteOne({ _id: id }, (err, event) => {
		if(err){ res.status(500).json({ error: err }); return }
		return event;
	});
	res.status(200).json(deletedEvent);;
};

exports.deleteAllEvents = async (req, res) => {
	const deletedEvents = await Event.deleteMany({}, (err, events) => {
		if(err){{ res.status(500).json({ error: err }); return }
		return events;
	});
	res.status(200).json(deletedEvents);
};

/** BOOKINGS **/
exports.allBookings = async (req, res) => {
	const id = req.params.id;
	const singleEvent = await Event.findById(id, (err, event) => {
		if(err){ res.status(500).json({ error: err }); return }
		return event;
	});
	res.status(200).json(singleEvent.bookings);
};

exports.getBooking = async (req, res) => {
	const id = req.params.id;
	const index = parseInt(req.params.index);

	const singleEvent = await Event.findById(id, (err, event) => {
		if(err){{ res.status(500).json({ error: err }); return }
		return event;
	});
	if(singleEvent.bookings[index] === undefined){
		res.status(404).json({ message: 'Booking not found.'});
		return;
	}

	res.json(singleEvent.bookings[index]);
};

exports.newBooking = async (req, res, next) => {
	const id = req.params.id;
	const singleEvent = await Event.findById(id, (err, event) => {
		if(err){ { res.status(500).json({ error: err }); return }
		return event;
	});
	const availableSeats = await getAvailableSeats(singleEvent);
	const newBooking = new Booking(req.body);
	if(newBooking.spots > availableSeats){
		res.status(500).json({ message: 'Not available seats for this booking.' });
		return;
	}
	if(newBooking.spots <= 0){
		res.status(500).json({ message : 'Spots must be 1 or more' });
		return;
	}
	singleEvent.bookings.push(newBooking);

	await Event.updateOne({ _id: singleEvent._id }, singleEvent, (err) => {
		if(err){ res.status(500).json({ error: err }); return }
	});
	res.status(201).json(newBooking);
};

exports.updateBooking = async (req, res) => {
	const id = req.params.id;
	const index = parseInt(req.params.index);

	const singleEvent = await Event.findById(id, (err, event) => {
		if(err){ res.status(500).json({ error: err }); return }
		return event;
	});

	const newBooking = new Booking(req.body);
	singleEvent.bookings[index] = newBooking;

	await Event.updateOne({ _id: singleEvent._id }, singleEvent, (err) => {
		if(err){ res.status(500).json({ error: err }); return }
	});
	res.status(201).json(newBooking);
};

exports.deleteBooking = async (req, res) => {
	const id = req.params.id;
	const index = parseInt(req.params.index);

	const singleEvent = await Event.findById(id, (err, event) => {
		if(err){{ res.status(500).json({ error: err }); return }
		return event;
	});
	const deletedEvent = singleEvent.bookings.splice(index, 1);

	await Event.updateOne({ _id: singleEvent._id }, singleEvent, (err) => {
		if(err){ res.status(500).json({ error: err }); return }
	});
	res.status(201).json(deletedEvent);
};

exports.deleteAllBookings = async (req, res) => {
	const id = req.params.id;
	const index = parseInt(req.params.index);

	const singleEvent = await Event.findById(id, (err, event) => {
		if(err){{ res.status(500).json({ error: err }); return }
		return event;
	});
	const deletedEvents = singleEvent.bookings
	singleEvent.bookings = [];

	await Event.updateOne({ _id: singleEvent._id }, singleEvent, (err) => {
		if(err){{ res.status(500).json({ error: err }); return }
	});
	res.status(201).json(deletedEvents);
};
