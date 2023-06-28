import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard/HotelCard";
import "./Hotels.css";
import { useHotelsData } from "../../Hooks/useHotelsData";

const Hotels = () => {
  const navigate = useNavigate();
  const hotels = useHotelsData(); // Using the useHotelData hook to get the list of hotels

  const handleHotelClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <div className="hotels-section">
      {hotels.map((hotel) => (
        <div
          className="hotel-card"
          key={hotel.HotelID}
          onClick={() => handleHotelClick(hotel.HotelID)}
        >
          <HotelCard Hotel={hotel} />
        </div>
      ))}
    </div>
  );
};

export default Hotels;
