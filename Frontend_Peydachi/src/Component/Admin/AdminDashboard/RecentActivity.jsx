import React from 'react';


const RecentActivity = () => {
    const recentActivity = [
        { id: 1, type: 'store_added', name: 'Tech Galaxy', city: 'New York', time: '2 hours ago' },
        { id: 2, type: 'store_updated', name: 'Fashion Hub', city: 'Los Angeles', time: '4 hours ago' },
        { id: 3, type: 'product_updated', name: 'Coffee Shop', city: 'Chicago', time: '6 hours ago' },
        { id: 4, type: 'store_added', name: 'Organic Market', city: 'Miami', time: '1 day ago' },
        { id: 5, type: 'report_resolved', name: 'Sports Center', city: 'Boston', time: '1 day ago' },
      ];
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>
      <div className="p-6">
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="py-3">
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${activity.type === 'store_added' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'}`}>
                  <i className={`fas ${activity.type === 'store_added' ? 'fa-plus' : 'fa-edit'}`}></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.type === 'store_added' ? 'New store added: ' : 'Store updated: '} {activity.name}
                  </p>
                  <p className="text-xs text-gray-500">{activity.city} • {activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
