import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

import AdminDashboard from './Dashboard';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import AdminNav from './AdminNav';

// List of admin user IDs
const ADMIN_IDS = ['admin1', 'admin2']; // Replace with your actual admin IDs

const AdminRoutes = () => {
  const { user } = useUser();

  // Check if current user is an admin
  if (!ADMIN_IDS.includes(user?.id)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products" element={<ProductManager />} />
          <Route path="/orders" element={<OrderManager />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;