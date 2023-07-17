import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { postReducer } from "./reducers/postReducer";
import { otherReducer } from "./reducers/otherReducer";
import { birdReducer } from "./reducers/birdReducer";
import { productReducer } from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    other: otherReducer,
    bird: birdReducer,
    product: productReducer,
  },
});

export const server = "http://54.254.120.134:6969/api/v1";
export const serverUrl = "https://mern-stack-server-y2sn.onrender.com/api/v1";
