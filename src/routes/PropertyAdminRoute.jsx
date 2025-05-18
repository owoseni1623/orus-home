import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyAdminDashboard from './PropertyAdminDashboard';
import PropertyForm from './PropertyForm';

const PropertyAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/properties" element={<PropertyAdminDashboard />} />
      <Route path="/admin/properties/new" element={<PropertyForm />} />
      <Route path="/admin/properties/edit/:id" element={<PropertyForm />} />
    </Routes>
  );
};

export default PropertyAdminRoutes;