import axiosInstance from "./axios";

export const getMessagesBetweenUsers = async (senderId, receiverId) => {
    try{
        console.log("Sender IkkkD:", senderId); // Debugging line
        console.log("Receiver ID:", receiverId); // Debugging line

        const response = await axiosInstance.get(`/message/getmessagebetweenusers/${senderId}/${receiverId}`);
        return response.data;
    }catch(error){
        console.error("Error fetching messages between users:", error);
    }
}