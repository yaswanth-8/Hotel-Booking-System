import React, { useState } from "react";
import axios from "axios";

const EditHotelDetails = ({ hotel, fetchHotelData }) => {
  const [editedHotel, setEditedHotel] = useState(hotel);

  const handleEdit = () => {
    console.log(editedHotel);

    axios
      .put(
        `http://localhost:5225/api/hotels/${editedHotel.hotelID}`,
        editedHotel
      )
      .then((response) => {
        console.log("PUT request successful");
        fetchHotelData();
      })
      .catch((error) => {
        console.error("Error in PUT request:", error);
        // Handle the error or display an error message
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedHotel((prevHotel) => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  return (
    <div className="booking-container">
      <div className="form-group">
        <label className="form-label">Hotel Name:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={editedHotel.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">address:</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={editedHotel.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">location:</label>
        <input
          type="text"
          className="form-control"
          name="location"
          value={editedHotel.location}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Country:</label>
        <input
          type="text"
          className="form-control"
          name="country"
          value={editedHotel.country}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Rating:</label>
        <input
          type="number"
          className="form-control"
          name="rating"
          value={editedHotel.rating}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          name="description"
          value={editedHotel.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">About:</label>
        <textarea
          className="form-control"
          name="about"
          value={editedHotel.about}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price Per Night:</label>
        <input
          type="number"
          className="form-control"
          name="pricePerNight"
          value={editedHotel.pricePerNight}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Offer:</label>
        <input
          type="number"
          className="form-control"
          name="offer"
          value={editedHotel.offer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Site:</label>
        <input
          type="text"
          className="form-control"
          name="site"
          value={editedHotel.site}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Image 1:</label>
        <input
          type="string"
          className="form-control"
          name="url1"
          value={editedHotel.url1}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image 2:</label>
        <input
          type="string"
          className="form-control"
          name="url2"
          value={editedHotel.url2}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Image 3:</label>
        <input
          type="string"
          className="form-control"
          name="url3"
          value={editedHotel.url3}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Image 4:</label>
        <input
          type="string"
          className="form-control"
          name="url4"
          value={editedHotel.url4}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Image 5:</label>
        <input
          type="string"
          className="form-control"
          name="url5"
          value={editedHotel.url5}
          onChange={handleChange}
        />
      </div>

      <button className="book-button" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
};

export default EditHotelDetails;
