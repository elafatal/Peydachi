import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { role } = useAuth();
  const location = useLocation();
  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  

  return <Outlet />;
};

export default PrivateRoute;
