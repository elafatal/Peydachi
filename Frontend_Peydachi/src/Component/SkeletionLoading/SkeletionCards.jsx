import React from 'react';
// import Skeleton , { SkeletonTheme }from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard  = ({cards}) => {
  return (
    Array(cards) 
    .fill(0)
    .map((_, index) =>  <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse" dir='rtl'>
    <div className="flex gap-2 mb-4">
      <div className="bg-gray-300 rounded-full w-12 h-12 mr-4"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
  ));
};

export default SkeletonCard ;