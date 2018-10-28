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
      longitude: -88.081807,
      maxFlights: 0,
      numDrivers: 0
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

          var myLatlng = new google.maps.LatLng(this.state.latitude, this.state.longitude);
          var myMarker = new google.maps.Marker({
            position: myLatlng,
            title:"Current Location",
            });

          var infowindow1 = new google.maps.InfoWindow({
              content: myMarker.title
            });


          myMarker.addListener('click', function() {
            infowindow1.open(map, myMarker);
          });

            myMarker.setMap(map);

          var airportLatlng = new google.maps.LatLng(43.1225, -77.6666);

          var airportMarker = new google.maps.Marker({
            position: airportLatlng,
            title:"Greater Rochester International Airport",
            icon: '../../assets/airport_marker.png'
            });

            var infowindow2 = new google.maps.InfoWindow({
              content: airportMarker.title
            });


          airportMarker.addListener('click', function() {
            infowindow2.open(map, airportMarker);
          });

            airportMarker.setMap(map);

            this.eventDataService.getEventData(this.state.latitude, this.state.longitude, (events) => {
              let actual_events = events.search.events

              let final_event_obj = actual_events[0].event

              this.setState({ mostPopularEvent : final_event_obj[0]})

              for (var current_event in final_event_obj) {
                let some_obj = final_event_obj[current_event]
                for (var more_current_event in some_obj) {
                  var latitude, longitude, title, stopTime;
                  if (more_current_event == "longitude") {
                    longitude = some_obj[more_current_event]
                    console.log('longitude', longitude)
                  }
                  if (more_current_event == "latitude") {
                    latitude = some_obj[more_current_event]
                    console.log('latitude', latitude)
                  }
                  if (more_current_event == "title") {
                    title = some_obj[more_current_event]
                    console.log('title', title)
                  }
                  if (more_current_event == "stop_time") {
                    stopTime = some_obj[more_current_event]
                    console.log('stopTime', stopTime)
                  }

                  var myLatlng = new google.maps.LatLng(latitude, longitude);


                  var marker = new google.maps.Marker({
                    position: myLatlng,
                    icon: '../../assets/event_marker.png'
                    });

                    marker.setMap(map);
                }
              }
            })


        this.LyftDataService.getNearbyDrivers(this.state.latitude, this.state.longitude, (driversData) => {

          let lyftDrivers = driversData.nearby_drivers[0]
          let lyftPlusDrivers = driversData.nearby_drivers[1]

          var numDrivers = 0;

          for (var driver in lyftDrivers.drivers) {
            let current_driver = lyftDrivers.drivers[driver]

            let latitude = current_driver.locations[0].lat
            let longitude = current_driver.locations[0].lng

            numDrivers += 1;

            var myLatlng = new google.maps.LatLng(latitude, longitude);


            var marker = new google.maps.Marker({
              position: myLatlng,
              icon: '../../assets/car_marker.png'
              });

              marker.setMap(map);
          }

          this.setState({ numDrivers : numDrivers})
        })
      }
    );

    let flightData = this.flightDataService.getFlightData((flightData) => {
          this.setState({ flightData : flightData })
          console.log('this.state.flightData', this.state.flightData)

          var datasets = []

          var time_data = [];
          for (var airportCode in flightData) {


            if (flightData[airportCode].hasOwnProperty('roc')) {
              var attributeKey = airportCode
              var attributeValue = flightData[airportCode]

              for (var moreData in attributeValue) {
                var attributeK = moreData
                var attributeV = attributeValue[moreData]

                for (var date in attributeV) {

                  var data_entry = {
                    data: [],
                    label: date
                  }

                  let some_date = attributeV[date]

                  for (var time in some_date) {
                    if ((typeof(time) === 'string') && (time_data.includes(time) != true)) {
                      time_data.push(time)

                      let some_time = some_date[time]
                      data_entry.data.push(some_time)
                    }

                  }

                    datasets.push(data_entry)

              }
            }
          }
        }

        console.log('datasets', datasets)

        new Chart(document.getElementById("studentChart"), {
          type: 'line',
          data: {
            labels: time_data,
            datasets: [{
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 3, 5, 2, 6, 3, 3, 4, 7, 6, 1, 5, 3, 2, 10],
              label: "Oct 26",
              borderColor: "#3e95cd",
              fill: false
            }, {
              data: [0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 5, 2, 5, 3, 4, 2, 3, 5, 6, 5, 1, 3, 1, 2],
              label: "Oct 27",
              borderColor: "#8e5ea2",
              fill: false
            }, {
              data: [0, 1, 0, 0, 0, 0, 0, 0, 1, 3, 3, 7, 2, 5, 3, 2, 4, 7, 6, 1, 3, 3, 0, 9],
              label: "Oct 28",
              borderColor: "#3cba9f",
              fill: false
            }, {
              data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              label: "Oct 29",
              borderColor: "#e8c3b9",
              fill: false
            }
          ]
        }
      });
    })

}

  render() {

    let eventTitle = (this.state.mostPopularEvent != undefined) ? this.state.mostPopularEvent.title : "Unavailable"
    let eventStopTime = (this.state.mostPopularEvent != undefined) ? this.state.mostPopularEvent.stop_time : "0:00"

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
          <hr className="star-dark mb-5"></hr>
          <p className="lead" id='eventParagraph'>There are 9 flights arriving at 11:00 PM at Greater Rochester International Airport</p>
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

      <section className="portfolio" id='anotherGreen'>
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0" id='eventMiddleTitle'>Events</h2>
          <hr className="star-light mb-5"></hr>
          <p className="lead" id='eventParagraph'>The most popular event within a 25 mile radius from you is <b>{eventTitle}</b> located at n/a and ends at approximately <b>{eventStopTime}</b></p>
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
          <hr className="star-dark mb-5"></hr>
          <p className="lead" id='eventParagraph'>There are currently <b>{this.state.numDrivers}</b> other Lyft drivers working in your area.</p>
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


      <div className='dashboardStudentContainer' id='dashboardStudentContainer'>
      <h3 id='flightChartTitle'>Greater Rochester International Airport Flight Times</h3>
        <canvas id="studentChart"></canvas>
      </div>

      </div>
    )
  }
}

export default Lyft
