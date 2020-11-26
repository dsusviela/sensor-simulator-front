import React, { useState } from 'react';
import './App.css';
import SensorMap from './components/SensorMap/SensorMap';
import SidePanel from './components/SidePanel/SidePanel';

const App = () => {
  const [ selectedSensor, setSelectedSensor ] = useState({});
  const [ selectedTab, setSelectedTab ] = useState('general');

  return (
    <div className="app">
      <div className="app__map">
        <SensorMap
          selectSensor={(sensor) => {
            console.log(sensor);
            setSelectedSensor(sensor);
            setSelectedTab('sensor');
          }}
        />
      </div>
      <SidePanel selectedSensor={selectedSensor} selectedTab={selectedTab} setSelectedTab={(tab) => setSelectedTab(tab)}/>
    </div>
  );
};

export default App;
