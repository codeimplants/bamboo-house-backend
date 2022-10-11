const mongoose = require("mongoose");

const guestBooking = new mongoose.Schema({
    guest_name: {
        type: String
    },
    guest_phone: {
        type: Number,
        unique: true
    },
    isExisting: {
        type: Boolean,
        default: false
    },
    guestID: {
        type: String
    },
    booking_date: {
        type: Date,
        required: true
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    room_numbers: {
        type: Array,
        required: true
    },
    room_type: {
        type: String,
        required: true
    },
    total_rooms: {
        type: Number,
        required: true
    },
    room_rent: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    advance_amount: {
        type: Number,
        required: true
    },
    balance_amount: {
        type: Number,
        required: true
    },
    extra_mattress: {
        type: Number
    }
});

module.exports = mongoose.model("guestBooking", guestBooking);