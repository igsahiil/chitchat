import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import connectionReducer from "./reducers/connectionReducer";
import chatReducer from "./reducers/chatReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    connection: connectionReducer,
    chat: chatReducer,
  },
});
