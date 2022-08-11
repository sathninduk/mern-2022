const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Notes = mongoose.model("notes", NotesSchema);
module.exports = Notes;