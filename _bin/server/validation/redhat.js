const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRedhatAddInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.body = !isEmpty(data.body) ? data.body : "";

    // Title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    // Summary checks
    //if (Validator.isEmpty(data.body)) {
    //  errors.body = "Summary field is required";
    //} else
    if (!Validator.isLength(data.body, {max: 200})) {
        errors.body = "Summary must be less than 200 characters";
    }

    // Link
    // Title checks
    if (!Validator.isEmpty(data.link)) {
        if (!Validator.isURL(data.link)) {
            errors.link = "Link field must be an URL";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
