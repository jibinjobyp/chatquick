import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './messages.css';
import { getAllUsers } from '../../api/apiAlluser';

const Messages = ({ messages, currentUserId , receiver }) => {
  const [userProfile, setUserProfile] = useState(null);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await getAllUsers();
          console.log('Fetched user profilehhhh:', response.data);
          response.data.find(user => user._id === receiver) ? setUserProfile(response.data.find(user => user._id === receiver)) : setUserProfile(null);

        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      fetchUserProfile();
    }, [receiver]);
  return (
    <div className="hacker-messages">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`message ${message.sender === currentUserId ? 'user-message' : 'system-message'}`}
        >
          <div className="message-header">
            <span className="sender">
              {message.sender === currentUserId ? 'You' : userProfile ? userProfile.name : 'Unknown'}
            </span>
            <span className="timestamp">{message.timestamp}</span>
          </div>
          <p className="message-text">{message.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Messages;
