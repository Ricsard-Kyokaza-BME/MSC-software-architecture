var express = require('express');
var router = express.Router();
var path = require('path');

var fs = require('fs');

module.exports = function(passport){

  /* GET index page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  /* GET STATIC files under /node_modules/ */
  router.get('/node_modules/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', req.originalUrl.split('?')[0]));
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login'), function(req, res) {
    res.json({page: '/', user: req.user});
  });

  /* Handle Logout */
  router.get('/logout', function(req, res) {
    req.logOut();
    res.clearCookie('connect.sid', {path: '/'});
    req.session.destroy(function (err) {
      res.json({page: '/'});
    });
  });

  /* GET Registration Page */
  router.get('/registration', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/registration', passport.authenticate('signup'), function(req, res) {
    res.json({page: '/'});
  });

  return router;
};
