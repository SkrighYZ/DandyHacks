import React from 'react'
import FlightDataService from '../../services/FlightDataService/index'
import Chart from 'chart.js';

class Uber extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      latitude: 40.854885,
      longitude: -88.081807,
      flightData: {},
      topChoices: []
    }

    this.flightDataService = new FlightDataService()
  }

  componentDidMount() {

    let flightData = this.flightDataService.getFlightData((flightData) => {
      this.setState({ flightData : flightData })
      console.log('this.state.flightData', this.state.flightData)

      var time_vals_lga = {}
      var time_vals_roc = {}

      var chart_labels = []

      for (var airportCode in flightData) {
        var attributeKey = airportCode
        var attributeValue = flightData[airportCode]
        for (var moreData in attributeValue) {
          var attributeK = moreData
          var attributeV = attributeValue[moreData]
          console.log('attributeK', attributeK)
          console.log('attributeV', attributeV)
          if (typeof(attributeV) == 'object') {
            console.log('true')
            for (var evenMoreData in attributeV) {
              var attrK = evenMoreData
              var attrV = attributeV[evenMoreData]
              console.log('attrK', attrK)
              console.log('attrV', attrV)
              if (typeof(attrV) == 'object') {
                console.log('true obj')
                for (var mostData in attrV) {
                  var lastAttrK = mostData
                  var lastAttrV = attrV[mostData]
                  console.log('lastAttrK', lastAttrK)
                  console.log('lastAttrV', lastAttrV)
                  chart_labels
                }
              }
            }
          }
        }
      }

      var ctx = document.getElementById("studentChart");

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1:00 PM', '2:00 PM', '3:00 PM', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          datasets: [{
            label: 'Flights By Time',
            data: [12, 19, 3, 1, 2, 43],
            backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ],
            borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
              }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
            }
          }
        });
      })

    navigator.geolocation.getCurrentPosition(
      position => {
        const { lat, lon } = position.coords;
        console.log(position);

        this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
        });
        console.log(this.state);
      }
    )

    var pyrmont = {lat: this.state.latitude, lng: this.state.longitude};
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 12});

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 10000,
        type: ['airport']
    }, callback);
  }



  render() {


    return (
      <div>

      <header className="masthead bg-primary text-white text-center" id='lyftPageContainer'>
        <div className="container">
        <img src='../../assets/uber-white.png' className='uberLogo'></img>
        </div>
      </header>

      <hr></hr>

      <section className="portfolio" id="portfolio">
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">Top Choices</h2>
          <hr className="star-dark mb-5"></hr>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <a className="portfolio-item d-block mx-auto" href="#portfolio-modal-1">
                <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
                  <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
                    <i className="fas fa-search-plus fa-3x"></i>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a className="portfolio-item d-block mx-auto" href="#portfolio-modal-2">
                <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
                  <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
                    <i className="fas fa-search-plus fa-3x"></i>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a className="portfolio-item d-block mx-auto" href="#portfolio-modal-3">
                <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
                  <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
                    <i className="fas fa-search-plus fa-3x"></i>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a className="portfolio-item d-block mx-auto" href="#portfolio-modal-4">
                <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
                  <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
                    <i className="fas fa-search-plus fa-3x"></i>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a className="portfolio-item d-block mx-auto" href="#portfolio-modal-5">
                <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
                  <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
                    <i className="fas fa-search-plus fa-3x"></i>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a className="portfolio-item d-block mx-auto" href="#portfolio-modal-6">
                <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
                  <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
                    <i className="fas fa-search-plus fa-3x"></i>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id='map'></div>

      <div className='dashboardStudentContainer'>
        <canvas id="studentChart"></canvas>
      </div>

      </div>
    )
  }
}

export default Uber
