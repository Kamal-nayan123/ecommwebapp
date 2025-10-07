import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/shared/ProductCard';
import Loading from '../components/shared/Loading';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(state => state.products);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filter === 'all' || product.category === filter;
    return matchesSearch && matchesCategory;
  });

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-secondary-900 text-center mb-12">Our Products</h1>
        
        <div className="mb-10 flex flex-col md:flex-row gap-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow px-4 py-3 border border-secondary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-500 text-secondary-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="px-4 py-3 border border-secondary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-500 text-secondary-900 bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-secondary-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;