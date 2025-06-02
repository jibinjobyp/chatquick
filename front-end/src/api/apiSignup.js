import axiosInstance from "./axios";

export const signup = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};