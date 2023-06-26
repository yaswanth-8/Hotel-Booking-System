import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  HotelID: 1,
  Name: "Presidio Hotel",
  Address: "olympia tech park, chennai",
  Location: "Chennai",
  Country: "India",
  Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
  FoodStyleID: "2",
  Rating: 5,
  Description: "Top class 5 star Hotel",
  PricePerNight: 3000,
  Offer: 10,
  Site: "Beachside",
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotel: (state, action) => {
      return action.payload;
    },
  },
});

export const { setHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
