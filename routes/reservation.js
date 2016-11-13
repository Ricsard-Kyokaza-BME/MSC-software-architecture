var express = require('express');
var router = express.Router();

var Reservation = require('../models/reservation');
var commons = require('../commonFunctions');

/* GET list user's reservations. */
router.get('/', function(req, res, next) {
    Reservation.find({owner: req.user._id}, function(err, docs){
        if (err){
            commons.sendError(req, res, 'Error in getting reservations', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* POST create a reservation. */
router.post('/', commons.isAuthenticated, function(req, res, next) {
    var reservation = new Reservation(req.body);
    reservation.owner = req.user._id;

    reservation.save(function(err, savedReservation) {
        if (err){
            commons.sendError(req, res, 'Error in add reservation', err);
        } else {
            res.json(savedReservation);
        }
    });
});

/* GET specified reservation. */
router.get('/:id', function(req, res, next) {
    Reservation.findOne({_id: req.params.id}, function(err, reservation){
        if (err){
            commons.sendError(req, res, 'Error in getting reservation', err);
        } else {
            res.json(reservation);
        }
    });
});

/* POST update reservation. */
router.post('/:id', commons.isAuthenticated, function(req, res, next) {
    Reservation.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, updatedReservation) {
        if (err){
            commons.sendError(req, res, 'Error in update reservation', err);
        } else {
            res.json(updatedReservation);
        }
    });
});

/* DELETE specified reservation. */
router.delete('/:id', commons.isAuthenticated, function(req, res, next) {
    Reservation.findOneAndRemove({ _id: req.params.id }, function(err, reservation) {
        if (err){
            console.sendError(req, res, 'Error in removing reservation', err);
        } else {
            res.json({id: reservation._id});
        }
    });
});

module.exports = router;
