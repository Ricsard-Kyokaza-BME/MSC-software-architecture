var mongoose = require('mongoose');

module.exports = mongoose.model('Room',{
    type:            String,
    description:     String,
    hotelId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    reservations:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    capacity:        Number
});