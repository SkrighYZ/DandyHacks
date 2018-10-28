var request = require('request')

class EventDataService {

  getEventData(callback) {

    console.log("This is happening")

    var parseString = require('xml2js').parseString;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://api.eventful.com/rest/events/search?app_key=PTc4mmXnq37xG6Cz&where=43,-77&within=25&date=2018102600-2018113000&sort_by=popularity&page_size=100'
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => {
      let xml_response = contents
      parseString(xml_response, (err, result) => {
        console.log(result);
      });
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }
}

export default EventDataService
