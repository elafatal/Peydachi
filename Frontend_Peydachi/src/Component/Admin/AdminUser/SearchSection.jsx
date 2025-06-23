import React, { useState, useEffect } from 'react';
const SearchSection =({setStatusFilter,isFilterOpen,isStatusFilterOpen,setIsStatusFilterOpen,handleFilterClick,handleKeyPress,searchFilter,searchTerm})=>{
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

    return(
        <>
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
    </>
    )
}

export default SearchSection;