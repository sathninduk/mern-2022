const express = require("express");
const router = express.Router();

// config
const Keys = require("../config/Keys");

// models
const Users = require("../models/Users");

// middlewares
const auth = require("../middleware/check-auth");
const bcrypt = require("bcryptjs");
const Notes = require("../models/Notes");

router.route('/update-user').post(auth.isAuthenticated, (req, res, next) => {

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            Users.updateOne({email: req.email}, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                mobile: req.body.mobile,
                status: true,
                password: hash
            }).then(r => {
                res.status(200).json(r);
            }).catch(err => {
                next(err)
                res.status(500).json({internalError: "Internal server error"});
            })
        });
    });


});

router.route('/create-note').post(auth.isAuthenticated, (req, res, next) => {

    const addNote = new Notes({
        title: req.body.title,
        note: req.body.note,
        email: req.email
    });
    addNote.save()
        .then(response => {
            return res
                .status(200)
                .json(response);
        }).catch(err => {
        console.log(err);
        return res
            .status(404)
            .json({internalError: "Error saving record"});
    })

});

module.exports = router;