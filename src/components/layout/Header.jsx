import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/userActions";
import { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="w-full bg-indigo-600">
        <div className="w-full flex justify-between items-center p-4 font-semibold text-gray-50">
          <h1 className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
              CHITCHAT
          </h1>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-secondary-light transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-6 items-center font-poppins">
            <Label className="cursor-pointer hover:text-secondary-light transition-colors">
              Home
            </Label>
            <Label className="cursor-pointer hover:text-secondary-light transition-colors">
              About
            </Label>
            <Label className="cursor-pointer hover:text-secondary-light transition-colors">
              Contact
            </Label>
          </div>

          <div className="flex items-center">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: profile?.avatar,
                  }}
                  className="cursor-pointer bg-white p-3 rounded-xl text-black transition-transform"
                  name={profile?.displayName}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" className="bg-gray-100 rounded shadow-2xl">
                <DropdownItem key="profile" className="h-14 gap-2" onClick={() => navigate("/profile")}>
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@{profile?.username}</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <button
                    className="p-0 text-md capitalize text-red-500 font-semibold cursor-pointer"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Logout
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 px-4 py-2">
            <div className="flex flex-col space-y-2">
              <Label className="cursor-pointer hover:text-cyan-300">Home</Label>
              <Label className="cursor-pointer hover:text-cyan-300">About</Label>
              <Label className="cursor-pointer hover:text-cyan-300">Contact</Label>
              <Button className="w-full hover:bg-blue-700">Login</Button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setShowLogoutModal(false)}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all">
              <div className="text-lg font-semibold mb-4">Confirm Logout</div>
              <div className="mb-6">Are you sure you want to logout?</div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowLogoutModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
