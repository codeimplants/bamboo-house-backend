const mongoose = require("mongoose");

const guestRegister = new mongoose.Schema({
    isExisting: {
        type: Boolean,
        default: false
    },
    guestID: {
        type: String
    },
    booking_date: {
        type: Date,
        required: true,
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
    extra_mattress: {
        type: Number
    },
    room_rent: {
        type: Number,
        required: true,
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
    vehicle_number: {
        type: String,
        required: true,
    },
    adults: {
        type: [{
            adult_guest_name: {
                type: String
            },
            adult_guest_age: {
                type: Number,
            }
        }],
        required: true
    },
    childrens: {
        type: [{
            children_guest_name: {
                type: String
            },
            children_guest_age: {
                type: Number,
            }
        }],
    },
    purpose: {
        type: String
    }
});

module.exports = mongoose.model("guestRegister", guestRegister);