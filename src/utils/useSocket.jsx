import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (chatRoom, username) => {
  const [socketIo, setSocketIo] = useState();
  const [socketIoResponse, setSocketIoResponse] = useState({
    chatRoom: "",
    chatMessage: "",
    messageType: "",
    username: "",
    timestamp: "",
  });
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = useCallback(
    (payload) => {
      socketIo?.emit("send_message", {
        chatRoom: chatRoom,
        chatMessage: payload.chatMessage,
        username: username,
        messageType: "CLIENT",
        timestamp: payload.timestamp,
      });
    },
    [socketIo, chatRoom, username]
  );

  useEffect(() => {
    const socketIoBaseUrl = import.meta.env.VITE_SOCKETIO_BASE_URL;
    const socket = io(socketIoBaseUrl, {
      query: `username=${username}&chatRoom=${chatRoom}`,
    });
    setSocketIo(socket);

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("SocketIo Connected");
    });
    socket.on("connect_error", (error) => {
      console.log("Error on Socket Io Connection: ", error);
    });
    socket.on("read_message", (response) => {
      setSocketIoResponse({
        chatRoom: response.chatRoom,
        chatMessage: response.chatMessage,
        username: response.username,
        messageType: response.messageType,
        timestamp: response.timestamp,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [chatRoom, username]);

  return { isConnected, socketIoResponse, sendMessage };
};
