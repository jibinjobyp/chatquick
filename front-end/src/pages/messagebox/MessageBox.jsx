import React, { useState, useEffect, useRef } from 'react';
import Messages from '../../components/messages/Messages';
import MessageInput from '../../components/messageinput/MessageInput';
import './messagebox.css';
import socket from '../../socket';
import { sendMessage } from '../../api/apiSendMessage';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { getMessagesBetweenUsers } from '../../api/apiGetMessagesBetweenUsers';
import { getUserProfile } from '../../api/apiAlluser';

const MessageBox = () => {
  const { receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const [senderId, setSenderId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      setSenderId(userId);

      socket.connect();
      socket.emit('join', userId);

      const handleReceiveMessage = (data) => {
        console.log('Received message:', data.content);
        setMessages((prev) => [...prev, data]);
      };

      socket.on('receive_message', handleReceiveMessage);

      return () => {
        socket.off('receive_message', handleReceiveMessage);
      };
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!senderId || !receiverId) return;
      try {
        const response = await getMessagesBetweenUsers(senderId, receiverId);
        setMessages(response);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleTyping = (data) => {
      if (data.senderId === receiverId) {
        console.log('Typing event received:', data);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Adjust the timeout duration as needed
      }
    };

    const handleStopTyping = (data) => {
      if (data.senderId === receiverId) {
        setIsTyping(false);
      }
    };

    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);

    return () => {
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
    };
  }, [receiverId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMsg = {
      sender: senderId,
      receiver: receiverId,
      content: newMessage,
      replyTo: null,
      timestamp: new Date().toISOString(),
    };

    try {
      await sendMessage(userMsg);
      setMessages((prev) => [...prev, userMsg]); // ⬅️ Update messages immediately
      socket.emit('send_message', userMsg);
      toast.success('Message sent hacker....');
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Message not sent hacker....');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = () => {
    if (!senderId || !receiverId) return; // ✅ prevent errors before IDs are loaded

    if (newMessage.trim()) {
      socket.emit('typing', { senderId, receiverId });
    } else {
      socket.emit('stoptyping', { senderId, receiverId });
    }
  };

  return (
    <div className="hacker-terminal">
      <div className="terminal-header">
        <div className="contact-info">
          <img src={userProfile?.avatar || 'https://i.pravatar.cc/50?img=69'} alt="Contact" className="contact-avatar" />
          <span className="contact-name">{userProfile?.name || 'Loading...'}</span>
        </div>
        <div className="terminal-title">root@hacker-chat:~</div>
      </div>

      <div className="terminal-body" ref={terminalRef}>
        <Messages messages={messages} currentUserId={senderId} receiver={receiverId} />
        {isTyping && (
          <div className="typing-indicator">
            <span className="glitch">SYSTEM IS TYPING...</span>
            <span className="cursor">_</span>
          </div>
        )}
      </div>

      <MessageInput
        message={newMessage}
        setMessage={setNewMessage}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        onTyping={handleTyping} // Call this function when typing
      />
    </div>
  );
};

export default MessageBox;
