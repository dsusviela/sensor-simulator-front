import React from 'react';
import './TabHeader.css';

const TabHeader = ({ active: isTabActive, headerTitle, onClick }) => {
  const renderTabHeader = () => {
    if (isTabActive) {
      return (
        <div className="sidepanel__tabs__tab-header--active" onClick={onClick}>
          {headerTitle}
        </div>
      );
    } else {
      return (
        <div className="sidepanel__tabs__tab-header--inactive" onClick={onClick}>
          {headerTitle}
        </div>
      );
    }
  };

  return renderTabHeader();
};

export default TabHeader;
