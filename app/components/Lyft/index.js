import React from 'react'
import EventDataService from '../../services/EventDataService/index'
import FlightDataService from '../../services/FlightDataService/index'
import LyftDataService from '../../services/LyftDataService/index'
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
    this.eventDataService = new EventDataService()
    this.LyftDataService = new LyftDataService()
  }

  getFlightData() {
    this.flightDataService.getFlightData('LGA')
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { lat, lon } = position.coords;
        //console.log(position);

        this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
        });

        var pyrmont = {lat: this.state.latitude, lng: this.state.longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 14});

        this.LyftDataService.getNearbyDrivers(this.state.latitude, this.state.longitude, (driversData) => {
          /*
          console.log('drivers data', driversData)
          console.log('typeof(driversData)', typeof(driversData))
          console.log('driversData.nearby_drivers', driversData.nearby_drivers)
          console.log('typeof(driversData.nearby_drivers)', typeof(driversData.nearby_drivers))
          console.log('driversData.nearby_drivers[0]', driversData.nearby_drivers[0])
          */

          let lyftDrivers = driversData.nearby_drivers[0]
          let lyftPlusDrivers = driversData.nearby_drivers[1]


          console.log('lyftDrivers', lyftDrivers)
          console.log('typeof(lyftDrivers)', typeof(lyftDrivers))

          console.log('lyftDrivers.drivers', lyftDrivers.drivers)
          console.log('typeof(lyftDrivers.drivers)', typeof(lyftDrivers.drivers))

          for (var driver in lyftDrivers.drivers) {
            let current_driver = lyftDrivers.drivers[driver]
            /*
            console.log('current_driver', current_driver)
            console.log('typeof(current_driver)', typeof(current_driver))
            console.log('current_driver[0]', current_driver[0])
            console.log('current_driver.locations[0]', current_driver.locations[0])
            */
            let latitude = current_driver.locations[0].lat
            let longitude = current_driver.locations[0].lng

            console.log('latitude', latitude)
            console.log('longitude', longitude)

            var myLatlng = new google.maps.LatLng(latitude, longitude);


            var marker = new google.maps.Marker({
              position: myLatlng
              });

              marker.setMap(map);
          }
        })
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


  this.eventDataService.getEventData((events) => {
    console.log("events", events)
  })

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
          <h2 className="text-center text-uppercase text-secondary mb-0" id='timeTitle'>Flights</h2>
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

      <section className="portfolio">
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0" id='timeTitle'>Events</h2>
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

      <section className="portfolio">
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0" id='timeTitle'>Competition</h2>
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
