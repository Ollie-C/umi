import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import "./Map.scss";

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin__icon" />
    <p className="pin__text">{text}</p>
  </div>
);

const Map = ({ apiKey, location, zoomLevel }) => (
  <div className="map-wrapper">
    <GoogleMapReact
      bootstrapURLKeys={{ apiKey }}
      defaultCenter={location}
      defaultZoom={zoomLevel}
    >
      <LocationPin
        lat={location.lat}
        lng={location.lng}
        text={location.address}
      />
    </GoogleMapReact>
  </div>
);

export default Map;