var express = require('express');
var router = express.Router();

var Reservation = require('../models/reservation');
var Hotel = require('../models/hotel');
var Room = require('../models/room');
var commons = require('../commonFunctions');

var populateReservationsBetweenTwoDate = commons.populateReservationsBetweenTwoDate;

/* GET list user's reservations. */
router.get('/', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    Reservation
        .find({owner: req.user._id})
        .populate({ path: 'hotelId' })
        .exec(function(err, docs){
        if (err){
            commons.sendError(req, res, 'Error in getting reservations', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* GET list hotel's reservations. */
router.get('/:hotelId', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Hotel.findOne({_id: req.params.hotelId, owner: req.user._id}, function(err, hotel){
        if (err){
            commons.sendError(req, res, 'Error in getting hotel', err);
        } else {
            Reservation.find({hotelId: req.params.hotelId}, function(err, docs){
                if (err){
                    commons.sendError(req, res, 'Error in getting reservations', err);
                } else {
                    res.json({results: docs});
                }
            });
        }
    });
});

/* POST create a reservation. */
router.post('/', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    var reservation = new Reservation(req.body);
    reservation.owner = req.user._id;

    Room.findOne({_id: reservation.roomId})
        .populate(populateReservationsBetweenTwoDate(req.body.startDate, req.body.endDate))
        .exec(function (err, room) {
            if(err) {
                commons.sendError(req, res, 'Error in add reservation', err);
            } else {
                if(room.reservations.length < room.quantity) {
                    reservation.save(function(err, savedReservation) {
                        if (err){
                            commons.sendError(req, res, 'Error in add reservation', err);
                        } else {
                            res.json(savedReservation);
                        }
                    });
                }
            }
        });
});

//TODO
/* GET specified reservation. */
router.get('/:id', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    Reservation.findOne({_id: req.params.id}, function(err, reservation){
        if (err){
            commons.sendError(req, res, 'Error in getting reservation', err);
        } else {
            res.json(reservation);
        }
    });
});

/* POST update reservation. */
router.post('/:id', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    Reservation.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, {new: true}, function(err, updatedReservation) {
        if (err){
            commons.sendError(req, res, 'Error in update reservation', err);
        } else {
            res.json(updatedReservation);
        }
    });
});

/* DELETE specified reservation. */
router.delete('/:id', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    Reservation.findOneAndRemove({ _id: req.params.id, owner: req.user._id }, function(err, reservation) {
        if (err){
            commons.sendError(req, res, 'Error in removing reservation', err);
        } else {
            Room.findOneAndUpdate({ _id: reservation.roomId}, { $pull: { reservations: req.params._id } },
                function (err, doc) {
                    err ? commons.sendError(req, res, 'Error in removing reservation', err)
                        : res.json({id: reservation._id});
                });
        }
    });
});

module.exports = router;
