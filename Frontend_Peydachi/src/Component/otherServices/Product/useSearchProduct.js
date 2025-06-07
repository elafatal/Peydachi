// useSearchProduct.js
import { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axiosInstance from '../../axiosInstance';

const useSearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const chartRef = useRef(null);

  // get all cities
  useEffect(() => {
    const handleAllCities = async () => {
      try {
        const response = await axiosInstance.get('/city/get_all_cities', {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data'
          }
        });
        setAllCities(response.data);
        console.log(response);
      } catch (error) {
        console.log(error); 
      } 
    };
    handleAllCities();
  }, []);

  // mock product data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'Wireless Headphones',
          description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and comfortable over-ear design.',
          quantity: 15,
          date_added: '2025-05-10T10:30:00.000Z',
          city_id: 1,
          pic_url: 'https://readdy.ai/api/search-image?query=Premium%20wireless%20headphones%20with%20noise%20cancellation%20feature%20on%20a%20minimalist%20white%20background%20with%20soft%20shadows%2C%20professional%20product%20photography%20with%20high%20detail%20and%20clarity&width=400&height=300&seq=1&orientation=landscape',
          average_rating: 4.7
        },
        {
          id: 2,
          name: 'Smart Watch',
          description: 'Fitness tracker with heart-rate monitor, sleep tracking, and smartphone notifications.',
          quantity: 8,
          date_added: '2025-05-12T14:20:00.000Z',
          city_id: 2,
          pic_url: 'https://readdy.ai/api/search-image?query=Modern%20smartwatch%20with%20fitness%20tracking%20features%20displayed%20on%20a%20clean%20white%20background%2C%20high-resolution%20product%20photography%20showing%20the%20watch%20face%20and%20band%20details&width=400&height=300&seq=2&orientation=landscape',
          average_rating: 4.3
        },
        {
          id: 3,
          name: 'Portable Bluetooth Speaker',
          description: 'Waterproof portable speaker with 360° sound and 20-hour playtime.',
          quantity: 0,
          date_added: '2025-05-15T09:45:00.000Z',
          city_id: 3,
          pic_url: 'https://readdy.ai/api/search-image?query=Waterproof%20portable%20bluetooth%20speaker%20with%20modern%20design%20on%20minimalist%20white%20background%2C%20professional%20product%20photography%20showing%20texture%20and%20controls%20in%20detail&width=400&height=300&seq=3&orientation=landscape',
          average_rating: 4.5
        },
        {
          id: 4,
          name: 'Ergonomic Office Chair',
          description: 'Adjustable office chair with lumbar support and breathable mesh back.',
          quantity: 5,
          date_added: '2025-05-08T11:15:00.000Z',
          city_id: 1,
          pic_url: 'https://readdy.ai/api/search-image?query=Ergonomic%20office%20chair%20with%20adjustable%20features%20and%20mesh%20back%20on%20clean%20white%20background%2C%20professional%20product%20photography%20showing%20the%20chair%20from%20a%20slight%20angle&width=400&height=300&seq=4&orientation=landscape',
          average_rating: 4.2
        },
        {
          id: 5,
          name: 'Digital Camera',
          description: 'Mirrorless camera with 24 MP sensor, 4 K video recording, and interchangeable lenses.',
          quantity: 3,
          date_added: '2025-05-14T16:50:00.000Z',
          city_id: 4,
          pic_url: 'https://readdy.ai/api/search-image?query=Professional%20digital%20mirrorless%20camera%20with%20lens%20on%20minimalist%20white%20background%2C%20high-resolution%20product%20photography%20showing%20details%20of%20camera%20body%20and%20controls&width=400&height=300&seq=5&orientation=landscape',
          average_rating: 4.8
        },
        {
          id: 6,
          name: 'Coffee Maker',
          description: 'Programmable coffee maker with thermal carafe and auto-shutoff feature.',
          quantity: 0,
          date_added: '2025-05-11T08:30:00.000Z',
          city_id: 5,
          pic_url: 'https://readdy.ai/api/search-image?query=Modern%20programmable%20coffee%20maker%20with%20thermal%20carafe%20on%20clean%20white%20background%2C%20professional%20product%20photography%20showing%20the%20machine%20from%20front%20angle%20with%20clear%20details&width=400&height=300&seq=6&orientation=landscape',
          average_rating: 4.1
        }
      ];
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

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

  const getCityName = (id) => allCities.find(c => c.id === id)?.name ?? 'Unknown';

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
    clearFilters
  };
};

export default useSearchProduct;
