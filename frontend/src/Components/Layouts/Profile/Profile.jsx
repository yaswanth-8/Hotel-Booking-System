import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

const Profile = () => {
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [selectedHotelID, setSelectedHotelID] = useState(null);
  const [editedHotel, setEditedHotel] = useState("");
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [selectedBooking, setselectedBooking] = useState({
    bookingID: "0",
    user: {
      email: "example@gmail.com",
      name: "unknown",
      role: "unknown",
      userID: 0,
    },
    hotel: {
      country: "unknown",
      foodStyle: "unknown",
      name: "unknown",
      site: "unknown",
    },
  });
  const [resetPassword, setResetPassword] = useState({
    password: "",
    retypedPassword: "",
  });
  const username = sessionStorage.getItem("userName");
  const email = sessionStorage.getItem("userEmail");
  const auth = sessionStorage.getItem("auth-user");
  var key = 0;
  const navigate = useNavigate();
  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line
  }, [auth]);

  const fetchHotels = async () => {
    if (auth !== "admin") {
      try {
        const id = sessionStorage.getItem("UserID");
        const response = await axios.get(
          `${API_BASE_URL}/api/profile?id=${id}`
        );
        setHotels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    } else {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bookings`);
        setHotels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }
  };

  const openResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
    //console.log("inside reset password");
  };

  const resetPasswordHandler = () => {
    console.log("inside reset password");
    const requestBody = {
      userID: sessionStorage.getItem("UserID"),
      name: username,
      email: email,
      password: resetPassword.retypedPassword,
      role: "user",
    };

    axios
      .put(`${API_BASE_URL}/api/Users/${requestBody.userID}`, requestBody)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        setIsResetPasswordModalOpen(false);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  const handleCancel = (hotelId) => {
    setSelectedHotelID(hotelId);
    setIsModalOpen(true);
  };

  const handleCheckOut = (hotelId, hotel) => {
    setEditedHotel(hotel);
    setSelectedHotelID(hotelId);
    setIsCheckOutModalOpen(true);
  };

  const handleViewDetails = (hotel) => {
    setselectedBooking(hotel);
    setIsDetailsModalOpen(true);
    console.log(hotel);
  };

  const handleCancelConfirmation = () => {
    console.log("Cancelled hotel with ID:", selectedHotelID);
    setIsModalOpen(false);

    axios
      .delete(`${API_BASE_URL}/api/bookings/${selectedHotelID}`)
      .then((response) => {
        // Handle successful response
        console.log("Booking cancelled successfully:", response.data);
        fetchHotels();
      })
      .catch((error) => {
        // Handle error
        console.error("Error cancelling booking:", error);
      });
  };

  const handleCheckOutConfirmation = (selectedRating) => {
    const prevRating = editedHotel.rating;
    const userCount = editedHotel.ratedUserCount;
    const newCount = userCount + 1;
    const prev = editedHotel;
    const newHotel = {
      ...prev,
      rating: Math.round((selectedRating + prevRating * userCount) / newCount),
      ratedUserCount: newCount,
    };
    console.log(editedHotel);
    console.log(newHotel);
    axios
      .put(`${API_BASE_URL}/api/hotels/${editedHotel.hotelID}`, newHotel)
      .then((response) => {
        console.log("PUT request successful");

        setEditedHotel(newHotel);
      })
      .catch((error) => {
        console.error("Error in PUT request of profile section:", error);
        // Handle the error or display an error message
      });

    handleCancelConfirmation();
    setIsCheckOutModalOpen(false);
    console.log("Rating selected:", selectedRating);
  };

  const openHotel = (id) => {
    console.log("hotel id from profile to hotels " + id);
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2 className="profile-name">{username}</h2>
        {auth !== "admin" && <p className="profile-email">{email}</p>}
      </div>
      <hr />
      {hotels.length === 0 ? (
        <div className="empty-message">
          No Bookings
          <button
            className="profile-blue-button"
            onClick={() => {
              navigate(`/hotels`);
            }}
          >
            Check Hotels
          </button>
        </div>
      ) : (
        ""
      )}
      {hotels.map((hotel) => (
        <div className="profile-hotel-card" key={key++}>
          <div className="profile-hotel-image-container">
            <img
              className="profile-hotel-image"
              src={hotel.hotel.url1}
              onClick={() => openHotel(hotel.hotel.hotelID)}
              alt="Hotel"
            />
          </div>
          <div className="profile-hotel-details">
            <div className="profile-hotel-info">
              <h3 className="profile-hotel-name">{hotel.hotel.name}</h3>
              <p className="profile-hotel-location">
                <strong>Location:</strong> {hotel.hotel.location},{" "}
                {hotel.hotel.country}
              </p>
              <p className="profile-hotel-checkin">
                <strong>Check-in:</strong>{" "}
                {new Date(hotel.checkInDate).toLocaleDateString("en-GB")}
              </p>
              <p className="profile-hotel-checkin">
                <strong>Check-out:</strong>{" "}
                {new Date(hotel.checkOutDate).toLocaleDateString("en-GB")}
              </p>
              <p className="profile-hotel-price">
                <strong>Price:</strong> ₹ {hotel.price}
              </p>
            </div>
            {auth !== "admin" ? (
              <div className="profile-bookings-button-group">
                {new Date(hotel.checkInDate) <= new Date() ? (
                  <button
                    className="profile-cancel-button"
                    onClick={() => handleCheckOut(hotel.bookingID, hotel.hotel)}
                  >
                    Checkout
                  </button>
                ) : (
                  <button
                    className="profile-cancel-button"
                    onClick={() => handleCancel(hotel.bookingID)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            ) : (
              <div className="profile-bookings-button-group">
                <button
                  className="profile-cancel-button"
                  onClick={() => handleViewDetails(hotel)}
                >
                  Details
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-content">
          <h3>Are you sure you want to cancel the booking?</h3>
          <div className="modal-buttons">
            <button
              className="modal-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              No
            </button>
            <button
              className="modal-confirm"
              onClick={handleCancelConfirmation}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCheckOutModalOpen}
        onClose={() => setIsCheckOutModalOpen(false)}
      >
        <div className="modal-content">
          <h3>Thanks for visiting! Please rate your experience:</h3>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="growIt"
                onClick={() => handleCheckOutConfirmation(star)}
              >
                &nbsp;⭐&nbsp;
              </span>
            ))}
          </div>
          <div className="modal-buttons">
            <button
              className="modal-cancel"
              onClick={() => setIsCheckOutModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
      >
        <div className="modal-content">
          <h3>Reset Password</h3>
          <label>New Password:</label>
          <input
            type="text"
            autoComplete="off"
            value={resetPassword.password}
            onChange={(e) =>
              setResetPassword((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <label>Retype New Password:</label>
          <input
            type="text"
            autoComplete="off"
            value={resetPassword.retypedPassword}
            onChange={(e) =>
              setResetPassword((prev) => ({
                ...prev,
                retypedPassword: e.target.value,
              }))
            }
          />
          <div className="modal-buttons">
            <button
              className="modal-cancel"
              onClick={() => setIsResetPasswordModalOpen(false)}
            >
              No
            </button>
            <button
              className={
                resetPassword.password === resetPassword.retypedPassword
                  ? "modal-confirm"
                  : "modal-cancel"
              }
              onClick={resetPasswordHandler}
              disabled={
                resetPassword.password !== resetPassword.retypedPassword
              }
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      {selectedBooking.bookingID ? (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        >
          <div className="modal-content">
            <h5>Customer Name : {selectedBooking.user.name}</h5>
            <h5>Customer Email : {selectedBooking.user.email}</h5>
            <h5>Hotel Name : {selectedBooking.hotel.name}</h5>
            <h5>Hotel Country : {selectedBooking.hotel.country}</h5>
            <h5>Hotel Site : {selectedBooking.hotel.site}</h5>

            <div className="modal-buttons">
              <button
                className="modal-cancel"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      {auth !== "admin" ? (
        <button
          className="profile-blue-button"
          onClick={() => {
            navigate(`/raisequery`);
          }}
        >
          Raise-Query
        </button>
      ) : (
        ""
      )}
      <button className="profile-blue-button" onClick={openResetPasswordModal}>
        Reset Password
      </button>
    </div>
  );
};

export default Profile;
