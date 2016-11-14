var express = require('express');
var router = express.Router();
var path = require('path');

var multer = require('multer');
var mime = require('mime');
var shortid = require('shortid');

var Hotel = require('../models/hotel');
var Room = require('../models/room');
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
                    var roomIds = [];

                    for(var i = 0; i < rooms.length; i++) {
                        roomIds.push(rooms[i]._id);
                    }

                    savedHotel.rooms = roomIds;

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
    Hotel.findOne({_id: req.params.id}, function(err, hotel){
        if (err){
            commons.sendError(req, res, 'Error in getting hotel', err);
        } else {
            res.json(hotel);
        }
    });
});

/* GET hotel image. */
router.get('/:id/image/:imageId', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    res.sendFile(path.join(__dirname, '../upload', req.params.imageId));
});

/* POST add hotel image. */
router.post('/:id/image', commons.isAuthenticated, commons.hasHostLevel, imageUpload.array('images'), function(req, res, next) {
    var fileNames = [];
    for(var i = 0; i < req.files.length; i++) {
        fileNames.push(req.files[i].filename);
    }

    Hotel.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, {images: fileNames}, {new: true}, function(err, updatedHotel) {
        if (err){
            commons.sendError(req, res, 'Error in update hotel', err);
        } else {
            res.json(updatedHotel);
        }
    });
});

/* POST update hotel. */
router.post('/:id', commons.isAuthenticated, commons.hasHostLevel, function(req, res, next) {
    Hotel.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, {new: true}, function(err, updatedHotel) {
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
