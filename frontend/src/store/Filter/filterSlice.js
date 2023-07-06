import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    rating: "",
    price: "",
  },
  reducers: {
    setRatingFilter: (state, action) => {
      state.rating = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    clearFilter: (state) => {
      state.rating = "";
      state.price = "";
    },
  },
});

export const { setRatingFilter, setPriceFilter, clearFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
