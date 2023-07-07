import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    rating: "",
    price: "",
    country: "",
  },
  reducers: {
    setRatingFilter: (state, action) => {
      state.rating = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    setCountryFilter: (state, action) => {
      state.country = action.payload;
    },
    clearFilter: (state) => {
      state.rating = "";
      state.price = "";
      state.country = "";
    },
  },
});

export const {
  setRatingFilter,
  setPriceFilter,
  clearFilter,
  setCountryFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
