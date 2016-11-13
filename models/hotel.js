var mongoose = require('mongoose');

module.exports = mongoose.model('Hotel',{
    name:          String,
    owner:         String,
    location:      String,
    luxuryLevel:   Number,
    reviews:       [String],
    rooms:         [String]
});