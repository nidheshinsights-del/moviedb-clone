import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role: 'USER' })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created! Please login.');
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-moviedb-gray p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black font-bold p-3 rounded mt-2 hover:bg-yellow-500 transition"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account? <Link to="/login" className="text-yellow-400 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;