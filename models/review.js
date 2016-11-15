var mongoose = require('mongoose');

module.exports = mongoose.model('Review',{
    owner:       String,
    title:       String,
    hotelId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    description: String,
    date:        Date,
    rating:      Number
});