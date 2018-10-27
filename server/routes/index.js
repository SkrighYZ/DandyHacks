var path           = require('path'),
    router         = require('express').Router(),
    express        = require('express'),
    mongodb        = require('mongodb'),
    mongoose       = require('mongoose')

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
});


module.exports = router;
