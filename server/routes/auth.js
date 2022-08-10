const express = require("express");
const router = express.Router();
const Keys = require("../config/Keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require('cors')
const corsOptions = {
    origin: Keys.CORS_URL,
    optionsSuccessStatus: 200
}

// config
// const Keys = require("../config/Keys");

// models
const Users = require("../models/Users");


router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

// Find user by email
    Users.findOne({email: email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user._id,
                    email: user.email,
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
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
            }
        });
    });
});

module.exports = router;