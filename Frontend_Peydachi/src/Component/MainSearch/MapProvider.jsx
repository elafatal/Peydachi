import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const MapProvider = ({ setMap }) => {
  const map = useMap();

  useEffect(() => {
    if (map) setMap(map);
  }, [map]);

  return null;
};

export default MapProvider;
