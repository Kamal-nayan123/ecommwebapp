import { useUser } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { user } = useUser();
  const orders = useSelector(state => state.orders.items);

  const recentOrders = orders.slice(0, 5); // Get last 5 orders

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.imageUrl}
            alt={user.fullName}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.fullName}</h2>
            <p className="text-gray-600">{user.primaryEmailAddress.emailAddress}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">Member since: </span>
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="text-gray-600">Email verified: </span>
              {user.primaryEmailAddress.verification.status === 'verified' ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order._id} className="border-b last:border-b-0 pb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {order.items.length} items - {order.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;