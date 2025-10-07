import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/shared/ProductCard';
import Loading from '../components/shared/Loading';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Our E-Commerce Store</h1>
            <p className="text-xl mb-8 text-primary-100">Discover amazing products at great prices</p>
            <button onClick={() => window.location.href='/products'} 
                    className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map(product => (
              <div key={product._id} className="animate-slide-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Products</h3>
              <p className="text-secondary-600">We ensure the highest quality for all our products</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Shipping</h3>
              <p className="text-secondary-600">Quick delivery to your doorstep</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-secondary-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 text-primary-100">Subscribe to our newsletter for the latest products and offers</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-900"
              />
              <button className="bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-primary-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;