const express = require('express');
const router = express.Router();

module.exports = () => {
	const controller = require('./controller');

	// HOME
	router.get('/', controller.home);

	// EVENTS
	router.get('/events', controller.allEvents);
	router.get('/events/:id', controller.getEvent);
	router.post('/events', controller.newEvent);
	router.put('/events/:id', controller.updateEvent);
	router.delete('/events/:id', controller.deleteEvent);
	router.delete('/events', controller.deleteAllEvents);

	// BOOKINGS
	router.get('/events/:id/bookings', controller.allBookings);
	router.get('/events/:id/bookings/:index', controller.getBooking);
	router.post('/events/:id/bookings', controller.newBooking);
	router.put('/events/:id/bookings/:index', controller.updateBooking);
	router.delete('/events/:id/bookings/:index', controller.deleteBooking);
	router.delete('/events/:id/bookings', controller.deleteAllBookings);

	return router;
};
