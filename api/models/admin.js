const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Admin", AdminSchema);
