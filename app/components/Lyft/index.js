import React from 'react'
import FlightDataService from '../../services/FlightDataService/index'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Lyft extends React.Component {

  constructor() {
    super()

    this.state = {
      latitude: 47,
      longitude: -23
    }

    this.getFlightData = this.getFlightData.bind(this)
    this.flightDataService = new FlightDataService()
  }

  getFlightData() {
    this.flightDataService.getFlightData('LGA')
  }

  render() {

    const mapStyles = {
      width: '100%',
      height: '30rem',
      display: 'block'
    }

    return (
      <div>

      <header className="masthead bg-primary text-white text-center" id='lyftHeader'>
        <div className="container">
        <img src='../../assets/lyft-logo.png' className='lyftLogo'></img>
        </div>
      </header>

      <Map
      google={this.props.google}
      zoom={14}
      initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
      onClick={this.onMapClicked}
      style={mapStyles}
      >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
        </InfoWindow>
      </Map>

      <hr></hr>

      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBaE-JVaFk4HeWmSOYi7s3tsaCYmZrISs0')
})(Lyft)
