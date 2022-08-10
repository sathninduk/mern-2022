const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/User");
const Courses = require("../../models/Courses");
const Lessons = require("../../models/Lessons");
const Topics = require("../../models/Topics");
const Payments = require("../../models/Payments");
const Assign = require("../../models/Assign");
const Team = require("../../models/Team");
const Past = require("../../models/Past");
const Redhat = require("../../models/Redhat");
const Gallery = require("../../models/Gallery");

// middleware
const auth = require('../../middleware/check-auth');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const cors = require('cors')

// validation
const validateRegisterInput = require("../../validation/register");
const validateChangePasswordInput = require("../../validation/change-pw");
const validateCourseAddInput = require("../../validation/course");
const validateZoomInput = require("../../validation/zoom");
const validateLessonAddInput = require("../../validation/newLesson");
const validateLessonEditInput = require("../../validation/editLesson");
const validateTopicAddInput = require("../../validation/newTopic");
const validateTopicEditInput = require("../../validation/editTopic");
const validateEditUserInput = require("../../validation/edit-user");
const validateAssignNewInput = require("../../validation/assign");
const validateTeamInput = require("../../validation/team");
const validatePastInput = require("../../validation/past");
const validateRedhatAddInput = require("../../validation/redhat");
const validateGalleryInput = require("../../validation/gallery");
//const validateTopicVideoInput = require("../../validation/topicVideo");

const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const {data} = require("browserslist");

const multer = require('multer')
const {v4: uuidV4} = require('uuid');
const Verification = require("../../models/Verifications");
const nodemailer = require("nodemailer");
const Token = require("../../models/Tokens");
const CORS_URL = keys.CORS_URL;
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
const DIR = 'public/team';
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

// multer
const DIR1 = 'public';
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR1);
    },
    filename: (req, file, cb) => {
        const exploded_name = file.originalname.split(".")//toLowerCase().split(' ').join('-');
        let ext = exploded_name[exploded_name.length - 1];
        const newName = uuidV4() + '-' + new Date().getTime() + '.' + ext;
        cb(null, newName)
    }
});

// multer
const DIR2 = 'public/gallery';
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR2);
    },
    filename: (req, file, cb) => {
        const exploded_name = file.originalname.split(".")//toLowerCase().split(' ').join('-');
        let ext = exploded_name[exploded_name.length - 1];
        const newName = uuidV4() + '-' + new Date().getTime() + '.' + ext;
        cb(null, newName)
    }
});

// multer
const DIR3 = 'public/past';
const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR3);
    },
    filename: (req, file, cb) => {
        const exploded_name = file.originalname.split(".")//toLowerCase().split(' ').join('-');
        let ext = exploded_name[exploded_name.length - 1];
        const newName = uuidV4() + '-' + new Date().getTime() + '.' + ext;
        cb(null, newName)
    }
});

// validation
//const validateCourseInput = require("../../validation/course");

// courses
// create new course
router.route('/courses').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateCourseAddInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let videoUrl = req.body.video;
        let videoUrl2 = videoUrl.replace("https://youtu.be/", "https://www.youtube.com/embed/");
        let videoUrl3 = videoUrl2.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
        const videoCompiledUrl = videoUrl3.replace("https://vimeo.com/", "https://player.vimeo.com/video/");

        const addCourse = new Courses({
            name: req.body.name,
            video: videoCompiledUrl,
            summary: req.body.summary,
            fee: parseInt(req.body.fee),
            date: new Date()
        });

        addCourse.save()
            .then(response => {
                return res
                    .status(200)
                    .json(response);
            }).catch(err => {
            console.log(err);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })


    }
})

// assign instructors into courses by the admin
router.route('/assign/new').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateAssignNewInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        let user = req.body.user;
        let course = req.body.course;

        if (!user || !course) {
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        }

        const assignIns = new Assign({
            course: course,
            instructor: user
        });

        assignIns.save()
            .then(response => {
                return res
                    .status(200)
                    .json(response);
            }).catch(err => {
            console.log(err);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })


    }
})

