import React, { useEffect, useRef, useState } from "react";
import { GoCircle } from "react-icons/go";
import { FaFacebookMessenger } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import moment from "moment";
import { IoIosSend } from "react-icons/io";

const MessagesContainer = ({ chatUserId }) => {
  const { token } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const messageRef = useRef();
  const [message, setMessage] = useState("");
  const [msgLoading, setMsgLoading] = useState(false);

  // --------------------------------
  // Fetch all messages
  // --------------------------------
  const getAllMessages = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/messages/${chatUserId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response?.data?.success) {
        throw new Error("Failed to fetch messages");
      }

      setAllMessages(response?.data?.conversation || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  // --------------------------------
  // Send message
  // --------------------------------
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const data = {
      recieverId: chatUserId,
      text: message,
    };

    try {
      setMsgLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/messages/send`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response.data.success) {
        throw new Error("Failed to send message");
      }

      // Add new message to UI
      setAllMessages((prev) => [...prev, response.data.newMessage]);

      setMessage("");
      setMsgLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setMsgLoading(false);
    }
  };

  // Fetch messages whenever user changes
  useEffect(() => {
    if (chatUserId) getAllMessages();
  }, [chatUserId]);

  // Scroll to bottom
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // --------------------------------
  // No chat selected
  // --------------------------------
  if (!chatUserId) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="relative">
          <GoCircle size={77} />
          <FaFacebookMessenger className="absolute top-5 left-5" size={36} />
        </div>
        <p className="text-[18px]">
          Start chatting... or just stare at this screen awkwardly 🤭
        </p>
      </div>
    );
  }

  // --------------------------------
  // Main UI
  // --------------------------------
  return (
    <div className="h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="h-[90%] overflow-y-auto">
          {allMessages.length === 0 ? (
            <div className="h-full text-3xl flex items-center justify-center">
              No Conversation 🙂
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-2">
              {allMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.senderId?.toString() === userData?._id
                      ? "self-end"
                      : "self-start"
                  }`}
                >
                  {msg.senderId?.toString() === userData?._id ? (
                    <div className="text-white flex gap-1">
                      <p className="bg-gray-700 px-3 py-2 rounded-full font-semibold">
                        {msg.message}
                      </p>
                      <p className="text-xs mt-6">
                        {moment(msg.createdAt).format("h:mm A")}
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <p className="text-xs mt-6">
                        {moment(msg.createdAt).format("h:mm A")}
                      </p>
                      <p className="bg-gray-100 text-black px-3 py-2 rounded-full font-semibold">
                        {msg.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <div ref={messageRef}></div>
            </div>
          )}
        </div>
      )}

      {/* Message input */}
      <div className="h-[10%] border-t border-gray-950">
        <form
          onSubmit={sendMessage}
          className="h-full w-full flex items-center px-2 gap-2"
        >
          <input
            type="text"
            className="w-[95%] outline-none bg-gray-900 px-3 py-2 h-[80%] rounded-full"
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="bg-gray-900 h-12 w-12 rounded-full flex items-center justify-center"
            disabled={msgLoading}
            type="submit"
          >
            <IoIosSend
              size={30}
              className={`${msgLoading ? "animate-spin" : ""}`}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesContainer;
