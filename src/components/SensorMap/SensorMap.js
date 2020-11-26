import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { FeatureGroup, CircleMarker, Map, Marker, TileLayer, Popup, Tooltip, Polyline, LayersControl, Polygon } from 'react-leaflet';
import './SensorMap.css';
import "leaflet/dist/leaflet.css";
import _ from 'lodash';

const SensorMap = ({ selectSensor }) => {
  const { REACT_APP_FEATURE_PROVIDER } = process.env;
  const [ playas, setPlayas ] = useState([]);
  const [ sensoresBanderas, setSensoresBanderas ] = useState([]);
  const [ sensoresPersonas, setSensoresPersonas ] = useState([]);
  const [ sensoresAgua, setSensoresAgua ] = useState([]);
  const [ sensoresUV, setSensoresUV ] = useState([]);

  const styles = {
    wrapper: {
      height: 600,
      width: '100%',
    },
    map: {
      height: '90%',
      width: '90%',
      margin: '0 auto'
    }
  };

  const layersInfo = [
    {
      props: ['gid', 'nombre'],
      geom_type: "multipolygon",
      table_name: 'playas',
      color: 'yellow',
      update_method: setPlayas
    },
    {
      props: ['id_playa', 'valor'],
      geom_type: "point",
      table_name: 'sensores_uv',
      update_method: setSensoresUV,
      color: 'red',
      description: 'Sensor de radiación UV'
    },
    {
      props: ['id_playa', 'valor'],
      geom_type: "point",
      table_name: 'sensores_banderas',
      update_method: setSensoresBanderas,
      color: 'pink',
      description: 'Sensor de banderas'
    },
    {
      props: ['id_playa', 'valor'],
      geom_type: "point",
      table_name: 'sensores_personas',
      update_method: setSensoresPersonas,
      color: 'green',
      description: 'Sensor de personas'
    },
    {
      props: ['id_playa', 'valor'],
      geom_type: "point",
      table_name: 'sensores_agua',
      update_method: setSensoresAgua,
      color: 'blue',
      description: 'Sensor de agua'
    }
  ];

  const mapRef = useRef();
  useEffect(() => {
    const { _northEast: upperRight, _southWest: lowerLeft } = mapRef.current.leafletElement.getBounds();
    getFeatures(upperRight, lowerLeft);
  }, []);

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  const populateFeatures = (event) => {
    const { _northEast: upperRight, _southWest: lowerLeft } = event.target.getBounds();

    getFeatures(upperRight, lowerLeft);
  };

  const processGeom = (geom) => {
    if (geom.type == "Point")
      return [ geom.coordinates[1], geom.coordinates[0] ];
    else {
      const reversedPlaya = geom.coordinates[0][0].reduce((acc, coords) => {
        const reversedCoords = [coords[1].toString(), coords[0].toString()];
        acc.push(reversedCoords);
        return acc;
      }, []);
      return [[reversedPlaya]];
    };
  };

  const getFeatures = (upperRight, lowerLeft) => {
    layersInfo.forEach(layerProps => {
      axios
        .get(
          `${REACT_APP_FEATURE_PROVIDER}/${layerProps.table_name}/items?f=json&bbox=${lowerLeft.lng},${lowerLeft.lat},${upperRight.lng},${upperRight.lat}&limit=50`
        )
        .then((res) => {
          const response = res.data.features.map((elem) => {
            const props = { gid: elem.gid, geom: processGeom(elem.geometry) };
            layerProps.props.forEach(propName => {
              props[propName] = elem.properties[propName];
            });
            return props;
          });
          layerProps.update_method(response);
        });
    });
  };

  const createFeatures = () => {
    const layers = [playas, sensoresUV, sensoresBanderas, sensoresPersonas, sensoresAgua];
    const layersWithInfo = _.zip(layers, layersInfo)
    return layersWithInfo.reduce((acc, [features, info]) => {
      const markers = features.map((feature) => {
        if (info.geom_type == 'point') {
          return (
            <CircleMarker
              center={feature.geom}
              fillColor={info.color}
              color={'black'}
              radius={7}
              weight={0.6}
              opacity={0.7}
              fillOpacity={0.7}
              onClick={() => selectSensor({...feature, ...{tipo: info.table_name}})}
              onMouseOver={(e) => e.target.setStyle({opacity: 1, weight: 2})}
              onMouseOut={(e) => e.target.setStyle({opacity: 0.7, weight: 0.6})}
            >
              {featureInfo(feature, info)}
            </CircleMarker>
          )
        }
        if (info.geom_type == 'multipolygon') {
          return (
            <Polygon
              positions={feature.geom}
              fillColor={info.color}
              color={'brown'}
              weight={1}
              opacity={0.85}
              onClick={() => selectSensor({...feature, ...{tipo: info.table_name}})}
              onMouseOver={(e) => e.target.setStyle({opacity: 1, weight: 2})}
              onMouseOut={(e) => e.target.setStyle({opacity: 0.7, weight: 0.6})}
            >
              {featureInfo(feature, info)}
            </Polygon>
          );
        }
      });
      const featureGroup = <LayersControl.Overlay checked name={processLayerName(info.table_name)}>
        <FeatureGroup>
          {markers}
        </FeatureGroup>
      </LayersControl.Overlay>
      return acc.concat(featureGroup);
    }, []);
  };

  const processLayerName = (layerName) => {
    return layerName.replaceAll("_", " ").toProperCase();
  };

  const featureInfo = (feature, info) => {
    if (info.table_name == 'playas') {
      return(
        <Tooltip>
          <span><b>Playa:</b> {feature.nombre}</span><br/>
          <span><b>Gid:</b> {feature.gid}</span><br/>
        </Tooltip>
      )
    } else {
        return(
          <Tooltip>
            <span><b>Tipo:</b> {info.description}</span><br/>
            <span><b>Valor:</b> {feature.valor}</span><br/>
            <span><b>Id playa:</b> {feature.id_playa}</span><br/>
          </Tooltip>
        )
    }
  };

  return (
    <div style={styles.wrapper}>
      <Map style={styles.map} center={[ -34.91796, -56.166744 ]} zoom={15} scrollWheelZoom={false} onMoveEnd={populateFeatures} ref={mapRef}>
        <LayersControl position="topright">

          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {createFeatures()}
        {/* <Marker position={[ -34.91796, -56.166744 ]} onClick={() => selectSensor(0)}>
          <Popup>asda</Popup>
        </Marker> */}
        </LayersControl>
      </Map>
    </div>
  );
};

export default SensorMap;
