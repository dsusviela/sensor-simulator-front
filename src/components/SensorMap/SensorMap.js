import React, { useRef } from 'react';
import { CircleMarker, Map, TileLayer } from 'react-leaflet';
import './SensorMap.css';
import Legend from './Legend';
import 'leaflet/dist/leaflet.css';

const SensorMap = ({
  selectSensor,
  className,
  beachSensors,
  newBeachSensorData,
  setNewBeachSensorData,
  busSensors,
  setLocationMarker,
  locationMarker,
  typeColorMap
}) => {
  const mapRef = useRef();

  const parseLatLng = (latlng) => {
    return `${latlng.lat}, ${latlng.lng}`;
  };

  const updateLocation = (event) => {
    if (newBeachSensorData.listeningForLocation) {
      setLocationMarker([ <CircleMarker map={mapRef} key={'imakey'} center={event.latlng} /> ]);
      setNewBeachSensorData({ ...newBeachSensorData, ...{ location: parseLatLng(event.latlng) } });
    }
  };

  return (
    <div className={className}>
      <Map center={[ -34.91796, -56.166744 ]} zoom={15} scrollWheelZoom={false} ref={mapRef} onClick={updateLocation}>
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {beachSensors}
        {busSensors}
        {locationMarker}
        <Legend layers={typeColorMap}/>
      </Map>
    </div>
  );
};

export default SensorMap;
