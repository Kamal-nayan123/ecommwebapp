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
    <div className="animate-fade-in bg-primary-50">
      {/* Hero Section */}
      <section className="relative bg-secondary-50 text-secondary-900 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Your Modern Store</h1>
            <p className="text-xl mb-8 text-secondary-600">Discover curated products for a better lifestyle.</p>
            <button onClick={() => window.location.href='/products'} 
                    className="bg-accent-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-accent-900 transition-colors shadow-md hover:shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-secondary-900 text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map(product => (
              <div key={product._id} className="animate-slide-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-secondary-900 text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-100 text-accent-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary-900">Quality Products</h3>
              <p className="text-secondary-600">We ensure the highest quality for all our products, curated just for you.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-100 text-accent-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary-900">Fast Shipping</h3>
              <p className="text-secondary-600">Quick and reliable delivery to your doorstep, wherever you are.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-100 text-accent-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary-900">24/7 Support</h3>
              <p className="text-secondary-600">Our team is always here to help you with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">Stay Updated</h2>
            <p className="mb-8 text-secondary-600">Subscribe to our newsletter for the latest products and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-accent-500 text-secondary-900"
              />
              <button className="bg-accent-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-accent-900 transition-colors shadow-md hover:shadow-lg">
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