var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    gender: String,
    role: String,
    hotels: [String]
});