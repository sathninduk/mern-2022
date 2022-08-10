require('dotenv').config()

module.exports = {
    CORS_URL: process.env.CORS_URL,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}