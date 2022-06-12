const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcement = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: Date,
    priority:{
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true
    }
});

const Announcement = mongoose.model('announcement', announcement);
module.exports = Announcement;