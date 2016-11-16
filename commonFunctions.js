/**
 * Send the err back as an error message
 * @param req
 * @param res
 * @param msg
 * @param err
 */
var sendError = function(req, res, msg, err) {
    console.log(msg + ': '+err);
    res.status(500);
    res.json({err: err});
};

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    else {
        res.status(401);
        res.json({error: "Unauthorized for this operation!"})
    }
};

var hasGuestLevel = function(req, res, next) {
    if(req.user.role === 'guest' || req.user.role === 'host') {
        return next();
    } else {
        res.status(401);
        res.json({error: "Unauthorized for this operation!"})
    }
};

var hasHostLevel = function(req, res, next) {
    if(req.user.role === 'host') {
        return next();
    } else {
        res.status(401);
        res.json({error: "Unauthorized for this operation!"})
    }
};

var populateReservationsBetweenTwoDate = function(startDate, endDate) {
    return {
        path: 'reservations',
        match: {$or: [
            {$and: [
                {startDate: {$lte: startDate}},
                {endDate: {$gte: startDate}},
                {endDate: {$lte: endDate}}
            ]},
            {$and: [
                {startDate: {$gte: startDate}},
                {startDate: {$lte: endDate}},
                {endDate: {$gte: endDate}}
            ]},
            {$and: [
                {startDate: {$gte: startDate}},
                {startDate: {$lte: endDate}},
                {endDate: {$lte: endDate}},
                {endDate: {$gte: startDate}}
            ]},
            {$and: [
                {startDate: {$lte: startDate}},
                {startDate: {$lte: endDate}},
                {endDate: {$gte: endDate}},
                {endDate: {$gte: startDate}}
            ]}
        ]}
    };
};

var populateRoomsAlongReservationsBetweenTwoDate = function (startDate, endDate) {
    return {
        path: 'rooms',
        populate: {
            path: 'reservations',
            match: {$or: [
                {$and: [
                    {startDate: {$lte: startDate}},
                    {endDate: {$gte: startDate}},
                    {endDate: {$lte: endDate}}
                ]},
                {$and: [
                    {startDate: {$gte: startDate}},
                    {startDate: {$lte: endDate}},
                    {endDate: {$gte: endDate}}
                ]},
                {$and: [
                    {startDate: {$gte: startDate}},
                    {startDate: {$lte: endDate}},
                    {endDate: {$lte: endDate}},
                    {endDate: {$gte: startDate}}
                ]},
                {$and: [
                    {startDate: {$lte: startDate}},
                    {startDate: {$lte: endDate}},
                    {endDate: {$gte: endDate}},
                    {endDate: {$gte: startDate}}
                ]}
            ]}
        }
    };
};

var functions = {};
functions.sendError = sendError;
functions.isAuthenticated = isAuthenticated;
functions.hasGuestLevel = hasGuestLevel;
functions.hasHostLevel = hasHostLevel;
functions.populateReservationsBetweenTwoDate = populateReservationsBetweenTwoDate;
functions.populateRoomsAlongReservationsBetweenTwoDate = populateRoomsAlongReservationsBetweenTwoDate;

module.exports = functions;