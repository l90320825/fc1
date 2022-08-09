import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow, DirectionsRenderer } from "google-maps-react";
//const NodeGeocoder = require('node-geocoder');
//var geocoder = require('google-geocoder');
//const net = require('net');
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

/**
 * After VP: make this so I can pass a parameter of address to get that map
 */

const mapStyles = {
  margin: "10px",
  width: "55%",
  height: "50%",
  position: "relative",
  border: "solid",
  borderRadius: "10px",
};

function MapContainer(props) {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [latLon, setLatLon] = useState({ lat: 1, lng: 1 });
  const [latLon2, setLatLon2] = useState({ lat: 37.7227669, lng: -122.47891 });

  const getCoordinates = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${props.name}&key=AIzaSyDgxMmRpNuAUHiSSHFCBhjRlQImItrHrsc`;
    await axios
      .get(url)
      .then((response) => {
        console.log(JSON.stringify(response.data.results[0].geometry.location));
        setLatLon(response.data.results[0].geometry.location);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCoordinates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    calculateDistance();
  }, []);

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const onClose = () => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const calculateDistance = () => {
    const { google } = props;
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        // 265 Winston Dr, San Francisco, CA 94132, USA
        origins: [{ lat: 37.7266474, lng: -122.4763117 }],
        // 1600 Holloway Ave, San Francisco, CA 94132, USA
        destinations: [{ lat: 37.7227669, lng: -122.47891 }],
        travelMode: "DRIVING",
      },
      (response, status) => {
        console.log("response", response);
        console.log("status", status);
      }
    );
  };

  const { google } = props;

  return (
    <Map
      google={google}
      zoom={12}
      style={mapStyles}
      initialCenter={latLon}
      center={latLon}
    >
     
      <Marker onClick={onMarkerClick} name={props.name} position={latLon} />
      <Marker onClick={onMarkerClick} name={"SFSU"} position={latLon2} />
      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4 className='map-name'>{selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDgxMmRpNuAUHiSSHFCBhjRlQImItrHrsc",
})(MapContainer);
