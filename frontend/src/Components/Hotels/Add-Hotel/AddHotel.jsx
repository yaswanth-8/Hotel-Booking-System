import React, { useState } from "react";
import Modal from "../../UI/Modal";
import "./AddHotel.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

const AddHotel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hotelDetails, setHotelDetails] = useState({
    name: "",
    address: "",
    location: "",
    country: "",
    foodStyle: "",
    rating: 0,
    description: "",
    about: "",
    pricePerNight: 0,
    offer: 0,
    site: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHotelDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddImageUrl = () => {
    setIsOpen(true);
  };

  const handleImageUrlSubmit = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    axios
      .post(`${API_BASE_URL}/api/Hotels`, hotelDetails)
      .then((response) => {
        console.log("Hotel created:", response.data);
        navigate("/hotels");
      })
      .catch((error) => {
        console.error("Error creating hotel:", error);
        // Handle any errors that occurred during the request
      });
  };

  return (
    <div className="add-hotel-container">
      <form className="addHotel-form">
        <div className="addHotel-field-container">
          <label>
            Hotel Name:
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={hotelDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              autoComplete="off"
              value={hotelDetails.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              autoComplete="off"
              value={hotelDetails.location}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              autoComplete="off"
              value={hotelDetails.country}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Food Style:
            <input
              type="text"
              name="foodStyle"
              autoComplete="off"
              value={hotelDetails.foodStyle}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={hotelDetails.rating}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={hotelDetails.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            About:
            <textarea
              name="about"
              value={hotelDetails.about}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Price per Night:
            <input
              type="number"
              name="pricePerNight"
              value={hotelDetails.pricePerNight}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Offer (%):
            <input
              type="number"
              name="offer"
              value={hotelDetails.offer}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Site:
            <input
              type="text"
              name="site"
              autoComplete="off"
              value={hotelDetails.site}
              onChange={handleInputChange}
            />
          </label>
          <button
            type="button"
            className="addHotel-button"
            onClick={handleAddImageUrl}
          >
            Add Images
          </button>
          <button
            type="button"
            className="addHotel-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal-content">
          <h3>Enter Image URLs</h3>
          {[1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              name={`url${index}`}
              value={hotelDetails[`url${index}`] || ""}
              onChange={handleInputChange}
              placeholder={`Image URL ${index}`}
            />
          ))}
          <div className="modal-buttons">
            <button
              type="button"
              className="modal-cancel"
              onClick={() => setIsOpen(false)}
            >
              cancel
            </button>
            <button
              type="button"
              className="modal-confirm"
              onClick={handleImageUrlSubmit}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddHotel;
