const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

module.exports = mongoose.model("admin", admin);