import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useRef } from 'react';

const RoutePath = ({ map, from, to }) => {
  const hasAnimatedRef = useRef(false);
  const lastCoordsRef = useRef(null);

  useEffect(() => {
    const validCoords = (arr) =>
      Array.isArray(arr) && arr.length === 2 && !isNaN(arr[0]) && !isNaN(arr[1]);

    if (!map || !validCoords(from) || !validCoords(to)) {
      console.warn('⛔ Map or coordinates not ready:', { map, from, to });
      return;
    }

    // 💣 پاک‌سازی کامل تمام مسیرها و مارکرهای قبلی
    if (map._routeElements) {
      map._routeElements.forEach(el => map.removeLayer(el));
    }
    map._routeElements = [];

    // 🧭 کنترل مسیر جدید
    const control = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      show: false,
      lineOptions: {
        styles: [
          { color: '#007bff', weight: 6, opacity: 0.85 },
          { color: 'white', weight: 2, opacity: 0.9 }
        ]
      },
      createMarker: (i, wp) => {
        const iconUrl =
          i === 0
            ? 'https://cdn-icons-png.flaticon.com/512/684/684908.png'
            : 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png';
        const marker = L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl,
            iconSize: [34, 34],
            iconAnchor: [17, 34],
          }),
        });
        map._routeElements.push(marker);
        return marker;
      },
    });

    control.on('routesfound', (e) => {
      const coords = e.routes[0].coordinates;
      if (!coords || coords.length === 0) return;
    

      const currentKey = JSON.stringify([from, to]);
      if (lastCoordsRef.current === currentKey) return;
      lastCoordsRef.current = currentKey;

      map.fitBounds(L.latLngBounds(coords));
    
      let index = 0;
    
      const animatedLine = L.polyline([], {
        color: '#007bff',
        weight: 5,
        opacity: 0.8,
        lineJoin: 'round',
        className: 'animated-route-line',
      }).addTo(map);
      map._routeElements.push(animatedLine);
    
      const vehicleMarker = L.marker(coords[0], {
        icon: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',

          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
      }).addTo(map);
      map._routeElements.push(vehicleMarker);
    
      const interval = setInterval(() => {
        if (index >= coords.length) {
          clearInterval(interval);
          return;
        }
        animatedLine.addLatLng(coords[index]);
        vehicleMarker.setLatLng(coords[index]);
        index =index+2;
      }, 30);
    
      map._routeElements.push({
        remove: () => clearInterval(interval),
      });
    });
    
    
    control.addTo(map);
    map._routingControl = control;

    return () => {
      if (map._routingControl) {
        map.removeControl(map._routingControl);
        delete map._routingControl;
      }
      if (map._routeElements) {
        map._routeElements.forEach(el => {
          if (el.remove) el.remove();
          else map.removeLayer(el);
        });
        map._routeElements = [];
      }
    };
  }, [map, from, to]);

  return null;
};

export default RoutePath;
