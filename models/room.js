var mongoose = require('mongoose');

module.exports = mongoose.model('Room',{
    type:        String,
    description: String,
    hotelId:     String,
    quantity:    Number,
    capacity:    Number
});