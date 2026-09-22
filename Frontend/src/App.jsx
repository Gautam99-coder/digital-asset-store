// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Success from './pages/Success'; 
import Cancel from './pages/Cancel';   
import Admin from './pages/AdminDashBoard';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* Add the new routes here */}
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            
            <Route path="/admin" element={<Admin/>} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;