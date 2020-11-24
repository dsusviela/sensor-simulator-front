import React, { useState } from 'react';
import GeneralSidePanel from './GeneralSidePanel';
import './SidePanel.css';
import TabHeader from './TabHeader';

const SidePanel = ({ selectedSensor }) => {
  const [ selectedTab, setSelectedTab ] = useState('general');

  const renderSidePanelContent = () => {
    if (selectedTab === 'general') {
      return <GeneralSidePanel />;
    } else {
      return <div> {selectedSensor} </div>;
    }
  };

  return (
    <div className="sidepanel">
      <div className="sidepanel__tabs">
        <TabHeader
          headerTitle="General"
          active={selectedTab === 'general'}
          onClick={() => {
            setSelectedTab('general');
          }}
        />
        <TabHeader
          headerTitle="Sensor Playa"
          active={selectedTab === 'beach-sensor'}
          onClick={() => {
            setSelectedTab('beach-sensor');
          }}
        />
        <TabHeader
          headerTitle="Sensor Omnibus"
          active={selectedTab === 'bus-sensor'}
          onClick={() => {
            setSelectedTab('bus-sensor');
          }}
        />
      </div>
      {renderSidePanelContent()}
    </div>
  );
};

export default SidePanel;
