
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import {
  FaStore,
  FaHeart,
  FaRegHeart,
  FaHistory,
  FaUser,
  FaBars,
  FaSearch,
  FaMapMarkerAlt,
  FaTag,
  FaChevronDown,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaLaptop,
  FaCouch,
  FaTshirt,
  FaBook,
  FaRunning,
  FaHome,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaStar,
  FaRegStar,
  FaStarHalfAlt
} from 'react-icons/fa';
import { IoArrowBackCircleOutline } from "react-icons/io5";


/* ---------- component ---------- */
const SearchProduct = () => {
  /* ----- state ----- */
  const [searchTerm, setSearchTerm]             = useState('');
  const [selectedCity, setSelectedCity]         = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [products, setProducts]                 = useState([]);
  const [cities, setCities]                     = useState([]);
  const [loading, setLoading]                   = useState(false);
  const [selectedProduct, setSelectedProduct]   = useState(null);
  const [isModalOpen, setIsModalOpen]           = useState(false);
  const [comments, setComments]                 = useState([]);
  const chartRef                                = useRef(null);

  /* ----- mock city data ----- */
  useEffect(() => {
    setCities([
      { id: 1, name: 'New York' },
      { id: 2, name: 'Los Angeles' },
      { id: 3, name: 'Chicago' },
      { id: 4, name: 'Houston' },
      { id: 5, name: 'Phoenix' }
    ]);
  }, []);

  /* ----- mock product data ----- */
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

  /* ----- derived data ----- */
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity   = selectedCity === null || p.city_id === selectedCity;
    const isAvailable   = !showAvailableOnly || p.quantity > 0;
    return matchesSearch && matchesCity && isAvailable;
  });

  /* ----- handlers ----- */
  const handleSearchChange       = (e) => setSearchTerm(e.target.value);
  const handleCityChange         = (e) => {
    const id = parseInt(e.target.value);
    setSelectedCity(isNaN(id) ? null : id);
  };
  const handleAvailabilityToggle = () => setShowAvailableOnly(!showAvailableOnly);

  /* ----- modal open ----- */
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    /* mock comments */
    const mockComments = [
      { id: 1, user: 'Sarah J.',   text: 'Excellent product! Exactly as described and arrived quickly.',                 rating: 5 },
      { id: 2, user: 'Michael T.', text: 'Good quality but shipping took longer than expected.',                          rating: 4 },
      { id: 3, user: 'Emma R.',    text: 'Works well but the battery life is shorter than advertised.',                   rating: 3 },
      { id: 4, user: 'David L.',   text: 'Perfect! Would definitely recommend to others.',                                rating: 5 },
      { id: 5, user: 'Lisa M.',    text: 'Great value for the price. Very satisfied with my purchase.',                   rating: 4 }
    ];
    setComments(mockComments);

    /* chart in next tick */
    setTimeout(() => {
      if (!chartRef.current) return;
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        animation: false,
        title:   { text: 'Rating Distribution', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'item' },
        series: [{
          name:  'Ratings',
          type:  'pie',
          radius:['40%','70%'],
          avoidLabelOverlap: false,
          itemStyle:{ borderRadius:10,borderColor:'#fff',borderWidth:2 },
          label:      { show:false, position:'center' },
          emphasis:   { label:{ show:true, fontSize:'14', fontWeight:'bold' } },
          labelLine:  { show:false },
          data: [
            { value: mockComments.filter(c=>c.rating===5).length, name:'5 Stars', itemStyle:{ color:'#4CAF50' } },
            { value: mockComments.filter(c=>c.rating===4).length, name:'4 Stars', itemStyle:{ color:'#8BC34A' } },
            { value: mockComments.filter(c=>c.rating===3).length, name:'3 Stars', itemStyle:{ color:'#FFC107' } },
            { value: mockComments.filter(c=>c.rating===2).length, name:'2 Stars', itemStyle:{ color:'#FF9800' } },
            { value: mockComments.filter(c=>c.rating===1).length, name:'1 Star',  itemStyle:{ color:'#F44336' } }
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

  /* ----- helpers ----- */
  const renderStars = (rating) => {
    const stars = [];
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= full) stars.push(<FaStar  key={i} className="inline text-yellow-400" />);
      else if (i === full + 1 && half)  stars.push(<FaStarHalfAlt key={i} className="inline text-yellow-400" />);
      else stars.push(<FaRegStar    key={i} className="inline text-yellow-400" />);
    }
    return stars;
  };

  const getCityName = (id) => cities.find(c=>c.id===id)?.name ?? 'Unknown';

  const formatDate = (iso) => new Date(iso).toLocaleDateString(
    'en-US',{ year:'numeric',month:'long',day:'numeric' }
  );

  /* ---------- JSX ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50" dir='ltr'>
      {/* ---------- main ---------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- hero --- */}
        <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-blue-600 to-blue-400">
            
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:`url('https://readdy.ai/api/search-image?query=Abstract%20blue%20and%20white%20gradient%20background%20with%20subtle%20geometric%20patterns%20creating%20a%20modern%20clean%20look%20perfect%20for%20e-commerce%20and%20product%20search%20applications%20with%20soft%20lighting%20and%20professional%20appearance&width=1200&height=400&seq=7&orientation=landscape')`,
              opacity:'0.15'
            }}
          />
          <div className="relative z-10 py-12 px-6 md:px-12 text-center md:text-left md:flex md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find Products Near You
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Search for products across multiple stores and find the best deals in your city.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  <FaMapMarkerAlt className="inline mr-2" /> جستجو با لوکیشن
                </button>
                <button className="bg-transparent text-white border border-white px-6 py-0 rounded-lg font-medium hover:bg-white/10 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                 بازگشت به خانه
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                src="https://readdy.ai/api/search-image?query=3D%20illustration%20of%20a%20smartphone%20with%20a%20shopping%20app%20showing%20product%20search%20results%20with%20a%20clean%20modern%20design%20floating%20above%20a%20minimalist%20surface%20with%20soft%20shadows%20and%20blue%20accent%20colors&width=500&height=400&seq=8&orientation=portrait"
                alt="Product Search App"
                className="w-full max-w-md rounded-lg shadow-lg transform md:translate-y-4"
              />
            </div>
          </div>
        </div>

        {/* --- search card --- */}
        <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 border border-blue-100/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/40" />
          <div className="relative max-w-3xl mx-auto">

            {/* title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Discover Products Near You
              </h2>
              <p className="text-gray-600">Search across thousands of products from local stores</p>
            </div>

            {/* search bar */}
            <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-blue-500 text-lg" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="What are you looking for today?"
                className="w-full pl-12 pr-40 py-4 bg-white/80 backdrop-blur border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base shadow-sm transition-all duration-300"
              />
              <div className="absolute inset-y-2 right-2 flex items-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm transition-colors flex items-center !rounded-button whitespace-nowrap cursor-pointer">
                  <FaSearch className="mr-2" /> Search
                </button>
              </div>
            </div>

            {/* filters */}
            <div className="mt-6 flex justify-between">

              {/* city select */}
              <div className="relative group">
                <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-blue-500" />
                  </div>
                  <select
                    id="city-select"
                    value={selectedCity ?? ''}
                    onChange={handleCityChange}
                    className="block w-full pl-10 pr-10 py-3 bg-white/80 backdrop-blur border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none text-base transition-all duration-300"
                  >
                    <option value="">All Cities</option>
                    {cities.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
                    <FaChevronDown />
                  </div>
                </div>
              </div>

              {/* availability toggle */}
              <div className="flex items-center mt-2 sm:mt-0">
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="availability-toggle" 
                    checked={showAvailableOnly}
                    onChange={handleAvailabilityToggle}
                    className="absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-blue-600 transition-all duration-200 ease-in-out"
                  />
                  <label 
                    htmlFor="availability-toggle" 
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <label htmlFor="availability-toggle" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Show Available Only
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* --- results header --- */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {loading ? 'Discovering products...' : `${filteredProducts.length} Amazing Finds`}
              </h2>
              <p className="text-gray-600 text-sm">
                {loading ? 'Searching across all stores...' : 'Browse through our curated selection'}
              </p>
            </div>
            <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
              <span className="text-sm text-gray-600 mr-3">Sort by:</span>
              <select className="text-sm bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 pr-8 cursor-pointer">
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- results grid / skeleton / empty --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_,i)=>(
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse transform hover:-translate-y-1 transition-all duration-300">
                <div className="h-56 bg-gradient-to-r from-blue-100 to-blue-50" />
                <div className="p-6">
                  <div className="h-6 bg-gradient-to-r from-blue-100 to-transparent rounded-full w-3/4 mb-3" />
                  <div className="h-4 bg-gradient-to-r from-blue-50 to-transparent rounded-full w-full mb-2" />
                  <div className="h-4 bg-gradient-to-r from-blue-50 to-transparent rounded-full w-5/6 mb-4" />
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_,j)=>(
                      <div key={j} className="h-4 w-4 bg-blue-100 rounded-full mr-1" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gradient-to-r from-green-100 to-transparent rounded-full w-1/3" />
                    <div className="h-8 bg-gradient-to-r from-blue-100 to-transparent rounded-full w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(p=>(
              <div
                key={p.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer"
                onClick={()=>openProductModal(p)}
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:opacity-0 transition-opacity duration-300" />
                  <img
                    src={p.pic_url}
                    alt={p.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  {p.quantity>0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      In Stock
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">{p.name}</h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <FaRegHeart />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      {renderStars(p.average_rating)}
                      <span className="ml-2 text-sm text-gray-500">({p.average_rating.toFixed(1)})</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-blue-500 mr-1 inline" />
                      {getCityName(p.city_id)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`text-sm font-medium ${p.quantity>0?'text-green-600':'text-red-500'}`}>
                      {p.quantity>0 ? (
                        <span className="flex items-center">
                          <FaCheckCircle className="mr-1" /> {p.quantity} available
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FaTimesCircle className="mr-1" /> Out of stock
                        </span>
                      )}
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 !rounded-button whitespace-nowrap cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* empty state */
          <div className="text-center py-12">
            <img
              src="https://readdy.ai/api/search-image?query=Minimalist%20illustration%20of%20an%20empty%20box%20or%20search%20result%20with%20a%20magnifying%20glass%2C%20using%20blue%20and%20white%20color%20scheme%2C%20showing%20no%20results%20found%20concept%20in%20a%20clean%20modern%20style&width=300&height=200&seq=9&orientation=landscape"
              alt="No results found"
              className="mx-auto w-48 h-auto mb-4"
            />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              onClick={()=>{
                setSearchTerm('');
                setSelectedCity(null);
                setShowAvailableOnly(false);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

 
      </main>
      {/* ---------- product modal ---------- */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeProductModal} />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none !rounded-button whitespace-nowrap cursor-pointer" onClick={closeProductModal}>
                  <span className="sr-only">Close</span>
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <div className="bg-white p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* image & details */}
                  <div>
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img src={selectedProduct.pic_url} alt={selectedProduct.name} className="w-full h-auto object-cover" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Product Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-600">Availability:</div>
                        <div className={`font-medium ${selectedProduct.quantity>0?'text-green-600':'text-red-600'}`}>
                          {selectedProduct.quantity>0 ? `${selectedProduct.quantity} in stock` : 'Out of stock'}
                        </div>
                        <div className="text-gray-600">Location:</div>
                        <div>{getCityName(selectedProduct.city_id)}</div>
                        <div className="text-gray-600">Added on:</div>
                        <div>{formatDate(selectedProduct.date_added)}</div>
                        <div className="text-gray-600">Product ID:</div>
                        <div>#{selectedProduct.id}</div>
                      </div>
                    </div>
                  </div>

                  {/* right column */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                    <div className="flex items-center mb-4">
                      {renderStars(selectedProduct.average_rating)}
                      <span className="ml-2 text-sm text-gray-600">{selectedProduct.average_rating.toFixed(1)} out of 5</span>
                    </div>
                    <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                    <div className="mb-6">
                      <div ref={chartRef} className="h-48 w-full" />
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Reviews</h3>
                      <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {comments.map(c=>(
                          <div key={c.id} className="border-b border-gray-200 pb-3">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium text-gray-900">{c.user}</h4>
                              <div className="flex">
                                {[...Array(5)].map((_,i)=>(
                                  i < c.rating
                                    ? <FaStar key={i} className="text-yellow-400 text-xs" />
                                    : <FaRegStar key={i} className="text-yellow-400 text-xs" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer">
                        <FaStore className="mr-2" /> View Store Details
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer">
                        <FaRegHeart className="mr-2" /> Save to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
