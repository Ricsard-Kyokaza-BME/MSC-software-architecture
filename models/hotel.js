var mongoose = require('mongoose');

module.exports = mongoose.model('Hotel',{
    name:          String,
    owner:         String,
    description:   String,
    location:      String,
    luxuryLevel:   Number,
    rooms:         [mongoose.Schema.Types.Mixed],
    images:        [String]
});