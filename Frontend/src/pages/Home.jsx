// frontend/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from our Node.js backend
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Make sure your backend is running!');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl">Loading products...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Latest Digital Assets</h1>
      
      {products.length === 0 ? (
        <p className="text-gray-600">No products found. Login as Admin to add some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;