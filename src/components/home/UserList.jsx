/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/userActions";
import { Menu, X } from "lucide-react";
import socket from "../../socket/Scoket";

export default function UserList({ setConnectionId, setUserData }) {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.user);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [userStatus, setUserStatus] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleUserClick = (userId) => {
    setConnectionId(userId);
    setUserData(users.find((user) => user._id === userId));
    setSelectedUserId(userId);
    setIsOpen(false); // Close list on mobile after selection
  };

  useEffect(() => {
    socket.on("user_status", (data) => {
      setUserStatus((prev) => ({
        ...prev,
        id: data.id,
        status: data.status,
      }));
    });
    return () => {
      socket.off("user_status");
    };
  }, []);

  console.log(userStatus);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden z-50 ${
          isOpen ? "bg-transparent" : "bg-blue-900"
        } text-white p-2`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* User List */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 h-full overflow-y-auto scrollbar-hide scroll-smooth 
          transition-transform transform md:relative md:w-80 md:block ${
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <style jsx>{`
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
        `}</style>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedUserId === user._id
                    ? "bg-blue-100"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.displayName[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.displayName}</h3>
                    <p
                      className={`text-sm font-bold ${
                        userStatus?.id === user?._id?.toString() &&
                        userStatus?.status === 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {userStatus?.id === user?._id?.toString() &&
                      userStatus?.status === 0
                        ? "Offline"
                        : "Online"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
