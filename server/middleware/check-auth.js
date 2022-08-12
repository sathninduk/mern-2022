const jwt = require("jsonwebtoken");
const keys = require("../config/Keys");

module.exports = {

    isAuthenticated: function (req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, keys.JWT_SECRET, function (err, decoded) {
                if (err) {
                    console.log(err, "error")
                    res.status(401).send('Unauthorized: Invalid token');
                } else {
                    req.id = decoded.id;
                    req.email = decoded.email;
                    req.status = decoded.status;
                    req.role = decoded.role;
                    next();
                }
            });
        }
    },

    getUserData: function (req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, keys.JWT_SECRET, function (err, decoded) {
                req.id = decoded.id;
                req.email = decoded.email;
                req.status = decoded.status;
                req.role = decoded.role;
                next();
            });
        }
    }

};
