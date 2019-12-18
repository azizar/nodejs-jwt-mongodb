require('dotenv').config();
module.exports = {
    db: 'mongodb+srv://'+process.env.MONGODB_USERNAME+':'+process.env.MONGODB_PASSWORD+'@cluster0-i9u61.mongodb.net/restapi-nodejs?retryWrites=true&w=majority'
}
