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

router.route('/user').put(auth.isAuthenticated, (req, res, next) => {

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

router.route('/note').post(auth.isAuthenticated, (req, res, next) => {

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
        next(err);
        return res
            .status(404)
            .json({internalError: "Error saving record"});
    })

});

router.route('/notes-count').get(auth.isAuthenticated, (req, res, next) => {
    Notes.find({email: req.email}).count().then((data) => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(200).json(0);
        }
    }).catch((err) => {
        next(err);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })
})

router.route('/notes/:page').get(auth.isAuthenticated, (req, res, next) => {
    let page = req.params.page;
    let skip = (page - 1) * 6;

    // find notes and backend pagination
    Notes.find({email: req.email}).sort({"_id": -1}).skip(skip).limit(6).then((data) => {
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

});

router.route('/note/:id').delete(auth.isAuthenticated, (req, res, next) => {
    let id = req.params.id;

    Notes.deleteOne({_id: id}).then(response => {
        return res
            .status(200)
            .json(response);
    }).catch(err => {
        next(err);
        return res
            .status(404)
            .json({internalError: "Unexpected error occurred! Please try again."});
    })

});

router.route('/note/:id').get(auth.isAuthenticated, (req, res, next) => {
    let id = req.params.id;
    Notes.findOne({_id: id}).then((data) => {
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

});

router.route('/note/:id').put(auth.isAuthenticated, (req, res, next) => {
    let id = req.params.id;

    Notes.updateOne({_id: id}, {
        title: req.body.title,
        note: req.body.note
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        next(err);
        res.status(500).json(err);
    })

});

module.exports = router;