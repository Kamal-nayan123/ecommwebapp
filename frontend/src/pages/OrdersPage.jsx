import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { fetchOrders } from '../store/ordersSlice';
import Loading from '../components/shared/Loading';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { items: orders, status, error } = useSelector(state => state.orders);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm text-gray-600">
                    Order placed: {new Date(order.date).toLocaleDateString()}
                  </span>
                  <h3 className="font-semibold mt-1">
                    Total: ${order.total.toFixed(2)}
                  </h3>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {order.status}
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item.productId._id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.productId.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;