import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './userprofile.css';
import { getUserProfile } from '../../api/apiAlluser';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile(); 
                console.log('Fetched user profile:', response);
                setProfile(response); // Set the user profile state with the fetched data
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    // Fallback if profile is not yet loaded
    if (!profile) {
        return <div>Loading...</div>; // You can replace this with a loader or spinner
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 },
        },
    };

    return (
        <motion.div
            className="profile-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="profile-card" variants={itemVariants}>
                <motion.div
                    className="profile-avatar"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {/* Render default icon or image */}
                    {profile.profilePicture ? (
                        <img src={profile.profilePicture} alt={profile.name} />
                    ) : (
                        <FaUserCircle size={100} /> // Fallback icon if no profile picture
                    )}
                </motion.div>

                <motion.h2 className="profile-name glitch" data-text={profile.name}>
                    {profile.name}
                </motion.h2>

                <motion.p className="profile-username">@{profile.name}</motion.p>
                <motion.p className="profile-email">{profile.email}</motion.p>

                <motion.div className="status-indicator" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <span className={`dot ${profile.status === 'Online' ? 'online' : 'offline'}`}></span>
                    {profile.status === 'Online' ? 'Online' : profile.lastSeen}
                </motion.div>

                <motion.p className="profile-bio" variants={itemVariants}>
                    {profile.bio}
                </motion.p>

                <motion.div className="profile-meta" variants={itemVariants}>
                    <div><strong>Location:</strong> {profile.location}</div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default UserProfile;
