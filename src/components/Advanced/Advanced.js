import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import './Advanced.css';
import OrionPanel from './Panels/OrionPanel';

const Advanced = ({ className }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={className}>
      <div onClick={toggle} className="toggle advanced-button">
        {isOpen ?  "Ocultar" : "Mostrar avanzado"}
      </div>
      <Collapse isOpen={isOpen}>
        <OrionPanel />
      </Collapse>
    </div>
  );
};

export default Advanced;
