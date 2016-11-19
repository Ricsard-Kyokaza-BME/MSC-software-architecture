var express = require('express');
var router = express.Router();

var Hotel = require('../models/hotel');
var Room = require('../models/room');
var Reservation = require('../models/reservation');
var commons = require('../commonFunctions');

/* POST add a room to a specified hotel. */
router.post('/:hotelId/room', function(req, res, next) {
    Room.create(req.body, function (err, room) {
        if (err){
            commons.sendError(req, res, 'Error in creating room', err);
        } else {
            Hotel.findOneAndUpdate({ _id: req.params.hotelId }, {$push: {rooms: room._id}}, function (err, hotel) {
                err ? commons.sendError(req, res, 'Error in adding room to the hotel', err) : '';
            });

            res.json(room);
        }
    });
});

/* DELETE specified room of a specified hotel. */
router.delete('/:hotelId/room/:roomId', function(req, res, next) {
    Room.findOneAndRemove({_id: req.params.roomId}, function(err, room){
            if (err){
                commons.sendError(req, res, 'Error in getting hotel\'s rooms', err);
            } else {
                Reservation.remove({ _id: { $in: rooms.reservations } }, function (err) {
                    err ? commons.sendError(req, res, 'Error in removing rooms', err) : '';
                });

                res.json({id: room._id});
            }
        });
});

module.exports = router;
