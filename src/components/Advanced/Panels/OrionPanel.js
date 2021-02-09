import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { anOldHope, CodeBlock } from 'react-code-blocks';
import './OrionPanel.css';

const OrionPanel = () => {
  const { REACT_APP_ORION_S } = process.env;

  const [ activeTab, setActiveTab ] = useState('1');
  const [ jsonDisplay, setJsonDisplay ] = useState('Conectando con Orion...');

  const populateSubscriptions = () => {
    setJsonDisplay('Fetching from Orion...');
    axios
      .get(`${REACT_APP_ORION_S}/v2/subscriptions`, {
        headers: { 'fiware-service': 'openiot', 'fiware-servicepath': '/' }
      })
      .then((res) => {
        setJsonDisplay(JSON.stringify(res.data, null, 4));
      })
      .catch(setJsonDisplay('Trayendo datos de Orion...'));
  };

  const populateDevices = () => {
    setJsonDisplay('Fetching from Orion...');
    axios
      .get(`${REACT_APP_ORION_S}/v2/entities?limit=100`, {
        headers: { 'fiware-service': 'openiot', 'fiware-servicepath': '/' }
      })
      .then((res) => {
        setJsonDisplay(JSON.stringify(res.data, null, 4));
      })
      .catch(setJsonDisplay('Trayendo datos de Orion...'));
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    populateSubscriptions();
  }, []);

  return (
    <div className="orion-panel">
      <Nav fill className="tab-header" tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => {
              populateSubscriptions();
              toggle('1');
            }}
          >
            Suscripciones en Orion
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => {
              populateDevices();
              toggle('2');
            }}
          >
            Dispositivos en Orion
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
          <CodeBlock text={jsonDisplay} language="json" showLineNumbers={true} theme={anOldHope} />
        </TabPane>
        <TabPane tabId="2">
          <CodeBlock text={jsonDisplay} language="json" showLineNumbers={true} theme={anOldHope} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default OrionPanel;
