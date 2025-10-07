import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch({
      type: 'cart/addItem',
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    });
  };

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-50">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Stock Status */}
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs uppercase tracking-wider">
              Only {product.stock} left
            </span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm uppercase tracking-wider">Out of Stock</span>
          </div>
        )}

        {/* Quick Add Button */}
        {product.stock > 0 && (
          <button
            onClick={addToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 text-xs uppercase tracking-wider
                     opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black"
          >
            Add to Cart
          </button>
        )}
      </div>
      
      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <Link to={`/product/${product._id}`} className="block group-hover:text-gray-600 transition-colors">
          <h3 className="text-sm font-medium">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 line-clamp-1">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {product.category && (
          <span className="inline-block text-xs text-gray-500">
            {product.category}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;