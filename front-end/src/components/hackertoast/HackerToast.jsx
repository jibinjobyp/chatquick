import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './hackertoast.css';

const HackerToast = ({ message = '> LOGIN SUCCESSFUL.', subtext = 'WELCOME BACK, AGENT CIPHER', duration = 3000 }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="hacker-toast"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="toast-content">
        <div className="toast-header glitch" data-text={message}>{message}</div>
        <div className="toast-subtext">{subtext}</div>
      </div>
    </motion.div>
  );
};

export default HackerToast;