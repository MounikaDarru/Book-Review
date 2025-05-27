import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/features/authSlice';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile())
        .unwrap()
        .catch((err) => {
          console.error('Failed to fetch profile:', err);
        });
    }
  }, [dispatch, user]);

  if (status === 'loading') return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your profile...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>Error loading profile: {error}</p>
      <button onClick={() => dispatch(fetchUserProfile())} className="btn retry-btn">
        Try Again
      </button>
    </div>
  );
  
  if (!user) return (
    <div className="not-logged-in">
      <h2>Profile Access Required</h2>
      <p>Please log in to view your profile</p>
      <Link to="/login" className="btn">
        Go to Login
      </Link>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="profile-subtitle">Manage your account information</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value">{user.name}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Bio</span>
            <span className="detail-value">
              {user.bio || (
                <span className="text-muted">No bio added yet</span>
              )}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Account Type</span>
            <span className="detail-value">
              {user.isAdmin ? (
                <span className="badge admin-badge">Admin</span>
              ) : (
                <span className="badge user-badge">Standard User</span>
              )}
            </span>
          </div>
        </div>

        <div className="profile-actions">
          <Link to={`/profile/:id/edit`} className="btn edit-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;