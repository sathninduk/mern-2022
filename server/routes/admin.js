const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

// config
const Keys = require("../config/Keys");

// models
const Users = require("../models/Users");

// middlewares
const auth = require("../middleware/check-auth");
const validateNewUser = require("../validation/new-user");

router.route('/create-user').post(auth.isAuthenticated, (req, res, next) => {

    if (req.role === "admin") {
        let email = req.body.email;

        const {errors, isValid} = validateNewUser(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // email
        const FROM_EMAIL = Keys.GOOGLE_API_USER;
        const CLIENT_ID = Keys.GOOGLE_API_CLIENT_ID;
        const CLIENT_SECRET = Keys.GOOGLE_API_CLIENT_SECRET;
        const REDIRECT_URL = Keys.GOOGLE_API_REDIRECT_URL;
        const REFRESH_TOKEN = Keys.GOOGLE_API_REFRESH_TOKEN;
        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

        async function registerEmail(tempPassword) {
            // Transporter
            const accessToken = await oAuth2Client.getAccessToken()
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: FROM_EMAIL,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            });

            let mailOptions = {
                from: FROM_EMAIL,
                to: email,
                subject: 'Temporary Password - Surge Global Assignment',
                html:
                    '<h3>Your temporary password for surge global assignment project is: </h3>' +
                    '<h2>' + tempPassword + '</h2>' +
                    '<p>Please login to reset your password </p>'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error.message);
                }
                console.log(info);
            });
        }

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

                const generatedPassword = makePassword(8);
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
                                registerEmail(generatedPassword).then(() => {
                                    return res
                                        .status(200)
                                        .json(response);
                                }).catch(e => {
                                    next(e);
                                    return res
                                        .status(500)
                                        .json("Internal server error occurred! Please try again with a different email address.");
                                })


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
    } else {
        res.status(403).json({server: "Unauthorized"})
    }
})

router.route('/users').get(auth.isAuthenticated, (req, res, next) => {
    if (req.role === "admin") {
        Users.find({accountType: "user"}).sort({"_id": -1}).then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(200).json(null);
            }
        }).catch((err) => {
            next(err);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(403).json({server: "Unauthorized"})
    }
})

module.exports = router;