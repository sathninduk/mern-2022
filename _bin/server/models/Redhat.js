const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RedhatSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
});

const Redhat = mongoose.model("redhat", RedhatSchema);
module.exports = Redhat;