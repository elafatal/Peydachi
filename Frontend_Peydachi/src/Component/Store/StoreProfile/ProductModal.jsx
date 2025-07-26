import React, { useEffect, useState, useRef } from "react";
import { FaTimes, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import axiosInstance from "../../axiosInstance";
import showErrorToast from '../../utils/showErrorToast';
import * as echarts from 'echarts';
const ProductDetailModal = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState('');
  useEffect(() => {
    const fetchCityName = async () => {
      if (product?.city_id) {
        try {
          const res = await axiosInstance.post('/city/get_city_by_id', {
            city_id: product.city_id
          });
          setCityName(res.data.name);
        } catch (err) {
          setCityName('نامشخص');
        }
      }
    };
  
    fetchCityName();
  }, [product]);
  
  const chartRef = useRef(null);
  const formatDate = (dateString) => {
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
  };
  useEffect(() => {
    if (!isOpen || !productId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
    
        const productReq = axiosInstance.post("/product/get_product", { product_id: productId });
        const ratingReq = axiosInstance.post("/product_rating/get_product_rating_distribution", { product_id: productId });
    
        let commentData = [];
    
        try {
          const commentRes = await axiosInstance.post("/product_comment/get_product_comments", { product_id: productId });
          commentData = commentRes.data || [];
        } catch (commentErr) {
          showErrorToast(commentErr);
          commentData = [];
        }
    
        const [productRes, ratingRes] = await Promise.all([productReq, ratingReq]);
    
        setProduct(productRes.data);
        setComments(commentData);
        setDistribution(ratingRes.data || []);
        
      } catch (err) {
        showErrorToast(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [productId, isOpen]);

  useEffect(() => {
    if (!distribution.length || !chartRef.current) return;

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
        itemStyle: { color: colorsByRating[r] },
      };
    });

    chart.setOption({
      animation: false,
      title: { text: 'توزیع امتیازات', left: 'center', textStyle: { fontSize: 14 } },
      tooltip: { trigger: 'item' },
      series: [{
        name: 'Ratings',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
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
  }, [distribution]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      const diff = rating - i;
  
      if (diff >= 1) return <FaStar key={i} className="text-yellow-400" />;
      if (diff >= 0.5) return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      return <FaRegStar key={i} className="text-yellow-400" />;
    });
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" dir="ltr">
      <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-75" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 relative z-10">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
            <FaTimes className="text-xl" />
          </button>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-10">
              <div className="relative w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
              
              </div>
              <p className="mt-4 text-blue-700 text-sm font-medium">در حال بارگیری اطلاعات ...</p>
           </div>
            
          ) : (
            product && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={product.pic_url || "/defult.png"}
                    alt={product.name}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <div dir="rtl" className="mt-3 text-sm space-y-1">
                    <div><strong>نام:</strong> {product.name}</div>
                    <div><strong>موجودی:</strong> {product.quantity}</div>
                    <div><strong>شهر:</strong> {cityName || '---'}</div>
                    <div><strong>تاریخ افزودن:</strong> {formatDate(product.date_added)}</div>
                  </div>
                </div>

                <div>
                  <h2 className="text-end text-2xl font-bold text-gray-800 mb-2 mt-3">{product.name}</h2>
                  <div className="flex items-center mb-2">{renderStars(product.average_rating)} <span className="ml-2 text-sm text-gray-600">{product.average_rating?.toFixed(1)}</span></div>
                  <p dir="rtl" className="text-justify text-gray-700 mb-4">{product.description}</p>

                  <div className="mb-2">
                    <div ref={chartRef} className="h-48 w-full" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-end mb-2">نظرات کاربران</h3>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-2 text-sm" dir="rtl">
                      {comments.length > 0 ? comments.map((c) => (
                        <div key={c.id} className="border-b pb-2">
                          <div className="flex justify-between mb-1 text-gray-600">
                            <span>{c.user_name}</span>
                            <span>{formatDate(c.date_added)}</span>
                          </div>
                          <p>{c.text}</p>
                        </div>
                      )) : <p className="text-center text-gray-500">نظری ثبت نشده است.</p>}
                    </div>
                  </div>

                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