// delete past item
router.route('/past/delete').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        if (!id) {
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        }

        await Past.findOne({_id: {$eq: id}}).then(async data0 => {
            let file = data0.file;

            await Past.deleteOne({_id: {$eq: id}}).then(async data => {
                await fs.unlink(DIR3 + "/" + file, err => {
                    if (err) console.log(err);
                    else {
                        console.log("File Deleted");
                    }
                });
                res.status(200).json(data)
            }).catch(err => {
                console.log(err)
                return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
            })
        }).catch(err0 => {
            console.log(err0)
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// delete team item
router.route('/team/delete').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        if (!id) {
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        }

        await Team.findOne({_id: {$eq: id}}).then(async data0 => {
            let file = data0.file;


            await Team.deleteOne({_id: {$eq: id}}).then(async data => {
                await fs.unlink(DIR + "/" + file, err => {
                    if (err) console.log(err);
                    else {
                        console.log("File Deleted");
                    }
                });
                res.status(200).json(data)
            }).catch(err => {
                console.log(err)
                return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
            })
        }).catch(err0 => {
            console.log(err0)
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// delete gallery item
router.route('/gallery/delete').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        if (!id) {
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        }

        await Gallery.findOne({_id: {$eq: id}}).then(async data0 => {
            let file = data0.file;


            await Gallery.deleteOne({_id: {$eq: id}}).then(async data => {
                await fs.unlink(DIR2 + "/" + file, err => {
                    if (err) console.log(err);
                    else {
                        console.log("File Deleted");
                    }
                });
                res.status(200).json(data)
            }).catch(err => {
                console.log(err)
                return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
            })

        }).catch(err0 => {
            console.log(err0)
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        })


    }
})

// revoke access from assigned courses - instructors
router.route('/assign/delete').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        if (!id) {
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        }
        Assign.deleteOne({_id: {$eq: id}}).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get courses information
router.route('/courses').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Courses.find({}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        }).sort({name: 1})
    }
})

// get courses information
router.route('/courses/first').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Courses.find({}).limit(1).then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(404).json({internalError: error})
        })
    }
})

// get course edit information
router.route('/course').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Courses.find({_id: {$eq: id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)

            }
        }).limit(1)
    }
})

// get assigned courses
router.route('/assigned').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Assign.find({instructor: {$eq: id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    }
})

// instructor available to assign courses
router.route('/assignable').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let user = req.query.id;
        Assign.find({instructor: {$eq: user}}).then((data0) => {
            if (data0[0]) {
                let array = [];
                for (let i = 0; i < data0.length; i++) {
                    let c = data0[i]
                    let d = c.course;
                    array.push({_id: d});
                }
                Courses.find(
                    {$nor: array}
                ).then((data3) => {
                    res.status(200).json(data3);
                }).catch((error3) => {
                    console.log(error3);
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })
            } else {
                Courses.find().then((data3) => {
                    res.status(200).json(data3);
                }).catch((error3) => {
                    console.log(error3);
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })
            }

        }).catch((error0) => {
            console.log(error0);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})

// update course information
router.route('/course/update').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateCourseAddInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let videoUrl = req.body.video;
        let videoUrl2 = videoUrl.replace("https://youtu.be/", "https://www.youtube.com/embed/");
        let videoUrl3 = videoUrl2.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
        const videoCompiledUrl = videoUrl3.replace("https://vimeo.com/", "https://player.vimeo.com/video/");

        let id = req.query.id;
        let name = req.body.name;
        let summary = req.body.summary;
        let fee = parseInt(req.body.fee);

        Courses.updateOne({_id: id}, {
            name: name,
            video: videoCompiledUrl,
            summary: summary,
            fee: fee
        }, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    }
})

