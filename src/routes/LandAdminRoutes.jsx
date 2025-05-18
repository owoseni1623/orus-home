import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandAdminDashboard from './LandAdminDashboard';
import LandForm from './LandForm';

const LandAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/lands" element={<LandAdminDashboard />} />
      <Route path="/admin/lands/new" element={<LandForm />} />
      <Route path="/admin/lands/edit/:id" element={<LandForm />} />
    </Routes>
  );
};

export default LandAdminRoutes;