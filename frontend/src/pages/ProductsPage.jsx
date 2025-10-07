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
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="w-full p-2 border rounded-md"
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;