/* global google */
import React from 'react';
import { withFirebaseHOC } from '../../../firebase'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import Marker from "./Marker";

const MapContainer = withScriptjs(withGoogleMap((props) => {
    const markers = props.directions.map(dir => <Marker
                      key={dir.uid}
                      doctor={dir}
                      position={{lat: dir.closestPractice.lat, lng: dir.closestPractice.lon}}
                    />);

      return (
              <GoogleMap
                defaultZoom={14}
                center={ { lat:  19.07285, lng: 72.8823 } }
                >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
                {markers}
              </GoogleMap>
      );
  }
))

export default MapContainer;
