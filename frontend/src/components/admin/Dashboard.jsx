import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsAPI, OrdersAPI } from '../../services/api';
import Loading from '../shared/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    recentOrders: [],
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        ProductsAPI.getAll(),
        OrdersAPI.getAll()
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        recentOrders: orders.slice(0, 5), // Last 5 orders
        lowStockProducts: products.filter(p => p.stock < 10) // Products with low stock
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Total Products</h3>
          <p className="text-3xl font-bold text-blue-900">{stats.totalProducts}</p>
          <Link to="/admin/products" className="text-blue-700 text-sm hover:underline">
            Manage Products →
          </Link>
        </div>

        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Total Orders</h3>
          <p className="text-3xl font-bold text-green-900">{stats.totalOrders}</p>
          <Link to="/admin/orders" className="text-green-700 text-sm hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-800">Low Stock Items</h3>
          <p className="text-3xl font-bold text-yellow-900">{stats.lowStockProducts.length}</p>
          <Link to="/admin/products" className="text-yellow-700 text-sm hover:underline">
            Check Inventory →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {stats.recentOrders.map(order => (
            <div key={order._id} className="border-b pb-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/admin/orders"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          View All Orders →
        </Link>
      </div>

      {/* Low Stock Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Low Stock Products</h3>
        <div className="space-y-4">
          {stats.lowStockProducts.map(product => (
            <div key={product._id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">Category: {product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">{product.stock} left</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/admin/products"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Manage Inventory →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;