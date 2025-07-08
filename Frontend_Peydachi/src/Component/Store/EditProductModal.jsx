import React from 'react';
import { FaTrashAlt, FaTimes, FaPlus } from 'react-icons/fa';

const EditProductModal = ({
  selectedProduct,
  selectedFile,
  productEditData,
  onClose,
  onChange,
  onFileChange,
  onUpdateQuantity,
  onDelete,
  onRemovePic,
  onSave,
  clearSelectedFile,
  handleUploadProductPic,
}) => {
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">ویرایش محصول</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              data-testid="close-button"
            >
              <FaTimes />
            </button>
          </div>
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  نام محصول
                </label>
                <input
                  id="name"
                  name="name"
                  value={productEditData.name}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  توضیحات
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={productEditData.description}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700 mb-3 block"
              >
                مدیریت انبار
              </label>
              <div className="flex items-center space-x-4">
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={productEditData.quantity}
                  onChange={onChange}
                  min="0"
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={onUpdateQuantity}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  تغییر موجودی
                </button>
              </div>
            </div>

            {/* Image */}
            <div dir="ltr">
              {selectedFile && (
                <button
                  onClick={handleUploadProductPic}
                  className="my-2 inline-flex items-center px-3 py-2 text-xs font-medium text-green-600 border-2 border-green-600 rounded-md hover:bg-green-100 transition"
                >
                  آپلود تصویر
                </button>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* current image */}
                <div className="relative group w-full h-full">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <img
                      src={selectedProduct.pic_url}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button
                        onClick={onRemovePic}
                        className="w-8 h-8 bg-white rounded-full text-red-600 flex items-center justify-center"
                        data-testid="remove-pic-button"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
                {/* file upload */}
                <div className="relative group w-full h-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="text-center">
                      <FaPlus className="inline text-2xl text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">آپلود عکس جدید</p>
                    </div>
                  </label>
                </div>

                {/* file preview */}
                {selectedFile && (
                  <div className="relative group w-full h-full">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-500">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <button
                          onClick={clearSelectedFile}
                          className="w-8 h-8 bg-white rounded-full text-red-600 flex items-center justify-center"
                          data-testid="clear-preview-button"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                حذف محصول
              </button>
              <div className="space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  انصراف
                </button>
                <button
                  onClick={onSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;