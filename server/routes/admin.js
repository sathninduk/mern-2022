const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// config
const Keys = require("../config/Keys");

// models
const Users = require("../models/Users");

// middlewares
const auth = require("../middleware/check-auth");

router.route('/create-user').post(auth.isAuthenticated, (req, res) => {
    let email = req.body.email;

    // existing user check
    Users.findOne({email: email}).then(user => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        } else {

            // generate password
            function makePassword(length) {
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return result;
            }
            let generatedPassword = makePassword(8);
            console.log(generatedPassword);

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(generatedPassword, salt, (err, hash) => {
                    if (err) throw err;

                    // save at DB
                    const addUser = new Users({
                        email: email,
                        password: hash
                    });
                    addUser.save()
                        .then(response => {
                            return res
                                .status(200)
                                .json(response);
                        }).catch(err => {
                        console.log(err);
                        console.log(err);
                        return res
                            .status(404)
                            .json({internalError: "Unexpected error occurred! Please try again."});
                    })

                });
            });
        }
    })
})

module.exports = router;