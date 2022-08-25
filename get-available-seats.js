const getAvailableSeats = async (event) => {
	let available = event.capacity;
	for(let i = 0; i < event.bookings.length; i++){
		available -= event.bookings[i].spots;
	}
	return available;
};

module.exports = getAvailableSeats;
