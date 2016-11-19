var express = require('express');
var router = express.Router();
var path = require('path');

var multer = require('multer');
var mime = require('mime');
var shortid = require('shortid');
var _ = require('lodash');

var Hotel = require('../models/hotel');
var Room = require('../models/room');
var Reservation = require('../models/reservation');
var commons = require('../commonFunctions');

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/')
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '.' + mime.extension(file.mimetype));
    }
});
var imageUpload = multer({ storage: imageStorage });
var populateRoomsAlongReservationsBetweenTwoDate = commons.populateRoomsAlongReservationsBetweenTwoDate;

/* GET list all hotels. */
router.get('/', function(req, res, next) {
    Hotel.find({}, function(err,docs){
        if (err){
            commons.sendError(req, res, 'Error in getting hotels', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* GET list own hotels. */
router.get('/own', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Hotel.find({owner: req.user._id}, function(err,docs){
        if (err){
            commons.sendError(req, res, 'Error in getting hotels', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* POST search hotels. */
router.post('/search', function(req, res, next) {
    Hotel
        .find(
            {location: { $regex: req.body.city || '', $options: "i" }})
        .populate(populateRoomsAlongReservationsBetweenTwoDate(
            req.body.startDate, req.body.endDate, req.body.personCount, req.body.roomType))
        .exec(function(error, docs) {
            var results = _.filter(docs, function (hotel) {
                var isThereEmptyReservation = false;
                _.each(hotel.rooms, function (room) {
                   room.reservations.length < room.quantity ? isThereEmptyReservation = true : '';
                });
                return isThereEmptyReservation;
            });

            res.json({results: results});
        });
});

/* POST create a hotel. */
router.post('/', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    var hotel = new Hotel(req.body);
    hotel.owner = req.user._id;
    hotel.rooms = [];

    hotel.save(function(err, savedHotel) {
        if (err){
            commons.sendError(req, res, 'Error in add hotel', err);
        } else {
            for(var i = 0; i < req.body.rooms.length; i++) {
                req.body.rooms[i].hotelId = savedHotel._id;
            }
            Room.create(req.body.rooms, function (err, rooms) {
                if (err){
                    commons.sendError(req, res, 'Error in add hotel rooms', err);
                } else {
                    savedHotel.rooms.push.apply(savedHotel.rooms, rooms);

                    Hotel.findOneAndUpdate({ _id: savedHotel._id }, savedHotel, {new: true}, function(err, updatedHotel) {
                        if (err){
                            commons.sendError(req, res, 'Error in update hotel', err);
                        } else {
                            res.json(updatedHotel);
                        }
                    });
                }
            });
        }
    });
});

/* GET specified hotel. */
router.get('/:id', function(req, res, next) {
    Hotel
        .findOne({_id: req.params.id})
        .exec(function(err, hotel){
        if (err){
            commons.sendError(req, res, 'Error in getting hotel', err);
        } else {
            res.json(hotel);
        }
    });
});

/* POST get specified hotel's rooms between start and end date. */
router.post('/:id/rooms', function(req, res, next) {
    Hotel
        .findOne({_id: req.params.id})
        .populate(populateRoomsAlongReservationsBetweenTwoDate(req.body.startDate, req.body.endDate))
        .exec(function(err, hotel){
            if (err){
                commons.sendError(req, res, 'Error in getting hotel\'s rooms', err);
            } else {
                var rooms = _.filter(hotel.rooms, function (room) {
                    return room.reservations.length < room.quantity;
                });

                res.json(rooms);
            }
        });
});

/* GET hotel image. */
router.get('/:id/image/:imageId', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../upload', req.params.imageId));
});

/* POST add hotel image. */
router.post('/:id/image', commons.isAuthenticated, commons.hasHostLevel, imageUpload.array('images'), function(req, res, next) {
    var fileNames = [];
    for(var i = 0; i < req.files.length; i++) {
        fileNames.push(req.files[i].filename);
    }

    Hotel.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, {$pushAll: {images: fileNames}}, {new: true}, function(err, updatedHotel) {
        if (err){
            commons.sendError(req, res, 'Error in update hotel images', err);
        } else {
            res.json(updatedHotel);
        }
    });
});

/* POST update hotel. */
router.post('/:id', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    var hotel = req.body;
    Hotel.findOneAndUpdate({ _id: req.params.id, owner: req.user._id },
        {name: hotel.name, description: hotel.description, location: hotel.location, luxuryLevel: hotel.luxuryLevel},
        {new: true}, function(err, updatedHotel) {
        if (err){
            commons.sendError(req, res, 'Error in update hotel', err);
        } else {
            res.json(updatedHotel);
        }
    });
});

/* DELETE specified hotel. */
router.delete('/:id', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Hotel.findOne({ _id: req.params.id, owner: req.user._id })
        .populate({path: 'rooms'})
        .exec(function(err, hotel) {
        if (err){
            commons.sendError(req, res, 'Error in finding hotel hotel', err);
        } else {
            _.each(hotel.rooms, function (room) {
                Reservation.remove({ _id: { $in: room.reservations } }, function (err) {
                    err ? commons.sendError(req, res, 'Error in removing reservations', err) : '';
                });
            });

            Room.remove({ _id: { $in: hotel.rooms } }, function (err) {
                err ? commons.sendError(req, res, 'Error in removing rooms', err) : '';
            });

            hotel.remove(function (err) {
                err ? commons.sendError(req, res, 'Error in removing hotel', err) : res.json({id: hotel._id});
            });
        }
    });
});

module.exports = router;
