/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Booking.css";
import axios from "axios";
import Modal from "../../UI/Modal";

const Booking = ({ hotel }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(hotel.pricePerNight);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal

  useEffect(() => {
    calculateTotalPrice();
  }, [checkInDate, checkOutDate, numAdults, numChildren]);

  const calculateTotalPrice = () => {
    if (checkInDate && checkOutDate) {
      const numberOfDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      console.log("days " + numberOfDays);
      const basePrice =
        hotel.pricePerNight * numberOfDays +
        numAdults * 2000 +
        numChildren * 1000;
      console.log("baseprice " + basePrice);
      const discountedPrice =
        Math.round((basePrice - (basePrice * hotel.offer) / 100) / 10) * 10;

      console.log("discountedprice " + discountedPrice);
      setTotalPrice(discountedPrice);
    }
  };

  const handleBook = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmBooking = () => {
    setIsModalOpen(false); // Close the modal

    const formattedCheckInDate = checkInDate.toISOString().split("T")[0];
    const formattedCheckOutDate = checkOutDate.toISOString().split("T")[0];

    const bookingData = {
      user: {
        userID: sessionStorage.getItem("UserID"),
      },
      hotel: {
        hotelID: hotel.hotelID,
      },
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      adultCount: numAdults,
      childrenCount: numChildren,
      price: totalPrice,
    };

    axios
      .post("http://localhost:5225/api/bookings", bookingData)
      .then((response) => {
        console.log("Booking created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
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
          minDate={
            checkInDate
              ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
              : new Date()
          }
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Number of Adults:</label>
        <input
          type="number"
          className="form-control"
          value={numAdults}
          min="1"
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
      <button
        className="book-button"
        onClick={handleBook}
        disabled={!checkInDate || !checkOutDate}
      >
        Book
      </button>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="modal-content">
          <h3>Confirm Booking</h3>
          <p>Are you sure you want to book?</p>
          <div className="modal-buttons">
            <button className="modal-confirm" onClick={handleConfirmBooking}>
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Booking;
