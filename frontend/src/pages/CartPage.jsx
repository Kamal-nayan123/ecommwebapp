import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import { createOrder } from '../store/ordersSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { items, total } = useSelector(state => state.cart);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = async () => {
    if (!isSignedIn) {
      // Redirect to sign in if not authenticated
      return navigate('/sign-in');
    }

    try {
      // Create order from cart items
      await dispatch(createOrder({
        userId: user.id,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        total: total,
        status: 'pending'
      })).unwrap();

      // Clear the cart after successful order
      dispatch(clearCart());
      
      // Redirect to orders page
      navigate('/orders');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center p-4 border rounded-lg">
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  className="px-3 py-1 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="px-3 py-1 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border rounded-lg">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleCheckout}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          {isSignedIn ? 'Proceed to Checkout' : 'Sign in to Checkout'}
        </button>
      </div>
    </div>
  );
};

export default CartPage;