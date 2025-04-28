import React from 'react';

const StoreTable = ({ stores }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-scroll">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stores.map((store) => (
            <tr key={store.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src={`https://readdy.ai/api/search-image?query=storefront%20of%20a%20${store.name.toLowerCase()}%20with%20clean%20modern%20design&width=40&height=40&seq=store-${store.id}&orientation=squarish`}
                      alt={store.name}
                      className="h-10 w-10 object-cover object-top"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{store.name}</div>
                    <div className="text-sm text-gray-500">ID: #{store.id}</div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{store.location}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{store.contact}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full  ${store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {store.updated}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-600 hover:text-red-900 cursor-pointer">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}

          {stores.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                No stores found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoreTable;
