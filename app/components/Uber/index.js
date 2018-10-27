import React from 'react'
import FlightDataService from '../../services/FlightDataService/index'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Uber extends React.Component {

  constructor(props) {
    super(props)

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

  componentDidMount(){
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
  }

  render() {

    const mapStyles = {
      width: '100%',
      height: '30rem',
      display: 'block'
    }

    return (
      <div>

      <header className="masthead bg-primary text-white text-center" id="uberHeader">
        <div className="container">
        <img src='../../assets/uber_2016_logo.png' className='uberLogo' style={{maxHeight:'50px'}}></img>
        </div>
      </header>

      <Map
      google={this.props.google}
      zoom={14}
      initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
      center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}    
      onClick={this.onMapClicked}
      style={mapStyles}
      >

        <Marker onClick={this.onMarkerClick} name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
        </InfoWindow>
      </Map>

      <button>airport</button>

      <hr></hr>

      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBaE-JVaFk4HeWmSOYi7s3tsaCYmZrISs0')
})(Uber)
