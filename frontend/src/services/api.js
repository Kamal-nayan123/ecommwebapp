import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const ProductsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Cart API
export const CartAPI = {
  get: (userId) => api.get(`/cart/${userId}`),
  create: (data) => api.post('/cart', data),
  update: (userId, data) => api.put(`/cart/${userId}`, data),
  delete: (userId) => api.delete(`/cart/${userId}`),
};

// Orders API
export const OrdersAPI = {
  getAll: (userId) => api.get(`/orders/${userId}`),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}`, { status }),
};

// Reviews API
export const ReviewsAPI = {
  getByProduct: (productId) => api.get(`/reviews/${productId}`),
  create: (data) => api.post('/reviews', data),
};

// Interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Add Clerk token if available
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;