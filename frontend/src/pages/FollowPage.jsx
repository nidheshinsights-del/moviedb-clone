import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';

const FollowPage = () => {
  const { token } = useAuth();
  // A hardcoded list of actors for testing
  const [actors] = useState(["Keanu Reeves", "Carrie-Anne Moss", "Tom Hanks", "Scarlett Johansson", "Robert Downey Jr."]);
  
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch who the user is already following
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch('/api/follow/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setFollowing(data);
        }
      } catch (error) {
        console.error('Error fetching follows:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, [token]);

  const handleFollowToggle = async (actorName) => {
    const isFollowing = following.includes(actorName);
    const endpoint = isFollowing ? '/api/follow/unfollow' : '/api/follow/follow';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ actorName })
      });

      const data = await response.json();

      if (response.ok) {
        if (isFollowing) {
          setFollowing(following.filter(name => name !== actorName));
          toast.success(`Unfollowed ${actorName}`);
        } else {
          setFollowing([...following, actorName]);
          toast.success(`Following ${actorName}`);
        }
      } else {
        toast.error(data.message || 'Action failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading actors...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Follow Actors</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actors.map((actor) => {
          const isFollowing = following.includes(actor);
          return (
            <div key={actor} className="bg-moviedb-gray p-4 rounded-lg flex justify-between items-center border border-gray-800">
              <span className="text-xl text-white font-medium">{actor}</span>
              <button
                onClick={() => handleFollowToggle(actor)}
                className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition ${
                  isFollowing 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                {isFollowing ? <><FaUserCheck /> Unfollow</> : <><FaUserPlus /> Follow</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowPage;