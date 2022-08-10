const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GallerySchema = new Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
    file: {
        type: String,
        required: true
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

const Gallery = mongoose.model("gallery", GallerySchema);
module.exports = Gallery;