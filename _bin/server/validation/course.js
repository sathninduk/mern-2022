const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCourseAddInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.summary = !isEmpty(data.summary) ? data.summary : "";
    data.fee = !isEmpty(data.fee) ? data.fee : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // summary checks
    if (Validator.isEmpty(data.summary)) {
        errors.summary = "Summary field is required";
    } else if (!Validator.isLength(data.summary, {max: 1300})) {
        errors.summary = "Summary must be less than 1300 characters";
    }

    // Name checks
    if (Validator.isEmpty(data.video)) {
        // okay
        //} else if (data.video.startsWith("https://youtu.be/") === false && data.video.startsWith("https://www.youtube.com/embed/") === false && data.video.startsWith("https://www.youtube.com/watch?v=") === false && data.video.startsWith("https://www.youtube.com/embed/") === false && data.video.startsWith("https://vimeo.com/") === false && data.video.startsWith("https://player.vimeo.com/video/") === false && data.video.startsWith("https://drive.google.com/file/")) {
    } else if (data.video.startsWith("https://youtu.be/") === true || data.video.startsWith("https://www.youtube.com/embed/") === true || data.video.startsWith("https://www.youtube.com/watch?v=") === true || data.video.startsWith("https://www.youtube.com/embed/") === true || data.video.startsWith("https://vimeo.com/") === true || data.video.startsWith("https://player.vimeo.com/video/") === true || data.video.startsWith("https://drive.google.com/file/")) {
        // okay
    } else {
        errors.video = "Invalid video URL";
    }

    // fee checks
    if (Validator.isEmpty(data.fee)) {
        errors.fee = "Fee field is required";
    } else if (!Validator.isNumeric(data.fee)) {
        errors.fee = "Fee can only contain numbers"
    } else if (data.fee < 0) {
        errors.fee = "Fee cannot be negative"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
