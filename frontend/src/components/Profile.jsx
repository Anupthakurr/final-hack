// Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found. Please log in again.');
          setLoading(false);
          return;
        }
        
        console.log('Token found:', token.substring(0, 15) + '...');
        
        // Configure axios with token
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
        // Make request to the profile endpoint
        const response = await axios.get('http://localhost:5000/api/user/profile', config);
        
        // If successful, set the profile data
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Token verification failed:', err);
        
        // Check if token is expired
        if (err.response && err.response.status === 401) {
          // Clear invalid token
          localStorage.removeItem('token');
          setError('Your session has expired. Please log in again.');
        } else {
          setError('Failed to load profile. Please try again later.');
        }
        
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  // Show only the profile content as requested
  if (loading) return <div className="profile-container">Loading profile...</div>;
  
  if (error) return <div className="profile-container">{error}</div>;
  
  return (
    <div className="profile-container">
      {profileData && (
        <div className="profile-card">
          <h2>{profileData.name}</h2>
          <p>Email: {profileData.email}</p>
          {/* Add other profile fields as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;