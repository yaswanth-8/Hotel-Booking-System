import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard/HotelCard";
import "./Hotels.css";
import { useHotelsData } from "../../Hooks/useHotelsData";
import { useState } from "react";
import Loading from "../Layouts/Loading/Loading";

const Hotels = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const hotels = useHotelsData(setIsLoading); // Using the useHotelData hook to get the list of hotels

  const handleHotelClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="hotels-section">
      {hotels.map((hotel) => (
        <div
          className="hotel-card"
          key={hotel.hotelID}
          onClick={() => handleHotelClick(hotel.hotelID)}
        >
          <HotelCard Hotel={hotel} />
        </div>
      ))}
    </div>
  );
};

export default Hotels;
