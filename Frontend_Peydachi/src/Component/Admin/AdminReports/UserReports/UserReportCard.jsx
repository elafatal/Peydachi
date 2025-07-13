// AdminReports/UserReports/UserReportCard.jsx
import { FaClock, FaTrashAlt } from 'react-icons/fa';

const UserReportCard = ({ report }) => {
  const formatDate = (date) => {
    const now = new Date();
    const addedDate = new Date(date);
    
    const diffInMilliseconds = now - addedDate;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) return 'لحظاتی پیش';
    if (minutes < 60) return `${minutes} دقیقه قبل`;
    if (hours < 24) return `${hours} ساعت قبل`;
    if (days < 7) return `${days} روز قبل`;
    if (weeks < 4) return `${weeks} هفته قبل`;
    if (months < 12) return `${months} ماه قبل`;
    return `${years} سال${years > 1 ? 's' : ''} گذشته`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4" dir='rtl'>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{report.text}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          <FaClock className="inline ml-1" />
          {formatDate(report.date_added)}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${report.is_reviewed ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
          {report.is_reviewed ? 'بررسی‌شده' : 'در انتظار بررسی'}
        </span>
      </div>
    </div>
  );
};

export default UserReportCard;
