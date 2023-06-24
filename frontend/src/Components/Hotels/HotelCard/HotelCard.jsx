import React from "react";
import "./HotelCard.css";

const HotelCard = ({ Hotel }) => {
  return (
    <div className="hotel-card">
      <img className="hotel-image" src={Hotel.Url} alt={Hotel.Name} />
      <div className="hotel-details">
        <div className="hotel-title-wrapper">
          <h3 className="hotel-title">{Hotel.Name}</h3>
          <span className="star-rating">{Hotel.Rating} ⭐</span>
        </div>
        <p className="hotel-description">{Hotel.Description}</p>
        <p className="hotel-description">₹ {Hotel.PricePerNight} / night</p>
      </div>
    </div>
  );
};

export default HotelCard;
