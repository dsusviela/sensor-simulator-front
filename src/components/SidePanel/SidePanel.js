import React from 'react';
import GeneralSidePanel from './Panels/GeneralSidePanel';
import SensorPanel from './Panels/SensorPanel';
import './SidePanel.css';
import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';

const SidePanel = ({
  selectedSensor,
  selectedTab,
  setSelectedTab,
  className,
  newBeachSensorData,
  setNewBeachSensorData,
  setLocationMarker,
  createBeachSensor,
  newBusSensorData,
  setNewBusSensorData,
  createBusSensor
}) => {
  return (
    <div className={className}>
      <Nav fill className="tab-header">
        <NavItem>
          <NavLink className={selectedTab === 'general' ? 'active' : ''} onClick={() => setSelectedTab('general')}>
            General
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={selectedTab === 'sensor' ? 'active' : ''} onClick={() => setSelectedTab('sensor')}>
            Sensor
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={selectedTab}>
        <TabPane tabId="general">
          <GeneralSidePanel
            newBeachSensorData={newBeachSensorData}
            setLocationMarker={setLocationMarker}
            setNewBeachSensorData={setNewBeachSensorData}
            createBeachSensor={createBeachSensor}
            newBusSensorData={newBusSensorData}
            setNewBusSensorData={setNewBusSensorData}
            createBusSensor={createBusSensor}
          />
        </TabPane>
        <TabPane tabId="sensor">
          <SensorPanel sensor={selectedSensor} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default SidePanel;
