import React, { useState } from "react";
import Modal from "../../UI/Modal";
import "./AddHotel.css";

const AddHotel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hotelDetails, setHotelDetails] = useState({
    HotelID: 1,
    Name: "",
    Address: "",
    Location: "",
    Country: "",
    Urls: [],
    FoodStyleID: "",
    Rating: 0,
    Description: "",
    About: "",
    PricePerNight: 0,
    Offer: 0,
    Site: "",
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
    setHotelDetails((prevDetails) => ({
      ...prevDetails,
      Urls: [...prevDetails.Urls],
    }));
  };

  const handleSubmit = () => {
    console.log(hotelDetails);
    // Perform further actions with the hotel data, such as sending it to an API or storing it in state
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
                name="Name"
                value={hotelDetails.Name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="Address"
                value={hotelDetails.Address}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="Location"
                value={hotelDetails.Location}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="Country"
                value={hotelDetails.Country}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Food Style ID:
              <input
                type="text"
                name="FoodStyleID"
                value={hotelDetails.FoodStyleID}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="Rating"
                value={hotelDetails.Rating}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="column-right">
            <label>
              Description:
              <textarea
                name="Description"
                value={hotelDetails.Description}
                onChange={handleInputChange}
              ></textarea>
            </label>
            <label>
              About:
              <textarea
                name="About"
                value={hotelDetails.About}
                onChange={handleInputChange}
              ></textarea>
            </label>
            <label>
              Price per Night:
              <input
                type="number"
                name="PricePerNight"
                value={hotelDetails.PricePerNight}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Offer (%):
              <input
                type="number"
                name="Offer"
                value={hotelDetails.Offer}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Site:
              <input
                type="text"
                name="Site"
                value={hotelDetails.Site}
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
              name={`Url${index}`}
              value={hotelDetails[`Url${index}`] || ""}
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
