import React, { useEffect, useState } from 'react';
import { Label, Spinner, Input, Button } from 'reactstrap';
import axios from 'axios';
import './SensorPanel.css';

const SensorPanel = ({ sensor }) => {
  const [ loading, setLoading ] = useState(false);
  const [ sensorValues, setSensorValues ] = useState({});
  const [ fixed, setFixed ] = useState(false);
  const [ alive, setAlive ] = useState(false);
  const [ data, setData ] = useState('Seleccione un sensor en el mapa.');
  const [ maxOptions, setMaxOptions ] = useState(0);
  const { REACT_APP_SENSOR_BACKEND_API } = process.env;

  const optionLabels = {
    agua: [ 'No permitida', 'Permitida' ],
    bandera: [ 'Roja', 'Amarilla', 'Verde' ],
    uv: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const updateFixedValue = (data) => {
    setSensorValues({ ...sensorValues, ...{ fixed_value: data } });
  };

  const setFixedValue = () => {
    setFixed(!fixed);
    setSensorValues({ ...sensorValues, ...{ fixed: !fixed } });
  };

  const setAliveValue = () => {
    setAlive(!alive);
    setSensorValues({ ...sensorValues, ...{ alive: !alive } });
  };

  const setMaxValue = (data) => {
    setSensorValues({ ...sensorValues, ...{ random_ceil: data } });
  };

  const setMinValue = (data) => {
    setMaxOptions(data);
    setSensorValues({ ...sensorValues, ...{ random_floor: data } });
  };

  const inputForMin = () => {
    if (data['sensor_type'] === 'personas') {
      return inputForRange(false);
    } else {
      return (
        <Input
          className="sub-menu--input-row--input__width-225"
          type="select"
          name="select"
          onChange={(event) => setMinValue(event.target.value)}
          value={sensorValues['random_floor']}
        >
          {renderAllOptions()}
        </Input>
      );
    }
  };

  const inputForMax = () => {
    if (data['sensor_type'] === 'personas') {
      return inputForRange(true);
    } else {
      return (
        <Input
          className="sub-menu--input-row--input__width-225"
          type="select"
          name="select"
          onChange={(event) => setMaxValue(event.target.value)}
          value={sensorValues['random_ceil']}
        >
          {renderOptions()}
        </Input>
      );
    }
  };

  const renderAllOptions = () => {
    console.log('bum');
    console.log(data);
    const labels = optionLabels[data['sensor_type']] || [];
    return [ ...Array(labels.length).keys() ].map((index) => {
      const displayValue = labels[index];
      return (
        <option value={`${index}`} key={index}>
          {displayValue}
        </option>
      );
    });
  };

  const renderOptions = () => {
    const labels = optionLabels[data['sensor_type']] || [];
    return [ ...Array(labels.length).keys() ]
      .filter((item) => {
        return maxOptions <= item;
      })
      .map((index) => {
        const displayValue = labels[index];
        return (
          <option value={`${index}`} key={index}>
            {displayValue}
          </option>
        );
      });
  };

  const inputForRange = (isMax) => {
    const id = isMax ? 'randomMax' : 'randomMin';
    const onChangeFunc = isMax ? setMaxValue : setMinValue;
    return (
      <Input
        id={`${id}`}
        placeholder="Entero"
        className="sub-menu--input__width-150"
        onChange={(event) => onChangeFunc(event.target.value)}
      />
    );
  };

  const generateSensorView = () => {
    if (data === 'Seleccione un sensor en el mapa.') {
      return <div className="sensor-panel--empty">{`${data}`}</div>;
    }
    if (data === undefined) {
      return <div className="sensor-panel--empty">{'Seleccione un sensor en el mapa.'}</div>;
    } else {
      if (sensor[1] === 'beach') {
        return (
          <div className="sensor-panel">
            <div className="sensor-panel--row">
              <Label>ID: </Label>
              <Input id="id" disabled={true} placeholder={`${data.id}`} className="sub-menu--input__width-130" />
            </div>
            <div className="sensor-panel--row">
              <Label>Tipo de sensor: </Label>
              <Input
                id="id"
                disabled={true}
                placeholder={`${data.sensor_type}`}
                className="sub-menu--input__width-130"
              />
            </div>
            <div className="sensor-panel--row">
              <Label>Minimo: </Label>
              {inputForMin()}
            </div>
            <div className="sensor-panel--row">
              <Label>Maximo: </Label>
              {inputForMax()}
            </div>
            <div className="sensor-panel--row">
              <Label>Activo: </Label>
              <Input type="checkbox" checked={alive} onChange={(event) => setAliveValue(event.target.value)} />
            </div>
            <div className="sensor-panel--row">
              <Label>Fijo: </Label>
              <Input type="checkbox" checked={fixed} onChange={(event) => setFixedValue(event.target.value)} />
            </div>
            <div className="sensor-panel--row">
              <Label>Valor Fijo: </Label>
              <Input
                id="id"
                disabled={false}
                placeholder={`${data.fixed_value}`}
                className="sub-menu--input__width-130"
                onChange={(event) => updateFixedValue(event.target.value)}
              />
            </div>
            <Button className="sub-menu--button" onClick={() => updateSensor()}>
              Actualizar
            </Button>
          </div>
        );
      } else {
        return (
          <div className="sensor-panel">
            <div className="sensor-panel--row">
              <Label>ID: </Label>
              <Input id="id" disabled={true} placeholder={`${data.id}`} className="sub-menu--input__width-130" />
            </div>
            <div className="sensor-panel--row">
              <Label>Tipo de sensor: </Label>
              <Input id="id" disabled={true} placeholder={`Bus`} className="sub-menu--input__width-130" />
            </div>
            <div className="sensor-panel--row">
              <Label>Activo: </Label>
              <Input type="checkbox" checked={alive} onChange={() => setAliveValue()} />
            </div>
            <Button className="sub-menu--button" onClick={() => updateSensor()}>
              Actualizar
            </Button>
          </div>
        );
      }
    }
  };

  const fetchSensorData = () => {
    if (sensor === null) {
      return;
    }
    setLoading(true);
    axios
      .get(`${REACT_APP_SENSOR_BACKEND_API}/${sensor[1]}_sensors/${sensor[0]}`)
      .then((res) => {
        setData(res.data);
        setFixed(res.data.fixed);
        setAlive(res.data.alive);
        const offset = res.data.sensor_type === 'uv' ? 1 : 0;
        setSensorValues({
          random_floor: res.data.random_floor - offset,
          random_ceil: res.data.random_ceil - offset
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const updateSensor = () => {
    if (sensor === null) {
      return;
    }
    setLoading(true);
    const payload = { ...sensorValues };
    axios
      .patch(`${REACT_APP_SENSOR_BACKEND_API}/${sensor[1]}_sensors/${sensor[0]}`, payload)
      .then((res) => {
        setData(res.data);
        setFixed(res.data.fixed);
        setAlive(res.data.alive);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    refreshPage();
  };

  useEffect(
    () => {
      fetchSensorData();
    },
    [ sensor ]
  );

  if (loading) {
    return (
      <div className="sensor-panel--empty">
        <Spinner color="primary" />
      </div>
    );
  } else {
    return generateSensorView(data);
  }
};

export default SensorPanel;
