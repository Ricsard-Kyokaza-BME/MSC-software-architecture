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
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
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

var functions = {};
functions.sendError = sendError;
functions.isAuthenticated = isAuthenticated;
functions.hasGuestLevel = hasGuestLevel;
functions.hasHostLevel = hasHostLevel;

module.exports = functions;