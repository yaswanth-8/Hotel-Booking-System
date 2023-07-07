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
  const country = useSelector((state) => state.filter.country);

  useEffect(() => {
    let filteredHotels = hotels;

    if (price !== null && price !== "") {
      filteredHotels = filteredHotels.filter((hotel) => {
        return hotel.pricePerNight <= price;
      });
    }

    if (rating !== null && rating !== "") {
      filteredHotels = filteredHotels.filter((hotel) => {
        return hotel.rating >= rating;
      });
    }
    console.log(price + " is price");
    console.log(rating + " is rating");
    console.log(country + " is country");

    if (country) {
      filteredHotels = filteredHotels.filter((hotel) => {
        return hotel.country === country;
      });
    }

    if (price === 1000000 && !rating && !country) {
      console.log("All are empty");
      filteredHotels = hotels;
    }

    console.log(filteredHotels.length);

    setFilteredHotels(filteredHotels);
  }, [hotels, price, rating, country]);

  const handleHotelClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="hotels-section">
      {filteredHotels.length !== 0 ? (
        filteredHotels.map((hotel) => (
          <div
            className="hotel-card"
            key={hotel.hotelID}
            onClick={() => handleHotelClick(hotel.hotelID)}
          >
            <HotelCard Hotel={hotel} />
          </div>
        ))
      ) : (
        <div>
          <p>No hotels found</p>
        </div>
      )}
    </div>
  );
};

export default Hotels;
