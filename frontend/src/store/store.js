import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import hotelReducer from "./Hotel-Slice/hotelSlice";
import authReducer from "./Auth-Slice/authSlice";

// Combine multiple reducers into a single reducer
const rootReducer = combineReducers({
  hotel: hotelReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
