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

export const server = "http://54.254.120.134:6969/api/v1";
export const serverUrl = "https://mern-stack-server-y2sn.onrender.com/api/v1";
