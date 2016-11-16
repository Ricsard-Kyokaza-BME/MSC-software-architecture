var mongoose = require('mongoose');

module.exports = mongoose.model('Room',{
    type:            ['STANDARD', 'SUPERIOR', 'DELUXE', 'APARTMENT', 'BRIDAL_SUITE', 'LUXURY_SUITE', 'PRESIDENTAL'],
    description:     String,
    hotelId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    reservations:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    capacity:        Number,
    quantity:        Number,
    price:           Number
});