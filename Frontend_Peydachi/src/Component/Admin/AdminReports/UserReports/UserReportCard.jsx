// AdminReports/UserReports/UserReportCard.jsx
import { FaClock, FaTrashAlt } from 'react-icons/fa';

const UserReportCard = ({ report }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('fa-IR');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
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
