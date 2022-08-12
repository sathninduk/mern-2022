const express = require('express')
const mongoose = require('mongoose');
const app = express()

// port
const port = 4000

// routes
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const user = require("./routes/user")
const Keys = require("./config/Keys");

// CORS
const cors=require("cors");
const corsOptions ={
    origin: Keys.CORS_URL,
    credentials:true,
    //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))

// BodyParser middleware
const bodyParser = require("express");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
        Keys.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Rotes
app.use("/admin", admin);
app.use("/auth", auth);
app.use("/user", user);

// App Listen
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})