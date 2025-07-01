// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useSyncExternalStore } from 'react';
const StoreCommentManagement= () => {
const [activeTab, setActiveTab] = useState('text');
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [selectedUsers, setSelectedUsers] = useState([]);
const [showUserResults, setShowUserResults] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [commentToDelete, setCommentToDelete] = useState(null);
const [showResetModal, setShowResetModal] = useState(false);
const [notification, setNotification] = useState({
show: false,
message: '',
type: 'success'
});
// Mock store ID (would come from props or context in a real app)
const storeId = 123;
const storeName = "Tech Galaxy Store";
const searchByText = async () => {
if (!searchQuery.trim()) return;
setIsLoading(true);
try {
// Mock API call - would be replaced with actual fetch in production
// const response = await fetch('/api/search-comments', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ store_id: storeId, search: searchQuery })
// });
// const data = await response.json();
// Mock response data
const data = [
{
store_id: storeId,
text: "The new iPhone 15 Pro I bought from this store is amazing! The camera quality is outstanding and the battery life is impressive. The staff was very knowledgeable and helped me choose the right storage option.",
id: 1,
user_id: 101,
user_name: "JohnDoe",
date_added: "2025-06-25T14:30:00.000Z"
},
{
store_id: storeId,
text: "Purchased a gaming laptop last week. The delivery was super fast and the laptop exceeds my expectations. The pre-installed software and setup guide were very helpful. Great gaming performance!",
id: 2,
user_id: 102,
user_name: "AliceSmith",
date_added: "2025-06-27T09:15:00.000Z"
},
{
store_id: storeId,
text: "Had an issue with my Samsung tablet's screen protector installation. The store manager personally helped me and even replaced it free of charge. Outstanding customer service!",
id: 3,
user_id: 103,
user_name: "RobertJones",
date_added: "2025-06-28T16:45:00.000Z"
},
{
store_id: storeId,
text: "The prices for StoreCommentManagementle accessories here are much better than the official store. Bought an StoreCommentManagementle Watch band and AirPods case. Both genuine products and great quality. Will definitely shop here again!",
id: 4,
user_id: 104,
user_name: "EmmaWilson",
date_added: "2025-06-29T11:20:00.000Z"
},
{
store_id: storeId,
text: "The wireless earbuds I bought work perfectly with my Android phone. The sound quality is crystal clear and the noise cancellation is effective. Battery life is exactly as advertised.",
id: 5,
user_id: 105,
user_name: "MichaelBrown",
date_added: "2025-06-30T08:10:00.000Z"
},
{
store_id: storeId,
text: "Not satisfied with the phone case quality. It feels cheap and the buttons are hard to press. Expected better for the price paid.",
id: 6,
user_id: 106,
user_name: "SarahParker",
date_added: "2025-06-30T10:15:00.000Z"
},
{
store_id: storeId,
text: "The store has a great selection of gaming accessories. Bought a mechanical keyboard and gaming mouse. The staff even let me test them before purchasing. Excellent shopping experience!",
id: 7,
user_id: 107,
user_name: "DavidClark",
date_added: "2025-06-30T12:45:00.000Z"
},
{
store_id: storeId,
text: "The smart home devices section is impressive. Got a Google Nest Hub and some smart bulbs. The staff helped me understand how to set everything up. Everything works perfectly together.",
id: 8,
user_id: 108,
user_name: "LisaWong",
date_added: "2025-06-30T14:20:00.000Z"
}
].filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()));
setSearchResults(data);
} catch (error) {
console.error('Error searching comments:', error);
showNotification('Failed to search comments', 'error');
} finally {
setIsLoading(false);
}
};
const searchByUsername = async () => {
if (!searchQuery.trim()) return;
setIsLoading(true);
try {
// Mock API call for searching users
// const response = await fetch('/api/search-users', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ username: searchQuery })
// });
// const data = await response.json();
// Mock user search results
const data = [
{
id: 101,
username: "JohnDoe",
phone_number: "+1234567890",
email: "john.doe@example.com",
is_seller: false,
is_admin: false,
is_super_admin: false,
is_banned: false
},
{
id: 102,
username: "AliceSmith",
phone_number: "+1987654321",
email: "alice.smith@example.com",
is_seller: true,
is_admin: false,
is_super_admin: false,
is_banned: false
},
{
id: 103,
username: "RobertJones",
phone_number: "+1122334455",
email: "robert.jones@example.com",
is_seller: false,
is_admin: true,
is_super_admin: false,
is_banned: false
},
{
id: 104,
username: "EmmaWilson",
phone_number: "+1555666777",
email: "emma.wilson@example.com",
is_seller: false,
is_admin: false,
is_super_admin: false,
is_banned: false
},
{
id: 105,
username: "MichaelBrown",
phone_number: "+1777888999",
email: "michael.brown@example.com",
is_seller: true,
is_admin: false,
is_super_admin: false,
is_banned: false
},
{
id: 106,
username: "SarahParker",
phone_number: "+1444555666",
email: "sarah.parker@example.com",
is_seller: false,
is_admin: false,
is_super_admin: false,
is_banned: true
},
{
id: 107,
username: "DavidClark",
phone_number: "+1333444555",
email: "david.clark@example.com",
is_seller: false,
is_admin: false,
is_super_admin: false,
is_banned: false
},
{
id: 108,
username: "LisaWong",
phone_number: "+1666777888",
email: "lisa.wong@example.com",
is_seller: true,
is_admin: true,
is_super_admin: false,
is_banned: false
}
].filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
setSelectedUsers(data);
setShowUserResults(true);
} catch (error) {
console.error('Error searching users:', error);
showNotification('Failed to search users', 'error');
} finally {
setIsLoading(false);
}
};
const getUserComments = async (userId) => {
setIsLoading(true);
try {
// Mock API call for getting user comments
// const response = await fetch('/api/user-comments', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ user_id: userId })
// });
// const data = await response.json();
// Mock user comments data
const data = [
{
store_id: storeId,
text: "This store has amazing products and excellent customer service!",
id: 1,
user_id: userId,
user_name: "JohnDoe",
date_added: "2025-06-25T14:30:00.000Z"
},
{
store_id: storeId,
text: "I had a great experience shopping here. The staff was very helpful.",
id: 6,
user_id: userId,
user_name: "JohnDoe",
date_added: "2025-06-20T10:15:00.000Z"
}
];
setSearchResults(data);
setShowUserResults(false);
} catch (error) {
console.error('Error fetching user comments:', error);
showNotification('Failed to fetch user comments', 'error');
} finally {
setIsLoading(false);
}
};
const deleteComment = async (commentId) => {
try {
// Mock API call for deleting a comment
// const response = await fetch('/api/delete-comment', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ store_comment_id: commentId.toString() })
// });
// const data = await response.json();
// Update the UI by removing the deleted comment
setSearchResults(prevResults => prevResults.filter(comment => comment.id !== commentId));
showNotification('Comment deleted successfully', 'success');
} catch (error) {
console.error('Error deleting comment:', error);
showNotification('Failed to delete comment', 'error');
} finally {
setShowDeleteModal(false);
setCommentToDelete(null);
}
};
const resetStoreRating = async () => {
    try {
        // Mock API call for resetting store rating
        // const response = await fetch('/api/reset-rating', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ store_id: storeId })
        // });
        // const data = await response.json();
        showNotification('Store rating has been reset successfully', 'success');
    } catch (error) {
        console.error('Error resetting store rating:', error);
        showNotification('Failed to reset store rating', 'error');
    } finally {
        setShowResetModal(false);
    }
};

    const handleSearch = () => {
        if (activeTab === 'text') {
            searchByText();
        } else {
            searchByUsername();
        }
    };