// delete course information
router.route('/course/delete').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        let courseName = req.body.course;
        // get lessons count
        Lessons.countDocuments({course: {$eq: id}}).then(async data1 => {
            //res.json(data1)
            if (data1 > 0) {
                console.log("Deletion aborted due to remaining lessons");
            } else if (data1 == 0) {
                await Assign.deleteMany({course: {$eq: id}}).then(async data7 => {

                    await Payments.updateMany({course: id}, {
                        course: String(courseName),
                        status: 4
                    }).then(async data3 => {
                        // delete course
                        await Courses.deleteOne({_id: {$eq: id}}).then(data => {
                            res.json(data)
                        }).catch(error => {
                            console.log(error);
                            return res
                                .status(404)
                                .json({internalError: "Unexpected error occurred! Please try again."});
                        })
                    }).catch(err3 => {
                        console.log(err3);
                        return res
                            .status(404)
                            .json({internalError: "Unexpected error occurred! Please try again."});
                    })


                }).catch(async err7 => {
                    console.log(err7);
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })


            }
        }).catch(error1 => {
            console.log(error1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// Lessons
// create new lesson
router.route('/lessons/new').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateLessonAddInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        const position = parseInt(req.body.position)
        const courseId = req.query.id;
        //console.log(position);

        Lessons.find({course: {$eq: courseId}, position: {$eq: position}}).limit(1).then(async res1 => {
            if (res1[0]) {
                console.log("exist");

                await Lessons.find({course: {$eq: courseId}}).sort({position: -1}).limit(1).then(async res2 => {

                    let lastPosition = parseInt(res2[0].position);
                    console.log(lastPosition);

                    for (let i = lastPosition; i >= position; i--) {
                        console.log("Before - Position: " + position + ", lastPosition: " + lastPosition + ", i: " + i)

                        await Lessons.updateOne({course: courseId, position: i}, {
                            position: (i + 1)
                        }).then(res3 => {
                            //console.log(res3);
                            console.log("Updated - Position: " + position + ", lastPosition: " + lastPosition + ", i: " + i)
                            if (i == position) {
                                // saved
                                console.log("saved");
                                // incoming data
                                const addLesson = new Lessons({
                                    lesson: req.body.lesson,
                                    course: req.query.id,
                                    position: req.body.position,
                                    date: new Date()
                                });
                                // save
                                addLesson.save()
                                    .then(response => {
                                        return res
                                            .status(200)
                                            .json(response);
                                    }).catch(err => {
                                    console.log(err);
                                    return res
                                        .status(404)
                                        .json({internalError: "Unexpected error occurred! Please try again."});
                                })
                            }
                        }).catch(err3 => {
                            console.log(err3);
                            return res
                                .status(404)
                                .json({internalError: "Unexpected error occurred! Please try again."});
                        })
                    }
                }).catch(err2 => {
                    console.log(err2)
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })
            } else {
                console.log("clear");
                // incoming data
                const addLesson = new Lessons({
                    lesson: req.body.lesson,
                    course: req.query.id,
                    position: req.body.position,
                    date: new Date()
                });

                // save
                addLesson.save()
                    .then(response => {
                        return res
                            .status(200)
                            .json(response);
                    }).catch(err => {
                    console.log(err);
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })
            }
        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get lessons information
router.route('/lessons').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let course = req.query.id;
        Lessons.find({course: {$eq: course}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        }).sort({position: 1})
    }
})

// get first lesson information
router.route('/lessons/first').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let course = req.query.id;
        Lessons.find({course: {$eq: course}}).sort({position: 1}).limit(1).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get last lesson information
router.route('/lessons/last').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let course = req.query.id;
        Lessons.find({course: {$eq: course}}).sort({position: -1}).limit(1).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get lessons count
router.route('/lessons/count').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let course = req.query.id;
        Lessons.countDocuments({course: {$eq: course}}).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get lesson edit information
router.route('/lesson').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Lessons.find({_id: {$eq: id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        }).limit(1)
    }
})

// update lesson information
router.route('/lesson/update').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateLessonEditInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let id = req.query.id;
        let lesson = req.body.lesson;
        let position = req.body.position;

        Lessons.updateOne({_id: id}, {lesson: lesson, position: position}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    }
})

// delete lesson information
router.route('/lesson/delete').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        // delete here
        Topics.deleteMany({lesson: {$eq: id}}).then(res7 => {
            //console.log(res7);
            Lessons.deleteOne({_id: {$eq: id}}).then(res8 => {
                //console.log(res8);
                console.log("Full delete")
            }).catch(err8 => {
                console.log(err8);
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })
        }).catch(err7 => {
            console.log(err7);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// Topics
// create new topic -
router.route('/topics/new').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateTopicAddInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let id = req.query.id;
        await Lessons.find({_id: {$eq: id}}).limit(1).then(async data => {

            let course = data[0].course;
            const position = req.body.position

            console.log("Req Position: " + position);

            let videoUrl = req.body.video;
            let videoUrl2 = videoUrl.replace("https://youtu.be/", "https://www.youtube.com/embed/");
            let videoUrl3 = videoUrl2.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
            const videoCompiledUrl = videoUrl3.replace("https://vimeo.com/", "https://player.vimeo.com/video/");

            await Topics.find({
                course: {$eq: course},
                lesson: {$eq: id},
                position: {$eq: position}
            }).limit(1).then(async res1 => {
                if (res1[0]) {
                    console.log("exist");
                    await Topics.find({
                        course: {$eq: course},
                        lesson: {$eq: id}
                    }).sort({position: -1}).limit(1).then(async res2 => {
                        let lastPosition = parseInt(res2[0].position);
                        console.log("Last position: " + lastPosition);
                        for (let i = lastPosition; i >= position; i--) {
                            console.log("Before - Position: " + position + ", lastPosition: " + lastPosition + ", i: " + i)
                            await Topics.updateOne({course: course, lesson: id, position: i}, {
                                position: i + 1
                            }).then(async res3 => {
                                //console.log(data);
                                console.log("Updated - Position: " + position + ", lastPosition: " + lastPosition + ", i: " + i)
                                if (i == position) {
                                    // saved
                                    // incoming data
                                    const addCourse = new Topics({
                                        topic: req.body.topic,
                                        lesson: req.query.id,
                                        course: course,
                                        video: videoCompiledUrl,
                                        position: req.body.position,
                                        date: new Date()
                                    });
                                    await addCourse.save()
                                        .then(response => {
                                            //console.log(response);
                                            console.log("saved");
                                            return res.status(200).json(course)
                                        }).catch(err => {
                                            console.log(err);
                                            return res
                                                .status(404)
                                                .json({internalError: "Unexpected error occurred! Please try again."});
                                        })
                                }
                            }).catch(err7 => {
                                console.log(err7);
                                return res
                                    .status(404)
                                    .json({internalError: "Unexpected error occurred! Please try again."});
                            })
                        }
                    }).catch(err2 => {
                        console.log(err2);
                        return res
                            .status(404)
                            .json({internalError: "Unexpected error occurred! Please try again."});
                    })
                } else {
                    console.log("clear")
                    const addLesson = new Topics({
                        topic: req.body.topic,
                        lesson: req.query.id,
                        course: course,
                        video: videoCompiledUrl,
                        position: req.body.position,
                        date: new Date()
                    });
                    await addLesson.save()
                        .then(response => {
                            //console.log(response)
                            return res
                                .status(200)
                                .json(course);
                        }).catch(err => {
                            console.log(err);
                            return res
                                .status(404)
                                .json({internalError: "Unexpected error occurred! Please try again."});
                        })
                }
            }).catch(err1 => {
                console.log(err1);
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })
        }).catch(err10 => {
            console.log(err10);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})


// get topic information
router.route('/topics').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let lesson = req.query.id;
        Topics.find({lesson: {$eq: lesson}}).sort({position: 1}).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get first topic information
router.route('/topics/first').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let lesson = req.query.id;
        Topics.find({lesson: {$eq: lesson}}).sort({position: 1}).limit(1).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get last topic information
router.route('/topics/last').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let lesson = req.query.id;
        Topics.find({lesson: {$eq: lesson}}).sort({position: -1}).limit(1).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get topics by course information
router.route('/topicsByCourse').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let course = req.query.id;
        Topics.find({course: {$eq: course}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        }).sort({position: 1})
    }
})

