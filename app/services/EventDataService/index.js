var request = require('request')

class EventDataService {

  getEventData(callback) {

    console.log("This is happening")

    var parseString = require('xml2js').parseString;

    var url = 'https://api.eventful.com/rest/events/search?app_key=PTc4mmXnq37xG6Cz&where=43,-77&within=25&date=2018102600-2018113000&sort_by=popularity&page_size=100'
    var options = {
      method: 'get',
      url: url
    }

    request(options, function (err, res, body) {

      if (err) {
        console.error('error posting json: ', err)
        throw err
      }

      console.log('res', res)
      console.log('body', body)

      var headers = res.headers
      var statusCode = res.statusCode

      let flightMap = JSON.parse(res.body);
      callback(flightMap)
    })
  }
}

export default EventDataService
