import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { postReducer } from "./reducers/postReducer";
import { otherReducer } from "./reducers/otherReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    other: otherReducer,
  },
});

export const server = "http://13.212.177.158:6969/api/v1";
export const serverUrl = "https://mern-stack-server-y2sn.onrender.com/api/v1";
