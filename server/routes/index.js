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
  let airportCode = req.body.airportCode;

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./../Beautiful_Flights/beautiful_flights.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
});


module.exports = router;
