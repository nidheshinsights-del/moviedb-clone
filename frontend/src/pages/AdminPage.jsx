import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';

const AdminPage = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    releaseYear: new Date().getFullYear(),
    type: 'movie',
    stars: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert comma-separated string into an array of strings
    const starsArray = formData.stars.split(',').map(star => star.trim()).filter(star => star !== '');

    const payload = {
      title: formData.title,
      releaseYear: parseInt(formData.releaseYear),
      type: formData.type,
      stars: starsArray,
      status: 'published'
    };

    try {
      const response = await fetch('/api/admin/movies', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('Movie added and notifications sent!');
        setFormData({ title: '', releaseYear: new Date().getFullYear(), type: 'movie', stars: '' });
      } else {
        toast.error('Failed to add movie');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4 flex items-center gap-3">
        <FaPlusCircle className="text-red-400"/> Admin Dashboard - Add Movie
      </h2>
      
      <form onSubmit={handleSubmit} className="bg-moviedb-gray p-6 rounded-lg shadow-lg flex flex-col gap-4">
        
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Movie Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="e.g. The Matrix Resurgence"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-400 text-sm mb-1 block">Release Year</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-400 text-sm mb-1 block">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
            >
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-sm mb-1 block">Actors (Comma separated)</label>
          <input
            type="text"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="e.g. Keanu Reeves, Carrie-Anne Moss"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Users following these actors will receive a notification.</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white font-bold p-3 rounded mt-4 hover:bg-red-700 transition"
        >
          {loading ? 'Adding Movie...' : 'Add Movie & Notify Followers'}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;