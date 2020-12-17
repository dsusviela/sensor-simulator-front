import React, { useEffect, useState } from 'react';
import { Label, Spinner, Button } from 'reactstrap';
import axios from 'axios';
import './SensorPanel.css';

const SensorPanel = ({ sensor }) => {
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState('Seleccione un sensor en el mapa.');
  const { REACT_APP_SENSOR_BACKEND_API } = process.env;

  const generateSensorView = () => {
    if (data === 'Seleccione un sensor en el mapa.') {
      return <div>{`${data}`}</div>;
    }
    if (data === undefined) {
      return <div>{'Seleccione un sensor en el mapa.'}</div>;
    }
    return (
      <div className="sensor-panel">
        <div className="sensor-panel--row">
          <Label>ID: </Label>
          <Label>{`${data.id}`}</Label>
        </div>
        <div className="sensor-panel--row">
          <Label>Tipo de sensor: </Label>
          <Label>{`${data.sensor_type}`}</Label>
        </div>
        <div className="sensor-panel--row">
          <Label>Maximo: </Label>
          <Label>{`${data.random_ceil}`}</Label>
        </div>
        <div className="sensor-panel--row">
          <Label>Minimo: </Label>
          <Label>{`${data.random_floor}`}</Label>
        </div>
        <div className="sensor-panel--row">
          <Label>Activo: </Label>
          <Label>{`${data.alive}`}</Label>
        </div>
        <div className="sensor-panel--row">
          <Label>Fijo: </Label>
          <Label>{`${data.fixed}`}</Label>
        </div>
        <div className="sensor-panel--row">
          <Label>Valor Fijo: </Label>
          <Label>{`${data.fixed_value}`}</Label>
        </div>
      </div>
    );
  };

  const fetchSensorData = () => {
    if (sensor === null) {
      return;
    }
    setLoading(true);
    axios
      .get(`${REACT_APP_SENSOR_BACKEND_API}/beach_sensors/${sensor}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(
    () => {
      fetchSensorData();
    },
    [ sensor ]
  );

  if (loading) {
    return <Spinner color="dark" />;
  } else {
    return generateSensorView(data);
  }
};

export default SensorPanel;
