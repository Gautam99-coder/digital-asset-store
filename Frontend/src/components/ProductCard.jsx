import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Convert cents to dollars for display (e.g., 1500 -> $15.00)
  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={product.coverImageUrl} 
        alt={product.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${formattedPrice}</span>
          <Link 
            to={`/product/${product._id}`} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;