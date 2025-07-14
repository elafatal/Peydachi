import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutePath = ({ map, from, to }) => {
  useEffect(() => {
    const validCoords = (arr) =>
      Array.isArray(arr) &&
      arr.length === 2 &&
      !isNaN(arr[0]) &&
      !isNaN(arr[1]);
  
    if (!map || !validCoords(from) || !validCoords(to)) {
      console.warn('⛔ Map or coordinates not ready:', { map, from, to });
      return;
    }
  
    if (map._routingControl) {
      map.removeControl(map._routingControl);
    }
  
    const control = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
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
        return L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          }),
        });
      },
    }).addTo(map);
  
    map._routingControl = control;
  
    return () => {
      if (map._routingControl) {
        map.removeControl(map._routingControl);
      }
    };
  }, [map, from, to]);
  

  return null;
};

export default RoutePath;
