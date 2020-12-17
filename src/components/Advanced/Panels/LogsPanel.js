import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import './LogsPanel.css';

const LogsPanel = ({ className }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return <div className={className} />;
};

export default LogsPanel;
