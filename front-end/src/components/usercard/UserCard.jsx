import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; // Message icon from react-icons
import './usercard.css'; // For the styles
import { useNavigate } from 'react-router-dom'; 

const UserCard = ({ user }) => {
    const navigate = useNavigate(); 

    const handleMessageClick = () => {
        navigate(`/messagebox/${user._id}`); // ✅ Navigate to dynamic chat route
      };
  return (
    <div className="user-card">
      <div className="profile-pic">
        <img src={user.profilePicture} alt={user.name} />
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.status}</p>
      </div>
      <div className="message-icon" onClick={handleMessageClick}>
        <FaEnvelope />
      </div>
    </div>
  );
};

export default UserCard;
