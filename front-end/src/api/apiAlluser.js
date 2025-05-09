import axiosInstance from "./axios";

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/user/alluser')
        console.log('Response from getAllUsers:', response); // Debugging line
        return response; // Return the data directly

    }catch (error) {
        console.error('Error fetching all users:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/user/profile')
        console.log('Response from getUserProfile:', response); // Debugging line
        return response.data; // Return the data directly

    }catch (error) {
        console.error('Error fetching user profile:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}