const mongoose = require('mongoose');


var adminSchema = new mongoose.Schema({
  
    username:{
        type: String
    },
    password:{
        type:String,
    },


   



});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;