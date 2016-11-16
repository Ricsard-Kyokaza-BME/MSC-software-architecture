var express = require('express');
var router = express.Router();

var Review = require('../models/review');
var commons = require('../commonFunctions');

/* GET list user's reviews. */
router.get('/', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    Review.find({owner: req.user._id}, function(err, docs){
        if (err){
            commons.sendError(req, res, 'Error in getting reviews', err);
        } else {
            res.json({results: docs});
        }
    });
});

/* GET list hotel's reviews. */
router.get('/:hotelId', function(req, res, next) {
    Review.find({hotelId: req.params.hotelId}, function(err, docs){
        if (err){
            commons.sendError(req, res, 'Error in getting reviews', err);
        } else {
            var ratingSum = 0;
            for(var i = 0; i < docs.length; i++) {
                ratingSum += docs[i].rating;
            }
            var averageRating = (docs.length > 0) ? (ratingSum / docs.length) : 0;

            res.json({averageRating: averageRating,results: docs});
        }
    });
});

/* POST create a review. */
router.post('/', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
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
    Review.findOne({_id: req.params.id}, function(err, review){
        if (err){
            commons.sendError(req, res, 'Error in getting review', err);
        } else {
            res.json(review);
        }
    });
});

/* POST update review. */
router.post('/:id', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    Review.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, {new: true}, function(err, updatedReview) {
        if (err){
            commons.sendError(req, res, 'Error in update review', err);
        } else {
            res.json(updatedReview);
        }
    });
});

/* DELETE specified review. */
router.delete('/:id', commons.isAuthenticated, commons.hasGuestLevel, function(req, res, next) {
    Review.findOneAndRemove({ _id: req.params.id, owner: req.user._id }, function(err, review) {
        if (err){
            commons.sendError(req, res, 'Error in removing review', err);
        } else {
            res.json({id: review._id});
        }
    });
});

module.exports = router;
