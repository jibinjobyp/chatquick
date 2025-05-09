import React from 'react';
import './messageinput.css';

const MessageInput = ({ message, setMessage, onSend, onKeyPress, onTyping }) => {
  return (
    <div className="hacker-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onTyping();
        }}
        onKeyPress={onKeyPress}
        placeholder="> Enter command..."
        className="hacker-input"
      />
      <button onClick={onSend} className="hacker-send-button">
        EXECUTE
      </button>
    </div>
  );
};

export default MessageInput;
