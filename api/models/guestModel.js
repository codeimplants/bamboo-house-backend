const mongoose = require("mongoose");

const guest = new mongoose.Schema({
    guest_name: {
        type: String,
        required: true
    },
    guest_phone: {
        type: Number,
        unique: true,
        required: true
    },
    guest_address: {
        type: String,
        required: true
    },
    uniqueID_type: {
        type: String,
        required: true
    },
    uniqueID_url: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("guest", guest);