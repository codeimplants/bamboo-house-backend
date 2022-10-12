const mongoose = require("mongoose");

const boardMember = new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    hotel_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("boardMember", boardMember);