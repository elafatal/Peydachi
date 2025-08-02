import React, { useState,useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import showErrorToast from '../../utils/showErrorToast';
import { FaUserShield, FaUserCircle , FaUserTie } from 'react-icons/fa';
import { FaClipboardUser } from "react-icons/fa6";

const AddOwnerModal = ({ isOpen, onClose, store, onAddOwner }) => {
  const [userQuery, setUserQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0)
  const [searchResult,setSearchResult]=useState([])

  const handleSubmit = () => {
    if (userQuery === 0) return; 
    onAddOwner(selectedUserId);
    setSelectedUserId(0)
    setUserQuery('');
  };

  useEffect(() => {
    const searchUsers = async()=>{
        if (userQuery != '') {
          try {
            const response = await axiosInstance.post('/admin/user/search_users', {
              username: userQuery
            });
            setSearchResult(response.data)
          } catch (error) {
            showErrorToast(error);
          }
        }
     }
      searchUsers();
   }, [userQuery]);

  //  useEffect(() => {
  //     console.log(selectedUserId)
  //  }, [selectedUserId]);

 

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
              انتخاب فروشنده برای <span className='text-blue-700'>{store.name}</span>
            </h3>
            <label htmlFor="new-owner" className="block text-sm font-medium text-gray-700">نام‌کاربری </label>
            <input  
            onChange={(e) => setUserQuery(e.target.value)}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'></input>
           {searchResult.length !=0 ?
            <div  className="mt-1 max-h-52 overflow-scroll z-50 block w-full  border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              {searchResult.map(user => (
                <span 
                    onClick={() => setSelectedUserId(user.id)} 
                    className={`cursor-pointer block p-2 hover:bg-blue-100 transition-all duration-300 ${selectedUserId === user.id ? 'bg-blue-200 border-l-4 border-blue-500' : ''}`} 
                    key={user.id}
                  >                 {user.username} {user.is_super_admin ? <FaUserTie title='سوپر ادمین' className='text-indigo-800 inline' /> 
                  : user.is_admin ? <FaUserShield title='ادمین' className='inline text-indigo-700'/> 
                  : user.is_seller ? <FaClipboardUser title='فروشنده' className='inline text-indigo-400' />
                  :  <FaUserCircle title='کاربر' className='inline text-indigo-300' />}
              </span>
              ))}
           </div> : null}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap"
              onClick={handleSubmit}
              disabled={userQuery === 0}
            >
              نگاشت فروشنده
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap"
              onClick={onClose}
            >
              لغو 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOwnerModal;
