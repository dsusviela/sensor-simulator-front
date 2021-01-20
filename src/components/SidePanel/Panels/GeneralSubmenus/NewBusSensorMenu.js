import React from 'react';
import { Label, Input, Button } from 'reactstrap';
import './NewBusSensorMenu.css';

const NewBusSensorMenu = ({ newBusSensorData, setNewBusSensorData, createBusSensor }) => {
  const setBusData = (value) => {
    if (value === '405') {
      setNewBusSensorData({
        ...newBusSensorData,
        ...{
          location_index: 0,
          line: 405,
          subline: 3,
          direction: 'B'
        }
      });
    } else {
      setNewBusSensorData({
        ...newBusSensorData,
        ...{
          location_index: 0,
          line: 192,
          subline: 1,
          direction: 'A'
        }
      });
    }
  };

  const changeIsAlive = (newValue) => {
    const aliveValue = newValue === 'on';
    setNewBusSensorData({ ...newBusSensorData, ...{ alive: aliveValue } });
  };

  return (
    <div className="sub-menu--buses">
      <div className="sub-menu--input-row--center">
        <Input
          className="sub-menu--input-row--input__width-440"
          type="select"
          name="select"
          onChange={(event) => {
            setBusData(event.target.value);
          }}
        >
          <option value="405">405 PEÑAROL</option>
          <option value="192">192 MANGA</option>
        </Input>
      </div>
      <div className="sub-menu--input-row">
        <Label for="periodo">Período</Label>
        <Input id="periodo" placeholder="Entero" className="sub-menu--input__width-75" onChange={(event) => {}} />
        <Label check> Activo</Label>
        <br />
        <Input
          type="checkbox"
          onChange={(event) => {
            changeIsAlive(event.target.value);
          }}
        />
        <Button className="sub-menu--button" onClick={() => createBusSensor(newBusSensorData)}>
          Crear
        </Button>
      </div>
    </div>
  );
};

export default NewBusSensorMenu;