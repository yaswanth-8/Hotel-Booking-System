import React, { useState } from "react";
import Modal from "../../UI/Modal";
import "./Profile.css";

const Profile = () => {
  const hotels = [
    {
      HotelID: 6,
      Name: "Alpine Retreat",
      Address: "Mountain View Drive, Switzerland",
      Location: "Switzerland",
      Country: "Switzerland",
      Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
      FoodStyleID: "3",
      Rating: 4.9,
      Description: "Experience the beauty of the Swiss Alps",
      About:
        "Embark on a rejuvenating journey with your family and friends, away from the city into awe-inspiring naturescapes. Upon arriving at this villa, you will be swept away by the little bridge that traverses over a gentle stream, on a three-acre lush lawn. Spacious and welcoming with aesthetically pleasing interiors, all five bedrooms have ensuite bathrooms and are located on the ground level - a thoughtful plan to welcome our youngest and elderly guests.",
      PricePerNight: 8000,
      Offer: 25,
      Site: "Mountain",
      CheckInDate: "2023-07-01",
      CheckOutDate: "2023-07-05",
      Price: 24000,
    },
    {
      HotelID: 8,
      Name: "Coastal Paradise",
      Address: "Beachfront Road, Maldives",
      Location: "Maldives",
      Country: "Maldives",
      Url: "https://a0.muscache.com/im/pictures/90c0ab07-d7bd-42f9-b085-f1bca998b0fe.jpg?im_w=1440",
      FoodStyleID: "5",
      Rating: 4.7,
      Description: "Indulge in the ultimate beachfront experience",
      About:
        "Escape to a private beach paradise with crystal clear waters and white sandy beaches. Our luxurious resort offers world-class amenities and breathtaking ocean views. Relax, unwind, and create lasting memories in this tropical haven.",
      PricePerNight: 12000,
      Offer: 20,
      Site: "Beach",
      CheckInDate: "2023-07-15",
      CheckOutDate: "2023-07-20",
      Price: 48000,
    },
  ];

  const username = sessionStorage.getItem("userName");
  const email = sessionStorage.getItem("userEmail");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelID, setSelectedHotelID] = useState(null);

  const handleCancel = (hotelId) => {
    setSelectedHotelID(hotelId);
    setIsModalOpen(true);
  };

  const handleCancelConfirmation = () => {
    console.log("Cancelled hotel with ID:", selectedHotelID);
    setIsModalOpen(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2 className="profile-name">{username}</h2>
        <p className="profile-email">{email}</p>
      </div>
      {hotels.map((hotel) => (
        <div className="profile-hotel-card" key={hotel.HotelID}>
          <div className="profile-hotel-image-container">
            <img className="profile-hotel-image" src={hotel.Url} alt="Hotel" />
          </div>
          <div className="profile-hotel-details">
            <div className="profile-hotel-info">
              <h3 className="profile-hotel-name">{hotel.Name}</h3>
              <p className="profile-hotel-location">
                <strong>Location:</strong> {hotel.Location}, {hotel.Country}
              </p>
              <p className="profile-hotel-checkin">
                <strong>Check-in:</strong> {hotel.CheckInDate}
              </p>
              <p className="profile-hotel-checkout">
                <strong>Check-out:</strong> {hotel.CheckOutDate}
              </p>
              <p className="profile-hotel-price">
                <strong>Price:</strong> ${hotel.Price}
              </p>
            </div>
            <button
              className="profile-cancel-button"
              onClick={() => handleCancel(hotel.HotelID)}
            >
              Cancel
            </button>
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
    </div>
  );
};

export default Profile;
