/* global google */
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Redirect } from "react-router-dom";
import { withFirebaseHOC } from '../../../firebase'
// import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import MapContainer from './MapContainer'
const url = "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCUSWjSKUXyiqrNOFPoZg-HKUH3AyMZrXs&callback=initMap"

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      }, () => {
        console.log('Unable to get location');
      });
    }


  }

  render() {

    if(this.props.isLoggedIn) {
      if(this.props.location.state) {
        return (
          <div>
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
                <h1>{this.props.location.state.data.bikeId}</h1>
                <MapContainer
                  directions={this.props.directions}
                  googleMapURL={url}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `600px`, width: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Col>
            </Row>
          </div>
        );
      }
      else {
        return <Redirect to="/scan" />
      }
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

Map.defaultProps = {
  directions: [
    {
      uid: 1,
      closestPractice: {
        lat: 19.07283,
        lon: 72.88261
      }
    },
  ]
}


export default Map;
