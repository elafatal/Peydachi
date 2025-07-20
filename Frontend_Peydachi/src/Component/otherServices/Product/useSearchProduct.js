import { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axiosInstance from '../../axiosInstance';

const useSearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCityChange = (e) => {
    const id = parseInt(e.target.value);
    setSelectedCity(isNaN(id) ? null : id);
  };
  const handleAvailabilityToggle = () => setShowAvailableOnly(!showAvailableOnly);
  const openProductModal = async (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setComments([]); // برای نمایش حالت لودینگ یا خالی بودن تا گرفتن دیتا
  
    try {
      const response = await axiosInstance.post('/product_comment/get_product_comments', {
        product_id: product.id
      });
  
      setComments(response.data);
  
    } catch (error) {
      console.error('خطا در دریافت کامنت‌ها:', error);
      setComments([]); 
    }
  
    // chart rendering
    setTimeout(() => {
      if (!chartRef.current) return;
      const chart = echarts.init(chartRef.current);
      const ratingData = [5, 4, 3, 2, 1].map(r => ({
        value: comments.filter(c => c.rating === r).length,
        name: `${r} Stars`
      }));
  
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
    }, 0);
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
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
        console.error('خطا در دریافت اطلاعات محصول:', err);
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
       console.error('خطا در دریافت نام شهر:', err);
     }
   };

   products.forEach(p => {
     fetchCityName(p.city_id);
   });
 }, [products]);
 
 



  const formatDate = (dateString) =>{
    const now = new Date();
    const addedDate = new Date(dateString);
    
    const diffInMilliseconds = now - addedDate;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) return 'لحظاتی پیش';
    if (minutes < 60) return `${minutes} دقیقه قبل`;
    if (hours < 24) return `${hours} ساعت قبل`;
    if (days < 7) return `${days} روز قبل`;
    if (weeks < 4) return `${weeks} هفته قبل`;
    if (months < 12) return `${months} ماه قبل`;
    return `${years} سال گذشته`;
  }
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
    getCityName,
    formatDate,
    clearFilters,
    sortOption,
    setSortOption,
    favorites,
  toggleFavorite,
  showOnlyFavorites,
  setShowOnlyFavorites,
  };
};

export default useSearchProduct;
