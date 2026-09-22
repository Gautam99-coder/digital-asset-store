import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/authContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // Note: We enter cents (e.g., 1500 for $15.00)
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [assetFileUrl, setAssetFileUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Security Check: If the user is NOT an admin, kick them back to the Home page
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Send the new product to our backend
      await axios.post('/api/products', {
        title,
        description,
        price: Number(price), 
        coverImageUrl,
        assetFileUrl,
      });

      setMessage('✅ Product added successfully!');
      
      // Clear the form for the next product
      setTitle('');
      setDescription('');
      setPrice('');
      setCoverImageUrl('');
      setAssetFileUrl('');
    } catch (error) {
      setMessage('❌ Failed to add product. Check the console.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Prevent page flicker while checking admin status
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto border-t-8 border-yellow-400">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <h2 className="text-xl text-gray-600 mb-6">Add a New Digital Product</h2>

        {message && (
          <div className="mb-4 p-4 rounded bg-gray-100 font-semibold text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Product Title</label>
            <input 
              type="text" 
              required 
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. React Masterclass E-Book"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea 
              required 
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" 
              rows="3"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Price (in cents! e.g., 1500 = $15.00)</label>
            <input 
              type="number" 
              required 
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Cover Image URL</label>
            <input 
              type="text" 
              required 
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" 
              value={coverImageUrl} 
              onChange={(e) => setCoverImageUrl(e.target.value)} 
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Asset File URL (The actual digital download)</label>
            <input 
              type="text" 
              required 
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" 
              value={assetFileUrl} 
              onChange={(e) => setAssetFileUrl(e.target.value)} 
              placeholder="https://my-secure-bucket.s3.amazonaws.com/book.pdf"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-3 rounded transition-colors ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Adding Product...' : 'Add Product to Store'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;