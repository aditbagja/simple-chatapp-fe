/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useSocket } from "../utils/useSocket";
import { getSocketMessage } from "../utils/apis";
import { useEffect, useRef, useState } from "react";
import BalloonChat from "../components/BalloonChat";

const initialValues = {
  message: "",
};

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Pesan tidak boleh kosong"),
});

const ChatRoom = () => {
  const { chatRoom } = useParams();
  const username = sessionStorage.getItem("username");
  const [messageList, setMessageList] = useState([]);
  const [listUsername, setListUsername] = useState([]);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const { sendMessage, socketIoResponse } = useSocket(chatRoom, username);

  const addUsernameToList = (newUsername) => {
    if (!listUsername.includes(newUsername)) {
      setListUsername([...listUsername, newUsername]);
    }
  };

  const fetchMessage = async () => {
    const response = await getSocketMessage(chatRoom);
    setMessageList(
      response.filter((message) => {
        if (message.messageType === "CLIENT") {
          addUsernameToList(message.username);
          return message;
        }
      })
    );
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    fetchMessage();
  }, [socketIoResponse]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendMessage({
        chatMessage: values.message,
      });

      formik.resetForm();
      scrollToBottom();
      fetchMessage();
    },
  });

  return (
    <section className="w-full h-full py-32 xl:py-[10vh]">
      <div className="container mx-auto">
        <div className="px-5 xl:px-0">
          <div className="xl:w-1/2 xl:mx-auto">
            <h1 className="font-bold text-2xl">Halo, {username}!</h1>
            <div className="bg-slate-200 mt-5">
              <div className="bg-sky-500 rounded-t-md p-2 text-white">
                <p className="font-bold text-lg">Chat Room {chatRoom}</p>
                <p className="text-sm">{listUsername.join(", ")}</p>
              </div>
              <div className="min-h-[30rem] p-2 flex flex-col justify-between">
                <div className="h-[30rem] overflow-auto my-3">
                  <BalloonChat
                    messageList={messageList}
                    username={username}
                    messageEndRef={messageEndRef}
                  />
                </div>

                <form className="flex gap-3" onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    placeholder="Ketik pesan.."
                    className="p-2 w-full border border-gray-300 rounded-md"
                  />

                  <button
                    type="submit"
                    className="bg-sky-500 p-2 rounded-md text-white font-bold">
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
