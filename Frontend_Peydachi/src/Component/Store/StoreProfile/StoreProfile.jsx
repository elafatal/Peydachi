import React , { useEffect, useState } from 'react';
import {  FaComments,FaStar, FaHeart, FaSearch, FaChevronDown, FaBox, FaCalendarAlt, FaEye, FaShoppingCart, FaFacebookF, FaInstagram, FaTwitter, FaPinterest, FaDirections } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { formatDistanceToNow } from 'date-fns';
import faIR from 'date-fns/locale/fa-IR';
import ProductReview from './ProductReview';
import StoreComment from './StoreComment';

const StoreProfile = () => {
  const { id } = useParams(); 
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [s, setS] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offset , setOffset]= useState(1)
  const [modalProduct, setModalProduct] = useState(null);
  const navigate = useNavigate();
  const openProductModal = (product) => {
    setIsModalOpen(true);
    setModalProduct(product);
    
  }
  const closeProductModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };
  
const changeSearch =()=>{
setS(!s)
}

  const handleSetOffset = () => {
    setOffset((prevOffset) => prevOffset + 1);
  };
    
     const formatRelativeDate = (dateString) => {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: faIR,
      });
    };
    ;
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axiosInstance.post('/store/get_store_by_id', {
          store_id: Number(id),
        });
        setStore(response.data);        
      } catch (err) {
        console.error('خطا در دریافت اطلاعات فروشگاه:', err);
        setError('مشکلی در بارگیری اطلاعات فروشگاه رخ داد.');
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);


// بارگذاری محصولات
useEffect(() => {
  const fetchStoreProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/product/full_search_in_store_products', {
        search_text: searchTerm,
        store_id: Number(id),
        show_limit: 10,
        page: offset,
        order: sortBy === 'newest' ? 'newest' : sortBy === 'rating' ? 'favorite' : null,
      });

      setProducts((prevProducts) =>
        offset === 1 ? response.data : [...prevProducts, ...response.data]
      );
    } catch (err) {
      console.error('خطا در دریافت اطلاعات محصول:', err);
   
    } finally {
      setLoading(false);
    }
  };

  fetchStoreProducts();
}, [id, sortBy,s, offset]);

  const filteredProducts = products
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date_added) - new Date(a.date_added);
    if (sortBy === 'rating') return b.average_rating - a.average_rating;
    return 0;
  });
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
        {/* <span className="mr-1 mt-2 text-sm text-gray-600">{rating?.toFixed(1)}</span> */}
      </div>
    );
  };
  if (loading) return <>  <div data-testid="loading-indicator" className="bg-gray-50 flex items-center justify-center h-screen">
  <div className="flex space-x-2">
    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
  </div>
