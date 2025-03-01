/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import socket from "../../socket/Scoket";
import {
  getConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../redux/actions/connectionActions";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  sendChatMessage,
  getChatMessages,
} from "../../redux/actions/chatActions";
import { format } from "date-fns";
import Lottie from "lottie-react";
import animationData from "../../assets/nomsg.json";
import AddUser from "../../assets/AddUser.json";
import Pending from "../../assets/Pending.json";

const groupMessagesByHour = (messages) => {
  if (!messages || !messages.length) return {};

  return messages.reduce((acc, message) => {
    const hour = format(new Date(message.createdAt), "yyyy-MM-dd HH:00");
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(message);
    return acc;
  }, {});
};

const NoConnection = ({ userData, onSendRequest }) => (
  <div className="flex-1 flex flex-col space-y-4 justify-center items-center p-4">
    <Lottie className="w-50 h-50" animationData={AddUser} />
    <h1 className="text-xl md:text-2xl font-bold text-gray-50 text-center">
      {userData?.displayName}
    </h1>
    <Button
      className="bg-blue-900 hover:bg-blue-700 cursor-pointer"
      onClick={onSendRequest}
    >
      Send Connection Request
    </Button>
  </div>
);

const PendingConnection = ({
  isSender,
  onAcceptConnectionRequest,
  onRejectConnectionRequest,
}) => (
  <div className="flex-1 flex justify-center items-center p-4">
    <div className="text-center">
      <h1 className="text-white text-lg font-semibold mb-4">
        {isSender ? (
          <div className="flex flex-col items-center">
            <Lottie className="w-50 h-50" animationData={Pending} />
            <div className="text-gray-50 text-2xl font-semibold mb-4">
              Request Sent Successfully
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-white text-lg font-semibold mb-4">
              Connection Request Received
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Button
                onClick={onAcceptConnectionRequest}
                className="bg-blue-900 hover:bg-blue-700 cursor-pointer"
              >
                Accept
              </Button>
              <Button
                onClick={onRejectConnectionRequest}
                className="bg-red-900 hover:bg-red-700 cursor-pointer"
              >
                Decline
              </Button>
            </div>
          </div>
        )}
      </h1>
    </div>
  </div>
);

const ChatInterface = ({
  userData,
  onSendMessage,
  onFormChange,
  groupedMessages,
  connectionId,
  inputValue,
}) => {
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [groupedMessages]);

  return (
    <div className="bg-gray-900 h-full w-full flex flex-col">
      <div className="bg-gray-800 text-white p-4 text-lg font-semibold flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center md:hidden">
          </div>
          <span className="truncate">{userData?.displayName || "Loading..."}</span>
        </div>
        <button className="bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600">
          <span className="hidden md:inline">Options</span>
          <span className="md:hidden">⋮</span>
        </button>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3 scrollbar-hide scroll-smooth"
      >
        <style>
          {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          .scroll-smooth {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
        `}
        </style>
        {Object.keys(groupedMessages).length > 0 ? (
          Object.entries(groupedMessages).map(([hour, messages]) => (
            <div key={hour}>
              <div className="text-center text-gray-400 text-xs md:text-sm my-2">
                {format(new Date(hour), "MMMM d, yyyy h:mm a")}
              </div>
              {messages.map((chat_message) => (
                <div
                  key={chat_message._id}
                  className={`flex ${
                    chat_message.recipient === connectionId
                      ? "justify-end"
                      : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`${
                      chat_message.recipient === connectionId
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white p-2 md:p-3 rounded-lg max-w-[75%] md:max-w-xs break-words`}
                  >
                    <p className="text-sm">{chat_message.message}</p>
                    <p className="text-xs text-gray-300 mt-1 text-right">
                      {format(new Date(chat_message.createdAt), "h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full flex-col">
            <Lottie className="w-1/4" animationData={animationData} />
            <p className="text-gray-500 text-sm md:text-base">No messages yet</p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-2 md:p-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none text-sm md:text-base"
          name="message"
          value={inputValue}
          onChange={onFormChange}
        />
        <button
          className="bg-blue-500 px-3 md:px-4 py-2 rounded-lg text-white hover:bg-blue-600 text-sm md:text-base"
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default function ChatScreen({ connectionId, userData }) {
  const connections = useSelector((state) => state.connection.connections);
  const { messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [sendInput, setSendInput] = useState({
    message: "",
    type: "text",
    recipient: connectionId,
  });

  useEffect(() => {
    if (connectionId) {
      dispatch(getConnections(connectionId));
      dispatch(getChatMessages(connectionId));
      setSendInput(prev => ({ ...prev, recipient: connectionId }));
    }
  }, [dispatch, connectionId]);

  useEffect(() => {
    const handleNewMessage = (new_message) => {
      if (new_message.sender._id === connectionId || new_message.recipient === connectionId) {
        dispatch(getChatMessages(connectionId));
      }
    };

    socket.on("new_message", handleNewMessage);
    return () => socket.off("new_message", handleNewMessage);
  }, [dispatch, connectionId]);

  const handleFormChange = (e) => {
    setSendInput({
      ...sendInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendRequest = async () => {
    if (!connectionId) return;
    await dispatch(sendConnectionRequest(connectionId));
    dispatch(getConnections(connectionId));
  };

  const handleAcceptConnectionRequest = async () => {
    if (!connectionId) return;
    await dispatch(acceptConnectionRequest(connectionId));
    dispatch(getConnections(connectionId));
  };

  const handleRejectConnectionRequest = async () => {
    if (!connectionId) return;
    await dispatch(rejectConnectionRequest(connectionId));
    dispatch(getConnections(connectionId));
  };

  const handleSendMessage = async () => {
    if (!sendInput.message.trim() || !connectionId) return;
    await dispatch(sendChatMessage(sendInput));
    dispatch(getConnections(connectionId));
    setSendInput({
      message: "",
      type: "text",
      recipient: connectionId,
    });
  };

  const connection = connections[0];

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="flex-1 h-full flex flex-col bg-gray-900">
        {!connections.length ? (
          <NoConnection
            userData={userData}
            onSendRequest={handleSendRequest}
          />
        ) : connection.status === 0 ? ( 
          <PendingConnection
            isSender={connection.connection === connectionId}
            onAcceptConnectionRequest={handleAcceptConnectionRequest}
            onRejectConnectionRequest={handleRejectConnectionRequest}
          />
        ) : (
          <ChatInterface
            groupedMessages={groupMessagesByHour(messages || [])}
            userData={userData}
            onFormChange={handleFormChange}
            onSendMessage={handleSendMessage}
            connectionId={connectionId}
            inputValue={sendInput.message}
          />
        )}
      </div>
    </div>
  );
}
