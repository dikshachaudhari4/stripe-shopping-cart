const dotenv = require('dotenv');

// getting all ENV variables before starting another processes
dotenv.config();

module.exports = {
    mongoDbUrl: process.env.MONGO_DB_URL || "mongodb://localhost:27017/shoppingcart",
    stripeSecretKey: "sk_test_51JdYuRSAY7edSl7IBmxbHLqhl92bCEr09MqsapS3gMVuVPDU6BfBwAzVjXgXH0vIoXkBMvq3060DwJULc0OXMC2d00dwkWpAOx",
    port: process.env.PORT || 3000
}
