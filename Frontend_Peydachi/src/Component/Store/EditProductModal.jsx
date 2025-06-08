// components/EditProductModal.jsx
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
  clearSelectedFile
}) => {
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Edit Product</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FaTimes />
            </button>
          </div>
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                <input
                  name="name"
                  value={productEditData.name}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea
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
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quantity Management</h4>
              <div className="flex items-center space-x-4">
                <input
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
                  Update Quantity
                </button>
              </div>
            </div>

            {/* Image */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Image Management</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* current image */}
                <div className="relative group">
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
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>

                {/* file upload */}
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer block aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="text-center">
                      <FaPlus className="text-2xl text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Add Image</p>
                    </div>
                  </label>
                </div>

                {/* file preview */}
                {selectedFile && (
                  <div className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-500">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-2/3 h-2/3 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <button
                          onClick={clearSelectedFile}
                          className="w-8 h-8 bg-white rounded-full text-red-600 flex items-center justify-center"
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
                Delete Product
              </button>
              <div className="space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
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
