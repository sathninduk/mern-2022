const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTopicAddInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.topic = !isEmpty(data.topic) ? data.topic : "";
    data.video = !isEmpty(data.video) ? data.video : "";
    data.position = !isEmpty(data.position) ? data.position : "";

    // Name checks
    if (Validator.isEmpty(data.topic)) {
        errors.topic = "Topic Name is required";
    }

    // Name checks
    if (Validator.isEmpty(data.video)) {
        errors.video = "Video URL is required";
    } else if (data.video.startsWith("https://youtu.be/") === true || data.video.startsWith("https://www.youtube.com/embed/") === true || data.video.startsWith("https://www.youtube.com/watch?v=") === true || data.video.startsWith("https://www.youtube.com/embed/") === true || data.video.startsWith("https://vimeo.com/") === true || data.video.startsWith("https://player.vimeo.com/video/") === true || data.video.startsWith("https://drive.google.com/file/")) {
        // okay
    } else {
        errors.video = "Invalid video URL";
    }

    // Position checks
    if (Validator.isEmpty(data.position)) {
        errors.position = "Position field is required";
    } else if (!Validator.isNumeric(data.position)) {
        errors.position = "Invalid position, Please try again"
    } else if (data.position < 0) {
        errors.position = "Invalid position, Please try again"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
