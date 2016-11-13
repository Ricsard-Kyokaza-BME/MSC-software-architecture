var mongoose = require('mongoose');

module.exports = mongoose.model('Reservation',{
    rooms:      [String],
    hotel:      String,
    startDate:  Date,
    endDate:    Date
});