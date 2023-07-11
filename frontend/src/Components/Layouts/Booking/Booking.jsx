/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Booking.css";
import axios from "axios";
import Modal from "../../UI/Modal";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { API_BASE_URL } from "../../../config";

const Booking = ({ hotel }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(hotel.pricePerNight);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [dateErrorMessage, setDateErrorMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const numberOfDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const basePrice =
        hotel.pricePerNight * numberOfDays +
        numAdults * 2000 +
        numChildren * 1000;
      const discountedPrice =
        Math.round((basePrice - (basePrice * hotel.offer) / 100) / 10) * 10;

      setTotalPrice(discountedPrice);
    }
  }, [
    checkInDate,
    checkOutDate,
    numAdults,
    numChildren,
    hotel.offer,
    hotel.pricePerNight,
  ]);

  const handleBook = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmBooking = () => {
    setIsModalOpen(false); // Close the modal

    const CheckIn = new Date(checkInDate);
    CheckIn.setDate(CheckIn.getDate() + 1);
    const formattedCheckInDate = CheckIn.toISOString().split("T")[0];

    const CheckOut = new Date(checkOutDate);
    CheckOut.setDate(CheckOut.getDate() + 1);
    const formattedCheckOutDate = CheckOut.toISOString().split("T")[0];

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

    const bookingNotification = {
      user: {
        userID: sessionStorage.getItem("UserID"),
      },
      subject: hotel.name,
      content: `Booking done Successfully for Hotel - ${hotel.name} `,
      status: "booking",
    };
    window.location.href = "https://buy.stripe.com/test_14kfZmc8IaX11j25km";

    axios
      .post(`${API_BASE_URL}/api/bookings`, bookingData)
      .then((response) => {
        console.log("Booking created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });

    axios
      .post(`${API_BASE_URL}/api/queries`, bookingNotification)
      .then((response) => {
        console.log("Query submitted successfully:", response.data);
        navigate("/hotels");
      })
      .catch((error) => {
        console.log("Error submitting query:", error);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleCheckInDateChange = (date) => {
    setDateErrorMessage(false);
    setCheckOutDate(null);
    setCheckInDate(date);
    if (checkOutDate && date > checkOutDate) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    const CheckIn = new Date(checkInDate);
    CheckIn.setDate(CheckIn.getDate() + 1);
    const formattedCheckInDate = CheckIn.toISOString().split("T")[0];

    const CheckOut = new Date(date);
    CheckOut.setDate(CheckOut.getDate() + 1);
    const formattedCheckOutDate = CheckOut.toISOString().split("T")[0];
    const dateModel = {
      user: {
        userID: sessionStorage.getItem("UserID"),
      },
      hotel: {
        hotelID: hotel.hotelID,
      },
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
    };

    axios
      .post(`${API_BASE_URL}/api/checkdate`, dateModel)
      .then((response) => {
        console.log(response);
        if (response.data === "filled") {
          console.log("Inside filled");
          setCheckInDate(null);
          setCheckOutDate(null);
          setDateErrorMessage(true);
        }
      })
      .catch((error) => {
        console.log("Error submitting query:", error);
      });
  };

  const handleAdultsChange = (x) => {
    setNumAdults(x);
  };

  const handleChildrenChange = (x) => {
    setNumChildren(x);
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
          value={checkInDate}
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
          value={checkOutDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      {dateErrorMessage && (
        <p className="small-error-message">
          Selected dates are not available 😕
        </p>
      )}
      <div className="slider-container">
        <div className="form-group">
          <label className="form-label">Number of Adults:</label>
          <div className="slider-label">{numAdults}</div>{" "}
          {/* Display current number */}
          <Slider
            value={numAdults}
            min={1}
            max={12}
            step={1}
            onChange={handleAdultsChange}
            marks={{
              1: "1",
              12: "12",
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Number of Children:</label>
          <div className="slider-label">{numChildren}</div>{" "}
          {/* Display current number */}
          <Slider
            value={numChildren}
            min={0}
            max={10}
            step={1}
            onChange={handleChildrenChange}
            marks={{
              0: "0",
              10: "10",
            }}
          />
        </div>
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
        {isLoggedIn ? (
          <div className="modal-content">
            <h3>Confirm Booking</h3>
            <p>Are you sure you want to book?</p>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="modal-confirm" onClick={handleConfirmBooking}>
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-content">
            <h1>😕</h1>
            <p>Please SignIn to continue Booking</p>
            <div className="modal-buttons">
              <button
                className="modal-confirm"
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Booking;
