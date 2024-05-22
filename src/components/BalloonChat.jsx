/* eslint-disable react/prop-types */

import { format } from "date-fns";

const BalloonChat = ({ messageList, username, messageEndRef }) => {
  return (
    <div className="flex flex-col gap-3">
      {messageList.map((message) => (
        <div
          key={message.id}
          ref={messageEndRef}
          className={`flex flex-col gap-1 w-3/4 md:w-1/2 ${
            message.username === username ? "ml-auto" : ""
          }`}>
          {message.username !== username ? (
            <p className="text-sm">{message.username}</p>
          ) : null}
          <div
            className={`${
              message.username === username ? "bg-sky-500" : "bg-gray-500"
            } p-3 overflow-hidden break-words rounded-xl text-white`}>
            <p>{message.chatMessage}</p>
          </div>
          <p
            className={`text-sm ${
              message.username === username ? "text-left" : "text-right"
            }`}>
            {format(message.timestamp, "dd/MM/yyyy HH:mm")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BalloonChat;
