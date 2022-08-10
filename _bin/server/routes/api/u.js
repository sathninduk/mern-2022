const express = require("express");
const router = express.Router();
const fs = require('fs');
const multer = require('multer')
const {v4: uuidV4} = require('uuid');
const cors = require('cors')

// Load User model
// const User = require("../../models/User");
const Courses = require("../../models/Courses");
const Lessons = require("../../models/Lessons");
const Topics = require("../../models/Topics");
const Payments = require("../../models/Payments");

// middleware
const auth = require('../../middleware/check-auth');
const {m} = require("caniuse-lite/data/browserVersions");
const validateChangePasswordInput = require("../../validation/change-pw");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const Past = require("../../models/Past");
const Team = require("../../models/Team");
const Redhat = require("../../models/Redhat");
const Gallery = require("../../models/Gallery");
const Verification = require("../../models/Verifications");
const nodemailer = require("nodemailer");
const keys = require("../../config/keys");
const Token = require("../../models/Tokens");

// validation
//const validateCourseInput = require("../../validation/course");

const CORS_URL = require("../../config/keys").CORS_URL;
// CORS
const corsOptions = {
    origin: CORS_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Google APIs
const {google} = require("googleapis");
const CLIENT_ID = keys.GOOGLE_API_CLIENT_ID;
const CLIENT_SECRET = keys.GOOGLE_API_CLIENT_SECRET;
const REDIRECT_URL = keys.GOOGLE_API_REDIRECT_URL;
const REFRESH_TOKEN = keys.GOOGLE_API_REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// multer
const DIR = 'public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const exploded_name = file.originalname.split(".")//toLowerCase().split(' ').join('-');
        let ext = exploded_name[exploded_name.length - 1];
        const newName = uuidV4() + '-' + new Date().getTime() + '.' + ext;
        cb(null, newName)
    }
});


// courses
// get courses information
router.route('/courses').get(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 3) {
        Courses.find({status: 1}).sort({name: 1}).then((data) => {
            res.status(200).json(data)
        }).catch((error) => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// public courses
// get courses information publicly
router.route('/pub-courses').get((req, res, next) => {
    Courses.find({status: 1}, (error, data) => {
        if (error) {
            return (error)
        } else {
            res.json(data)
            //next()
        }
    }).sort({name: 1})
})

// get courses information
router.route('/course').get(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 3) {

        Courses.find({_id: {$eq: req.query.course}, status: 1}).limit(1).then(data => {
            res.json(data)
        }).catch(err => {
            console.log(err);
        })

    }
})

// get courses information
router.route('/m-course').get(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 3) {
        Payments.find({course: {$eq: req.query.course}, user_id: {$eq: req.id}, status: 1}, (error1, data1) => {
            if (error1) {
                return (error1)
            } else {
                if (data1[0]) {
                    Courses.find({_id: {$eq: req.query.course}, status: 1}, (error, data) => {
                        if (error) {
                            return (error)
                        } else {
                            res.json(data)
                            //next()
                        }
                    }).limit(1)
                } else {
                    Courses.find({_id: {$eq: req.query.course}, fee: 0, status: 1}, (error4, data4) => {
                        if (error4) {
                            return (error4)
                        } else {
                            if (data4[0]) {
                                res.json(data4)
                                //next()
                            } else {
                                res.status(404)
                            }
                        }
                    }).limit(1)
                }
            }
        }).limit(1)
    }
})

