// frontend/src/pages/ProductDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/authContext';

const ProductDetails = () => {
  const { id } = useParams(); // Gets the product ID from the URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleCheckout = async () => {
    // If the user isn't logged in, send them to the login page first
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setCheckingOut(true);
      // Ask the backend to create a Stripe checkout session
      const { data } = await axios.post('/api/orders/checkout', { productId: product._id });
      
      // Redirect the browser to the secure Stripe page
      window.location.href = data.url;
    } catch (err) {
      alert('Failed to start checkout. Check the console.');
      console.error(err);
      setCheckingOut(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-8 mt-10">
      <div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-lg shadow-md">
        <div className="w-full md:w-1/2">
          <img 
            src={product.coverImageUrl} 
            alt={product.title} 
            className="w-full h-auto rounded-lg shadow-sm object-cover" 
          />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
          
          <div className="text-4xl font-bold text-blue-600 mb-8">
            ${(product.price / 100).toFixed(2)}
          </div>
          
          <button 
            onClick={handleCheckout} 
            disabled={checkingOut}
            className={`w-full md:w-2/3 px-8 py-4 rounded-lg text-white font-bold text-xl transition-colors ${
              checkingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 shadow-lg'
            }`}
          >
            {checkingOut ? 'Processing...' : 'Buy Now Securely'}
          </button>
          
          {!user && (
            <p className="text-sm text-gray-500 mt-3">
              You will be prompted to log in before purchasing.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;