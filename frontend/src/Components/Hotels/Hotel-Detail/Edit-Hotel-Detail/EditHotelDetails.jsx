import React, { useState } from "react";

const EditHotelDetails = ({ hotel }) => {
  const [editedHotel, setEditedHotel] = useState(hotel);

  const handleEdit = () => {
    // Perform actions with the editedHotel object
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
          name="Name"
          value={editedHotel.Name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Address:</label>
        <input
          type="text"
          className="form-control"
          name="Address"
          value={editedHotel.Address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Location:</label>
        <input
          type="text"
          className="form-control"
          name="Location"
          value={editedHotel.Location}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Country:</label>
        <input
          type="text"
          className="form-control"
          name="Country"
          value={editedHotel.Country}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Rating:</label>
        <input
          type="number"
          className="form-control"
          name="Rating"
          value={editedHotel.Rating}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          name="Description"
          value={editedHotel.Description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price Per Night:</label>
        <input
          type="number"
          className="form-control"
          name="PricePerNight"
          value={editedHotel.PricePerNight}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Offer:</label>
        <input
          type="number"
          className="form-control"
          name="Offer"
          value={editedHotel.Offer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Site:</label>
        <input
          type="text"
          className="form-control"
          name="Site"
          value={editedHotel.Site}
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
