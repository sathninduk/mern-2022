const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    mobile: {
      type: Number,
    },
    status: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;