// get topic edit information -
router.route('/topic').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Topics.find({_id: {$eq: id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        }).limit(1)
    }
})

// update topic information -
router.route('/topic/update').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateTopicEditInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }


        let id = req.query.id;

        let videoUrl = req.body.video

        let videoUrl2 = videoUrl.replace("https://youtu.be/", "https://www.youtube.com/embed/");
        let videoUrl3 = videoUrl2.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
        const videoCompiledUrl = videoUrl3.replace("https://vimeo.com/", "https://player.vimeo.com/video/");

        let topic = req.body.topic;
        let video = videoCompiledUrl;
        let position = req.body.position;

        Topics.updateOne({_id: id}, {
            topic: topic,
            video: video,
            position: position
        }, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    }
})

// delete topic information -
router.route('/topic/delete').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;

        Topics.deleteOne({_id: {$eq: id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    }
})

// admin dashboard features
// user
// get user information
router.route('/users').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        User.find({
            role: 3
        }, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    } else {
        res.status(401)
    }
})

// get single user information
router.route('/user').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id
        User.findOne({_id: {$eq: id}}).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})

// instructors
// get user information
router.route('/instructors').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        User.find({
            role: 2
        }, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    } else {
        res.status(401)
    }
})

// get single instructor information
router.route('/instructor').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        let id = req.query.id;

        User.find({_id: {$eq: id}, role: 2}).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            res.status(404).json({internalError: "Instructor not found"});
        })

    } else {
        res.status(401)
    }
})

// super admins
// get user information
router.route('/super-admins').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        User.find({
            $and: [
                {role: 1},
                {email: {$ne: 'admin@votechno.com'}},
                {email: {$ne: req.email}}
            ]
        }, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    } else {
        res.status(401)
    }
})

// payments
// get user payments
router.route('/payments').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Payments.find(
            {
                $or: [
                    {status: 0},
                    {status: 3},
                    {status: 4}
                ]
            }
        ).then((data3) => {
            res.status(200).json(data3)
        }).catch((error3) => {
            console.log(error3);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})


// get user payments (approved)
router.route('/approved-payments').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Payments.find({status: 1}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        })
    } else {
        res.status(401)
    }
})

// admin payment information
router.route('/payment').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Payments.find({_id: {$eq: id}}).limit(1).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})

// delete payment
router.route('/delete-payment').post(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 1) {
        let id = req.body.id;

        Payments.find({_id: {$eq: id}}).then(async data1 => {
            let paymentData = data1[0]
            let file = paymentData.file;
            let email = paymentData.email;
            let course_id = paymentData.course;
            console.log(paymentData);


            await Courses.findOne({_id: {$eq: course_id}}).then(async data0 => {

                let course = data0.name;

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
                        subject: 'Payment rejection notification - VoTechno Institute',
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
                            '<h2>Hello, ' + data1.user + '</h2>' +
                            '<h1>' +
                            'Your payment for the <b>"' + course + '"</b> course has been rejected.' +
                            '</h1>' +
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

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('success');
                    });
                }

                await Payments.deleteOne({_id: {$eq: id}}).then(async data2 => {
                    await registerEmail().then(r => {
                        console.log("Full success")
                        res.status(200).json(data2)
                    }).catch(errkk => {
                        console.log(errkk);
                        return res
                            .status(404)
                            .json({errorsendingemail: "Error while sending email"});
                    })
                    await fs.unlink(DIR1 + "/" + file, err => {
                        if (err) console.log(err);
                        else {
                            console.log("File Deleted");
                        }
                    });
                }).catch(error2 => {
                    console.log(error2);
                    console.log("here error - 2");
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })

            }).catch(error34 => {
                console.log(error34);
                console.log("here error - 3");
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })

        }).catch(err1 => {
            console.log(err1);
            console.log("here error - 4");
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })

    }
})

