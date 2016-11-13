var mongoose = require('mongoose');

module.exports = mongoose.model('Review',{
    owner:       String,
    title:       String,
    hotelId:     String,
    description: String,
    date:        Date,
    rating:      Number
});