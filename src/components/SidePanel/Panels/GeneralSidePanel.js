import React, { useState } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'reactstrap';
import './GeneralSidePanel.css';
import NewBeachSensorMenu from './GeneralSubmenus/NewBeachSensorMenu';
import SimulationMenu from './GeneralSubmenus/SimulationMenu';
import NewBusSensorMenu from './GeneralSubmenus/NewBusSensorMenu';

const GeneralSidePanel = ({
  newBeachSensorData,
  setNewBeachSensorData,
  setLocationMarker,
  createBeachSensor,
  newBusSensorData,
  setNewBusSensorData,
  createBusSensor
}) => {
  const [ submenu, setSubmenu ] = useState('none');
  const [ apiLoading, setApiLoading ] = useState(false);
  const { REACT_APP_SENSOR_BACKEND_API } = process.env;

  const refreshPage = () => {
    window.location.reload();
  };

  const preloadData = async (endpoint) => {
    setApiLoading(true);
    axios
      .post(`${REACT_APP_SENSOR_BACKEND_API}/${endpoint}/preload_data`)
      .then((_res) => {
        refreshPage();
      })
      .catch((error) => console.log(error));
  };

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
    } else if (submenu === 'new-bus-sensor') {
      return (
        <NewBusSensorMenu
          newBusSensorData={newBusSensorData}
          setNewBusSensorData={setNewBusSensorData}
          createBusSensor={createBusSensor}
        />
      );
    } else {
      return <div />;
    }
  };

  const deleteAllSensors = () => {
    setApiLoading(true);
    Promise.all([
      axios.delete(`${REACT_APP_SENSOR_BACKEND_API}/bus_sensors/`).catch((error) => {
        console.log(error);
      }),
      axios.delete(`${REACT_APP_SENSOR_BACKEND_API}/beach_sensors/`).catch((error) => {
        console.log(error);
      })
    ]).then(() => {
      setApiLoading(false);
      refreshPage();
    });
  };

  if (apiLoading) {
    return (
      <div className="activity-indicator">
        <Spinner color="primary" />
      </div>
    );
  } else {
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
            setSubmenu('new-bus-sensor');
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
            preloadData('beach_sensors');
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
            preloadData('bus_sensors');
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
  }
};

export default GeneralSidePanel;
