const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
    fullname: String,
    unitVisit: String,
    dateFrom: Date,
    dateExpire: Date,
    email: String,
    phone: String,
    licenseplate: String,
    vehiclemake:String,
    user: String
});

const Parking = mongoose.model('parking',parkingSchema);
module.exports = Parking;