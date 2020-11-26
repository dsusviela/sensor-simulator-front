import React from 'react';
import {Button, Nav, NavItem, Container, CustomInput, TabContent, TabPane, NavLink} from "reactstrap";

const generalSidePanel = () => {
  return (
    <div>
      <Button>Precargar datos de playas</Button>
      <Button>Precargar datos de omnibus</Button>
      <Button>Limpiar los sensores</Button>
    </div>
  );
};

export default generalSidePanel;
