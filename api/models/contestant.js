const mongoose = require("mongoose");

const ContestantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        match: [
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "email not Valid",
        ]
    },
    region:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    _cheats:{
        type: Number,
        required: true,
        default: 2
    },
    _score:[
        {
            type:Boolean
        }
    ],
    _skips:{
        type:Number,
        required: true,
        default: 3
    },
    _QuestsQ:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ],
    _QuestsR:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ],
    _state:{
        type: String,
        required: true,
        default: "nosub"
    }
    
});
module.exports = mongoose.model("Contestant", ContestantSchema);
