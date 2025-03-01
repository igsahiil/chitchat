import { io } from "socket.io-client";
import Localstorage from "../utils/LocalStorage";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket"],
  auth: {
    token: Localstorage.getItem("token"),
  },
});

export default socket;
