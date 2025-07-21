import { useMap } from 'react-leaflet';

import React, { useEffect, useState } from 'react';
const FlyToLocation = ({ center }) => {
  const map = useMap();
  const [prevCenter, setPrevCenter] = useState(null);

  useEffect(() => {
    if (center && JSON.stringify(center) !== JSON.stringify(prevCenter)) {
      map.flyTo(center, map.getZoom());
      setPrevCenter(center);
    }
  }, [center]);

  return null;
};


export default FlyToLocation