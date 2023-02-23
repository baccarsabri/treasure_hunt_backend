const mongoose = require('mongoose');


var questionSchema = new mongoose.Schema({
   
    label:{
        type: String,
        required: 'This field is required.'
    },
    r1:{
        type:String,
        required: 'This field is required.'  
       
    },
    r2:{
        type: String,
        required: 'This field is required.'  
        
    },
    r3:{
        type: String,
       
    },
    r4:{
        type: String,
        
    },
    correct_answer:{
        type: String,
        required: 'This field is required.' 
    },
   time: {
    type:Number,
    required: 'This field is required.' 
   },
   image:{
    type:String
   },
   points:{
    type:Number,
    required: 'This field is required.' 
   }



},{ timestamps: true });

const question = mongoose.model("question", questionSchema);

module.exports = question;