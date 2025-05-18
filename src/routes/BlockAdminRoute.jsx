import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const AdminRoute = () => {
    const { user, isAuthenticated, loading } = useContext(AuthContext);
    const location = useLocation();
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div>Loading...</div>
        </div>
      );
    }
  
    if (!isAuthenticated || (user?.role !== 'admin' && user?.userType !== 'admin')) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return (
      <div className="admin-layout">
        {/* You can add admin layout components here, like a sidebar or header */}
        <Outlet /> {/* This renders the child routes */}
      </div>
    );
};

export default AdminRoute;