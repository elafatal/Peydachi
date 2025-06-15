import React, { useState } from 'react';

/**
 * Modal for assigning / changing a store owner.
 * Props:
 * - isOpen   : boolean — controls visibility
 * - onClose  : () => void — close handler
 * - store    : object    — the selected store (must contain at least id & name)
 * - users    : array     — list of user objects {id, name}
 * - onAddOwner: (userId:number) => void — callback when user confirms
 */
const AddOwnerModal = ({ isOpen, onClose, store, users = [], onAddOwner }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const handleSubmit = () => {
    if (selectedUserId === 0) return; // no user chosen
    onAddOwner(selectedUserId);
    setSelectedUserId(0); // reset for next time
  };

  if (!isOpen || !store) return null;

  return (
    <div className="fixed bg-black/40 backdrop-blur-sm inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0  opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Add Owner to {store.name}
            </h3>
            <label htmlFor="new-owner" className="block text-sm font-medium text-gray-700">Select User</label>
            <select
              id="new-owner"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
            >
              <option value={0}>Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-button border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap"
              onClick={handleSubmit}
              disabled={selectedUserId === 0}
            >
              Add Owner
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-button border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOwnerModal;
