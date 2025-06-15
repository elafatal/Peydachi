import React from 'react';
import { FaPlusCircle, FaEdit, FaBox, FaCheckCircle } from 'react-icons/fa';

const RecentActivity = () => {
  const recentActivity = [
    { id: 1, type: 'store_added', name: 'Tech Galaxy', city: 'New York', time: '2 hours ago' },
    { id: 2, type: 'store_updated', name: 'Fashion Hub', city: 'Los Angeles', time: '4 hours ago' },
    { id: 3, type: 'product_updated', name: 'Coffee Shop', city: 'Chicago', time: '6 hours ago' },
    { id: 4, type: 'store_added', name: 'Organic Market', city: 'Miami', time: '1 day ago' },
    { id: 5, type: 'report_resolved', name: 'Sports Center', city: 'Boston', time: '1 day ago' },
  ];

  const getIconAndStyle = (type) => {
    switch (type) {
      case 'store_added':
        return { icon: <FaPlusCircle />, bg: 'bg-green-100', text: 'text-green-500' };
      case 'store_updated':
        return { icon: <FaEdit />, bg: 'bg-blue-100', text: 'text-blue-500' };
      case 'product_updated':
        return { icon: <FaBox />, bg: 'bg-purple-100', text: 'text-purple-500' };
      case 'report_resolved':
        return { icon: <FaCheckCircle />, bg: 'bg-yellow-100', text: 'text-yellow-500' };
      default:
        return { icon: null, bg: '', text: '' };
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case 'store_added':
        return 'New store added: ';
      case 'store_updated':
        return 'Store updated: ';
      case 'product_updated':
        return 'Products updated: ';
      case 'report_resolved':
        return 'Report resolved: ';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>
      <div className="p-6">
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity) => {
            const { icon, bg, text } = getIconAndStyle(activity.type);
            return (
              <li key={activity.id} className="py-3">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full text-xl ${bg} ${text}`}>
                    {icon}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {getLabel(activity.type)} {activity.name}
                    </p>
                    <p className="text-xs text-gray-500">{activity.city} • {activity.time}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
