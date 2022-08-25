//Importing the application to test
let server = require('../index');
let mongoose = require("mongoose");
let Event = require('../models/event');
let Booking = require('../models/booking');

//These are the actual modules we use
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

//Variables used in tests
var expect = chai.expect;

describe('Endpoint tests', () => {
    //###########################
    //These variables contain the ids of the existing event/booking
    //That way, you can use them in you r tests (e.g., to get all bookings for an event)
    //###########################
    let eventId = '';
    let bookingId = '';

    //###########################
    //The beforeEach function makes sure that before each test, 
    //there is exactly one event and one booking (for the existing event).
    //The ids of both are stored in eventId and bookingId
    //###########################
    beforeEach((done) => {
        let event = new Event({ name: "Test Event", capacity: 10, startDate: 1590840000000, endDate: 1590854400000});

        Event.deleteMany({}, (err) => {
            Booking.deleteMany({}, (err) => {
                event.save((err, ev) => {
                    let booking = new Booking({ eventId: ev._id, firstName: "Jane", lastName: "Doe", email: "jane@doe.com", spots: 2 });
                    booking.save((err, book) => {
                        eventId = ev._id;
                        bookingId = book._id;
                        done();
                    });
                });
            });
        });
    });

    //###########################s
    //Write your tests below here
    //###########################

    it("should always pass", function() {
        console.log("Our event has id " + eventId);
        console.log("Our booking has id " + bookingId);
        chai.expect(1).to.equal(1);
    });

    //TEST 1
    //Test GET all events
    it("Should have status 200, be json, return array and have 1 element", function(done) {
        console.log("Testing GET all Events")
        chai.request(server)
            .get('/api/v1/events')
            .end((err,res) => {
                expect(res).to.have.status(200);    //The status code shall be 200
                expect(res).to.be.json; //The response body is in json format
                expect(res.body).to.be.an('array'); //The response body is an array
                expect(res.body.length).to.equal(1);    //The array is 1 element
            done();
            });
    });

    //TEST 2
    //Test GET individual event
    it("Should have status 200, be json, have 8 elements and have properties: description, location, _id, name , capacity, startDate, endDate, bookings with specified values ", function(done) {
        console.log("Testing GET individual event")
        chai.request(server)
            .get('/api/v1/events/' + eventId )
            .end((err,res) => {
                expect(res).to.have.status(200);    
                expect(res).to.be.json; 
                expect(Object.keys(res.body)).to.have.lengthOf(8);    

                //Property and value checks
                expect(res.body).to.have.property('description',"");
                expect(res.body).to.have.property('location', "");
                expect(res.body).to.have.property('_id', String(eventId));
                expect(res.body).to.have.property('name', "Test Event");
                expect(res.body).to.have.property('capacity', 10);
                expect(res.body).to.have.property('startDate');
                expect(res.body).to.have.property('endDate');
                expect(res.body).to.have.property('bookings').and.be.an('array');
                expect(res.body.bookings[0]).to.be.equal(String(bookingId));
            done();
            });
    });
    
    //TEST 3
    //Test POST event
    it("Should have status 200, be json, have 7 elements and have properties: description, location, _id, name, capacity, startDate, endDate with specified values.", function(done) {
        console.log("Testing POST event");
        chai.request(server)
            .post('/api/v1/events')
            .set('content-type', 'application/json')
            .send({
                name: "Test Event", 
                capacity: 10, 
                startDate: "2020-05-30T12:00:00.000Z",
                endDate: "2020-05-30T16:00:00.000Z"
            })
            .end((err, res) => {
                expect(res).to.have.status(201); 
                expect(res).to.be.json;
                expect(Object.keys(res.body)).to.have.lengthOf(7);   
                
                //Property and value checks
                expect(res.body).to.have.property('description',"");
                expect(res.body).to.have.property('location', "");
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name', "Test Event");
                expect(res.body).to.have.property('capacity', 10);
                expect(res.body).to.have.property('startDate');
                expect(res.body).to.have.property('endDate');
            done();
            });
        });

    //TEST 4
    //Test GET all bookings
    it("Should have status 200, be json, have 6 elements and have properties: tel, email, _id, firstName , lastName, spots with specified values", function(done) {
        console.log("Testing GET all bookings for individual event")
        chai.request(server)
            .get('/api/v1/events/' + eventId + '/bookings')
            .end((err,res) => {
                expect(res).to.have.status(200);   
                expect(res).to.be.json; 
                expect(Object.keys(res.body[0])).to.have.lengthOf(6);    
                expect(res.body.length).to.equal(1);   

                //Property and value checks
                expect(res.body[0]).to.have.property('tel',"");
                expect(res.body[0]).to.have.property('email', "jane@doe.com");
                expect(res.body[0]).to.have.property('_id', String(bookingId));
                expect(res.body[0]).to.have.property('firstName', "Jane");
                expect(res.body[0]).to.have.property('lastName', "Doe");
                expect(res.body[0]).to.have.property('spots',2);
            done();
            });
    });

    //TEST 5
    //Test GET individual booking
    it("Should have status 200, be json, have 6 elements and have properties: tel, email, _id, firstName , lastName, spots with specified values" , function(done) {
        console.log("Testing GET individual booking for specific event")
        chai.request(server)
            .get('/api/v1/events/' + eventId + '/bookings/' + bookingId)
            .end((err,res) => {
                expect(res).to.have.status(200);   
                expect(res).to.be.json; 
                expect(Object.keys(res.body)).to.have.lengthOf(6);    

                // //Property and value checks
                expect(res.body).to.have.property('tel',"");
                expect(res.body).to.have.property('email', "jane@doe.com");
                expect(res.body).to.have.property('_id', String(bookingId));
                expect(res.body).to.have.property('firstName', "Jane");
                expect(res.body).to.have.property('lastName', "Doe");
                expect(res.body).to.have.property('spots',2);
            done();
            });
    });


    //TEST 6
    //Test POST booking
    it("Should have status 200, be json, have 6 elements and have properties: tel, email, _id, firstName , lastName, spots", function(done) {
        console.log("Testing POST booking for specific event")
        chai.request(server)
            .post('/api/v1/events/' + eventId + '/bookings')
            .set('content-type', 'application/json')
            .send({
                    tel: "",
                    email: "jane@doe.com",
                    firstName: "Jane",
                    lastName: "Doe",
                    spots: 2
                })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(Object.keys(res.body)).to.have.lengthOf(6);  

                //Property and value checks
                expect(res.body).to.have.property('tel',"");
                expect(res.body).to.have.property('email', "jane@doe.com");
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('firstName', "Jane");
                expect(res.body).to.have.property('lastName', "Doe");
                expect(res.body).to.have.property('spots',2);
            done();
            });
    });

    //TEST 7
    //Successful DELETE request

    it("Should DELETE booking", function(done) {
        console.log("Testing DELETE all events");
        chai.request(server)
            .delete('/api/v1/events/' + eventId + '/bookings/' + bookingId)
            .set('content-type', 'application/json')
            .auth('admin', 'secret')
            .end((err,res) => {
                chai.expect(res).to.have.status(200);
            done();
            });
    });

    //TEST 8
    //Unsuccessful DELETE request
    it("Should return unauthorized when trying to DELETE booking", function(done) {
        console.log("Testing DELETE all events");
        chai.request(server)
            .delete('/api/v1/events/' + eventId + '/bookings/' + bookingId)
            .set('content-type', 'application/json')
            .auth('admin', 'badpassword')
            .end((err,res) => {
                chai.expect(res).to.not.have.status(200);
                done();
            });
    });
});