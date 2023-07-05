import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedHotelID, setSelectedHotelID] = useState(null);
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
  const username = sessionStorage.getItem("userName");
  const email = sessionStorage.getItem("userEmail");
  const auth = sessionStorage.getItem("auth-user");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      if (auth !== "admin") {
        try {
          const id = sessionStorage.getItem("UserID");
          const response = await axios.get(
            `http://localhost:5225/api/profile?id=${id}`
          );
          setHotels(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      } else {
        try {
          const response = await axios.get(
            `http://localhost:5225/api/bookings`
          );
          setHotels(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      }
    };

    fetchHotels();
  }, [auth]);

  const handleCancel = (hotelId) => {
    setSelectedHotelID(hotelId);
    setIsModalOpen(true);
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
      .delete(`http://localhost:5225/api/bookings/${selectedHotelID}`)
      .then((response) => {
        // Handle successful response
        console.log("Booking cancelled successfully:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error("Error cancelling booking:", error);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2 className="profile-name">{username}</h2>
        <p className="profile-email">{email}</p>
      </div>
      <hr />
      {!hotels ? (
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
        <div className="profile-hotel-card" key={hotel.hotel.hotelID}>
          <div className="profile-hotel-image-container">
            <img
              className="profile-hotel-image"
              src={hotel.hotel.url1}
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
                <strong>Price:</strong> ${hotel.price}
              </p>
            </div>
            {auth !== "admin" ? (
              <div className="profile-bookings-button-group">
                <button
                  className="profile-cancel-button"
                  onClick={() => handleCancel(hotel.bookingID)}
                >
                  Cancel
                </button>
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
            <h5>Food Style : {selectedBooking.hotel.foodStyle}</h5>
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
    </div>
  );
};

export default Profile;
