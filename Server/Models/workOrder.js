const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workOrderSchema = new Schema({
    requestType: String,
    priority: String,
    requester: String,
    unit: String,
    status: String,
    dateCreated:{
        type:Date,
        default:()=>Date.now(),
        immutable:true
    },
    dateCompleted: Date,
    employee:String,
    details:String,
    request_id: String
},{
    collection:'workOrders'
});

const WorkOrder = mongoose.model('workOrder',workOrderSchema);
module.exports = WorkOrder;