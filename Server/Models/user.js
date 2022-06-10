const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    username: String,
    password: String,
    email:{
        type:String,
        lowercase:true
    },
    firstname: String,
    lastname:String,
    apartment: String,
    userType: String,
    phone: String,
    emergencyContact: String,
    emergencyNumber: String,
    dateCreated:{
        type:Date,
        default:()=>Date.now(),
        immutable:true
    } 
},{
collection:'users'});

userSchema.pre('save',async function(next){
    try{
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    }catch(err){
        next(err);
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User; 