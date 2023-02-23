const mongoose = require('mongoose');
const { Schema } = mongoose;

const QRependu = new Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: 'This field is required.'
        },
        statut:{
            type:Boolean,
        },
        etat:
        {
            type:String,
        },
    },
    { timestamps: true }
  );
  
var participantSchema = new mongoose.Schema({
   
    username:{
        type: String
    },
    password:{
        type:String,
    },
    score:{
        type:Number,
    },
    questions:{type:[QRependu] , default: []}

   



},
{ timestamps: true });

const participant = mongoose.model("participant", participantSchema);

module.exports = participant;