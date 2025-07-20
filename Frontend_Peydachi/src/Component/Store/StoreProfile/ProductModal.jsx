import React, { useEffect, useState } from "react";
import { FaComments, FaStar, FaRegStar, FaStarHalfAlt, FaTimes } from 'react-icons/fa';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const ProductModal = ({
  productId,
  isModalOpen,
  chartRef,
  closeProductModal,
  getCityName,
  formatDate,
  toggleFavorite,
  favorites,
  setIsReviewModalOpen
}) => {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= full) stars.push(<FaStar key={i} className="inline text-yellow-400" />);
      else if (i === full + 1 && half) stars.push(<FaStarHalfAlt key={i} className="inline text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="inline text-yellow-400" />);
    }
    return stars;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!productId || !isModalOpen) return;

      setLoading(true);
      try {
        const productRes = await axiosInstance.post('/product/get_product', { product_id: productId });
        setProduct(productRes.data);

        const commentRes = await axiosInstance.post('/product_comment/get_product_comments', { product_id: productId });
        setComments(commentRes.data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات محصول یا نظرات:", err);
        setProduct(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, isModalOpen]);

  if (!isModalOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir="ltr">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={closeProductModal} />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={closeProductModal} className="bg-white text-gray-400 hover:text-gray-500">
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8">
            {loading ? (
              <p className="text-center text-gray-500">در حال بارگذاری...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img src={product.pic_url} alt={product.name} className="rounded-lg mb-4 w-full object-cover" />
                  <div dir="rtl" className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">جزئیات محصول</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">موجودی:</div>
                      <div className={`font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.quantity > 0 ? `${product.quantity} موجود` : 'ناموجود'}
                      </div>
                      <div className="text-gray-600">شهر:</div>
                      <div>{getCityName(product.city_id)}</div>
                      <div className="text-gray-600">تاریخ اضافه شدن:</div>
                      <div>{formatDate(product.date_added)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-end text-2xl font-bold text-gray-900 my-2">{product.name}</h2>
                  <div className="flex items-center mb-4">
                    {renderStars(product.average_rating)}
                    <span className="ml-2 text-sm text-gray-600">{product.average_rating?.toFixed(1)} 5</span>
                  </div>
                  <p dir="rtl" className="text-justify text-gray-700 mb-6">{product.description}</p>
                  <div className="mb-6"><div ref={chartRef} className="h-48 w-full" /></div>

                  <div className="mb-6">
                    <h3 dir="rtl" className="text-lg text-start font-semibold text-gray-900 mb-3">نظرات مشتریان</h3>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {comments.length === 0 ? (
                        <p className="text-sm text-end text-gray-500">.نظری برای این محصول ثبت نشده است</p>
                      ) : comments.map(c => (
                        <div dir="rtl" key={c.id} className="border-b border-gray-200 pb-3">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium text-gray-900">{c.user_name}</h4>
                            <div>{formatDate(c.date_added)}</div>
                          </div>
                          <p className="text-sm text-start text-gray-600">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      className="m-auto pt-3 border px-4 py-2 rounded-lg border-blue-500 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setIsReviewModalOpen(true);
                        setTimeout(() => closeProductModal(), 100);
                      }}
                    >
                      ثبت نظر
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductModal;
