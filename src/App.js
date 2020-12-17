import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [ locationMarker, setLocationMarker ] = useState([]);
  const [ beachFeatureData, setBeachFeatureData ] = useState([]);

  const { REACT_APP_SENSOR_BACKEND_API, REACT_APP_FEATURE_PROVIDER } = process.env;

  useEffect(() => {
    axios
      .get(`${REACT_APP_SENSOR_BACKEND_API}/beach_sensors`)
      .then((res) => {
        populateBeachSensors(res.data);
      })
      .catch((error) => console.log(error));
    // axios.get(`${REACT_APP_FEATURE_PROVIDER}/playas/items`).then()
  }, []);

  const createBeachSensor = (payload) => {
    console.log(payload);
    axios
      .post(`${REACT_APP_SENSOR_BACKEND_API}/beach_sensors`, payload)
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
          selectSensor={(sensor) => {
            setSelectedSensor(sensor);
            setSelectedTab('sensor');
          }}
        />
      );
    });
    setBeachSensors(sensors);
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
        setLocationMarker={setLocationMarker}
        locationMarker={locationMarker}
      />
      <SidePanel
        className="app__side-panel"
        selectedSensor={selectedSensor}
        selectedTab={selectedTab}
        setSelectedTab={selectNewTab}
        newBeachSensorData={newBeachSensorData}
        setNewBeachSensorData={setNewBeachSensorData}
        setLocationMarker={setLocationMarker}
        createBeachSensor={createBeachSensor}
      />
      <Advanced className="app__advanced" />
    </div>
  );
};

export default App;