</div>
</>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;
  if (!store) return null; 
  
  return (
    <div className="bg-gray-50">
    <div className=" min-h-screen " >
      {/* Store Header */}
      <div className="bg-gradient-to-r from-blue-50 to-white shadow-md">
        <div className="container mx-auto px-16 py-8">
          <div className="relative mb-4">
            <div className="absolute inset-0  opacity-70"></div>
            <div className="relative z-10 flex flex-col md:flex-row">
              <div className="md:w-2/3 pr-0 md:pr-8">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">{store.name}</h1>
                <div className="h-1 w-24 bg-blue-500 mb-6"></div>
                <p className="text-justify text-gray-700 mb-6 leading-relaxed max-w-full md:max-w-[800px]">{store.description}</p>


                <h4 className="text-md font-semibold text-gray-700 mb-3">اطلاعات تماس</h4>
                  <div className="space-y-2">
                        {Object.entries(store.contact_info).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="text-gray-500 capitalize w-24">{key}:</span>
                            <span className="text-gray-800 mr-1">{value}</span>
                          </div>
                        ))}
                  </div>
              </div>
  
              <div className="md:w-1/3 mt-6 md:mt-0 bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">عملکرد فروشگاه</h3>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div>
                      <p className="text-gray-600 mb-1">امتیاز فروشگاه</p>
                      <div className="flex items-center justify-center">
                        {renderRating(store.average_rating)}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">امتیاز محصولات</p>
                      <div className="flex items-center justify-center">
                        {renderRating(store.average_product_rating)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1"> 
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-xs text-blue-600 font-medium mb-1">امتیاز فروشگاه </div>
                    <div className="text-2xl font-bold text-blue-800">{(store.average_rating ?? 0).toFixed(1)}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-xs text-blue-600 font-medium mb-1">امتیاز محصولات</div>
                    <div className="text-2xl font-bold text-blue-800">{(store.average_product_rating ?? 0).toFixed(1)}</div>
                  </div>
                </div>
  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StoreComment storeID={Number(id)}/>
      {/* Products Section */}
      <div className="container mx-auto px-4 py-12 w-11/12 m-auto" dir='ltr'>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-blue-800">محصولات موجود</h2>
          <div className="flex items-center">
            <div className="relative">
            <input dir='rtl'
                type="text"
                placeholder="جستجوی محصول..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"

              />
              <FaSearch data-testid="search-button" onClick={changeSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm" />
            </div>
            <div className="relative ml-4">
            <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex items-center bg-white border border-blue-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition duration-200 cursor-pointer whitespace-nowrap !rounded-button"
        >
        <option value="newest">جدیدترین</option>
        <option value="rating">بالاترین امتیاز</option>
      </select>
            </div>
          </div>
        </div>
  
                  {sortedProducts && sortedProducts.length > 0 ?
                  (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sortedProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200 border border-blue-50 cursor-pointer">
                          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200 border border-blue-50 cursor-pointer">
                        <div className="h-64 overflow-hidden">
                          <img
                            src={product.pic_url}
                            alt={product.name}
                            className="w-full h-full object-cover object-top transition duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-blue-800">{product.name}</h3>
                            {renderRating(product.average_rating)}
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaBox className="mr-1 text-blue-400" />
                              {product.quantity} موجود در انبار
                            </span>
                            <span className="flex items-center" dir='rtl'>
                              <FaCalendarAlt className="ml-1 text-blue-400" />
                              {formatRelativeDate(product.date_added)}
                            </span>
                          
                          </div>
                          <div className="mt-4 pt-4 border-t border-blue-50 flex justify-between">
                            <button className="flex items-center justify-center bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 py-1 px-3 rounded-sm transition duration-200 text-sm whitespace-nowrap cursor-pointer">
                              <FaEye className="mr-1" /> دیدن جزئیات
                            </button>
                            <button onClick={()=>openProductModal(product)} className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-sm transition duration-200 text-sm whitespace-nowrap cursor-pointer">
                              <FaComments className="mr-1 " /> ثبت نظر
                            </button>
                          </div>
                        </div>
                      </div>
                        </div>
                      ))}
                    </div>
                  ) : (
            <div className="w-full flex justify-center mt-16">
              <div className="flex flex-col items-center text-center text-gray-500 max-w-xs">
                <FaBox className="text-5xl text-blue-300 mb-4" />
                <h3 className="text-lg font-semibold mb-1">محصولی یافت نشد</h3>
                <p className="text-sm text-gray-400">این فروشگاه در حال حاضر محصولی برای نمایش ندارد.</p>
              </div>
            </div>
                  )}
        {sortedProducts && sortedProducts.length > 0 ?         <div className="mt-12 flex justify-center">
          <button type="button" onClick={handleSetOffset} className="flex items-center bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-button transition duration-200 font-medium whitespace-nowrap cursor-pointer">
            نمایش بیشتر <FaChevronDown className="ml-2" />
          </button>
        </div>:null}

      </div>
      <ProductReview  closeProductModal={closeProductModal}  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedProduct={modalProduct} />
     
    </div>
  </div>
  );
};

export default StoreProfile;
