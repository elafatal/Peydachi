const UserReportSkeleton = () => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 animate-pulse" dir="rtl">
        <div className="flex justify-between mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-5"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded mb-2 w-full"></div>
        <div className="h-3 bg-gray-300 rounded mb-2 w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded mb-4 w-4/6"></div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  };
  
  export default UserReportSkeleton;
  