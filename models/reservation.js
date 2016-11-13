var mongoose = require('mongoose');

module.exports = mongoose.model('Reservation',{
    owner:      String,
    room:       String,
    hotelId:    String,
    startDate:  Date,
    endDate:    Date
});