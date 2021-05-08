import { useLeaflet } from 'react-leaflet';
import L from 'leaflet';
import './Legend.css';
import { useEffect } from 'react';

function Legend({ layers }) {
  const { map } = useLeaflet();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      let labels = [];

      Object.entries(layers).forEach(([ name, color ]) => {
        labels.push('<i style="border-radius: 25px; background:' + color + '"></i> Sensor ' + name);
      });

      div.innerHTML = labels.join('<br>');
      return div;
    };

    legend.addTo(map);
    return () => legend.remove();
  });
  return null;
}

export default Legend;
