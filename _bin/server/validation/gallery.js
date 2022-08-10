const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateGalleryInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.body = !isEmpty(data.body) ? data.body : "";

    // Title checks
   /* if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }*/

    // Body checks
    /*if (Validator.isEmpty(data.body)) {
        errors.body = "Body field is required";
    }*/

    // summary checks
    if (!Validator.isLength(data.body, {max: 200})) {
        errors.body = "Body must be less than 200 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
