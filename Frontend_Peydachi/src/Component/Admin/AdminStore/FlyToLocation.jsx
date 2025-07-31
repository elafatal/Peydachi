
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

const FlyToLocation = ({ center }) => {
  const map = useMap();
  const [prevCenter, setPrevCenter] = useState(null);

  useEffect(() => {
    if (
      center &&
      (!prevCenter || JSON.stringify(center) !== JSON.stringify(prevCenter))
    ) {
      map.flyTo(center,14);
      setPrevCenter(center);
    }
  }, [center]);

  return null;
};

export default FlyToLocation;
