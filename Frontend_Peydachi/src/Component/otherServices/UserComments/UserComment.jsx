import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FaRegCommentDots, FaRegStar } from 'react-icons/fa';
import CommentCard from './CommentCard';
import SkeletonCard from '../../SkeletionLoading/SelfCommentsCards';
import { IoChevronBackCircle } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import UnauthorizedPage from '../../Error/UnauthorizedPage';
const UserComment = () => {
  const navigate = useNavigate();
  const [loadingStores, setLoadingStores] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeTab, setActiveTab] = useState('stores');
  const [storeComments, setStoreComments] = useState([]);
  const [productComments, setProductComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
 const authToken = Cookies.get('auth_token');
 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0, marginBottom: 0 },
};

  useEffect(() => {
    const fetchStoreComments = async () => {
      try {
        setLoadingStores(true);
        const response = await axiosInstance.get('/store_comment/get_self_full_store_comments');
        if (response.status === 200 && Array.isArray(response.data)) {
          const mappedData = response.data.map((item) => ({
            id: item.store_comment.id,
            storeName: item.store.name,
            storeImage: 
            'https://vectorloo.com/wp-content/uploads/edd/2023/08/%D9%88%DA%A9%D8%AA%D9%88%D8%B1-%D8%B5%D9%88%D8%B1%D8%AA-%D8%AA%D8%B1%D9%88%D9%84-%D8%A8%D8%A7-%D8%B9%DB%8C%D9%86%DA%A9-%D9%88-%D8%B3%DB%8C%DA%AF%D8%A7%D8%B1-1.webp',
            timestamp: new Date(item.store_comment.date_added).toLocaleString(),
            rating: item.store.average_rating || 0,
            comment: item.store_comment.text,
            likes: 0,
          }));
          setStoreComments(mappedData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStores(false);
      }
    };
  
    const fetchProductComments = async () => {
      try {
        setLoadingProducts(true);
        const response = await axiosInstance.get('/product_comment/get_self_full_product_comments');
        if (response.status === 200 && Array.isArray(response.data)) {
          const mappedData = response.data.map((item) => ({
            id: item.product_comment.id,
            productName: item.product.name,
            productImage: item.product.pic_url || 'https://via.placeholder.com/80',
            timestamp: new Date(item.product_comment.date_added).toLocaleString(),
            rating: item.product.average_rating || 0,
            comment: item.product_comment.text,
            storeName: item.store.name,
            likes: 0,
          }));
          setProductComments(mappedData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    };
  
    fetchStoreComments();
    fetchProductComments();
  }, []);
  
const goToSearch =()=>{
  navigate('/search', { replace: true });
}
const backHome =()=>{
  navigate('/', { replace: true });
}
  const activeData = activeTab === 'stores' ? storeComments : productComments;
  const displayedData = showAll ? activeData : activeData.slice(0, 2);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowAll(false); // Reset when switching tabs
  };
  const handleDeleteComment = (id) => {
    if (activeTab === 'stores') {
      setStoreComments((prev) => prev.filter((comment) => comment.id !== id));
    } else {
      setProductComments((prev) => prev.filter((comment) => comment.id !== id));
    }
  };
  
  return (
    !authToken ? (<UnauthorizedPage/>) : (<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold text-blue-800 my-6">نظرات من</h1>

        <div className="flex justify-between border-b border-gray-200 mb-6">
          <div className="div">
            <button
              onClick={() => handleTabChange('stores')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'stores'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرات فروشگاه
            </button>
            <button
              onClick={() => handleTabChange('products')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'products'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرات محصول
            </button>
            
          </div>
         <IoArrowBackCircleOutline onClick={backHome} className='text-3xl text-blue-600'/>
        </div>

        <div className="space-y-6">
              {(loadingStores && activeTab === 'stores') || (loadingProducts && activeTab === 'products') ? (
      
      <>
        <SkeletonCard cards={showAll ? activeData.length : 2} />
      </>
    ) :displayedData.length > 0 ? (
      <>
     
      {activeData.slice(0, 2).map((item) => (
        <CommentCard key={item.id} item={item} isStore={activeTab === 'stores'} onDelete={() => handleDeleteComment(item.id)} />

      ))}
    
      <AnimatePresence>
        {showAll && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
            
          >
            {activeData.slice(2).map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <CommentCard item={item} isStore={activeTab === 'stores'} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
    

            

          ) : (
            <div className="text-center py-12">
              {activeTab === 'stores' ? (
                <FaRegCommentDots className="text-gray-300 text-5xl mb-4 mx-auto" />
              ) : (
                <FaRegStar className="text-gray-300 text-5xl mb-4 mx-auto" />
              )}
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                کامنتی برای {activeTab === 'stores' ? 'فروشگاه' : 'محصول'} ثبت نشده
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'stores'
                  ? 'فروشگاه ها را مرور کنید و تجربه خود را به اشتراک بگذارید'
                  : 'شروع به خرید کنید و نظرات خود را به اشتراک بگذارید'}
              </p>
              <button onClick={goToSearch} className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
                {activeTab === 'stores' ? 'جستجوی فروشگاه' : 'یافتن محصول'}
              </button>
            </div>
          )}

          {activeData.length > 2 && (
            <div className="text-center mt-8">

              <button
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg  shadow-lg hover:bg-gray-50 hover:text-black hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? 'نمایش کمتر' : 'نمایش بیشتر'}
          </button>
  </div>
)}

        </div>
      </div>
    </div>)
    
  );
};

export default UserComment;
