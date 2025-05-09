import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiChevronRight, FiAlertCircle } from "react-icons/fi";
import "./login.css";
import { login } from "../../api/apiLogin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }

    // Clear login failed message when user types
    if (loginFailed) {
      setLoginFailed(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      try {
        const response = await login(formData);
        console.log("Login response:", response);
        localStorage.setItem("token", response.data.token); // Store token in local storage
         // Store user data in local storage

        // Redirect to dashboard or home page

        toast.success("Login successful! Redirecting...");
        Navigate("/");

        // For demo purposes - simulate successful login 70% of the time
        // if (Math.random() > 0.3) {
        //   // Success - redirect would happen here
        //   console.log('Login successful');
        //   // Redirect would happen here in a real app
        //   // window.location.href = '/dashboard';
        // } else {
        //   // Failed login
        //   setLoginFailed(true);
        // }
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
        console.error("Login error:", error);
        setLoginFailed(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Binary code animation elements
  const binaryElements = [
    { code: "10110", top: "10%", left: "5%", delay: 0 },
    { code: "01001", top: "20%", right: "8%", delay: 2 },
    { code: "11001", bottom: "15%", left: "12%", delay: 1 },
    { code: "01010", bottom: "25%", right: "7%", delay: 3 },
  ];

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Binary code floating elements */}
      {binaryElements.map((el, index) => (
        <motion.div
          key={index}
          className="binary-element"
          style={{
            position: "absolute",
            top: el.top || "auto",
            left: el.left || "auto",
            right: el.right || "auto",
            bottom: el.bottom || "auto",
            fontSize: "14px",
            color: "var(--hacker-accent)",
            opacity: 0.1,
            fontFamily: "Source Code Pro, monospace",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            delay: el.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {el.code}
        </motion.div>
      ))}

      <motion.div
        className="login-card"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.div
          className="login-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2>Welcome Back</h2>
          <p>Log in to access your account</p>
        </motion.div>

        {loginFailed && (
          <motion.div
            className="login-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiAlertCircle />
            <span>Incorrect email or password. Please try again.</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <motion.div
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
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
              className={errors.email ? "error" : ""}
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
            transition={{ delay: 0.4, duration: 0.4 }}
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
              className={errors.password ? "error" : ""}
              placeholder="Enter your password"
            />
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

          <motion.div
            className="forgot-password"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <a href="/forgot-password">Forgot password?</a>
          </motion.div>

          <motion.button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Logging in...
              </>
            ) : (
              <>
                Log In <FiChevronRight />
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          className="login-footer"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </motion.div>

        <motion.div
          className="secure-login-notice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <FiLock size={12} />
          <span>Secure, encrypted connection</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
