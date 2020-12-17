import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import './GeneralSidePanel.css';
import NewBeachSensorMenu from './GeneralSubmenus/NewBeachSensorMenu';
import SimulationMenu from './GeneralSubmenus/SimulationMenu';

const GeneralSidePanel = ({ newBeachSensorData, setNewBeachSensorData, setLocationMarker, createBeachSensor }) => {
  const [ submenu, setSubmenu ] = useState('none');
  const { REACT_APP_SENSOR_BACKEND_API } = process.env;

  const renderSubMenu = () => {
    if (submenu === 'new-beach-sensor') {
      return (
        <NewBeachSensorMenu
          newBeachSensorData={newBeachSensorData}
          setNewBeachSensorData={setNewBeachSensorData}
          createBeachSensor={createBeachSensor}
        />
      );
    } else if (submenu === 'simulation') {
      return <SimulationMenu />;
    } else {
      return <div />;
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const deleteAllSensors = () => {
    axios
      .delete(`${REACT_APP_SENSOR_BACKEND_API}/bus_sensors/`)
      .then(axios.delete(`${REACT_APP_SENSOR_BACKEND_API}/beach_sensors/`).then(refreshPage()));
  };

  return (
    <div className="general-panel">
      <Button
        className="general-main-tab--button"
        onClick={() => {
          setSubmenu('simulation');
        }}
      >
        Simular
      </Button>
      <Button
        className="general-main-tab--button"
        onClick={() => {
          setSubmenu('new-beach-sensor');
        }}
      >
        Crear sensor de playas
      </Button>
      <Button
        className="general-main-tab--button"
        onClick={() => {
          setLocationMarker([]);
          setNewBeachSensorData({ ...newBeachSensorData, ...{ listeningForLocation: false } });
          setSubmenu('none');
        }}
      >
        Crear sensor omnibus
      </Button>
      <Button
        className="general-main-tab--button"
        onClick={() => {
          setLocationMarker([]);
          setNewBeachSensorData({ ...newBeachSensorData, ...{ listeningForLocation: false } });
          setSubmenu('none');
        }}
      >
        Precargar datos de playas
      </Button>
      <Button
        className="general-main-tab--button"
        onClick={() => {
          setLocationMarker([]);
          setNewBeachSensorData({ ...newBeachSensorData, ...{ listeningForLocation: false } });
          setSubmenu('none');
        }}
      >
        Precargar datos de omnibus
      </Button>
      <Button
        className="general-main-tab--button"
        onClick={() => {
          setLocationMarker([]);
          setNewBeachSensorData({ ...newBeachSensorData, ...{ listeningForLocation: false } });
          setSubmenu('none');
          deleteAllSensors();
        }}
      >
        Limpiar los sensores
      </Button>
      <hr />
      {renderSubMenu()}
    </div>
  );
};

export default GeneralSidePanel;