let upload = multer({
    storage: storage,
    limits: {fileSize: 40000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// course payment
router.route('/payment').post(cors(corsOptions), auth.isAuthenticated, upload.single('slip'), (req, res, next) => {
    if (req.role == 3) {

        let fileName = req.file.filename;
        let mime = req.file.mimetype;
        let size = req.file.size;

        if (size <= 40000000) {
            if (mime == 'image/jpeg' || mime == 'image/jpg' || mime == 'image/png') {


                Courses.findOne({_id: {$eq: req.body.course}}).then(async courseData => {

                    let course_name = courseData.name;

                    const addPayment = new Payments({
                        course: req.body.course,
                        user: req.name,
                        tel: req.tel,
                        email: req.email,
                        user_id: req.id,
                        file: fileName,
                        date: new Date()
                    });


                    // register email function
                    async function registerEmail() {

                        // Transporter
                        const accessToken = await oAuth2Client.getAccessToken()
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: 'OAuth2',
                                user: keys.GOOGLE_API_USER,
                                clientId: CLIENT_ID,
                                clientSecret: CLIENT_SECRET,
                                refreshToken: REFRESH_TOKEN,
                                accessToken: accessToken
                            }
                        });

                        let mailOptions = {
                            from: keys.GOOGLE_API_USER,
                            to: keys.PAYMENT_REPORT_EMAIL,
                            subject: 'New payment request - VoTechno Institute',
                            html:
                                '<div style="' +
                                'background-color: #f3f4fa;' +
                                'width: 95%;' +
                                'display: flex;' +
                                'justify-content: center;' +
                                'align-items: center;' +
                                'text-align: center;' +
                                'flex-direction: column;' +
                                'padding: 100px 30px 50px 30px;' +
                                'border-radius: 10px;' +
                                '">' +
                                '<div style="width: 100%; min-height: 400px;">' +
                                '<img src="https://ipfs.io/ipfs/QmYMcWvkZdxiMeayUgWpY36QsZ8SLk6pyXPEBS2NS8jhYT" style="width: 200px" alt="VoTechno Logo">' +
                                '<div>' +
                                '<h2>Hello, ' + "Admin" + '</h2>' +
                                '<h1>' +
                                'New payment request' +
                                '</h1>' +
                                '<p>Name: ' + req.name + '</p>' +
                                '<p>Course: ' + course_name + '</p>' +
                                '<br>' +
                                '<a ' +
                                'style="' +
                                'background-color: #007FFF; ' +
                                'border-radius: 10px; ' +
                                'width: 150px; ' +
                                'height: 48px; ' +
                                'color: #fff;' +
                                'cursor: pointer;' +
                                'padding: 10px 30px;' +
                                'text-decoration: none;' +
                                '" ' +
                                'href="' + keys.PW_URL + 'login"' +
                                //'data-saferedirecturl="https://www.google.com/url?q=' + keys.PW_URL + 'forgot-change-password?id=' + randId + '"' +
                                '>' +
                                '' + '<b>Next step</b>' + '' +
                                '</a>' +
                                '<br>' +
                                '<br>' +
                                '<p style="color: rgba(0,0,0,0.5); font-size: 11px;">©' + new Date().getFullYear() + ' VoTechno Institute | Powered by <a href="https://www.coduza.com">CODUZA</a></p>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                        };

                        await transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error.message);
                            }
                            console.log('success');
                        });
                    }


                    //Verification.findOne({email: {$eq: req.email}}).then(async user => {
                    User.findOne({email: {$eq: req.email}, verification: {$eq: 1}, status: {$eq: 1}, role: {$eq: 3}}).then(async user => {
                        if (user) {
                            addPayment.save()
                                .then(async response => {

                                    await registerEmail().then(r => {
                                        console.log("Full success")
                                        res.status(200).json(r)
                                    }).catch(errkk => {
                                        console.log(errkk);
                                        return res
                                            .status(404)
                                            .json({errorsendingemail: "Error while sending email"});
                                    })
                                    console.log("saved");

                                }).catch(err => {
                                console.log(err);
                                return res
                                    .status(404)
                                    .json({internalError: "Error saving payment"});
                            })
                        } else {
                            console.log("no verification");
                        }
                    }).catch(err34 => {
                        return res
                            .status(404)
                            .json({file: "Invalid file type"});
                    })


                }).catch(err38 => {
                    return res
                        .status(404)
                        .json({error: err38});
                })


            } else {
                return res
                    .status(404)
                    .json({file: "Invalid file type"});
            }
        } else {
            return res
                .status(404)
                .json({file: "The file size should be less than 5MB"});
        }
    }
})
// get payment check
router.route('/payment-check').get(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 3) {
        Payments.find({course: {$eq: req.query.course}, user_id: {$eq: req.id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
                //next()
            }
        }).limit(1)
    }
})

