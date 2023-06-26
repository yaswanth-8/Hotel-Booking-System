/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Booking.css";

const Booking = ({ price, offer }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    calculateTotalPrice();
  }, [checkInDate, checkOutDate, numAdults, numChildren]);

  const calculateTotalPrice = () => {
    if (checkInDate && checkOutDate) {
      const numberOfDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      console.log("days " + numberOfDays);
      const basePrice = price * numberOfDays;
      console.log("baseprice " + basePrice);
      const discountedPrice = basePrice - (basePrice * offer) / 100;
      console.log("discountedprice " + discountedPrice);
      setTotalPrice(discountedPrice);
    }
  };

  const handleBook = () => {
    // Handle booking logic here
    // You can access the selected values using the state variables
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date > checkOutDate) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  return (
    <div className="booking-container">
      <div className="form-group">
        <label className="form-label">Check-in Date:</label>
        <DatePicker
          className="form-control"
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Check-out Date:</label>
        <DatePicker
          className="form-control"
          selected={checkOutDate}
          onChange={handleCheckOutDateChange}
          minDate={checkInDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Number of Adults:</label>
        <input
          type="number"
          className="form-control"
          value={numAdults}
          onChange={(e) => setNumAdults(parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Number of Children:</label>
        <input
          type="number"
          className="form-control"
          value={numChildren}
          onChange={(e) => setNumChildren(parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price:</label>{" "}
        {isNaN(totalPrice) ? "0" : totalPrice} {/* Add a fallback value */}
      </div>
      <button className="book-button" onClick={handleBook}>
        Book
      </button>
    </div>
  );
};

export default Booking;
