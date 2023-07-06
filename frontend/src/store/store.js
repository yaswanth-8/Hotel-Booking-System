import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import authReducer from "./Auth-Slice/authSlice";
import notificationReducer from "./Notification/notificationSlice";

// Combine multiple reducers into a single reducer
const rootReducer = combineReducers({
  notification: notificationReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
