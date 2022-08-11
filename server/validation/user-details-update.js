const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserUpdate(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
    data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required";
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name field is required";
    }

    // Mobile checks
    if (Validator.isEmpty(data.mobile)) {
        errors.mobile = "Mobile number is required";
    } else if (!Validator.isLength(data.mobile, {min: 10})) {
        errors.mobile = "Mobile number must contain at least 10 digits";
    } else if (!Validator.isMobilePhone(data.mobile)) {
        errors.mobile = "Invalid mobile number";
    }

    // DOB Check
    if (Validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = "Date of birth field is required";
    } else if (!Validator.isDate(data.dateOfBirth)) {
        errors.dateOfBirth = "Date of birth is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, {min: 6})) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.isLength(data.password, {max: 30})) {
        errors.password = "Password must be less than 30 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
