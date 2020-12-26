import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  ))
);

const MapsUi = ({ match }) => {
  return (
    <>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div className="map-item" />}
        containerElement={<div className="map-item" />}
        mapElement={<div className="map-item" />}
      />
    </>
  );
};
export default MapsUi;
