var path           = require('path'),
    router         = require('express').Router(),
    express        = require('express'),
    mongodb        = require('mongodb'),
    mongoose       = require('mongoose')

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
