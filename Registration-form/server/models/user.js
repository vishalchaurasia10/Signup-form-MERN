const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : String,
    email : { type: String, require: true, index:true, unique:true,sparse:true},
    password : String
})

const USerMOdel = mongoose.model('User',UserSchema);

module.exports = USerMOdel