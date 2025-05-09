import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import User from './pages/users/User';
import MessageBox from './pages/messagebox/MessageBox';
import Footer from './components/footer/Footer';
import UserProfile from './pages/userprofile/UserProfile';
import HomePage from './pages/home/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { AuthProvider } from './context/authContext';

function App() {
  return (
    
  
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<User />} />
          <Route path="/messagebox/:receiverId" element={<MessageBox />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <Footer />
        {/* ✅ Toast container to show messages */}
        <ToastContainer />
      </div>
    </Router>
    
  );
}

export default App;
