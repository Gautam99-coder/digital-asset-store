// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Digital Asset Store</Link>
        <div className="space-x-4 flex items-center">
          
          {user ? (
            <>
              <span className="mr-4">Hello, {user.name}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:underline text-yellow-300 font-bold">Admin Panel</Link>
              )}
              <button onClick={logout} className="hover:underline bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;