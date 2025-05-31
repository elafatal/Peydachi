import { useMapEvents } from 'react-leaflet';

const LocationSelector = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    }
  });
  return null;
};

export default LocationSelector;
