import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Alumnos App</Link>
        <div className="space-x-4">
          <Link to="/students" className="hover:underline">Students</Link>
          <Link to="/messages" className="hover:underline">Messages</Link>
          {token ? (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;