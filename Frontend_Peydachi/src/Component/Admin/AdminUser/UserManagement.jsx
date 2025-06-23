// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
const UserManagement = () => {

// State management
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [searchFilter, setSearchFilter] = useState("username");
const [statusFilter, setStatusFilter] = useState("all");
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    const getAllStores = async()=>{
     try {
       const response = await axiosInstance.get('admin/user/get_all_users');
       console.log(response.data);
       setUsers(response.data)
     } catch (error) {
       console.log('comment error:', error);
     }
    }
     getAllStores();
   }, []);
// Filter options
const filterOptions = [
{ id: "username", label: "جستجو با نام کاربری" },
{ id: "phone_number", label: "جستجو با شماره‌ تماس" },
{ id: "id", label: "جستجو با آیدی" },
{ id: "all", label: "همه‌ی کاربران" },
];

const statusFilterOptions = [
{ id: "all", label: "همه" },
{ id: "active", label: "کاربران فعال" },
{ id: "banned", label: "کاربران مسدود" },
];
// Handle search
const handleSearch = () => {
setIsLoading(true);
// Simulate API call
setTimeout(() => {
let filteredUsers = [...users];

// UserManagemently search filter
if (searchTerm) {
if (searchFilter === "username") {
filteredUsers = filteredUsers.filter(user =>
user.username.toLowerCase().includes(searchTerm.toLowerCase())
);
} else if (searchFilter === "phone_number") {
filteredUsers = filteredUsers.filter(user =>
user.phone_number.includes(searchTerm)
);
} else if (searchFilter === "id") {
filteredUsers = filteredUsers.filter(user =>
user.id.toString() === searchTerm
);
}
}

// UserManagemently status filter
if (statusFilter === "active") {
filteredUsers = filteredUsers.filter(user => !user.is_banned);
} else if (statusFilter === "banned") {
filteredUsers = filteredUsers.filter(user => user.is_banned);
}

setUsers(filteredUsers);
setIsLoading(false);
}, 500);
};
// Reset search
const resetSearch = () => {
setSearchTerm("");
setUsers(users);
};
// Handle key press for search
const handleKeyPress = (e) => {
if (e.key === 'Enter') {
handleSearch();
}
};
// Get user role badge
const getUserRoleBadge = (user) => {
if (user.is_super_admin) {
return <span className="px-2 py-2 text-xs font-medium rounded-full bg-blue-800 text-white whitespace-nowrap">سوپر ادمین</span>;
} else if (user.is_admin) {
return <span className="px-2 py-2 text-xs font-medium rounded-full bg-blue-700 text-white whitespace-nowrap">ادمین</span>;
} else if (user.is_seller) {
return <span className="px-2 py-2 text-xs font-medium rounded-full bg-blue-500 text-white whitespace-nowrap">فروشنده</span>;
} else {
return <span className="px-2 py-2 text-xs font-medium rounded-full bg-blue-200 text-gray-800 whitespace-nowrap">کاربر</span>;
}
};
// Get user status badge
const getUserStatusBadge = (user) => {
if (user.is_banned) {
return (
<div className="flex items-center">
<div className="w-2 h-2 ml-2 rounded-full bg-red-500"></div>
<span className="text-red-500 ">مسدود</span>
</div>
);
} else {
return (
<div className="flex items-center">
<div className="w-2 h-2 ml-2 rounded-full bg-green-500"></div>
<span className="text-green-500 ">فعال</span>
</div>
);
}
};
// Handle filter click
const handleFilterClick = (filter) => {
setSearchFilter(filter);
setIsFilterOpen(false);
if (filter === "banned" || filter === "all") {
setSearchTerm("");
if (filter === "banned") {
setUsers(users.filter(user => user.is_banned));
} else {
setUsers(users);
}
}
};
// Loading skeleton
const LoadingSkeleton = () => (
<>
{[1, 2, 3, 4, 5].map(i => (
<tr key={i} className="animate-pulse">
<td className="px-6 py-4 whitespace-nowrap">
<div className="h-4 bg-gray-200 rounded w-3/4"></div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="h-4 bg-gray-200 rounded w-full"></div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="h-4 bg-gray-200 rounded w-2/3"></div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="h-6 bg-gray-200 rounded w-24"></div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="h-4 bg-gray-200 rounded w-16"></div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="flex space-x-2">
<div className="h-8 bg-gray-200 rounded-full w-8"></div>
<div className="h-8 bg-gray-200 rounded-full w-8"></div>
</div>
</td>
</tr>
))}
</>
);
return (
<div className=" bg-gray-50 text-gray-900" dir='ltr'>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 ">

{/* Search Section */}
<div className="bg-white rounded-lg shadow-sm p-6 mb-8 transition-all duration-300 hover:shadow-md">
<div className="flex flex-col md:flex-row gap-4">
<div className="relative flex-grow">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<i className="fas fa-search text-gray-400"></i>
</div>
<input
type="text"
className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
placeholder={`Search by ${searchFilter === 'id' ? 'ID' : searchFilter === 'phone_number' ? 'phone number' : 'username'}...`}
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
onKeyPress={handleKeyPress}
disabled={searchFilter === "banned" || searchFilter === "all"}
/>
</div>
<div className="flex gap-4">
<div className="relative min-w-[180px]">
<button
type="button"
className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => {
setIsFilterOpen(!isFilterOpen);
setIsStatusFilterOpen(false);
}}
>
<span>{filterOptions.find(option => option.id === searchFilter)?.label || "Search Filter"}</span>
<i className={`fas fa-chevron-down transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}></i>
</button>
{isFilterOpen && (
<div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
{filterOptions.map((option) => (
<div
key={option.id}
className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
onClick={() => {
setSearchFilter(option.id);
setIsFilterOpen(false);
}}
>
{option.label}
</div>
))}
</div>
)}
</div>

<div className="relative min-w-[180px]">
<button
type="button"
className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => {
setIsStatusFilterOpen(!isStatusFilterOpen);
setIsFilterOpen(false);
}}
>
<span>{statusFilterOptions.find(option => option.id === statusFilter)?.label || "Status Filter"}</span>
<i className={`fas fa-chevron-down transition-transform ${isStatusFilterOpen ? 'rotate-180' : ''}`}></i>
</button>
{isStatusFilterOpen && (
<div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
{statusFilterOptions.map((option) => (
<div
key={option.id}
className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
onClick={() => {
setStatusFilter(option.id);
setIsStatusFilterOpen(false);
handleSearch();
}}
>
{option.label}
</div>
))}
</div>
)}
</div>
</div>
<button
type="button"
className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
onClick={handleSearch}
disabled={searchFilter === "banned" || searchFilter === "all" || (searchTerm === "" && searchFilter !== "banned" && searchFilter !== "all")}
>
جستجو
</button>
<button
type="button"
className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
onClick={resetSearch}
>
پاک کردن
</button>
</div>
{/* Current filter tags */}
<div className="mt-4 flex items-center flex-wrap gap-2">
<span className="text-sm text-gray-500 mr-2">فیلترها :</span>
<span className="px-3 py-1 bg-indigo-100 text-[#191970] rounded-full text-sm font-medium">
{filterOptions.find(option => option.id === searchFilter)?.label || "All Users"}
</span>
<span className="px-3 py-1 bg-indigo-100 text-[#191970] rounded-full text-sm font-medium">
{statusFilterOptions.find(option => option.id === statusFilter)?.label}
</span>
</div>
</div>
{/* Users Table */}
<div className="bg-white rounded-lg shadow-sm overflow-hidden">
<div className="overflow-x-auto max-h-7/12 overflow-scroll">
<table className="min-w-full divide-y divide-gray-200 " dir='rtl'>
<thead className="bg-gray-50">
<tr>
<th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
نام‌کاربری
</th>
<th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
ایمیل
</th>
<th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
شماره موبایل
</th>
<th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
دسترسی
</th>
<th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
وضعیت
</th>
<th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
فعالیت‌ها
</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
{isLoading ? (
<LoadingSkeleton />
) : users.length > 0 ? (
users.map((user) => (
<tr key={user.id} className="hover:bg-gray-50 transition-colors">
<td className="px-6 py-3 whitespace-nowrap">
<div className="flex items-center">
<div className="ml-4">
<div className="text-sm font-medium text-gray-900">{user.username}</div>
</div>
</div>
</td>
<td className="px-6 py-3 whitespace-nowrap">
<div className="text-sm text-gray-900">{user.email ? user.email : 'ایمیلی ثبت نشده‌ است'}</div>
</td>
<td className="px-6 py-3 whitespace-nowrap">
<div className="text-sm text-gray-900">{user.phone_number ? user.phone_number : 'شماره‌ای ثبت نشده'}</div>
</td>
<td className="px-6 py-3 whitespace-nowrap">
{getUserRoleBadge(user)}
</td>
<td className="px-6 py-3 whitespace-nowrap">
{getUserStatusBadge(user)}
</td>
<td className="px-6 py-3 whitespace-nowrap">
<div className="flex space-x-2">
<button
className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-[#191970] hover:bg-indigo-200 transition-colors cursor-pointer"
title="View Details"
>
<i className="fas fa-eye"></i>
</button>
<button
className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-[#191970] hover:bg-indigo-200 transition-colors cursor-pointer"
title="Edit User"
>
<i className="fas fa-edit"></i>
</button>
<button
onClick={() => {
setSelectedAction({
type: user.is_banned ? 'unban' : 'ban',
userId: user.id
});
setShowConfirmModal(true);
}}
className={`w-8 h-8 flex items-center justify-center rounded-full ${user.is_banned ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'} transition-colors cursor-pointer`}
title={user.is_banned ? "Unban User" : "Ban User"}
>
<i className={`fas ${user.is_banned ? 'fa-user-check' : 'fa-user-slash'}`}></i>
</button>
<button
onClick={() => {
setSelectedAction({
type: 'promote',
userId: user.id
});
setShowConfirmModal(true);
}}
className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors cursor-pointer"
title="Promote to Seller"
>
<i className="fas fa-store"></i>
</button>
<button
onClick={() => {
setSelectedAction({
type: 'delete',
userId: user.id
});
setShowConfirmModal(true);
}}
className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
title="پاک کردن کاربر"
>
<i className="fas fa-trash"></i>
</button>
</div>
</td>
</tr>
))
) : (
<tr>
<td colSpan={6} className="px-6 py-12 text-center">
<div className="flex flex-col items-center justify-center">
<div className="text-6xl text-gray-300 mb-4">
<i className="fas fa-users-slash"></i>
</div>
<h3 className="text-lg font-medium text-gray-900">No users found</h3>
<p className="text-gray-500 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
<button
className="mt-4 px-4 py-2 bg-[#191970] text-white rounded-lg hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
onClick={resetSearch}
>
نمایش تمام کاربران
</button>
</div>
</td>
</tr>
)}
</tbody>
</table>
</div>

</div>
</div>
</div>
);
};
export default UserManagement