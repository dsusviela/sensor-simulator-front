import React, { useState } from 'react';
import './App.css';
import SensorMap from './components/SensorMap/SensorMap';
import SidePanel from './components/SidePanel/SidePanel';

const App = () => {
  const [ selectedSensor, setSelectedSensor ] = useState(null);

  return (
    <div className="app">
      <div className="app__map">
        <SensorMap
          selectSensor={(id) => {
            console.log(id);
            setSelectedSensor(id);
          }}
        />
      </div>
      <div className="app__sideboard">
        <SidePanel selectedSensor={selectedSensor} />
      </div>
    </div>
  );
};

export default App;
