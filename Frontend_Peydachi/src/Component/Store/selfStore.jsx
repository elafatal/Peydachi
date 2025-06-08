// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import axiosInstance from '../axiosInstance';
import {
    FaEdit,
    FaTimes,
    FaPlus,
    FaStar,
    FaStarHalfAlt,
    FaStar as FaStarEmpty,
    FaMapMarkerAlt,
    FaCubes,
    FaCalendarAlt,
    FaTrashAlt,
  } from 'react-icons/fa';
  import ProductCard from './ProductCard';
import EditProductModal from './EditProductModal';
import { useParams } from 'react-router-dom';
const SelfStore = () => {
          
          useEffect(() => {
            const handleGoSelfStore =async()=>{
              try {
                const response = await axiosInstance.get('/seller/store/get_self_store', {
                  headers: {
                     'Accept': 'application/json'
                    // 'Content-Type': 'multipart/form-data'
                  }
                });
                if (response.data) {
                    console.log(response.data.entries(contactInfo));
                  }
            
              } catch (error) {
                console.log(error);
              }
            }

            handleGoSelfStore();
          }, []);
const [storeInfo, setStoreInfo] = useState({
name: "Organic Harvest Market",
owner_id: 1,
contact_info: {
email: "contact@organicharvest.com",
phone: "+1 (555) 123-4567",
website: "www.organicharvest.com"
},
description: "A premium store offering fresh organic produce, locally sourced goods, and artisanal products. We work directly with farmers to bring you the best quality food with sustainability in mind.",
location_longitude: "-122.4194",
location_latitude: "37.7749",
city_id: 1,
id: 101,
average_rating: 4.7,
average_product_rating: 4.5,
is_banned: false
});
const [products, setProducts] = useState([
{
id: 1,
name: "Organic SelfStoreles",
description: "Fresh organic apples from local farms. No pesticides, non-GMO, and harvested at peak ripeness.",
quantity: 150,
date_added: "2025-05-20T10:30:00.000Z",
city_id: 1,
pic_url: "https://readdy.ai/api/search-image?query=Fresh%20organic%20red%20apples%20arranged%20in%20a%20wooden%20crate%20with%20green%20leaves%2C%20on%20a%20clean%20white%20background%2C%20high%20quality%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20detailed%20texture&width=300&height=200&seq=1&orientation=landscape",
average_rating: 4.8
},
{
id: 2,
name: "Artisanal Honey",
description: "Pure, unfiltered honey from local beekeepers. Rich in flavor and natural enzymes.",
quantity: 75,
date_added: "2025-05-25T14:15:00.000Z",
city_id: 1,
pic_url: "https://readdy.ai/api/search-image?query=Artisanal%20honey%20jar%20with%20wooden%20dipper%2C%20golden%20honey%20visible%20through%20clear%20glass%2C%20on%20a%20clean%20white%20background%2C%20high%20quality%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20detailed%20texture&width=300&height=200&seq=2&orientation=landscape",
average_rating: 4.9
},
{
id: 3,
name: "Organic Vegetables Basket",
description: "Assorted seasonal vegetables, all organic and locally sourced. Perfect for weekly meal planning.",
quantity: 50,
date_added: "2025-06-01T09:45:00.000Z",
city_id: 1,
pic_url: "https://readdy.ai/api/search-image?query=Organic%20vegetables%20basket%20with%20colorful%20assortment%20of%20fresh%20vegetables%20including%20carrots%2C%20tomatoes%2C%20lettuce%2C%20and%20bell%20peppers%2C%20on%20a%20clean%20white%20background%2C%20high%20quality%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20detailed%20texture&width=300&height=200&seq=3&orientation=landscape",
average_rating: 4.6
},
{
id: 4,
name: "Fresh Sourdough Bread",
description: "Artisanal sourdough bread baked daily. Made with organic flour and traditional fermentation methods.",
quantity: 30,
date_added: "2025-06-05T08:00:00.000Z",
city_id: 1,
pic_url: "https://readdy.ai/api/search-image?query=Freshly%20baked%20artisanal%20sourdough%20bread%20with%20crispy%20crust%20and%20soft%20interior%2C%20sliced%20to%20show%20texture%2C%20on%20a%20clean%20white%20background%2C%20high%20quality%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20detailed%20texture&width=300&height=200&seq=4&orientation=landscape",
average_rating: 4.7
}
]);
const [isEditing, setIsEditing] = useState(false);
const [editData, setEditData] = useState({
name: "",
contact_info: {},
description: "",
location_longitude: "",
location_latitude: ""
});
useEffect(() => {
// Initialize edit data when store info changes
if (storeInfo) {
setEditData({
name: storeInfo.name,
contact_info: storeInfo.contact_info,
description: storeInfo.description,
location_longitude: storeInfo.location_longitude,
location_latitude: storeInfo.location_latitude
});
}
}, [storeInfo]);
useEffect(() => {
// Initialize the rating chart
if (!isEditing) {
const chartDom = document.getElementById('rating-chart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
radar: {
indicator: [
{ name: 'Store Rating', max: 5 },
{ name: 'Product Rating', max: 5 }
]
},
series: [{
name: 'Ratings',
type: 'radar',
data: [{
value: [storeInfo.average_rating, storeInfo.average_product_rating],
name: 'Ratings',
areaStyle: {
color: 'rgba(25, 118, 210, 0.6)'
},
lineStyle: {
color: '#1976D2'
},
itemStyle: {
color: '#1976D2'
}
}]
}]
};
myChart.setOption(option);
return () => {
myChart.dispose();
};
}
}
}, [isEditing, storeInfo.average_rating, storeInfo.average_product_rating]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [isProductModalOpen, setIsProductModalOpen] = useState(false);
const [productEditData, setProductEditData] = useState({
name: '',
description: '',
quantity: 0
});
const [selectedFile, setSelectedFile] = useState(null);
const handleEditToggle = () => {
setIsEditing(!isEditing);
if (!isEditing) {
setEditData({
name: storeInfo.name,
contact_info: { ...storeInfo.contact_info },
description: storeInfo.description,
location_longitude: storeInfo.location_longitude,
location_latitude: storeInfo.location_latitude
});
}
};
const handleProductEdit = (product) => {
setSelectedProduct(product);
setProductEditData({
name: product.name,
description: product.description,
quantity: product.quantity
});
setIsProductModalOpen(true);
};
const handleProductModalClose = () => {
setIsProductModalOpen(false);
setSelectedProduct(null);
setSelectedFile(null);
};
const handleProductInputChange = (e) => {
const { name, value } = e.target;
setProductEditData({ ...productEditData, [name]: value });
};
const handleFileChange = (e) => {
if (e.target.files && e.target.files[0]) {
setSelectedFile(e.target.files[0]);
}
};
const handleUpdateProduct = () => {
// Here you would implement the API calls
console.log('Updating product:', productEditData);
handleProductModalClose();
};
const handleUpdateQuantity = () => {
if (!selectedProduct) return;
console.log('Updating quantity:', {
product_id: selectedProduct.id,
quantity: productEditData.quantity
});
};
const handleDeleteProduct = () => {
if (!selectedProduct) return;
console.log('Deleting product:', { product_id: selectedProduct.id });
handleProductModalClose();
};
const handleRemovePic = () => {
if (!selectedProduct) return;
console.log('Removing picture:', { product_id: selectedProduct.id });
};
const handleInputChange = (e) => {
const { name, value } = e.target;
setEditData({ ...editData, [name]: value });
};
const handleContactInfoChange = (key, value) => {
setEditData({
...editData,
contact_info: {
...editData.contact_info,
[key]: value
}
});
};
const handleSaveChanges = () => {
// In a real app, you would send the editData to your API
// For now, we'll just update the local state
setStoreInfo({
...storeInfo,
name: editData.name,
contact_info: editData.contact_info,
description: editData.description,
location_longitude: editData.location_longitude,
location_latitude: editData.location_latitude
});
setIsEditing(false);
};
const formatDate = (dateString) => {
const date = new Date(dateString);
return date.toLocaleDateString('en-US', {
year: 'numeric',
month: 'long',
day: 'numeric'
});
};
const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStarEmpty key={`empty-${i}`} className="text-yellow-400" />);
    }
    return stars;
  };
  
