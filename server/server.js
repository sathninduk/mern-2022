const express = require('express')
const bodyParser = require("express");
const app = express()

const port = 4000
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const user = require("./routes/user")

// BodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use("/admin", admin);
app.use("/auth", auth);
app.use("/user", user);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})