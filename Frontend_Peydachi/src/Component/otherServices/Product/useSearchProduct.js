import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import * as echarts from 'echarts';
import axiosInstance from '../../axiosInstance';
import showErrorToast from '../../utils/showErrorToast';
const useSearchProduct = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
  
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };
    

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity   = selectedCity === null || p.city_id === selectedCity;
    const isAvailable   = !showAvailableOnly || p.quantity > 0;
    return matchesSearch && matchesCity && isAvailable;
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    navigate({ search: params.toString() }, { replace: true }); // URL رو آپدیت کن
  };
  
  const handleCityChange = (e) => {
    const id = parseInt(e.target.value);
    setSelectedCity(isNaN(id) ? null : id);
  };

  const renderChart = (distribution) => {
    if (!chartRef.current) return;
  
    const chart = echarts.init(chartRef.current);
  
    const colorsByRating = {
      5: '#27ae60',
      4: '#2ecc71',
      3: '#f1c40f',
      2: '#e67e22',
      1: '#e74c3c',
    };
    
    const ratingData = [5, 4, 3, 2, 1].map(r => {
      const found = distribution.find(item => item.rating === r);
      return {
        value: found ? found.count : 0,
        name: `${r} ستاره`,
        itemStyle: {
          color: colorsByRating[r]
        }
      };
    });
    
  
    chart.setOption({
      animation: false,
      title: { text: 'Rating Distribution', left: 'center', textStyle: { fontSize: 14 } },
      tooltip: { trigger: 'item' },
      series: [{
        name: 'Ratings',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: '14', fontWeight: 'bold' } },
        labelLine: { show: false },
        data: ratingData
      }]
    });
  
    const onResize = () => chart.resize();
    window.addEventListener('resize', onResize);
  
    return () => {
      chart.dispose();
      window.removeEventListener('resize', onResize);
    };
  };
  
  const handleAvailabilityToggle = () => setShowAvailableOnly(!showAvailableOnly);
  const openProductModal = async (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setComments([]);
    try {
      const ratingResponse = await axiosInstance.post('/product_rating/get_product_rating_distribution', {
        product_id: product.id,
      });
      console.log(ratingResponse);
      setRatingDistribution(ratingResponse.data);
      renderChart(ratingResponse.data); 
    } catch (error) {
      showErrorToast(error);
      setRatingDistribution([]); 
    }
    
    try {
      const response = await axiosInstance.post('/product_comment/get_product_comments', {
        product_id: product.id
      });
  
      setComments(response.data);
  
    } catch (error) {
      showErrorToast(error);
      setComments([]); 
    }
  

  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setRatingDistribution([]);
  };
  
  const clearSelectedProduct = () => {
    setSelectedProduct(null);
  };
  

 useEffect(() => {
  const handleSearch = async()=>{
    if (searchTerm != '') {
      try {
        setLoading(true)
        const response = await axiosInstance.post('/product/search_all_products', {
          name: searchTerm,
        });
        setProducts(response.data);
        console.log(response.data);
       
      } catch (err) {
        showErrorToast(err);
      } finally {
        setLoading(false);
      }
      
    }
  }
   handleSearch();
 }, [searchTerm]);


 const [cityNames, setCityNames] = useState({});

 const getCityName = (id) => {
   return cityNames[id] ?? '...';
 };
 
 useEffect(() => {
   const fetchCityName = async (city_id) => {
     if (cityNames[city_id]) return;
     try {
       const response = await axiosInstance.post('/city/get_city_by_id', {
         city_id: city_id,
       });
       setCityNames(prev => ({
         ...prev,
         [city_id]: response.data.name,
       }));
     } catch (err) {
      showErrorToast(err);
       setCityNames(prev => ({
        ...prev,
        [city_id]: "نامشخص",
      }));
     }
   };

   products.forEach(p => {
     fetchCityName(p.city_id);
   });
 }, [products]);
 
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity(null);
    setShowAvailableOnly(false);
  };
  
  return {
    searchTerm,
    selectedCity,
    showAvailableOnly,
    products,
    loading,
    selectedProduct,
    isModalOpen,
    comments,
    chartRef,
    allCities,
    filteredProducts,
    handleSearchChange,
    handleCityChange,
    handleAvailabilityToggle,
    openProductModal,
    closeProductModal,
    clearSelectedProduct, 
    getCityName,
    clearFilters,
    sortOption,
    setSortOption,
    favorites,
  toggleFavorite,
  showOnlyFavorites,
  setShowOnlyFavorites,
  isReviewModalOpen,
  setIsReviewModalOpen
  };
};

export default useSearchProduct;
