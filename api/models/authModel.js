const mongoose = require("mongoose");

const allUser = new mongoose.Schema({
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

module.exports = mongoose.model("allUser", allUser);