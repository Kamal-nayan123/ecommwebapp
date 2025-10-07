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
      return navigate('/sign-in');
    }

    try {
      await dispatch(createOrder({
        userId: user.id,
        items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
        total: total,
        status: 'pending'
      })).unwrap();
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-primary-50">
        <h2 className="text-3xl font-bold text-secondary-900 mb-6">Your Cart is Empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-accent-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-accent-900 transition-colors shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-primary-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-secondary-900 text-center mb-12">Your Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {items.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-secondary-200">
                <div className="flex-grow mb-4 sm:mb-0">
                  <h3 className="font-semibold text-lg text-secondary-900">{item.name}</h3>
                  <p className="text-secondary-600">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center border border-secondary-200 rounded-full">
                    <button
                      className="px-4 py-2 text-secondary-800 hover:bg-secondary-100 rounded-l-full transition-colors"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4 text-secondary-900 font-semibold">{item.quantity}</span>
                    <button
                      className="px-4 py-2 text-secondary-800 hover:bg-secondary-100 rounded-r-full transition-colors"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-secondary-200">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-xl text-secondary-900">Total:</span>
              <span className="font-bold text-2xl text-secondary-900">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-accent-800 text-white py-3 rounded-full font-semibold text-lg hover:bg-accent-900 transition-colors shadow-md"
            >
              {isSignedIn ? 'Proceed to Checkout' : 'Sign in to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;