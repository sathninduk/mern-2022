const express = require("express");
const router = express.Router();
const Keys = require("../config/Keys");
const cors = require('cors')
const corsOptions = {
    origin: Keys.CORS_URL,
    optionsSuccessStatus: 200
}

router.route('/test').post(/*auth.isAuthenticated,*/ (req, res) => {
    res.send(req.body);
})

module.exports = router;