return (
<div dir='ltr'  className="min-h-screen bg-gray-50">
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/* Store Information Card */}
<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
<div className="p-6">
<div className="flex justify-between items-start mb-4">
<div>
<h2 className="text-2xl font-bold text-gray-800">Store Information</h2>
<p className="text-gray-500">Manage your store details and settings</p>
</div>
<button
onClick={handleEditToggle}
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center !rounded-button whitespace-nowrap cursor-pointer"
>
{isEditing ? (
  <>
    <FaTimes className="mr-2" />
    Cancel
  </>
) : (
  <>
    <FaEdit className="mr-2" />
    Edit Store
  </>
)}

</button>
</div>
{isEditing ? (
<div className="space-y-6">
<div>
<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
Store Name
</label>
<input
type="text"
id="name"
name="name"
value={editData.name}
onChange={handleInputChange}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
/>
</div>
<div>
<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
Description
</label>
<textarea
id="description"
name="description"
rows={4}
value={editData.description}
onChange={handleInputChange}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
></textarea>
</div>
<div>
<h3 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h3>
<div className="space-y-3">
{Object.entries(editData.contact_info).map(([key, value]) => (
<div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
<div className="md:col-span-1">
<span className="text-gray-600 capitalize">{key}:</span>
</div>
<div className="md:col-span-2">
<input
type="text"
value={value}
onChange={(e) => handleContactInfoChange(key, e.target.value)}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
/>
</div>
</div>
))}
<button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center cursor-pointer whitespace-nowrap !rounded-button">
  <FaPlus className="mr-1" /> Add Contact Info
</button>

</div>
</div>
<div>
<h3 className="text-sm font-medium text-gray-700 mb-3">Store Location</h3>
<button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center cursor-pointer whitespace-nowrap !rounded-button">
<FaMapMarkerAlt className="mr-2 text-blue-600" />
Set Store Location
</button>
</div>
<div className="flex justify-end pt-4">
<button
onClick={handleSaveChanges}
className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap !rounded-button"
>
Save Changes
</button>
</div>
</div>
) : (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
<div className="lg:col-span-2 space-y-6">
<div>
<h3 className="text-xl font-bold text-gray-800 mb-2">{storeInfo.name}</h3>
<div className="flex items-center mb-4">
<div className="flex mr-3">
{renderStars(storeInfo.average_rating)}
</div>
<span className="text-gray-600 text-sm">
{storeInfo.average_rating.toFixed(1)} store rating
</span>
</div>
<p className="text-gray-600">{storeInfo.description}</p>
</div>
<div>
<h4 className="text-md font-semibold text-gray-700 mb-3">Contact Information</h4>
<div className="space-y-2">
{Object.entries(storeInfo.contact_info).map(([key, value]) => (
<div key={key} className="flex">
<span className="text-gray-500 capitalize w-24">{key}:</span>
<span className="text-gray-800">{value}</span>
</div>
))}
</div>
</div>
<div>
<h4 className="text-md font-semibold text-gray-700 mb-3">Store Status</h4>
<div className="flex items-center">
<span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${storeInfo.is_banned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
<span className={`w-2 h-2 rounded-full mr-2 ${storeInfo.is_banned ? 'bg-red-600' : 'bg-green-600'}`}></span>
{storeInfo.is_banned ? 'Banned' : 'Active'}
</span>
</div>
</div>
</div>
<div className="lg:col-span-1">
<h4 className="text-md font-semibold text-gray-700 mb-3">Performance Ratings</h4>
<div id="rating-chart" className="w-full h-64"></div>
<div className="mt-4 grid grid-cols-2 gap-4">
<div className="bg-blue-50 p-4 rounded-lg">
<div className="text-xs text-blue-600 font-medium mb-1">Store Rating</div>
<div className="text-2xl font-bold text-blue-800">{storeInfo.average_rating.toFixed(1)}</div>
</div>
<div className="bg-blue-50 p-4 rounded-lg">
<div className="text-xs text-blue-600 font-medium mb-1">Product Rating</div>
<div className="text-2xl font-bold text-blue-800">{storeInfo.average_product_rating.toFixed(1)}</div>
</div>
</div>
</div>
</div>
)}
</div>
</div>
{/* Products Section */}
<div className="mb-8">
<div className="flex justify-between items-center mb-6">
<div>
<h2 className="text-2xl font-bold text-gray-800">Products</h2>
<p className="text-gray-500">Manage your store products</p>
</div>
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center cursor-pointer whitespace-nowrap !rounded-button">
  <FaPlus className="mr-2" />  افزودن محصول
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onEdit={handleProductEdit}
    formatDate={formatDate}
  />
))}

</div>
</div>
</main>

{/* Product Edit Modal */}
{isProductModalOpen && selectedProduct && (
  <EditProductModal
    selectedProduct={selectedProduct}
    selectedFile={selectedFile}
    productEditData={productEditData}
    onClose={handleProductModalClose}
    onChange={handleProductInputChange}
    onFileChange={handleFileChange}
    onUpdateQuantity={handleUpdateQuantity}
    onDelete={handleDeleteProduct}
    onRemovePic={handleRemovePic}
    onSave={handleUpdateProduct}
    clearSelectedFile={() => setSelectedFile(null)}
  />
)}

</div>
);
};
export default SelfStore