// delete payment
router.route('/delete-payment').post(cors(corsOptions), auth.isAuthenticated, async (req, res, next) => {
    if (req.role == 3) {
        let course = req.body.course;
        await Payments.find({course: {$eq: course}, user_id: {$eq: req.id}}).limit(1).then(async data => {
            let file = data[0].file


            await Courses.findOne({_id: {$eq: course}}).then(async courseData => {

                let course_name = courseData.name;

                // register email function
                async function registerEmail() {

                    // Transporter
                    const accessToken = await oAuth2Client.getAccessToken()
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: keys.GOOGLE_API_USER,
                            clientId: CLIENT_ID,
                            clientSecret: CLIENT_SECRET,
                            refreshToken: REFRESH_TOKEN,
                            accessToken: accessToken
                        }
                    });

                    let mailOptions = {
                        from: keys.GOOGLE_API_USER,
                        to: keys.PAYMENT_REPORT_EMAIL,
                        subject: 'Payment request cancellation notification - VoTechno Institute',
                        html:
                            '<div style="' +
                            'background-color: #f3f4fa;' +
                            'width: 95%;' +
                            'display: flex;' +
                            'justify-content: center;' +
                            'align-items: center;' +
                            'text-align: center;' +
                            'flex-direction: column;' +
                            'padding: 100px 30px 50px 30px;' +
                            'border-radius: 10px;' +
                            '">' +
                            '<div style="width: 100%; min-height: 400px;">' +
                            '<img src="https://ipfs.io/ipfs/QmYMcWvkZdxiMeayUgWpY36QsZ8SLk6pyXPEBS2NS8jhYT" style="width: 200px" alt="VoTechno Logo">' +
                            '<div>' +
                            '<h2>Hello, ' + "Admin" + '</h2>' +
                            '<h1>' +
                            'Payment request <b>cancelled</b> by user' +
                            '</h1>' +
                            '<p>Name: ' + req.name + '</p>' +
                            '<p>Course: ' + course_name + '</p>' +
                            '<br>' +
                            '<a ' +
                            'style="' +
                            'background-color: #007FFF; ' +
                            'border-radius: 10px; ' +
                            'width: 150px; ' +
                            'height: 48px; ' +
                            'color: #fff;' +
                            'cursor: pointer;' +
                            'padding: 10px 30px;' +
                            'text-decoration: none;' +
                            '" ' +
                            'href="' + keys.PW_URL + 'login"' +
                            //'data-saferedirecturl="https://www.google.com/url?q=' + keys.PW_URL + 'forgot-change-password?id=' + randId + '"' +
                            '>' +
                            '' + '<b>Next step</b>' + '' +
                            '</a>' +
                            '<br>' +
                            '<br>' +
                            '<p style="color: rgba(0,0,0,0.5); font-size: 11px;">©' + new Date().getFullYear() + ' VoTechno Institute | Powered by <a href="https://www.coduza.com">CODUZA</a></p>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                    };

                    await transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('success');
                    });
                }


            await Payments.deleteOne({course: {$eq: course}, user_id: {$eq: req.id}}).then(async data => {
                res.json(data)
                await fs.unlink(DIR + "/" + file, async err => {
                    if (err) console.log(err);
                    else {


                        await registerEmail().then(r77 => {
                            console.log("Full success")
                            res.status(200).json(r77)
                        }).catch(errkk => {
                            console.log(errkk);
                            return res
                                .status(404)
                                .json({errorsendingemail: "Error while sending email"});
                        })


                        console.log("File Deleted");
                    }
                });
            }).catch(error => {
                return (error)
            })

            }).catch(err96 => {
                res.status(404).json(err96)
            })


        }).catch(err => {
            res.status(404).json(err)
        })
    }
})


