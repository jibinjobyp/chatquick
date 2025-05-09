import axiosInstance from "./axios";

export const signup = async (userData) => {
  try {
    console.log("User data before sending:", userData); // Debugging line

    const response = await axiosInstance.post("/auth/signup", userData, {
      headers: {
        "Content-Type": "multipart/form-data", // Optional, Axios usually sets this automatically
      },
      
    });

    console.log("Signup successful:", response.data);
    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};
