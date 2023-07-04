import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./HotelDetail.css";
import Booking from "../../Layouts/Booking/Booking";
import EditHotelDetails from "./Edit-Hotel-Detail/EditHotelDetails";
import { useNavigate, useParams } from "react-router-dom";
import useGetWeather from "../../../Hooks/useGetWeather";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Static from "../../Layouts/Static/Static";
import useGetHotel from "../../../Hooks/useGetHotel";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WeatherWrapper({ location }) {
  const weather = useGetWeather(location);

  return <span>{weather ? `${weather} °C` : "NA"}</span>;
}

function HotelDetails() {
  const { id } = useParams();
  const { hotel, loading, error } = useGetHotel(id);

  const auth = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [showFullText, setShowFullText] = useState(false);

  const handleShowMore = () => {
    setShowFullText(true);
  };

  const handleShowLess = () => {
    setShowFullText(false);
  };

  if (loading || !hotel) {
    return <div>Loading...</div>; // Render a loading state while the hotel data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Render an error message if there's an error fetching the hotel data
  }

  const showReviewsHandler = () => {
    navigate(`/hotels/${hotel.hotelID}/reviews`);
  };

  const raiseQueryHandler = () => {
    navigate(`/hotels/${hotel.hotelID}/raisequery`);
  };

  return (
    <div className="hotel-details-details">
      <div className="hotel-details-data">
        <h2 className="hotel-details-name">{hotel.name}</h2>
        <div className="image-grid">
          <Carousel showThumbs={false}>
            <img src={hotel.url1} alt={hotel.name} />
            <img src={hotel.url2} alt={hotel.name} />
            <img src={hotel.url3} alt={hotel.name} />
            <img src={hotel.url4} alt={hotel.name} />
            <img src={hotel.url5} alt={hotel.name} />
          </Carousel>
        </div>
        <hr />
        <div className="hotelDetails">
          <hr />

          {hotel.about.length > 210 ? (
            <p className="hotel-details-about">
              {showFullText ? (
                hotel.about
              ) : (
                <>
                  {hotel.about.slice(0, 200)}
                  {hotel.about.length > 200 && "..."}
                </>
              )}
              {!showFullText && hotel.about.length > 200 && (
                <button className="small-blue-button" onClick={handleShowMore}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              )}
              {showFullText && (
                <button className="small-blue-button" onClick={handleShowLess}>
                  <FontAwesomeIcon icon={faChevronUp} />
                </button>
              )}
            </p>
          ) : (
            <p className="hotel-details-about">{hotel.about}</p>
          )}

          <hr />
          <p>
            <strong>Address:</strong> {hotel.address}
          </p>
          <p>
            <strong>Location:</strong> {hotel.location}
          </p>
          <p>
            <strong>Country:</strong> {hotel.country}
          </p>
          {hotel.location ? (
            <p>
              <strong>Current Weather:</strong>
              <WeatherWrapper location={hotel.location} />
            </p>
          ) : (
            ""
          )}
          <p>
            <strong>Rating:</strong> {hotel.rating}
          </p>
          <p>
            <strong>Description:</strong> {hotel.description}
          </p>
          <p>
            <strong>Price Per Night:</strong> {hotel.pricePerNight}
          </p>
          <p>
            <strong>Offer:</strong> {hotel.offer}% off
          </p>
          <p>
            <strong>Site:</strong> {hotel.site}
          </p>
          <hr />
          <Static site={hotel.site} />
        </div>
        <div className="details-page-button">
          <button className="blue-button" onClick={showReviewsHandler}>
            Reviews
          </button>
          <button className="blue-button" onClick={raiseQueryHandler}>
            Raise-Query
          </button>
        </div>
        <hr />
      </div>

      <div className="hotel-details-booking">
        {auth === "admin" ? (
          <EditHotelDetails hotel={hotel} />
        ) : (
          <Booking hotel={hotel} />
        )}
      </div>
    </div>
  );
}

export default HotelDetails;