// delete payment after delete course
router.route('/delete-payment-del-course').post(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 1) {
        let id = req.body.id;

        Payments.find({_id: {$eq: id}}).then(async data1 => {
            let paymentData = data1[0]
            let file = paymentData.file;
            console.log(paymentData);

            await Payments.deleteOne({_id: {$eq: id}}).then(async data2 => {
                console.log("Full success")
                res.status(200).json(data2)
                await fs.unlink(DIR1 + "/" + file, err => {
                    if (err) console.log(err);
                    else {
                        console.log("File Deleted");
                    }
                });
            }).catch(error2 => {
                console.log(error2);
                console.log("here error - 2");
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })


        }).catch(err1 => {
            console.log(err1);
            console.log("here error - 4");
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })

    }
})

// approve payment
router.route('/approve-payment').post(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 1) {
        let id = req.body.id;
        Payments.updateOne({_id: id}, {status: 1}).then(data1 => {
            //console.log(data1);
            Payments.findOne({_id: {$eq: id}}).then(data2 => {
                let course = data2.course;
                let email = data2.email;
                Courses.findOne({_id: {$eq: course}}).then(data3 => {
                    let newOnDemand = parseInt(data3.onDemand) + 1;
                    Courses.updateOne({_id: course}, {onDemand: newOnDemand}).then(data4 => {


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
                                subject: 'Payment approval notification - VoTechno Institute',
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
                                    '<h2>Hello, ' + data2.user + '</h2>' +
                                    '<h1>' +
                                    'Your payment for the <b>"' + data3.name + '"</b> course has been approved. <br>By now you can access this course' +
                                    '</h1>' +
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

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error.message);
                                }
                                console.log('success');
                            });
                        }

                        registerEmail().then(r => {
                            console.log("Full success")
                            res.status(200).json(data4);
                        }).catch(err => {
                            return res
                                .status(404)
                                .json({errorsendingemail: "Error while sending email"});
                        })

                    }).catch(err4 => {
                        console.log(err4);
                        return res
                            .status(404)
                            .json({internalError: "Unexpected error occurred! Please try again."});
                    })
                }).catch(err3 => {
                    console.log(err3);
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })
            }).catch(err2 => {
                console.log(err2);
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })
        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })

    }
})

// disapprove payment
router.route('/disapprove-payment').post(cors(corsOptions), auth.isAuthenticated, (req, res, next) => {
    if (req.role == 1) {
        let id = req.body.id;
        Payments.updateOne({_id: id}, {status: 0}).then(data1 => {

            Payments.findOne({_id: {$eq: id}}).then(data2 => {
                let course = data2.course;
                let email = data2.email;
                Courses.findOne({_id: {$eq: course}}).then(data3 => {
                    let course_name = data3.name;
                    let newOnDemand = parseInt(data3.onDemand) - 1;
                    Courses.updateOne({_id: course}, {onDemand: newOnDemand}).then(data4 => {


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
                                subject: 'Payment disapproval notification - VoTechno Institute',
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
                                    '<h2>Hello, ' + data2.user + '</h2>' +
                                    '<h1>' +
                                    'Your payment for the <b>"' + data3.name + '"</b> course has been disapproved.' +
                                    '</h1>' +
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

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error.message);
                                }
                                console.log('success');
                            });
                        }

                        registerEmail().then(r => {
                            console.log("Full success")
                            res.json(data2)
                        }).catch(err => {
                            return res
                                .status(404)
                                .json({errorsendingemail: "Error while sending email"});
                        })

                        //console.log(data4);
                        //res.status(200).json(data4);


                    }).catch(err4 => {
                        console.log(err4);
                        return res
                            .status(404)
                            .json({internalError: "Unexpected error occurred! Please try again."});
                    })
                }).catch(err3 => {
                    console.log(err3);
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })
            }).catch(err2 => {
                console.log(err2);
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })

        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// admin user management
