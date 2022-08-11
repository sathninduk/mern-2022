const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNote(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.note = !isEmpty(data.note) ? data.note : "";

    // Name checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    if (Validator.isEmpty(data.note)) {
        errors.note = "Note field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
