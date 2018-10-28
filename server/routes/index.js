var path           = require('path'),
    router         = require('express').Router(),
    express        = require('express'),
    mongodb        = require('mongodb'),
    mongoose       = require('mongoose'),
    Flight         = require('../models/flights')

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../app/index.html'));
});

router.get('/uber', function (req, res) {
  res.sendFile(path.join(__dirname, '../../app/index.html'));
});

router.get('/lyft', function (req, res) {
  res.sendFile(path.join(__dirname, '../../app/index.html'));
});

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../../app/index.html'));
});

router.get('/flight-data', function (req, res) {

  Flight.find({}, function(err, flights) {

    var flightMap = {};

    flights.forEach(function(flight) {
      flightMap[flight._id] = flight;
    });

    res.send(flightMap);
  });
});


module.exports = router;
