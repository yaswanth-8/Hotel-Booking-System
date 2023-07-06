import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import authReducer from "./Auth-Slice/authSlice";
import notificationReducer from "./Notification/notificationSlice";
import filterReducer from "./Filter/filterSlice";

// Combine multiple reducers into a single reducer
const rootReducer = combineReducers({
  notification: notificationReducer,
  auth: authReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