// Lessons
// get lessons information
router.route('/lessons').get(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 3) {
        Payments.find({course: {$eq: req.query.course}, user_id: {$eq: req.id}, status: 1}, (error1, data1) => {
            if (error1) {
                return (error1)
            } else {
                if (data1[0]) {
                    let course = req.query.course;
                    Lessons.find({course: {$eq: course}}, (error, data) => {
                        if (error) {
                            return (error)
                        } else {
                            res.json(data)
                            //next()
                        }
                    }).sort({position: 1})
                } else {
                    Courses.find({_id: {$eq: req.query.course}, fee: 0, status: 1}, (error4, data4) => {
                        if (error4) {
                            return (error4)
                        } else {
                            if (data4[0]) {
                                Lessons.find({course: {$eq: req.query.course}}, (error6, data6) => {
                                    if (error6) {
                                        return (error6)
                                    } else {
                                        if (data6[0]) {
                                            res.json(data6)
                                            //next()
                                        } else {
                                            res.status(404)
                                        }
                                    }
                                }).sort({position: 1})
                            } else {
                                res.status(404)
                            }
                        }
                    }).limit(1)
                }
            }
        }).limit(1)
    }
})


// Topics
// get topic information
router.route('/topics').get(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 3) {
        Payments.find({course: {$eq: req.query.course}, user_id: {$eq: req.id}, status: 1}, (error1, data1) => {
            if (error1) {
                return (error1)
            } else {
                if (data1[0]) {
                    let course = req.query.course;
                    Topics.find({course: {$eq: course}}, (error, data) => {
                        if (error) {
                            return (error)
                        } else {
                            res.json(data)
                            //next()
                        }
                    }).sort({position: 1})
                } else {
                    Courses.find({_id: {$eq: req.query.course}, fee: 0, status: 1}, (error4, data4) => {
                        if (error4) {
                            return (error4)
                        } else {
                            if (data4[0]) {
                                let course = req.query.course;
                                Topics.find({course: {$eq: course}}, (error, data) => {
                                    if (error) {
                                        return (error)
                                    } else {
                                        res.json(data)
                                        //next()
                                    }
                                }).sort({position: 1})


                            } else {
                                res.status(404)
                            }
                        }
                    })
                }
            }
        }).limit(1)
    }
})

// get first topic information
router.route('/topics/first').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 3) {
        let course = req.query.course;
        Payments.find({course: {$eq: req.query.course}, user_id: {$eq: req.id}, status: 1}, (error1, data1) => {
            if (error1) {
                return (error1)
            } else {
                if (data1[0]) {
                    Lessons.find({course: {$eq: course}}).sort({position: 1}).limit(1).then(data11 => {
                        let lesson = data11[0]._id
                        Topics.find({lesson: {$eq: lesson}}).sort({position: 1}).limit(1).then(data12 => {
                            res.status(200).json(data12[0]._id)
                        }).catch(err12 => {
                            res.status(404).json(err12)
                        })
                    }).catch(err11 => {
                        res.status(404).json(err11)
                    })
                } else {
                    Courses.find({_id: {$eq: req.query.course}, fee: 0, status: 1}, (error4, data4) => {
                        if (error4) {
                            return (error4)
                        } else {
                            if (data4[0]) {
                                Lessons.find({course: {$eq: course}}).sort({position: 1}).limit(1).then(data11 => {
                                    let lesson = data11[0]._id
                                    Topics.find({lesson: {$eq: lesson}}).sort({position: 1}).limit(1).then(data12 => {
                                        res.status(200).json(data12[0]._id)
                                    }).catch(err12 => {
                                        res.status(404).json(err12)
                                    })
                                }).catch(err11 => {
                                    res.status(404).json(err11)
                                })
                            } else {
                                res.status(404)
                            }
                        }
                    })
                }
            }
        }).limit(1)
    }
})

// get first lesson information
router.route('/lessons/first').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 3) {
        let course = req.query.id;
        Payments.find({course: {$eq: req.query.id}, user_id: {$eq: req.id}, status: 1}, (error1, data1) => {
            if (error1) {
                return (error1)
            } else {
                if (data1[0]) {
                    Lessons.find({course: {$eq: course}}).sort({position: 1}).limit(1).then(data => {
                        res.json(data)
                    }).catch(error => {
                        return (error)
                    })
                } else {
                    res.status(404)
                }
            }
        }).limit(1)
    }
})

