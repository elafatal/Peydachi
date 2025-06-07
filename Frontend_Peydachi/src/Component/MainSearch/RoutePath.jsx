import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutePath = ({ map, from, to }) => {
  useEffect(() => {
    if (!map || !from || !to || isNaN(from[0]) || isNaN(to[0])) {
      console.warn('⛔ Map or coordinates not ready:', { map, from, to });
      return;
    }
    if (map._routingControl) {
      map.removeControl(map._routingControl);
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      lineOptions: {
        styles: [{ color: 'blue', weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      show: false,
      createMarker: (i, wp) => {
        if (i === 0) return null;
        const icon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return L.marker(wp.latLng, { icon });
      },
    }).addTo(map);

    map._routingControl = control;

    return () => {
      map.removeControl(control);
    };
  }, [map, from, to]);

  return null;
};

export default RoutePath;
