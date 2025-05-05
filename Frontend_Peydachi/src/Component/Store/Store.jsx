import React from 'react';
import {  FaStar,FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaHeart, FaSearch, FaChevronDown, FaBox, FaCalendarAlt, FaEye, FaShoppingCart, FaFacebookF, FaInstagram, FaTwitter, FaPinterest, FaDirections } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const ProductOfStore = () => {
     const navigate = useNavigate();
    const storeInfo = {
        name: "Ocean Blue Boutique",
        owner_id: 1,
        contact_info: {
          email: "contact@oceanblueboutique.com",
          phone: "+1 (555) 123-4567",
          website: "www.oceanblueboutique.com"
        },
        description: "Ocean Blue Boutique offers a curated selection of premium coastal-inspired products. From handcrafted home décor to sustainable fashion, we bring the serenity of the ocean to your everyday life.",
        location_longitude: "-122.4194",
        location_latitude: "37.7749",
        city_id: 1,
        city_name: "San Francisco",
        id: 101,
        average_rating: 4.7,
        average_product_rating: 4.5,
        is_banned: false
      };
    
  const products = [    {
    id: 1,
    name: "Coastal Linen Throw Pillow",
    description: "Handcrafted linen throw pillow with coastal patterns. Perfect for adding a touch of the ocean to your living space.",
    quantity: 24,
    date_added: "2025-04-15T10:30:00.000Z",
    city_id: 1,
    pic_url: "https://readdy.ai/api/search-image?query=A%20luxurious%20coastal-themed%20linen%20throw%20pillow%20with%20blue%20and%20white%20patterns%2C%20photographed%20in%20a%20minimalist%20setting%20with%20soft%20natural%20lighting%2C%20showing%20texture%20details%20and%20elegant%20stitching%2C%20perfect%20for%20a%20modern%20coastal%20home%20decor&width=600&height=400&seq=1001&orientation=landscape",
    average_rating: 4.8
  },
  {
    id: 2,
    name: "Handmade Ceramic Vase",
    description: "Artisanal ceramic vase with ocean-inspired blue glazing. Each piece is unique and handcrafted by local artists.",
    quantity: 12,
    date_added: "2025-04-22T14:45:00.000Z",
    city_id: 1,
    pic_url: "https://readdy.ai/api/search-image?query=An%20elegant%20handmade%20ceramic%20vase%20with%20blue%20ocean-inspired%20glazing%2C%20photographed%20against%20a%20clean%20white%20background%20with%20soft%20shadows%2C%20showing%20the%20unique%20texture%20and%20artisanal%20quality%20of%20the%20piece%20with%20subtle%20variations%20in%20the%20glaze&width=600&height=400&seq=1002&orientation=landscape",
    average_rating: 4.6
  },
  {
    id: 3,
    name: "Sustainable Linen Shirt",
    description: "Eco-friendly linen shirt made from sustainably sourced materials. Breathable, comfortable, and perfect for warm weather.",
    quantity: 18,
    date_added: "2025-04-28T09:15:00.000Z",
    city_id: 1,
    pic_url: "https://readdy.ai/api/search-image?query=A%20high-quality%20sustainable%20linen%20shirt%20in%20light%20blue%20color%2C%20photographed%20flat%20lay%20on%20a%20minimal%20white%20background%20with%20soft%20natural%20lighting%2C%20showing%20the%20natural%20texture%20of%20the%20fabric%20and%20clean%20tailoring%20with%20attention%20to%20detail&width=600&height=400&seq=1003&orientation=landscape",
    average_rating: 4.9
  },
  {
    id: 4,
    name: "Sea Glass Wall Art",
    description: "Beautiful wall art created with authentic sea glass collected from local beaches. A stunning piece that brings the ocean into your home.",
    quantity: 8,
    date_added: "2025-05-01T11:20:00.000Z",
    city_id: 1,
    pic_url: "https://readdy.ai/api/search-image?query=An%20artistic%20sea%20glass%20wall%20art%20piece%20with%20various%20shades%20of%20blue%20and%20turquoise%20sea%20glass%20arranged%20in%20a%20wave%20pattern%2C%20photographed%20against%20a%20clean%20white%20wall%20with%20natural%20lighting%20highlighting%20the%20translucent%20quality%20and%20texture%20of%20the%20sea%20glass&width=600&height=400&seq=1004&orientation=landscape",
    average_rating: 4.7
  },
  {
    id: 5,
    name: "Ocean-Scented Soy Candle",
    description: "Hand-poured soy candle with a refreshing ocean scent. Made with natural ingredients and essential oils for a clean burn.",
    quantity: 32,
    date_added: "2025-05-03T16:10:00.000Z",
    city_id: 1,
    pic_url: "https://readdy.ai/api/search-image?query=A%20premium%20ocean-scented%20soy%20candle%20in%20an%20elegant%20blue%20glass%20container%2C%20photographed%20in%20a%20minimalist%20setting%20with%20soft%20lighting%2C%20showing%20the%20smooth%20texture%20of%20the%20wax%20and%20subtle%20reflections%20on%20the%20glass%20surface%20with%20a%20clean%20white%20background&width=600&height=400&seq=1005&orientation=landscape",
    average_rating: 4.5
  },
  {
    id: 6,
    name: "Handwoven Beach Tote",
    description: "Durable and stylish beach tote handwoven from sustainable materials. Spacious enough for all your beach essentials.",
    quantity: 15,
    date_added: "2025-05-04T13:25:00.000Z",
    city_id: 1,
    pic_url: "https://readdy.ai/api/search-image?query=A%20stylish%20handwoven%20beach%20tote%20in%20natural%20and%20blue%20tones%2C%20photographed%20from%20above%20on%20a%20white%20surface%20with%20soft%20natural%20lighting%2C%20showing%20the%20intricate%20weaving%20pattern%20and%20spacious%20interior%20with%20some%20subtle%20beach%20items%20visible%20inside&width=600&height=400&seq=1006&orientation=landscape",
    average_rating: 4.4
  }];

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
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
    <div className=" min-h-screen " dir='ltr'>
      {/* Store Header */}
      <div className="bg-gradient-to-r from-blue-50 to-white shadow-md">
        <div className="container mx-auto px-16 py-8">
          <div className="relative mb-4">
            <div className="absolute inset-0  opacity-70"></div>
            <div className="relative z-10 flex flex-col md:flex-row">
              <div className="md:w-2/3 pr-0 md:pr-8">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">{storeInfo.name}</h1>
                <div className="h-1 w-24 bg-blue-500 mb-6"></div>
                <p className="text-gray-700 mb-6 leading-relaxed">{storeInfo.description}</p>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-600">
                        <FaEnvelope className="w-6 text-blue-500" />
                        <span className="ml-2">{storeInfo.contact_info.email}</span>
                      </p>
                      <p className="flex items-center text-gray-600">
                        <FaPhone className="w-6 text-blue-500" />
                        <span className="ml-2">{storeInfo.contact_info.phone}</span>
                      </p>
                      <p className="flex items-center text-gray-600">
                        <FaGlobe className="w-6 text-blue-500" />
                        <span className="ml-2">{storeInfo.contact_info.website}</span>
                      </p>
                    </div>
                  </div>
  
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Location</h3>
                    <p className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="w-6 text-blue-500" />
                      <span className="ml-2">{storeInfo.city_name}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Coordinates: {storeInfo.location_latitude}, {storeInfo.location_longitude}
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="md:w-1/3 mt-6 md:mt-0 bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Store Ratings</h3>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div>
                      <p className="text-gray-600 mb-1">Store Rating</p>
                      <div className="flex items-center justify-center">
                        {renderRating(storeInfo.average_rating)}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Product Rating</p>
                      <div className="flex items-center justify-center">
                        {renderRating(storeInfo.average_product_rating)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-sm transition duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer">
                    <FaHeart className="mr-2" /> Follow Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Products Section */}
      <div className="container mx-auto px-4 py-12 w-11/12 m-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-blue-800">Available Products</h2>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm" />
            </div>
            <div className="relative ml-4">
              <button className="flex items-center bg-white border border-blue-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition duration-200 cursor-pointer whitespace-nowrap !rounded-button">
                <span>Sort by</span>
                <FaChevronDown className="ml-2 text-xs text-blue-500" />
              </button>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
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
                    {product.quantity} in stock
                  </span>
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-blue-400" />
                    {formatDate(product.date_added)}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-50 flex justify-between">
                  <button className="flex items-center bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 py-1 px-3 rounded-sm transition duration-200 text-sm whitespace-nowrap cursor-pointer">
                    <FaEye className="mr-1" /> Quick View
                  </button>
                  <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-sm transition duration-200 text-sm whitespace-nowrap cursor-pointer">
                    <FaShoppingCart className="mr-1" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-12 flex justify-center">
          <button className="flex items-center bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-button transition duration-200 font-medium whitespace-nowrap cursor-pointer">
            Load More Products <FaChevronDown className="ml-2" />
          </button>
        </div>
      </div>
  
     
    </div>
  </div>
  );
};

export default ProductOfStore;
