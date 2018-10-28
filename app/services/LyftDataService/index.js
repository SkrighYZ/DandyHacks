var request = require('request')

class LyftDataService {

  getNearbyDrivers(callback) {

    var url = 'https://api.lyft.com/oauth/token/username=NjnHQD7IWWxJ&password=Gbtl3ZeBuLzOODGTGqTKnpSwMNQOyl9j'
    var options = {
      method: 'get',
      url: url
    }

    request(options, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }

      var headers = res.headers
      var statusCode = res.statusCode

      let flightMap = JSON.parse(res.body);
      callback(flightMap)
    })
  }
}

export default LyftDataService
