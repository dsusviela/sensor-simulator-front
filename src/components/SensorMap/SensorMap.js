import React, { useRef } from 'react';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import './SensorMap.css';

const SensorMap = ({ selectSensor }) => {
  const mapRef = useRef();

  return (
    <Map center={[ -34.91796, -56.166744 ]} zoom={15} scrollWheelZoom={false} ref={mapRef}>
      <TileLayer
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[ -34.91796, -56.166744 ]} onClick={() => selectSensor(0)}>
        <Popup>asda</Popup>
      </Marker>
    </Map>
  );
};

export default SensorMap;
