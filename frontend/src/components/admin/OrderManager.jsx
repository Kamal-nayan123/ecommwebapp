import { useEffect, useState } from 'react';
import { OrdersAPI } from '../../services/api';
import Loading from '../shared/Loading';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await OrdersAPI.getAll();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await OrdersAPI.updateStatus(orderId, newStatus);
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' ? true : order.status === filter
  );

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Order Management</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="font-medium">
                  Customer ID: {order.userId}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border p-2 rounded"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Order Items:</h4>
              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.productId._id} className="flex justify-between">
                    <span>{item.productId.name} × {item.quantity}</span>
                    <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManager;