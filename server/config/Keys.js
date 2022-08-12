require('dotenv').config()

module.exports = {
    CORS_URL: process.env.CORS_URL,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,

    GOOGLE_API_SERVICE: process.env.GOOGLE_API_SERVICE,
    GOOGLE_API_TYPE: process.env.GOOGLE_API_TYPE,
    GOOGLE_API_USER: process.env.GOOGLE_API_USER,
    GOOGLE_API_CLIENT_ID: process.env.GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET: process.env.GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URL: process.env.GOOGLE_API_REDIRECT_URL,
    GOOGLE_API_REFRESH_TOKEN: process.env.GOOGLE_API_REFRESH_TOKEN
}