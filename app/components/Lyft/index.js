import React from 'react'
import FlightDataService from '../../services/FlightDataService/index'
import Chart from 'chart.js';

class Lyft extends React.Component {

  constructor() {
    super()

    this.state = {
      latitude: 40.854885,
      longitude: -88.081807
    }

    this.getFlightData = this.getFlightData.bind(this)
    this.flightDataService = new FlightDataService()
  }

  getFlightData() {
    this.flightDataService.getFlightData('LGA')
  }

  componentDidMount() {
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
    );

    var ctx = document.getElementById("studentChart");

    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [{
            label: 'Frequently discussed topics',
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
        <img src='../../assets/lyft-logo-white.png' className='lyftLogo'></img>
        </div>
      </header>


      <section className="portfolio">
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0" id='timeTitle'>Time</h2>
          <p className="lead">Drive Smart aggregates data from across the web to determine the optimal times to drive uber/lyft on any given day.
          Plan your driving schedule in advance through our easy to use service and add value to your time.
          </p>
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

      <div className='dashboardStudentContainer' width="20rem" height="20rem">
        <canvas id="studentChart" width="15rem" height="15rem"></canvas>
      </div>

      <div>
      <button onClick={this.getFlightData}>Get Flight Data</button>
      </div>

      </div>
    )
  }
}

export default Lyft
