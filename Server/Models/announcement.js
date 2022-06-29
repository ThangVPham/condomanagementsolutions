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
<<<<<<< HEAD
    date: {
        type:Date,
        default: Date.now
    },
=======
    date: Date,
>>>>>>> 17174505b80d5ba118da070e1e97c5ef8c749744
    priority:{
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true
<<<<<<< HEAD
    },
    user:{
        type:String
=======
>>>>>>> 17174505b80d5ba118da070e1e97c5ef8c749744
    }
});

const Announcement = mongoose.model('announcement', announcement);
<<<<<<< HEAD

=======
>>>>>>> 17174505b80d5ba118da070e1e97c5ef8c749744
module.exports = Announcement;