// user - disable
router.route('/users/disable').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;

        User.findOne({_id: {$eq: id}}).then((user) => {
            let email = user.email;

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
                    subject: 'Account disabling notification - VoTechno Institute',
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
                        '<h2>Hello, ' + user.name + '</h2>' +
                        '<h1>' +
                        'Your VoTechno account has been temporarily disabled' +
                        '</h1>' +
                        '<br>' +
                        '<br>' +
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

            User.updateOne({_id: id}, {status: 0}).then(async data1 => {

                await registerEmail().then(r => {
                    console.log("Full success")
                    res.status(200).json(data1);
                }).catch(err => {
                    return res
                        .status(404)
                        .json({errorsendingemail: "Error while sending email"});
                })

            }).catch(err1 => {
                console.log(err1);
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })

        }).catch((error1) => {
            console.log(error1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })

    }
})

// user - enable
router.route('/users/enable').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        User.updateOne({_id: id}, {status: 1}).then(data1 => {


            User.findOne({_id: {$eq: id}}).then(async data2 => {
                let email = data2.email;

                // register email function
                async function registerEmail() {
                    /*let transporter = nodemailer.createTransport({
                        host: keys.MAIL_HOST,
                        port: keys.MAIL_PORT,
                        secure: keys.MAIL_SECURE,
                        requireTLS: keys.MAIL_TLS,
                        auth: {
                            user: keys.MAIL_ACC,
                            pass: keys.MAIL_PW
                        }
                    });*/

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
                        subject: 'Account enabling notification - VoTechno Institute',
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
                            '<h2>Hello, ' + data2.name + '</h2>' +
                            '<h1>' +
                            'Your VoTechno account has been reactivated' +
                            '</h1>' +
                            '<br>' +
                            '<br>' +
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

                await registerEmail().then(r => {
                    console.log("Full success")
                    res.status(200).json(data1);
                }).catch(err => {
                    return res
                        .status(404)
                        .json({errorsendingemail: "Error while sending email"});
                })

            }).catch(error2 => {
                console.log(error2);
            })

            //res.status(200).json(data1);


        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// user - delete
router.route('/users/delete').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;

        User.findOne({_id: {$eq: id}}).then(data2 => {
            let email = data2.email;
            User.deleteOne({_id: {$eq: id}}).then(async data1 => {
                await Payments.updateMany({user_id: id}, {status: 3}).then(async data3 => {
                    await Verification.deleteMany({email: {$eq: email}}).then(async data12 => {
                        await Assign.deleteMany({instructor: {$eq: id}}).then(async data7 => {


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
                                    subject: 'Account removal notification - VoTechno Institute',
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
                                        '<h2>Hello, ' + data2.name + '</h2>' +
                                        '<h1>' +
                                        'Your VoTechno account has been permanently deleted' +
                                        '</h1>' +
                                        '<br>' +
                                        '<br>' +
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

                            await registerEmail().then(r => {
                                console.log("Full success")
                                res.status(200).json(data7);
                            }).catch(err => {
                                return res
                                    .status(404)
                                    .json({errorsendingemail: "Error while sending email"});
                            })


                        }).catch(err7 => {
                            console.log(err7);
                            return res
                                .status(404)
                                .json({internalError: "Unexpected error occurred! Please try again."});
                        })
                    }).catch(err12 => {
                        console.log(err12);
                        return res
                            .status(404)
                            .json({internalError: "Unexpected error occurred! Please try again."});
                    })
                }).catch(err3 => {
                    console.log(err3);
                    return res
                        .status(404)
                        .json({internalError: "Unexpected error occurred! Please try again."});
                })
            }).catch(err1 => {
                console.log(err1);
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })

        }).catch(err13 => {
            console.log(err13);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })

    }
})

// register super admins and instructors
router.post("/register", cors(corsOptions), auth.isAuthenticated, (req, res) => {
    // Form validation
    if (req.role == 1) {
        const {errors, isValid} = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        User.findOne({email: {$eq: req.body.email}}).then(user => {
            if (user) {
                return res.status(400).json({email: "Email already exists"});
            } else {
                const newUser = new User({
                    name: req.body.name,
                    tel: req.body.tel,
                    role: req.body.role_req,
                    email: req.body.email,
                    password: req.body.password,
                    verification: 1
                });

                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => {
                                console.log(err);
                                return res
                                    .status(404)
                                    .json({internalError: "Unexpected error occurred! Please try again."});
                            });
                    });
                });
            }
        });
    }
});

// user - edit
router.route('/users/edit').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateEditUserInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let id = req.body.id;
        User.updateOne({_id: id}, {
            name: {$eq: req.body.name},
            tel: {$eq: req.body.tel}
        }).then(async data1 => {
            res.status(200).json(data1);
        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// admin/settings - change password
router.route('/settings/password').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

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
                                    console.log(err1);
                                    return res
                                        .status(404)
                                        .json({internalError: "Unexpected error occurred! Please try again."});
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

// update course zoom
router.route('/zoom/new').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateZoomInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }


        let course = req.query.course;
        let zoom = req.body.link;
        let start = req.body.start;
        let end = req.body.end;

        console.log("start: " + start)
        console.log("end: " + end)

        Courses.updateOne({_id: course}, {
            zoom: zoom,
            zoomStart: start,
            zoomEnd: end
        }).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})


