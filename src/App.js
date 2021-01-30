import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useInterval from '@use-it/interval';
import './App.css';
import Sensor from './components/SensorMap/Sensor';
import SensorMap from './components/SensorMap/SensorMap';
import SidePanel from './components/SidePanel/SidePanel';
import Advanced from './components/Advanced/Advanced';

const App = () => {
  const [ selectedSensor, setSelectedSensor ] = useState(null);
  const [ beachSensors, setBeachSensors ] = useState([]);
  const [ selectedTab, setSelectedTab ] = useState('general');
  const [ newBeachSensorData, setNewBeachSensorData ] = useState({
    sensor_type: 'agua',
    beach_id: '1',
    location: '0.0, 0.0',
    random_floor: '1',
    random_ceil: '0',
    alive: false,
    fixed: false,
    fixed_value: '1',
    period: 5,
    listeningForLocation: false
  });
  const [ busSensors, setBusSensors ] = useState([]);
  const [ newBusSensorData, setNewBusSensorData ] = useState({
    alive: false,
    location_index: 0,
    line: 405,
    subline: 3,
    direction: 'B'
  });
  const [ locationMarker, setLocationMarker ] = useState([]);
  const [ beachFeatureData, setBeachFeatureData ] = useState([]);

  const { REACT_APP_SENSOR_BACKEND_API, REACT_APP_FEATURE_PROVIDER } = process.env;

  const typeColorMap = {
    uv: 'purple',
    bandera: 'blue',
    agua: 'red',
    personas: 'white',
    bus: 'darkcyan'
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_SENSOR_BACKEND_API}/beach_sensors`)
      .then((res) => {
        populateBeachSensors(res.data);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${REACT_APP_SENSOR_BACKEND_API}/bus_sensors`)
      .then((res) => {
        populateBusSensors(res.data);
      })
      .catch((error) => console.log(error));
    // axios.get(`${REACT_APP_FEATURE_PROVIDER}/playas/items`).then()
  }, []);

  useInterval(() => {
    axios
      .get(`${REACT_APP_SENSOR_BACKEND_API}/bus_sensors`)
      .then((res) => {
        populateBusSensors(res.data);
      })
      .catch((error) => console.log(error));
  }, 5000);

  const createBeachSensor = (payload) => {
    axios
      .post(`${REACT_APP_SENSOR_BACKEND_API}/beach_sensors`, payload)
      .then((res) => refreshPage())
      .catch((err) => console.log(err));
  };

  const createBusSensor = (payload) => {
    axios
      .post(`${REACT_APP_SENSOR_BACKEND_API}/bus_sensors`, payload)
      .then((res) => refreshPage())
      .catch((err) => console.log(err));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const populateBeachSensors = (beachSensorData) => {
    const sensors = beachSensorData.map((beachSensor, index) => {
      return (
        <Sensor
          key={index}
          data={beachSensor}
          typeColorMap={typeColorMap}
          selectSensor={(sensor) => {
            setSelectedSensor([ sensor, 'beach' ]);
            setSelectedTab('sensor');
          }}
        />
      );
    });
    setBeachSensors(sensors);
  };

  const populateBusSensors = (busSensorData) => {
    const sensors = busSensorData.map((busSensor, index) => {
      busSensor['sensor_type'] = 'bus';
      return (
        <Sensor
          key={index}
          data={busSensor}
          typeColorMap={typeColorMap}
          selectSensor={(sensor) => {
            setSelectedSensor([ sensor, 'bus' ]);
            setSelectedTab('sensor');
          }}
        />
      );
    });
    setBusSensors(sensors);
  };

  const selectNewTab = (tab) => {
    setSelectedTab(tab);
    setNewBeachSensorData({ ...newBeachSensorData, ...{ listeningForLocation: false } });
    setLocationMarker([]);
  };

  return (
    <div className="app">
      <SensorMap
        className="app__map"
        beachSensors={beachSensors}
        newBeachSensorData={newBeachSensorData}
        setNewBeachSensorData={setNewBeachSensorData}
        busSensors={busSensors}
        setLocationMarker={setLocationMarker}
        locationMarker={locationMarker}
        typeColorMap={typeColorMap}
      />
      <SidePanel
        className="app__side-panel"
        selectedSensor={selectedSensor}
        selectedTab={selectedTab}
        setSelectedTab={selectNewTab}
        newBeachSensorData={newBeachSensorData}
        setNewBeachSensorData={setNewBeachSensorData}
        createBeachSensor={createBeachSensor}
        setLocationMarker={setLocationMarker}
        newBusSensorData={newBusSensorData}
        setNewBusSensorData={setNewBusSensorData}
        createBusSensor={createBusSensor}
      />
      <Advanced className="app__advanced" />
    </div>
  );
};

export default App;
