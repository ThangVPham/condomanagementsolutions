const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
    primaryOccupant: String,
    dateIn: Date,
    dateOut: Date,
    numOfBdr: String,
    size: Number,
    unitNumber: Number, 
    additionalInfo: String,
    availability: String,
    phone: String   
},{
    collection: 'apartmentUnits'
});

const ApartmentUnit = mongoose.model('apartmentUnit', apartmentSchema);
module.exports = ApartmentUnit;