// get last topic information
router.route('/topics/last').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 3) {
        let lesson = req.query.id;
        Topics.find({lesson: {$eq: lesson}}).sort({position: -1}).limit(1).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(404).json(err)
        })
    }
})

// get last lesson information
router.route('/lessons/last').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 3) {
        let course = req.query.id;
        Payments.find({course: {$eq: req.query.id}, user_id: {$eq: req.id}, status: 1}, (error1, data1) => {
            if (error1) {
                return (error1)
            } else {
                if (data1[0]) {
                    Lessons.find({course: {$eq: course}}).sort({position: -1}).limit(1).then(data => {
                        res.json(data)
                    }).catch(error => {
                        return (error)
                    })
                } else {
                    res.status(404)
                }
            }
        }).limit(1)
    }
})

// get display topic information
router.route('/topic').get(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 3) {
        Payments.find({course: {$eq: req.query.course}, user_id: {$eq: req.id}, status: 1}, (error1, data1) => {
            if (error1) {
                return (error1)
            } else {
                if (data1[0]) {
                    let topic = req.query.topic;
                    Topics.find({_id: {$eq: topic}}, (error, data) => {
                        if (error) {
                            return (error)
                        } else {
                            res.json(data)
                            //next()
                        }
                    }).limit(1)
                } else {
                    Courses.find({_id: {$eq: req.query.course}, fee: 0, status: 1}, (error4, data4) => {
                        if (error4) {
                            return (error4)
                        } else {
                            if (data4[0]) {
                                let topic = req.query.topic;
                                Topics.find({_id: {$eq: topic}}, (error, data) => {
                                    if (error) {
                                        return (error)
                                    } else {
                                        res.json(data)
                                        //next()
                                    }
                                }).limit(1)
                            } else {
                                res.status(404)
                            }
                        }
                    })
                }
            }
        }).limit(1)
    }
})

// resend verification
router.post("/resend-verification", cors(corsOptions), auth.isAuthenticated, (req, res) => {

    console.log(req.email);

    Verification.findOne({email: {$eq: req.email}}).then(async user => {
        if (!user) {
            console.log("Invalid verification link");
            return res.status(400).json({email: "Invalid verification link"});
        } else {

            let randId = user.key;
            let email = req.email;
            console.log(email);

            User.findOne({email: {$eq: email}}).then(async userData => {

                // register email function
                async function registerEmail() {

                    // Transporter
                    const accessToken = await oAuth2Client.getAccessToken()
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: keys.GOOGLE_API_USER,
                            clientId: CLIENT_ID,
                            clientSecret: CLIENT_SECRET,
                            refreshToken: REFRESH_TOKEN,
                            accessToken: accessToken
                        }
                    });

                    let mailOptions = {
                        from: keys.GOOGLE_API_USER,
                        to: email,
                        subject: 'Email verification - VoTechno Institute',
                        html:
                            '<div style="' +
                            'background-color: #f3f4fa;' +
                            'width: 95%;' +
                            'display: flex;' +
                            'justify-content: center;' +
                            'align-items: center;' +
                            'text-align: center;' +
                            'flex-direction: column;' +
                            'padding: 100px 30px 50px 30px;' +
                            'border-radius: 10px;' +
                            '">' +
                            '<div style="width: 100%; min-height: 400px;">' +
                            '<img src="https://ipfs.io/ipfs/QmYMcWvkZdxiMeayUgWpY36QsZ8SLk6pyXPEBS2NS8jhYT" style="width: 200px" alt="VoTechno Logo">' +
                            '<div>' +
                            '<h2>Hello, ' + userData.name + '</h2>' +
                            '<p>' +
                            'Just click below to verify that you are a part of <b>VoTechno Institute</b>' +
                            '</p>' +
                            '<br>' +
                            '<a ' +
                            'style="' +
                            'background-color: #007FFF; ' +
                            'border-radius: 10px; ' +
                            'width: 150px; ' +
                            'height: 48px; ' +
                            'color: #fff;' +
                            'cursor: pointer;' +
                            'padding: 10px 30px;' +
                            'text-decoration: none;' +
                            '" ' +
                            'href="' + keys.PW_URL + 'verify-email/' + randId + '"' +
                            //'data-saferedirecturl="https://www.google.com/url?q=' + keys.PW_URL + 'forgot-change-password?id=' + randId + '"' +
                            '>' +
                            '' + '<b>Verify</b>' + '' +
                            '</a>' +
                            '<br>' +
                            '<br>' +
                            '<br>' +
                            '<p style="color: rgba(0,0,0,0.8); font-size: 11px;">in case of the verification button does not work, Please manually copy and paste <br>the following link into your web browser</p>' +
                            '<p style="color: rgba(0,0,0,0.8); font-size: 11px;">' + keys.PW_URL + 'verify-email/' + randId + '</p>' +
                            '<br>' +
                            '<p style="color: rgba(0,0,0,0.5); font-size: 11px;">If you did not register with this email on <a href="https://www.votechno.lk">votechno.lk</a>, You can safely ignore this email. <br>Only a person with access to your email can create an account on behalf of this email.</p>' +
                            '<p style="color: rgba(0,0,0,0.5); font-size: 11px;">©' + new Date().getFullYear() + ' VoTechno Institute | Powered by <a href="https://www.coduza.com">CODUZA</a></p>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('success');
                    });
                }


                registerEmail().then(r => {
                    return res
                        .status(200)
                        .json({requestSent: "Password recovery link sent, Please check your email"});
                }).catch(err => {
                    return res
                        .status(404)
                        .json({errorsendingemail: "Error while sending email"});
                })

            }).catch(err33 => {
                console.log(err33);
            })

        }
    });
});

