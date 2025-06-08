import { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axiosInstance from '../../axiosInstance';

const useSearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
   const [selectedCity, setSelectedCity] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const chartRef = useRef(null);



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

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    const mockComments = [
      { id: 1, user: 'Sarah J.', text: 'Excellent product! Exactly as described and arrived quickly.', rating: 5 },
      { id: 2, user: 'Michael T.', text: 'Good quality but shipping took longer than expected.', rating: 4 },
      { id: 3, user: 'Emma R.', text: 'Works well but the battery life is shorter than advertised.', rating: 3 },
      { id: 4, user: 'David L.', text: 'Perfect! Would definitely recommend to others.', rating: 5 },
      { id: 5, user: 'Lisa M.', text: 'Great value for the price. Very satisfied with my purchase.', rating: 4 }
    ];
    setComments(mockComments);

    setTimeout(() => {
      if (!chartRef.current) return;
      const chart = echarts.init(chartRef.current);
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
          data: [
            { value: mockComments.filter(c => c.rating === 5).length, name: '5 Stars', itemStyle: { color: '#4CAF50' } },
            { value: mockComments.filter(c => c.rating === 4).length, name: '4 Stars', itemStyle: { color: '#8BC34A' } },
            { value: mockComments.filter(c => c.rating === 3).length, name: '3 Stars', itemStyle: { color: '#FFC107' } },
            { value: mockComments.filter(c => c.rating === 2).length, name: '2 Stars', itemStyle: { color: '#FF9800' } },
            { value: mockComments.filter(c => c.rating === 1).length, name: '1 Star',  itemStyle: { color: '#F44336' } }
          ]
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
 const handleSearch =async()=>{
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
 
 



  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
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
    handleSearch,
    setStart,
    start
  };
};

export default useSearchProduct;
