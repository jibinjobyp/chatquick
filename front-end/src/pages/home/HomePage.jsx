import React from 'react';
import { motion } from 'framer-motion';
import './homepage.css';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="homepage"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          className="title glitch"
          data-text="DarkLink"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80 }}
        >
          DarkLink
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Encrypted. Anonymous. Untraceable.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-button"
        >
          Start Chatting
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.h2 variants={itemVariants}>Secure Communication</motion.h2>
        <div className="feature-cards">
          <motion.div
            className="feature-card"
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,255,204,0.3)" }}
          >
            <h3>End-to-End Encryption</h3>
            <p>All messages are encrypted using quantum-grade protocols.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,255,204,0.3)" }}
          >
            <h3>Anonymous Chats</h3>
            <p>No usernames or metadata stored. You are invisible by design.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,255,204,0.3)" }}
          >
            <h3>Self-Destruct Messages</h3>
            <p>Set a timer for messages to vanish forever after being read.</p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Chat Preview */}
      <section className="chat-preview">
        <motion.div
          className="chat-box"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60 }}
        >
          <div className="message user">Hello, can you hear me?</div>
          <div className="message system">> ENCRYPTION VERIFIED. PROCEED.</div>
        </motion.div>

        <motion.div
          className="chat-box"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60 }}
        >
          <div className="message system">> INITIATING SECURE HANDSHAKE...</div>
          <div className="message user">All set. Let’s go dark.</div>
        </motion.div>
      </section>

      {/* Footer Call to Action */}
      <section className="footer-cta">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Ready to communicate in the shadows?
        </motion.h2>
        <motion.button
          className="cta-button large"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Launch Secure Chat
        </motion.button>
      </section>
    </motion.div>
  );
};

export default HomePage;