// user/settings - change password
router.route('/settings/password').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 3) {

        const {errors, isValid} = validateChangePasswordInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }


        let id = req.id;
        let curPassword = req.body.curPassword;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        if (password == confirmPassword) {


            // Find user by email
            User.findOne({_id: {$eq: id}, status: 1}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({curPassword: "User not found"});
                }
                // Check password
                bcrypt.compare(curPassword, user.password).then(isMatch => {
                    if (isMatch) {

                        // Hash password before saving in database
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) throw err;
                                password = hash;
                                User.updateOne({_id: id}, {
                                    password: password
                                }).then(async data1 => {
                                    res.status(200).json(data1);
                                }).catch(err1 => {
                                    res.status(404).json(err1)
                                })
                            });
                        });

                    } else {
                        return res
                            .status(400)
                            .json({curPassword: "Password incorrect"});
                    }
                });
            });
        } else {
            res.status(400).json({confPassword: "Password mismatch"});
        }
    }
})


// past
router.route('/home/past').get(cors(corsOptions), (req, res) => {
    Past.find({}).then((data3) => {
        res.status(200).json(data3)
    }).catch((error3) => {
        console.log(error3);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })
})


// team
router.route('/home/team').get(cors(corsOptions), (req, res) => {
    Team.find({}).then((data3) => {
        res.status(200).json(data3)
    }).catch((error3) => {
        console.log(error3);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })
})

// on-demand
router.route('/home/courses').get(cors(corsOptions), (req, res) => {

    Courses.find({status: 1}).limit(6).sort({onDemand: -1}).then((data3) => {
        res.status(200).json(data3)
    }).catch((error3) => {
        console.log(error3);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })

})

// redhat
router.route('/redhat').get(cors(corsOptions), (req, res) => {

    Redhat.find({}).sort({title: 1}).then((data3) => {
        res.status(200).json(data3)
    }).catch((error3) => {
        console.log(error3);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })

})

// gallery
router.route('/gallery').get(cors(corsOptions), (req, res) => {

    Gallery.find({}).sort({date: -1}).then((data3) => {
        res.status(200).json(data3)
    }).catch((error3) => {
        console.log(error3);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })

})

// token delete
router.route('/token-logout').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    let token = req.headers['x-access-token'];
    Token.deleteOne({user: {$eq: req.id}, token: {$eq: token}}).then((data3) => {
        res.status(200).json(data3)
    }).catch((error3) => {
        console.log(error3);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })

})


module.exports = router;