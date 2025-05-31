import { useMap } from 'react-leaflet';

import React, { useEffect, useState } from 'react';
const FlyToLocation = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom()); 
    }
  }, [center]);

  return null;
};

export default FlyToLocation