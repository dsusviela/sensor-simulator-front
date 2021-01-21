import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Label } from 'reactstrap';
import './SimulationMenu.css';

const SimulationMenu = () => {
  const { REACT_APP_SENSOR_BACKEND_API } = process.env;
  const [ beachSimulatorStatus, setBeachSimulatorStatus ] = useState('Detenido');
  const [ beachSimulatorProcessId, setBeachSimulatorProcessId ] = useState(null);
  const [ busSimulatorStatus, setBusSimulatorStatus ] = useState('Detenido');
  const [ busSimulatorProcessId, setBusSimulatorProcessId ] = useState(null);

  useEffect(() => {
    axios
      .get(`${REACT_APP_SENSOR_BACKEND_API}/simulator_processes`)
      .then((res) =>
        res.data.forEach((element) => {
          if (element.is_beach) {
            setBeachSimulatorStatus('Simulando');
            setBeachSimulatorProcessId(element.id);
          } else {
            setBusSimulatorStatus('Simulando');
            setBusSimulatorProcessId(element.id);
          }
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const startSimulation = () => {
    setBeachSimulatorStatus('Simulando');
    setBusSimulatorStatus('Simulando');
    startBeachSimulationRails();
    startBusSimulationRails();
  };

  const stopSimulation = () => {
    setBeachSimulatorStatus('Detenido');
    setBusSimulatorStatus('Detenido');
    stopSimulationRails(beachSimulatorProcessId);
    stopSimulationRails(busSimulatorProcessId);
  };

  const startBeachSimulation = () => {
    setBeachSimulatorStatus('Simulando');
    startBeachSimulationRails();
  };

  const stopBeachSimulation = () => {
    setBeachSimulatorStatus('Detenido');
    setBeachSimulatorProcessId(null);
    stopSimulationRails(beachSimulatorProcessId);
  };

  const startBusSimulation = () => {
    setBusSimulatorStatus('Simulando');
    startBusSimulationRails();
  };

  const stopBusSimulation = () => {
    setBusSimulatorStatus('Detenido');
    setBusSimulatorProcessId(null);
    stopSimulationRails(busSimulatorProcessId);
  };

  const startBeachSimulationRails = () => {
    if (beachSimulatorProcessId === null) {
      const payload = { is_beach: true };
      axios
        .post(`${REACT_APP_SENSOR_BACKEND_API}/simulator_processes`, payload)
        .then((res) => setBeachSimulatorProcessId(res.data.id))
        .catch((err) => console.log(err));
    }
  };

  const startBusSimulationRails = () => {
    if (busSimulatorProcessId === null) {
      const payload = { is_beach: false };
      axios
        .post(`${REACT_APP_SENSOR_BACKEND_API}/simulator_processes`, payload)
        .then((res) => setBusSimulatorProcessId(res.data.id))
        .catch((err) => console.log(err));
    }
  };

  const stopSimulationRails = (simulatorProcessId) => {
    if (simulatorProcessId !== null) {
      axios.delete(`${REACT_APP_SENSOR_BACKEND_API}/simulator_processes/${simulatorProcessId}`);
    }
  };

  return (
    <div className="sub-menu">
      <div className="sub-menu--main-button-row">
        <Button onClick={startSimulation} className="sub-menu--button__main" color="success">
          Comenzar simulacion
        </Button>
        <Button onClick={stopSimulation} className="sub-menu--button__main" color="danger">
          Detener simulacion
        </Button>
      </div>
      <hr className="rounded" />
      <div className="sub-menu--button-row">
        <Button onClick={startBeachSimulation} color="success">
          Comenzar playas
        </Button>
        <Button onClick={stopBeachSimulation} color="danger">
          Detener playas
        </Button>
        <Label className="sub-menu--label">{beachSimulatorStatus}</Label>
      </div>
      <div className="sub-menu--button-row">
        <Button onClick={startBusSimulation} color="success">
          Comenzar buses
        </Button>
        <Button onClick={stopBusSimulation} color="danger">
          Detener buses
        </Button>
        <Label className="sub-menu--label">{busSimulatorStatus}</Label>
      </div>
    </div>
  );
};

export default SimulationMenu;
