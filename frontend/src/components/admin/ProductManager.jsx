import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductsAPI } from '../../services/api';
import { fetchProducts } from '../../store/productsSlice';
import Loading from '../shared/Loading';

const ProductManager = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector(state => state.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await ProductsAPI.update(editingProduct._id, formData);
      } else {
        await ProductsAPI.create(formData);
      }
      dispatch(fetchProducts());
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: ''
      });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await ProductsAPI.delete(id);
        dispatch(fetchProducts());
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (status === 'loading') return <Loading />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="border p-2 rounded"
            required
          />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          className="w-full border p-2 rounded"
          rows="3"
          required
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  image: '',
                  category: '',
                  stock: ''
                });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Product List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;