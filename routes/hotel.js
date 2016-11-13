var express = require('express');
var router = express.Router();

var Hotel = require('../models/hotel');
var Room = require('../models/room');
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

/* GET list all hotel. */
router.get('/own', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Hotel.find({owner: req.user._id}, function(err,docs){
        if (err){
            commons.sendError(req, res, 'Error in getting hotels', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* POST create a hotel. */
router.post('/', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Room.create(req.body.rooms, function (err, rooms) {
        if (err){
            commons.sendError(req, res, 'Error in add hotel rooms', err);
        } else {
            var roomIds = [];

            for(var i = 0; i < rooms.length; i++) {
                roomIds.push(rooms[i]._id);
            }

            req.body.rooms = roomIds;
            var hotel = new Hotel(req.body);
            hotel.owner = req.user._id;

            hotel.save(function(err, savedHotel) {
                if (err){
                    commons.sendError(req, res, 'Error in add hotel', err);
                } else {
                    res.json(savedHotel);
                }
            });
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
router.post('/:id', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Hotel.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, function(err, updatedHotel) {
        if (err){
            commons.sendError(req, res, 'Error in update hotel', err);
        } else {
            res.json(updatedHotel);
        }
    });
});

/* DELETE specified hotel. */
router.delete('/:id', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Hotel.findOneAndRemove({ _id: req.params.id, owner: req.user._id }, function(err, hotel) {
        if (err){
            console.sendError(req, res, 'Error in removing hotel', err);
        } else {
            res.json({id: hotel._id});
        }
    });
});

module.exports = router;
