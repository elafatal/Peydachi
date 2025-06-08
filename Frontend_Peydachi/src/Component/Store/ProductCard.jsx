// components/ProductCard.jsx
import React from 'react';
import { FaEdit, FaStar, FaCubes, FaCalendarAlt } from 'react-icons/fa';

const ProductCard = ({ product, onEdit, formatDate }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={product.pic_url || "/defult.png"}
          alt={product.name}
          className="w-full h-48 object-cover object-top"
        />
        <button
          onClick={() => onEdit(product)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <FaEdit />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1 text-sm" />
            <span className="text-sm text-gray-600">{(product.average_rating  ?? 0).toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            <FaCubes className="mr-1 inline" /> {product.quantity} in stock
          </span>
          <span className="text-gray-500">
            <FaCalendarAlt className="mr-1 inline" />
            {formatDate(product.date_added)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