const confirmDeleteComment = (commentId) => {
setCommentToDelete(commentId);
setShowDeleteModal(true);
};
const confirmResetRating = () => {
setShowResetModal(true);
};
const showNotification = (message, type) => {
setNotification({ show: true, message, type });
setTimeout(() => {
setNotification(prev => ({ ...prev, show: false }));
}, 3000);
};
const formatDate = (dateString) => {
const date = new Date(dateString);
return date.toLocaleDateString('en-US', {
year: 'numeric',
month: 'short',
day: 'numeric',
hour: '2-digit',
minute: '2-digit'
});
};
useEffect(() => {
    setSearchResults([]);
    setSelectedUsers([]);
    setShowUserResults(false);
}, [activeTab]);
return (
<div className="min-h-screen bg-gray-50">
{/* Main Content */}
<main className="container mx-auto px-4 py-8">
{/* Search Section */}
<div className="bg-white rounded-lg shadow-md p-6 mb-8">
<div className="flex justify-between border-b border-gray-200 mb-6">
    
        <div className="">
            <button
            className={`px-4 py-2 font-medium text-sm mr-4 border-b-2 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer ${activeTab === 'text' ? 'border-[#191970] text-[#191970]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('text')}
            >
            Search by Text
            </button>
            <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer ${activeTab === 'username' ? 'border-[#191970] text-[#191970]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('username')}
            >
            Search by Username
            </button>
        </div>
    <div className="">
        <button
        onClick={confirmResetRating}
        className="border border-red-700 hover:bg-red-100 text-red-700 px-4 py-2 mb-3 rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
        >
        Reset Store Rating
        </button>
    </div>
</div>
<div className="flex items-center">
<div className="relative flex-1">
<input
type="text"
placeholder={activeTab === 'text' ? "Search in comments..." : "Enter username..."}
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#191970] focus:border-[#191970] outline-none text-sm"
onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
/>
<button
className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#191970] cursor-pointer"
onClick={handleSearch}
>
<i className="fas fa-search"></i>
</button>
</div>
<button
onClick={handleSearch}
className="mr-4 bg-[#191970] hover:bg-blue-900 text-white px-6 py-3 rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
>
Search
</button>
</div>
</div>
{/* User Results (for username search) */}
{showUserResults && (
<div className="bg-white rounded-lg shadow-md p-6 mb-8">
<h2 className="text-lg font-semibold mb-4">Users Found</h2>
{selectedUsers.length > 0 ? (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{selectedUsers.map(user => (
<div
key={user.id}
className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
onClick={() => getUserComments(user.id)}
>
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-[#191970] text-white flex items-center justify-center">
<i className="fas fa-user"></i>
</div>
<div className="ml-3">
<h3 className="font-medium">{user.username}</h3>
<p className="text-sm text-gray-500">{user.email}</p>
</div>
</div>
<div className="mt-3 text-sm text-gray-600">
<p>
<i className="fas fa-phone mr-2"></i>
{user.phone_number}
</p>
<p className="mt-1">
<i className="fas fa-tag mr-2"></i>
{user.is_seller ? 'Seller' : 'Customer'}
{user.is_admin && ', Admin'}
{user.is_super_admin && ', Super Admin'}
{user.is_banned && ', Banned'}
</p>
</div>
</div>
))}
</div>
) : (
<div className="text-center py-8 text-gray-500">
<i className="fas fa-user-slash text-4xl mb-3"></i>
<p>No users found matching your search criteria</p>
</div>
)}
</div>
)}
{/* Comments Results */}
<div className="bg-white rounded-lg shadow-md p-6">
<h2 className="text-lg font-semibold mb-4">Comments</h2>
{isLoading ? (
<div className="flex justify-center items-center py-12">
<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#191970]"></div>
</div>
) : searchResults.length > 0 ? (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{searchResults.map(comment => (
<div key={comment.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
<div className="p-5">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-[#191970] text-white flex items-center justify-center">
<i className="fas fa-user text-xs"></i>
</div>
<span className="ml-2 font-medium">{comment.user_name}</span>
</div>
<button
onClick={() => confirmDeleteComment(comment.id)}
className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
aria-label="Delete comment"
>
<i className="fas fa-trash-alt"></i>
</button>
</div>
<p className="text-gray-700 mb-3">{comment.text}</p>
<div className="text-xs text-gray-500">
<i className="far fa-clock mr-1"></i>
{formatDate(comment.date_added)}
</div>
</div>
</div>
))}
</div>
) : (
<div className="text-center py-12 text-gray-500">
<i className="far fa-comment-dots text-5xl mb-3"></i>
<p>No comments found</p>
<p className="text-sm mt-2">Try adjusting your search criteria</p>
</div>
)}
</div>
</main>
{/* Delete Confirmation Modal */}
{showDeleteModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
<h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
<p className="text-gray-600 mb-6">Are you sure you want to delete this comment? This action cannot be undone.</p>
<div className="flex justify-end space-x-3">
<button
onClick={() => setShowDeleteModal(false)}
className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
>
Cancel
</button>
<button
onClick={() => commentToDelete !== null && deleteComment(commentToDelete)}
className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
>
Delete
</button>
</div>
</div>
</div>
)}
{/* Reset Rating Confirmation Modal */}
{showResetModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
<h3 className="text-xl font-semibold mb-4">Reset Store Rating</h3>
<p className="text-gray-600 mb-6">Are you sure you want to reset the rating for this store? This will clear all rating data and cannot be undone.</p>
<div className="flex justify-end space-x-3">
<button
onClick={() => setShowResetModal(false)}
className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
>
Cancel
</button>
<button
onClick={resetStoreRating}
className="px-4 py-2 bg-[#191970] text-white rounded-lg hover:bg-blue-900 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
>
Reset Rating
</button>
</div>
</div>
</div>
)}
{/* Notification Toast */}
{notification.show && (
<div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
<div className="flex items-center">
<i className={`mr-2 ${notification.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}`}></i>
<span>{notification.message}</span>
</div>
</div>
)}
</div>
);
};
export default StoreCommentManagement