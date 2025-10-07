import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import ordersReducer from './ordersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});

export default store;