import { createContext, useEffect, useState, useContext } from 'react';
import axiosInstance from '../axiosInstance';
import showErrorToast from '../utils/showErrorToast';

const CityContext = createContext();

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [cityMap, setCityMap] = useState({});
  const [loadingCities, setLoadingCities] = useState(true);
  useEffect(() => {
    const fetchCities = async () => {
      const cached = sessionStorage.getItem('cachedCities');
      if (cached) {
        const parsed = JSON.parse(cached);
        setCities(parsed);
        setCityMap(buildMap(parsed));
        return;
      }

      try {
        const response = await axiosInstance.get('/city/get_all_cities');
        setCities(response.data);
        setCityMap(buildMap(response.data));
        sessionStorage.setItem('cachedCities', JSON.stringify(response.data)); 
      } catch (err) {
        showErrorToast(err);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  const refreshCities = async () => {
    setLoadingCities(true);
    try {
      const response = await axiosInstance.get('/city/get_all_cities');
      setCities(response.data);
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoadingCities(false);
    }
  };
  
  const buildMap = (cities) => {
    return cities.reduce((acc, city) => {
      acc[city.id] = city.name;
      return acc;
    }, {});
  };

  const getCityName = (id) => {
    return cityMap[id] ?? '---';
  };

  return (
    <CityContext.Provider value={{ cities, getCityName, cityMap,loadingCities,refreshCities   }}>
      {children}
    </CityContext.Provider>
  );
};
