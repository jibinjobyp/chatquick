import axiosInstance from "./axios";


export const login = async (userData) => {
    try{
        const response = await axiosInstance.post('/auth/login',userData)
        return response
    }catch(error){
        console.error('Error during login:',error)
        throw error
    }
}