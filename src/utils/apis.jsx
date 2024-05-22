import axiosConfig from "./axiosConfig";

export const getSocketMessage = async (chatRoom) => {
  try {
    const response = await axiosConfig.get(`/chat/${chatRoom}`);
    return response.data;
  } catch (error) {
    console.log("Error getSocketMessage: " + error.message);
    throw error;
  }
};
