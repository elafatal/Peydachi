
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import useSearchProduct from './useSearchProduct';
import { useNavigate } from 'react-router-dom';
import {
  FaStore,
  FaRegHeart,
  FaHeart,
  FaSearch,
  FaMapMarkerAlt,
  FaChevronDown,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaStar,
  FaRegStar,
  FaStarHalfAlt
} from 'react-icons/fa';

import axiosInstance from '../../axiosInstance';
import searchProduct from '../../../../public/searchProduct.jpg'
import { motion, AnimatePresence } from 'framer-motion';
import ProductModal from './ProductModal';
const SearchProduct = () => {
  const navigate = useNavigate();
  const {
    searchTerm,
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
    sortOption,
    setSortOption,
    favorites,
  toggleFavorite,
  showOnlyFavorites,
  setShowOnlyFavorites,
  } = useSearchProduct();

const goHome =()=>{
  navigate('/', { replace: true });
}
const goMainSearch =()=>{
  navigate('/Search', { replace: true });
}

let displayedProducts = [...filteredProducts];

if (showOnlyFavorites) {
  displayedProducts = displayedProducts.filter(p => favorites.includes(p.id));
}

let sortedProducts = [...displayedProducts];

if (sortOption === 'highestRated') {
  sortedProducts.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
} else if (sortOption === 'newest') {
  sortedProducts.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
} else if (sortOption === 'mostAvailable') {
  sortedProducts.sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
}


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
              <h2 className="text-3xl md:text-3.5xl font-bold text-white mb-4 text-right" dir='rtl'>
              محصولات نزدیک خود را بیابید
              </h2>
              <p className="text-blue-100 text-lg mb-6 text-right" dir='rtl'>
              جستجو در این بخش برای بهبود قابلیت تصمیم گیری‌ست.  <br/> 
                برای خرید آسان، موقعیت مکانی را وارد کنید.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <button onClick={goMainSearch} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  <FaMapMarkerAlt className="inline mr-2" /> جستجو با لوکیشن
                </button>
                <button onClick={goHome} className="bg-transparent text-white border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                 بازگشت به خانه
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                src={searchProduct}
                alt="Product Search App"
                className="w-full max-w-md rounded-lg shadow-lg transform md:translate-y-4"
              />
            </div>
          </div>
        </div>

        {/* --- search card --- */}
        <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 border border-blue-100/50 relative ">
          <div className="absolute inset-0 bg-white/40" />
          <div className="relative max-w-3xl mx-auto">

            {/* title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                جستجو و بررسی محصول
              </h2>
              <p className="text-gray-600">جستجو در میان هزاران محصول از فروشگاه‌های محلی</p>
            </div>

            {/* search bar */}
            <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
             
              <input dir='rtl'
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="دنبال چه چیزی میگردید؟"
                className="w-full pr-15 pl-40 py-4 bg-white/80 backdrop-blur border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base shadow-sm transition-all duration-300"
              />
              <div className="absolute inset-y-2 right-2 flex items-center">
                <button onClick={handleSearch} className=" border-1 border-blue-500 px-2 py-2 rounded-full shadow-sm transition-colors flex items-center !rounded-button whitespace-nowrap cursor-pointer">
                  <FaSearch className='text-blue-500' /> 
                </button>
              </div>
            </div>

            {/* filters */}
            <div className="mt-6 flex justify-between">



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
                  موجود
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* --- results header --- */}
        <div dir='rtl' className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {loading ? 'درحال جستجو' : `نتیجه یافت شد ${filteredProducts.length}`}
              </h2>
              <p  className="text-gray-600 text-sm">
                {loading ? 'جستجو در تمام فروشگاه‌ها...' : ' از میان مجموعه منتخب ما مرور کنید'}
              </p>
            </div>
            <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <button
            onClick={() => setShowOnlyFavorites(prev => !prev)}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 border 
              ${showOnlyFavorites 
                ? 'bg-red-100 text-red-700 border-red-400 hover:bg-red-200' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            {showOnlyFavorites ? 'نمایش همه محصولات' : 'نمایش علاقه‌مندی‌ها'}
          </button>

              <span className="text-sm text-gray-600 mr-3">مرتب سازی:</span>
                      <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-sm bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 pr-8 cursor-pointer"
        >
          <option value="relevance"> مرتبط ترین </option>
          <option value="highestRated">بیشترین امتیاز</option>
          <option value="newest">جدیدترین</option>
          <option value="mostAvailable">بیشترین موجودی</option>
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
        ) : sortedProducts .length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts .map(p=>(
              <div
                key={p.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer"
                onClick={()=>openProductModal(p)}
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:opacity-0 transition-opacity duration-300" />
                  <img
                  src={p.pic_url || "/defult.png"}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />

                  {p.quantity>0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      موجود در انبار
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">{p.name}</h3>
                    <button
                    className={`text-xl transition-colors ${
                      favorites.includes(p.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // جلوگیری از باز شدن مودال
                      toggleFavorite(p.id);
                    }}
                  >
                    {favorites.includes(p.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      {renderStars(p.average_rating)}
                      <span className="ml-2 text-sm text-gray-500">
                    ({(p.average_rating ?? 0).toFixed(1)})
                  </span>

                    </div>
                    {/* <div className="text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-blue-500 mr-1 inline" />
                      {getCityName(p.city_id)}
                    </div> */}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`text-sm font-medium ${p.quantity>0?'text-green-600':'text-red-500'}`}>
                      {p.quantity>0 ? (
                        <span className="flex items-center">
                          <FaCheckCircle className="mr-1" /> موجود
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FaTimesCircle className="mr-1" /> ناموجود  
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
      <FaMapMarkerAlt className="text-blue-500 mr-1 inline" />
        {getCityName(p.city_id)}
      </div>

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
            <h3 className="text-xl font-medium text-gray-900 mb-2">محصولی پیدا نشد</h3>
            <p className="text-gray-600 mb-4">
            سعی کنید جستجو یا فیلتر خود را برای یافتن آنچه به دنبالش هستید تنظیم کنید
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              onClick={clearFilters}
            >پاک کردن فیلترها
            </button>
          </div>
        )}

 
      </main>
      {/* ---------- product modal ---------- */}
     <ProductModal  selectedProduct={selectedProduct}
      isModalOpen={isModalOpen}
      comments={comments}
      chartRef={chartRef}
      closeProductModal={closeProductModal}
      getCityName={getCityName}
      formatDate={formatDate}
      toggleFavorite={toggleFavorite}
      favorites={favorites} />
    </div>
  );
};

export default SearchProduct;
