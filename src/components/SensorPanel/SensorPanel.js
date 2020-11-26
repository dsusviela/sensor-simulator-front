import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from "reactstrap";
import './SensorPanel.css';
import _ from 'lodash';

const SensorPanel = ({ sensor }) => {
  const PROPS_TO_EXCLUDE = ["gid", "geom"];
  const NON_EDITABLE_PROPS = ["tipo"];

  const createSensorProp = (sensor, prop) => {
    const sensorProp = sensor[prop];
    if (NON_EDITABLE_PROPS.includes(prop))
      return sensorProp;
    else
      return(<Input
              name={prop}
              id={`${sensor.type}-${sensor.gid}-${prop}`}
              placeholder={prop}
              value={(sensorProp) ? sensorProp : ""}
            />);
  };

  const renderSensorData = () => {
    if (_.isEmpty(sensor)){
      return "No hay datos. Seleccione una feature en el mapa."
    } else {
      const sensorData = Object
              .keys(sensor)
              .filter(sensorProp => !PROPS_TO_EXCLUDE.includes(sensorProp))
              .map(sensorProp => {
                return(<Row>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {sensorProp}
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {createSensorProp(sensor, sensorProp)}
                  </Col>
                </Row>)
              });
      sensorData.push(
        <Container id="update-container" center="xs">
          <Button outline onClick = {() => null}>
            Actualizar
          </Button>
        </Container>
      )

      return sensorData;
    }
  };

  return (
      <Form>
        {renderSensorData()}
      </Form>
  );
};

export default SensorPanel;
