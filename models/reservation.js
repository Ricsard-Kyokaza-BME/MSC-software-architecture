var mongoose = require('mongoose');

module.exports = mongoose.model('Reservation',{
    rooms:      String,
    hotelId:    String,
    startDate:  Date,
    endDate:    Date
});