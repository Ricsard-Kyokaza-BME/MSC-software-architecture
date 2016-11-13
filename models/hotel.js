var mongoose = require('mongoose');

module.exports = mongoose.model('Hotel',{
    name:          String,
    owner:         String,
    description:   String,
    location:      String,
    luxuryLevel:   Number,
    reviews:       [String],
    rooms:         [String],
    images:        [String]
});