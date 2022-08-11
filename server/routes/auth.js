const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require('cors')

// config
const Keys = require("../config/Keys");

const corsOptions = {
    origin: Keys.CORS_URL,
    optionsSuccessStatus: 200
}

// validation
const validateLoginInput = require("../validation/login");

// models
const Users = require("../models/Users");

router.route('/login').post((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const {errors, isValid} = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

// Find user by email
    Users.findOne({email: email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({email: "Email not found"});
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user._id,
                    email: user.email,
                    status: user.status,
                    role: user.accountType
                };

                // Sign token
                const token = jwt.sign(
                    payload,
                    Keys.JWT_SECRET, {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {

                        if (err) {
                            throw err
                        } else {
                            res.status(200).json(token)
                        }

                    }
                );

            } else {
                return res
                    .status(403)
                    .json({password: "Incorrect Password"});
            }
        }).catch(error => {
            next(error);
            return res
                .status(500)
                .json({server: "Something went wrong"});
        });
    }).catch(error => {
        next(error);
        return res
            .status(500)
            .json({server: "Something went wrong"});
    })
});

module.exports = router;