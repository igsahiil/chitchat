/* eslint-disable react-hooks/exhaustive-deps */
import UserList from "../components/home/UserList";
import ChatScreen from "../components/home/ChatScreen";
import { useState, useCallback } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/selectChat.json";
export default function Home() {

  const [connectionId, setConnectionId] = useState(null);
  const [userData, setUserData] = useState({});

  // Memoized callbacks to avoid unnecessary re-renders
  const handleSetConnectionId = useCallback(setConnectionId, []);
  const handleSetUserData = useCallback(setUserData, []);

  return (
    <div className="w-full flex h-[calc(100dvh-4rem)]">
      {/* sidebar */}
      <UserList setConnectionId={handleSetConnectionId} setUserData={handleSetUserData} />
      {/* content */}
      <div className="w-full">
        {connectionId ? (
        <ChatScreen connectionId={connectionId} userData={userData} />
        ) : (
          <div className="flex flex-col space-y-4 justify-center items-center h-[calc(100dvh-4rem)]">
            <Lottie className="w-1/4 mb-0" animationData={animationData} />
            <h1 className="text-gray-200 text-2xl font-semibold">Please Select A Chat</h1>
          </div>
        )}
      </div>
    </div>
  );
}
