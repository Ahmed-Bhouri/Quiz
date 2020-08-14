const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statment:{
        type: String,
        required: true
    },
    timing:{
        type: Number,
        required: true,
        default:60
    },
    Answers:[
        {
            _id: mongoose.Schema.Types.ObjectId,
            statment:{
                type: String,
                required: true
            },
            valid:{
                _id: mongoose.Schema.Types.ObjectId,
                type: Boolean,
                required: true
            }
            
        }
    ],
});
module.exports = mongoose.model("Question", QuestionSchema);
