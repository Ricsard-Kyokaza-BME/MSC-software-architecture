var mongoose = require('mongoose');

module.exports = mongoose.model('Hotel',{
    name:          String,
    owner:         String,
    description:   String,
    location:      String,
    luxuryLevel:   Number,
    rooms:         [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
    images:        [String]
});