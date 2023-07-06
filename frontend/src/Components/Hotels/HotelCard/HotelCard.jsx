import React from "react";
import "./HotelCard.css";

const HotelCard = ({ Hotel }) => {
  return (
    <div className="hotel-card">
      <img className="hotel-image" src={Hotel.url1} alt={Hotel.name} />
      <div className="hotel-details">
        <div className="hotel-title-wrapper">
          <h3 className="hotel-title">{Hotel.name}</h3>
          <span className="star-rating">{Hotel.rating} ⭐</span>
        </div>
        <p className="hotel-description">{Hotel.description}</p>
        <p className="hotel-price">₹ {Hotel.pricePerNight} / night</p>
      </div>
    </div>
  );
};

export default HotelCard;
