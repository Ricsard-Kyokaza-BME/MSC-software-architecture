var mongoose = require('mongoose');

module.exports = mongoose.model('Reservation',{
    owner:      String,
    roomId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    hotelId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    startDate:  Date,
    endDate:    Date
});