import React from "react";
import { useSelector } from "react-redux";
import "./HotelDetail.css";
import Booking from "../../Layouts/Booking/Booking";
import EditHotelDetails from "./Edit-Hotel-Detail/EditHotelDetails";

function HotelDetails() {
  const hotel = useSelector((state) => state.hotel);
  const auth = useSelector((state) => state.auth.user);

  if (!hotel) {
    return <div>Loading...</div>; // Render a loading state while the hotel data is being fetched
  }

  return (
    <div className="hotelDetails-details">
      <h2 className="hotelDetails-name">{hotel.Name}</h2>
      <div className="hotel-details-booking">
        <div className="hotel-details-data">
          <div className="image-grid">
            <div className="big-image">
              <img src={hotel.Url} alt={hotel.Name} />
            </div>
            <div className="small-images">
              {[...Array(4)].map((_, index) => (
                <img key={index} src={hotel.Url} alt={hotel.Name} />
              ))}
            </div>
          </div>

          <div className="hotelDetails">
            <p>{hotel.About}</p>
            <p>
              <strong>Address:</strong> {hotel.Address}
            </p>
            <p>
              <strong>Location:</strong> {hotel.Location}
            </p>
            <p>
              <strong>Country:</strong> {hotel.Country}
            </p>
            <p>
              <strong>Rating:</strong> {hotel.Rating}
            </p>
            <p>
              <strong>Description:</strong> {hotel.Description}
            </p>
            <p>
              <strong>Price Per Night:</strong> {hotel.PricePerNight}
            </p>
            <p>
              <strong>Offer:</strong> {hotel.Offer}% off
            </p>
            <p>
              <strong>Site:</strong> {hotel.Site}
            </p>
          </div>
        </div>

        {auth === "admin" ? (
          <EditHotelDetails hotel={hotel} />
        ) : (
          <Booking price={hotel.PricePerNight} offer={hotel.Offer} />
        )}
      </div>
    </div>
  );
}

export default HotelDetails;
