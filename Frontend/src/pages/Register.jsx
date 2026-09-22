// frontend/src/pages/Register.jsx
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/authContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calls the register function from our AuthContext
    register(name, email, password, adminSecret);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-500 mb-2 text-sm">Admin Secret (Optional)</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded bg-gray-50" 
            value={adminSecret} 
            onChange={(e) => setAdminSecret(e.target.value)} 
            placeholder="Leave blank for normal user"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-4 font-bold">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;