import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
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
   
 <footer className="bg-gray-900 text-white py-10 text-sm" dir="rtl">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">پیداچی</h3>
        <p className="text-gray-400 leading-relaxed">
          محصول مورد نظرت رو جست‌وجو کن، نظرات رو بخون و ببین کجا نزدیک‌ته و موجودش داره.
        </p>
      </div>

      <div>
        <h4 className="text-base font-semibold mb-3">لینک‌های مفید</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link to="/AboutUs" className="hover:text-white transition-colors">درباره ما</Link></li>
          <li><Link to="/report" className="hover:text-white transition-colors">تماس با ما</Link></li>
          <li><Link to="/Criticism" className="hover:text-white transition-colors">انتقادات و پیشنهادات  </Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-base font-semibold mb-3">ارتباط با ما</h4>
        <div className="flex space-x-4 space-x-reverse mb-3">
          <a href="https://github.com/elafatal" className="text-gray-400 mx-2 hover:text-white transition-colors">
            <FaGithub className="text-xl" />
          </a>
          <a href="https://github.com/HB2102" className="text-gray-400 hover:text-white transition-colors">
            <FaGithub className="text-xl" />
          </a>
        </div>
        <p className="text-gray-500 text-xs">© {new Date().getFullYear()} پیداچی | ساخته‌ شده با ❤️ توسط فتل و بهزادی</p>
      </div>
    </div>
  </div>
</footer>

   
  );
}

export default Footer;