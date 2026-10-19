import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaBell, FaCheckCircle } from 'react-icons/fa';

const NotificationsPage = () => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Update the UI to show it's read
        setNotifications(notifications.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        ));
        toast.success('Marked as read');
      }
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading notifications...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4 flex items-center gap-3">
        <FaBell /> Notifications
      </h2>
      
      {notifications.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 text-xl">You have no notifications yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 rounded-lg border flex justify-between items-center ${
                notif.isRead ? 'bg-gray-800 border-gray-700 opacity-70' : 'bg-moviedb-gray border-yellow-400'
              }`}
            >
              <div>
                <p className="text-white text-lg">{notif.message}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>
              
              {!notif.isRead && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-sm"
                >
                  <FaCheckCircle /> Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;