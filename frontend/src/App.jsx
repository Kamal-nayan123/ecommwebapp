import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Import components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

// Import pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminRoutes from './components/admin/AdminRoutes';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              
              {/* Protected routes */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminRoutes />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
