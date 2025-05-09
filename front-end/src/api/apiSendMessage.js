import axiosInstance from "./axios";

export const sendMessage = async (messageData) => {
    try{
        console.log("Message data before sending:", messageData); // Debugging line
        const response = await axiosInstance.post("/message/sendmessage", messageData)
        return response.data;

    }catch(error){
        console.error("Error sending message:", error);
        throw error;
    }
}