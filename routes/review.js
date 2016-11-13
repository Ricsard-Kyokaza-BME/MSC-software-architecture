var express = require('express');
var router = express.Router();

var Review = require('../models/review');
var commons = require('../commonFunctions');

/* GET list user's reviews. */
router.get('/', function(req, res, next) {
    Review.find({owner: req.user._id}, function(err,docs){
        if (err){
            commons.sendError(req, res, 'Error in getting reviews', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* POST create a review. */
router.post('/', commons.isAuthenticated, function(req, res, next) {
    var review = new Review(req.body);
    review.owner = req.user._id;
    review.date = new Date();

    review.save(function(err, savedReview) {
        if (err){
            commons.sendError(req, res, 'Error in add review', err);
        } else {
            res.json(savedReview);
        }
    });
});

/* GET specified review. */
router.get('/:id', function(req, res, next) {
    Review.find({_id: req.params.id}, function(err,docs){
        if (err){
            commons.sendError(req, res, 'Error in getting review', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* POST update review. */
router.post('/:id', commons.isAuthenticated, function(req, res, next) {
    Review.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, updatedReview) {
        if (err){
            commons.sendError(req, res, 'Error in update review', err);
        } else {
            res.json(updatedReview);
        }
    });
});

/* DELETE specified review. */
router.delete('/:id', commons.isAuthenticated, function(req, res, next) {
    Review.findOneAndRemove({ _id: req.params.id }, function(err, review) {
        if (err){
            console.sendError(req, res, 'Error in removing review', err);
        } else {
            res.status(200);
            res.json({id: review._id});
        }
    });
});

module.exports = router;
