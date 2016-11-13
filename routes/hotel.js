var express = require('express');
var router = express.Router();

var Hotel = require('../models/hotel');
var commons = require('../commonFunctions');

/* GET list all hotel. */
router.get('/', function(req, res, next) {
    Hotel.find({}, function(err,docs){
        if (err){
            commons.sendError(req, res, 'Error in getting hotels', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* POST create a hotel. */
router.post('/', commons.isAuthenticated, function(req, res, next) {
    var hotel = new Hotel(req.body);
    hotel.owner = req.user._id;

    hotel.save(function(err, savedHotel) {
        if (err){
            commons.sendError(req, res, 'Error in add hotel', err);
        } else {
            res.json(savedHotel);
        }
    });
});

/* GET specified hotel. */
router.get('/:id', function(req, res, next) {
    Hotel.findOne({_id: req.params.id}, function(err, hotel){
        if (err){
            commons.sendError(req, res, 'Error in getting hotel', err);
        } else {
            res.json(hotel);
        }
    });
});

/* POST update hotel. */
router.post('/:id', commons.isAuthenticated, function(req, res, next) {
    Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, updatedHotel) {
        if (err){
            commons.sendError(req, res, 'Error in update hotel', err);
        } else {
            res.json(updatedHotel);
        }
    });
});

/* DELETE specified hotel. */
router.delete('/:id', commons.isAuthenticated, function(req, res, next) {
    Hotel.findOneAndRemove({ _id: req.params.id }, function(err, hotel) {
        if (err){
            console.sendError(req, res, 'Error in removing hotel', err);
        } else {
            res.json({id: hotel._id});
        }
    });
});

module.exports = router;
