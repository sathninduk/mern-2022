//const {APP_URL} = require("./keys");
require('dotenv').config();
module.exports = {

    // Database
    mongoURI: process.env.mongoURI,

    // JWT Secret
    secretOrKey: process.env.secretOrKey,

    // App URL
    APP_URL: "",

    // CORS Policies
    //CORS_URL: "http://localhost:3000",
    CORS_URL: "https://www.votechno.lk",

    // Payment report (to VoTechno) email
    PAYMENT_REPORT_EMAIL: process.env.PAYMENT_REPORT_EMAIL,

    // Password recovery verification link
    PW_URL: process.env.PW_URL,

    // SMTP mail config
    /*MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_SECURE: false,
    MAIL_TLS: true,
    MAIL_ACC: process.env.MAIL_ACC,
    MAIL_PW: process.env.MAIL_PW,*/

    // Google API
    GOOGLE_API_SERVICE: process.env.GOOGLE_API_SERVICE,
    GOOGLE_API_USER: process.env.GOOGLE_API_USER,
    GOOGLE_API_AUTH_TYPE: process.env.GOOGLE_API_AUTH_TYPE,
    GOOGLE_API_CLIENT_ID: process.env.GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET: process.env.GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URL: process.env.GOOGLE_API_REDIRECT_URL,
    GOOGLE_API_REFRESH_TOKEN: process.env.GOOGLE_API_REFRESH_TOKEN,
};