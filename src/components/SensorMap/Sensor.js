import React from 'react';
import { CircleMarker } from 'react-leaflet';

const Sensor = ({ data, selectSensor }) => {
  const typeColorMap = {
    uv: 'purple',
    bandera: 'green',
    agua: 'red',
    personas: 'black',
    bus: 'blue'
  };
  return (
    <CircleMarker
      onClick={() => selectSensor(data.id)}
      center={data.location.coordinates}
      fillColor={typeColorMap[data.sensor_type]}
      color={'black'}
      radius={7}
      weight={0.6}
      opacity={0.7}
      fillOpacity={0.7}
      onMouseOver={(e) => e.target.setStyle({ opacity: 1, weight: 2 })}
      onMouseOut={(e) => e.target.setStyle({ opacity: 0.7, weight: 0.6 })}
    >
      {/* {featureInfo(feature, info)} */}
    </CircleMarker>
  );
};

export default Sensor;
