import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
