const mongoose = require("mongoose");

const allguest = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    uniqueID_number: {
        type: String,
        required: true,
        unique: true
    },
    uniqueID_url: {
        type: String,
    },
    vehicle_number: {
        type: String,
        required: true,
    },
    room_rent: {
        type: Number,
        required: true,
    },
    room_number: {
        type: String,
        required: true,
    },
    room_type: {
        type: String,
        required: true,
    },
    total_rooms: {
        type: Number,
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    child: {
        type: Number
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    purpose: {
        type: String
    }
});

module.exports = mongoose.model("allguest", allguest);