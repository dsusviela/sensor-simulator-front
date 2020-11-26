import React from 'react';
import GeneralSidePanel from './GeneralSidePanel';
import SensorPanel from '../SensorPanel/SensorPanel';
import './SidePanel.css';
import {Button, Nav, NavItem, Container, CustomInput, TabContent, TabPane, NavLink} from "reactstrap";

const SidePanel = ({ selectedSensor, selectedTab, setSelectedTab }) => {

  const renderSidePanelContent = () => {
    return(<TabContent activeTab={selectedTab}>
        <TabPane tabId="general">
          <GeneralSidePanel />
        </TabPane>
        <TabPane tabId="sensor">
          <SensorPanel sensor={selectedSensor} />
        </TabPane>
    </TabContent>)
  };

  return (
    <div className="side-panel">
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
      {renderSidePanelContent()}
    </div>
  );
};

export default SidePanel;
