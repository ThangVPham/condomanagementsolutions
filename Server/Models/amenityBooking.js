const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amenityBooking = new Schema({
    amenityType: String,
    timeslot: String,
    date: Date,
    fee: Number,
    user: String    
});

const Booking = mongoose.model('amenityBooking', amenityBooking);
module.exports = Booking;