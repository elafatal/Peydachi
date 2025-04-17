import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";


 
export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
 const handleNavigate=(link)=>{
  console.log(link);
  
switch (link) {
    case "Request" :
      navigate('/Request')
      break;
    case "About" :
      navigate('/AboutUs')
      break;
  default:
    break;
}
 }
  return (
   
  <footer className="bg-gray-900 text-white py-12" dir='rtl'>
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">پیداچی</h3>
              <p className="text-gray-400">© 2025 Pidachi. All rights reserved.</p>
            </div>
            <div>
              <h4 className="text-l font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-l font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-l font-medium mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <FaGithub className='text-xl' />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <FaGithub className='text-xl' />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <FaGithub className='text-xl' />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <FaGithub className='text-xl' />
                </a>
              </div>
              <p className="text-gray-400"> &copy; {currentYear} <a href="https://github.com/elafatal"> فتل </a>
               <a href="https://github.com/HB2102"> بهزادی</a> All
              Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
   
  );
}

export default Footer;