// update course zoom
router.route('/zoom/delete').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        let course = req.query.course;

        Courses.updateOne({_id: course}, {zoom: "", zoomStart: "", zoomEnd: ""}).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// courses management
// course - disable
router.route('/course/disable').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        await Courses.updateOne({_id: id}, {status: 0}).then(data1 => {
            res.status(200).json(data1);
        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// course - enable
router.route('/course/enable').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        await Courses.updateOne({_id: id}, {status: 1}).then(data1 => {
            res.status(200).json(data1);
        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// admin past one
router.route('/past/info').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Past.find({_id: {$eq: id}}).limit(1).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})

// admin team one
router.route('/team/info').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Team.find({_id: {$eq: id}}).limit(1).then(data => {
            res.json(data)
        }).catch(error => {
            console.log(error);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})

let upload3 = multer({
    storage: storage3,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only JPG, JPEG and PNG files are allowed!'));
        }
    }
});

let upload1 = multer({
    storage: storage1,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only JPG, JPEG and PNG files are allowed!'));
        }
    }
});

// save team
router.route('/past').post(cors(corsOptions), auth.isAuthenticated, upload3.single('photo'), (req, res, next) => {
    if (req.role == 1) {
        const {errors, isValid} = validatePastInput(req.body);
        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let fileName = req.file.filename;
        let mime = req.file.mimetype;
        let size = req.file.size;

        if (size <= 5000000) {
            if (mime == 'image/png' || mime == 'image/jpg' || mime == 'image/jpeg') {
                const addPast = new Past({
                    name: req.body.name,
                    title: req.body.title,
                    body: req.body.body,
                    file: fileName
                });
                addPast.save()
                    .then(response => {
                        console.log("saved");
                        return res
                            .status(200)
                            .json(response);
                    }).catch(err => {
                    console.log(err);
                    return res
                        .status(404)
                        .json({internalError: "Error saving record"});
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


// past - edit
router.route('/past/edit').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validatePastInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let id = req.body.id;
        let name = req.body.name;
        let title = req.body.title;
        let body = req.body.body;

        await Past.updateOne({_id: id}, {
            name: name,
            title: title,
            body: body
        }).then(data1 => {
            console.log(data1);
            res.status(200).json(data1);
        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})


// team - edit
router.route('/team/edit').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateTeamInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let id = req.body.id;
        let name = req.body.name;
        let title = req.body.title;

        await Team.updateOne({_id: id}, {name: name, title: title}).then(data1 => {
            console.log(data1);
            res.status(200).json(data1);
        }).catch(err1 => {
            console.log(err1);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})


let upload = multer({
    storage: storage,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only JPG, JPEG and PNG files are allowed!'));
        }
    }
});

let upload2 = multer({
    storage: storage2,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only JPG, JPEG and PNG files are allowed!'));
        }
    }
});

// save team
router.route('/team').post(cors(corsOptions), auth.isAuthenticated, upload.single('slip'), (req, res, next) => {
    if (req.role == 1) {

        const {errors, isValid} = validateTeamInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let fileName = req.file.filename;
        let mime = req.file.mimetype;
        let size = req.file.size;

        if (size <= 5000000) {
            if (mime == 'image/png' || mime == 'image/jpg' || mime == 'image/jpeg') {

                const addMember = new Team({
                    name: req.body.name,
                    title: req.body.title,
                    body: req.body.body,
                    file: fileName
                });
                addMember.save()
                    .then(response => {
                        console.log("saved");
                        return res
                            .status(200)
                            .json(response);
                    }).catch(err => {
                    console.log(err);
                    return res
                        .status(404)
                        .json({internalError: "Error saving payment"});
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

// save team
router.route('/gallery').post(cors(corsOptions), auth.isAuthenticated, upload2.single('photo'), (req, res, next) => {
    if (req.role == 1) {

        const {errors, isValid} = validateGalleryInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let fileName = req.file.filename;
        let mime = req.file.mimetype;
        let size = req.file.size;
        let date = new Date();

        if (size <= 5000000) {
            if (mime == 'image/png' || mime == 'image/jpg' || mime == 'image/jpeg') {

                const addMember = new Gallery({
                    title: req.body.title,
                    body: req.body.body,
                    date: date,
                    file: fileName
                });
                addMember.save()
                    .then(response => {
                        console.log("saved");
                        return res
                            .status(200)
                            .json(response);
                    }).catch(err => {
                    console.log(err);
                    return res
                        .status(404)
                        .json({internalError: "Error saving record"});
                })
            } else {
                return res
                    .status(404)
                    .json({internalError: "Invalid file type"});
            }
        } else {
            return res
                .status(404)
                .json({internalError: "The file size should be less than 5MB"});
        }
    }
})

// homepage
// team
router.route('/team').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Team.find().then((data3) => {
            res.status(200).json(data3)
        }).catch((error3) => {
            console.log(error3);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})

// past
router.route('/past').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Past.find().then((data3) => {
            res.status(200).json(data3)
        }).catch((error3) => {
            console.log(error3);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})

// User check point
router.route('/security/check-point').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    let token = req.headers['x-access-token'];
    Token.findOne({user: {$eq: req.id}, token: {$eq: token}, status: 1}).limit(1).then((data4) => {
        if (data4) {
            User.findOne({_id: {$eq: req.id}, email: {$eq: req.email}, status: 1}).limit(1).then((data3) => {
                res.status(200).json(data3)
            }).catch((error3) => {
                return res
                    .status(404)
                    .json({internalError: "Unexpected error occurred! Please try again."});
            })
        } else {
            res.status(200).json({data3: ""});
        }
    }).catch((error4) => {
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })
})

// User check point
router.route('/verification/check-point').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    User.findOne({_id: {$eq: req.id}, email: {$eq: req.email}, status: 1}).limit(1).then((data3) => {
        res.status(200).json(data3)
    }).catch((error3) => {
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })
})


// Redhat courses
// courses
// create new redhat
router.route('/redhat').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    console.log("here");
    if (req.role == 1) {

        const {errors, isValid} = validateRedhatAddInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        const addCourse = new Redhat({
            title: req.body.title,
            body: req.body.body,
            link: req.body.link,
            date: new Date()
        });

        addCourse.save()
            .then(response => {
                return res
                    .status(200)
                    .json(response);
            }).catch(err => {
            console.log(err);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// get redhat information
router.route('/redhat').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Redhat.find({}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)
            }
        }).sort({title: 1})
    }
})

// get redhat edit information
router.route('/edit-redhat').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Redhat.find({_id: {$eq: id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)

            }
        }).limit(1)
    }
})

