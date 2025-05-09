import React from 'react';
import { useEffect,useState } from 'react';
import UserCard from '../../components/usercard/UserCard';
import './user.css'; // For custom styles
import { getAllUsers } from '../../api/apiAlluser'; // Import the API function to fetch users

const User = () => {
    const [users, setUsers] = useState([])

    

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await getAllUsers()
                console.log('Fetched users:', response)
                setUsers(response.data) // Set the users state with the fetched data
                // Handle the response data as needed
            }catch(error){
                console.error('Error fetching users:', error)
            }
        }
        fetchUsers()
    },[])



   
      
  return (
    <div className="users-page">
      <h1>Users in Chat</h1>
      <div className="users-container">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default User;
