const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceRequestSchema = new Schema({
    requestType: String,
    priority: String,
    unit: Number,
    dateCreated: Date,
    details: String,
    status: String,
    requester: String,
    user: String
},{
    collection:'maintenanceRequests'
});

const MaintenanceRequest = mongoose.model('maintenanceRequest', maintenanceRequestSchema)
module.exports = MaintenanceRequest;