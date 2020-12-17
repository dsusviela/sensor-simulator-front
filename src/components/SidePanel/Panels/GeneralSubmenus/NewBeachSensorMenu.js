import React from 'react';
import { Label, Input, Button } from 'reactstrap';
import './NewBeachSensorMenu.css';

const NewBeachSensorMenu = ({ newBeachSensorData, setNewBeachSensorData, createBeachSensor }) => {
  const changeSensorType = (newValue) => {
    setNewBeachSensorData({ ...newBeachSensorData, ...{ sensor_type: newValue } });
  };

  const changeBeachId = (newValue) => {
    setNewBeachSensorData({ ...newBeachSensorData, ...{ beach_id: newValue } });
  };

  const changeMaxNumber = (newValue) => {
    setNewBeachSensorData({ ...newBeachSensorData, ...{ random_ceil: newValue } });
  };

  const changeMinNumber = (newValue) => {
    setNewBeachSensorData({ ...newBeachSensorData, ...{ random_floor: newValue } });
  };

  const changePeriod = (newValue) => {
    setNewBeachSensorData({ ...newBeachSensorData, ...{ period: newValue } });
  };

  const changeIsFixed = (newValue) => {
    const fixedValue = newValue === 'on';
    setNewBeachSensorData({ ...newBeachSensorData, ...{ fixed: fixedValue } });
  };

  const changeIsAlive = (newValue) => {
    const aliveValue = newValue === 'on';
    setNewBeachSensorData({ ...newBeachSensorData, ...{ alive: aliveValue } });
  };

  const changeFixedValue = (newValue) => {
    setNewBeachSensorData({ ...newBeachSensorData, ...{ fixed_value: newValue } });
  };

  const changeIsListeningForLocation = (newValue) => {
    setNewBeachSensorData({ ...newBeachSensorData, ...{ listeningForLocation: newValue } });
  };

  const parseLatLng = (latlng) => {
    var parsedLatLng = latlng.split(', ');
    parsedLatLng = parsedLatLng.map((elem) => {
      return parseFloat(elem);
    });
    return `${parsedLatLng[0].toFixed(2)}, ${parsedLatLng[1].toFixed(2)}`;
  };

  return (
    <div className="sub-menu">
      <div className="sub-menu--input-row">
        <Input
          className="sub-menu--input-row--input"
          type="select"
          name="select"
          onChange={(event) => changeSensorType(event.target.value)}
        >
          <option value="agua">Sensor de Agua</option>
          <option value="personas">Sensor de Personas</option>
          <option value="uv">Sensor UV</option>
          <option value="banderas">Sensor de Bandera</option>
        </Input>
        <div className="separator" />
        <Input
          className="sub-menu--input-row--input"
          type="select"
          name="select"
          onChange={(event) => changeBeachId(event.target.value)}
        >
          <option value="1">Playa Ramirez</option>
          <option value="2">Pocitos</option>
          <option value="3">Buceo</option>
        </Input>
      </div>
      <div className="sub-menu--input-row">
        <div className="sub-menu--input-row--input">
          <Label for="randomMin">Mínimo</Label>
          <Input
            id="randomMin"
            placeholder="Entero"
            className="sub-menu--input__width-75"
            onChange={(event) => changeMinNumber(event.target.value)}
          />
        </div>
        <div className="sub-menu--input-row--input">
          <Label for="randomMax">Máximo</Label>
          <Input
            id="randomMax"
            placeholder="Entero"
            className="sub-menu--input__width-75"
            onChange={(event) => changeMaxNumber(event.target.value)}
          />
        </div>
        <div className="sub-menu--input-row--input">
          <Label for="periodo">Período</Label>
          <Input
            id="periodo"
            placeholder="Entero"
            className="sub-menu--input__width-75"
            onChange={(event) => changePeriod(event.target.value)}
          />
        </div>
      </div>
      <div className="sub-menu--input-row">
        <div className="sub-menu--input-row--input__checkbox">
          <Label check> Activo</Label>
          <Input type="checkbox" onChange={(event) => changeIsAlive(event.target.value)} />
        </div>
        <div className="sub-menu--input-row--input__checkbox">
          <Label check> Fijo</Label>
          <Input type="checkbox" onChange={(event) => changeIsFixed(event.target.value)} />
        </div>
        <div className="sub-menu--input-row--input">
          <Label for="fixedValue">Valor Fijo</Label>
          <Input
            id="fixedValue"
            placeholder="Numero entero"
            className="sub-menu--input__width-150"
            onChange={(event) => changeFixedValue(event.target.value)}
          />
        </div>
      </div>
      <div className="sub-menu--input-row">
        <div className="sub-menu--input-row--input">
          <Label for="location">Posicion</Label>
          <Input
            id="location"
            disabled={!newBeachSensorData.listeningForLocation}
            placeholder={parseLatLng(newBeachSensorData.location)}
            className="sub-menu--input__width-130"
          />
          <Button
            onClick={() => {
              changeIsListeningForLocation(!newBeachSensorData.listeningForLocation);
            }}
          >
            {'+'}
          </Button>
        </div>
        <Button className="sub-menu--button" onClick={() => createBeachSensor(newBeachSensorData)}>
          Crear
        </Button>
      </div>
    </div>
  );
};

export default NewBeachSensorMenu;
