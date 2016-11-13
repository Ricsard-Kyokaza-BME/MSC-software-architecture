var mongoose = require('mongoose');

module.exports = mongoose.model('Room',{
    type:        String,
    capacity:    String,
    description: String,
    hotel:       String,
    quantity:    Number,
    reserved:    Number
});