import React, { useState } from "react";
import Modal from "../../UI/Modal";
import "./AddHotel.css";
import axios from "axios";

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
      .post("http://localhost:5225/api/Hotels", hotelDetails)
      .then((response) => {
        console.log("Hotel created:", response.data);
        // Perform any further actions or handle the response data as needed
      })
      .catch((error) => {
        console.error("Error creating hotel:", error);
        // Handle any errors that occurred during the request
      });
  };

  return (
    <div className="add-hotel-container">
      <form className="add-hotel-form">
        <div className="add-hotel-field-container">
          <div className="column-left">
            <label>
              Hotel Name:
              <input
                type="text"
                name="name"
                value={hotelDetails.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={hotelDetails.address}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={hotelDetails.location}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={hotelDetails.country}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Food Style ID:
              <input
                type="text"
                name="foodStyle"
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
          </div>
          <div className="column-right">
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
                value={hotelDetails.site}
                onChange={handleInputChange}
              />
            </label>
            <button
              type="button"
              className="add-image-button"
              onClick={handleAddImageUrl}
            >
              Add Images
            </button>
          </div>
        </div>
        <button type="button" className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
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
          <button
            type="button"
            className="modal-ok-button"
            onClick={handleImageUrlSubmit}
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddHotel;