// get gallery edit information
router.route('/edit-gallery').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.query.id;
        Gallery.find({_id: {$eq: id}}, (error, data) => {
            if (error) {
                return (error)
            } else {
                res.json(data)

            }
        }).limit(1)
    }
})

// edit redhat
router.route('/edit-redhat').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {

    if (req.role == 1) {

        const {errors, isValid} = validateRedhatAddInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let id = req.body.id;
        let title = String(req.body.title);
        let body = req.body.body;
        let link = req.body.link;
        let date = new Date();

        Redhat.updateOne({_id: id}, {
            title: title,
            body: body,
            link: link,
            date: date
        }, (error, data) => {
            if (error) {
                console.log(error);
                return (error);
            } else {
                console.log(id);
                console.log(title);
                console.log(body);
                console.log(link);
                res.json(data)
            }
        })
    }
})

// delete redhat
router.route('/redhat/delete').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        // delete here
        Redhat.deleteOne({_id: {$eq: id}}).then(res8 => {
            //console.log(res8);
            console.log("Full delete - Redhat");
            return res
                .status(200)
                .json(res8);
        }).catch(err8 => {
            console.log(err8);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    }
})

// gallery
router.route('/gallery').get(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {
        Gallery.find().then((data3) => {
            res.status(200).json(data3)
        }).catch((error3) => {
            console.log(error3);
            return res
                .status(404)
                .json({internalError: "Unexpected error occurred! Please try again."});
        })
    } else {
        res.status(401)
    }
})


// edit gallery
router.route('/edit-gallery').post(cors(corsOptions), auth.isAuthenticated, (req, res) => {
    if (req.role == 1) {

        const {errors, isValid} = validateGalleryInput(req.body);

        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        let id = req.body.id;
        let title = req.body.title;
        let body = req.body.body;
        let date = new Date();

        Gallery.updateOne({_id: id}, {
            title: title,
            body: body,
            date: date
        }, (error, data) => {
            if (error) {
                console.log(error);
                return (error);
            } else {
                res.json(data)
            }
        })
    }
})

// delete gallery item
router.route('/gallery/delete').post(cors(corsOptions), auth.isAuthenticated, async (req, res) => {
    if (req.role == 1) {
        let id = req.body.id;
        if (!id) {
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        }

        await Gallery.findOne({_id: {$eq: id}}).then(async data0 => {
            let file = data0.file;

            await Gallery.deleteOne({_id: {$eq: id}}).then(async data => {
                await fs.unlink(DIR2 + "/" + file, err => {
                    if (err) console.log(err);
                    else {
                        console.log("File Deleted");
                    }
                });
                res.status(200).json(data)
            }).catch(err => {
                console.log(err)
                return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
            })

        }).catch(err0 => {
            console.log(err0)
            return res.status(404).json({internalError: "Unexpected error occurred! Please try again."});
        })


    }
})

module.exports = router;