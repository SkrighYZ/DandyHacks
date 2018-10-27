var request = require('request')

class FlightDataService {

  register(airportCode) {
    var postData = {
      airportCode : airportCode
    };

    var url = 'https://localhost:3000/flight-data'
    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }

    request(options, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var headers = res.headers
      var statusCode = res.statusCode
    })
  }
}

export default FlightDataService
