import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUpload, FiChevronRight } from 'react-icons/fi';
import './signup.css';
import { signup } from '../../api/apiSignup';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: null,
    previewImage: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, profilePicture: 'Only image files are allowed' }));
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profilePicture: 'Image must be less than 2MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profilePicture: file,
        previewImage: reader.result
      });
      if (errors.profilePicture) {
        setErrors(prev => ({ ...prev, profilePicture: null }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validatePersonalInfo = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validatePersonalInfo()) {
      setFormStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      const response = await signup(formDataToSend);
      
      toast.success('Account created successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        profilePicture: null,
        previewImage: null
      });
      setFormStep(0);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = () => {
    if (!formData.password) return '';
    const length = formData.password.length;
    if (length < 4) return 'Weak';
    if (length < 8) return 'Fair';
    if (length < 12) return 'Good';
    return 'Strong';
  };

  const binaryElements = [
    { code: '01001', top: '10%', left: '5%', delay: 0 },
    { code: '10110', top: '20%', right: '8%', delay: 2 },
    { code: '01010', bottom: '15%', left: '12%', delay: 1 },
    { code: '11001', bottom: '25%', right: '7%', delay: 3 }
  ];

  return (
    <motion.div 
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {binaryElements.map((el, index) => (
        <motion.div
          key={index}
          className="binary-element"
          style={{
            position: 'absolute',
            top: el.top || 'auto',
            left: el.left || 'auto',
            right: el.right || 'auto',
            bottom: el.bottom || 'auto',
            fontSize: '14px',
            color: 'var(--hacker-accent)',
            opacity: 0.1,
            fontFamily: 'Source Code Pro, monospace',
            pointerEvents: 'none'
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 8, 
            delay: el.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {el.code}
        </motion.div>
      ))}
      
      <motion.div 
        className="signup-card"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
      >
        <motion.div 
          className="signup-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2>Create Your Account</h2>
          <p>Join our chat community today</p>
        </motion.div>

        {errors.api && (
          <motion.div 
            className="api-error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.api}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ 
            opacity: formStep === 0 ? 1 : 0,
            x: formStep === 0 ? 0 : -50,
            position: formStep === 0 ? 'relative' : 'absolute'
          }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', display: formStep === 0 ? 'block' : 'none' }}
        >
          <form onSubmit={handleContinue} className="signup-form">
            <motion.div 
              className="form-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <label htmlFor="name">
                <FiUser className="input-icon" /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.name}
                </motion.span>
              )}
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <label htmlFor="email">
                <FiMail className="input-icon" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <label htmlFor="password">
                <FiLock className="input-icon" /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Create a password"
              />
              {formData.password && (
                <div className={`password-strength strength-${getPasswordStrength().toLowerCase()}`}>
                  Strength: <span>{getPasswordStrength()}</span>
                </div>
              )}
              {errors.password && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.password}
                </motion.span>
              )}
            </motion.div>

            <motion.button 
              type="submit" 
              className="signup-button continue-button"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue <FiChevronRight />
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: formStep === 1 ? 1 : 0,
            x: formStep === 1 ? 0 : 50,
            position: formStep === 1 ? 'relative' : 'absolute'
          }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', display: formStep === 1 ? 'block' : 'none' }}
        >
          <form onSubmit={handleSubmit} className="signup-form">
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label htmlFor="profilePicture">
                <FiUpload className="input-icon" /> Profile Picture (Optional)
              </label>
              <div className="image-upload-container">
                <label htmlFor="profilePicture" className="image-upload-label">
                  {formData.previewImage ? (
                    <motion.div 
                      className="image-preview"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img src={formData.previewImage} alt="Preview" />
                      <span className="change-text">Change Image</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="upload-placeholder"
                      whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 0, 0.1)" }}
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                        <line x1="16" y1="5" x2="22" y2="5"></line>
                        <line x1="19" y1="2" x2="19" y2="8"></line>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                      <span>Upload Photo</span>
                    </motion.div>
                  )}
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-upload-input"
                />
                {errors.profilePicture && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.profilePicture}
                  </motion.span>
                )}
              </div>
            </motion.div>

            <div className="button-group">
              <motion.button 
                type="button" 
                className="back-button"
                onClick={() => setFormStep(0)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Back
              </motion.button>

              <motion.button 
                type="submit" 
                className="signup-button"
                disabled={isSubmitting}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          className="signup-footer"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <p>Already have an account? <a href="/login">Log in</a></p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;