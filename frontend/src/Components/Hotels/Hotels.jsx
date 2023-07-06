import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard/HotelCard";
import "./Hotels.css";
import { useHotelsData } from "../../Hooks/useHotelsData";
import { useState, useEffect } from "react";
import Loading from "../Layouts/Loading/Loading";
import { useSelector } from "react-redux";

const Hotels = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const hotels = useHotelsData(setIsLoading);
  const price = useSelector((state) => state.filter.price);
  const rating = useSelector((state) => state.filter.rating);

  useEffect(() => {
    let filteredHotels = hotels;

    if (price) {
      filteredHotels = filteredHotels.filter((hotel) => {
        return hotel.pricePerNight < price;
      });
    }

    if (rating) {
      filteredHotels = filteredHotels.filter((hotel) => {
        return hotel.rating < rating;
      });
    }

    setFilteredHotels(filteredHotels);
  }, [hotels, price, rating]);

  const handleHotelClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="hotels-section">
      {filteredHotels.map((hotel) => (
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
