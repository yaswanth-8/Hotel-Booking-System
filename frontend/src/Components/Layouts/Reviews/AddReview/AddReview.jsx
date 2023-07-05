import React, { useState } from "react";
import axios from "axios";

const AddReview = ({ fetchData }) => {
  const [newReview, setNewReview] = useState("");
  const hotelId = sessionStorage.getItem("HotelID");

  const handleInputChange = (event) => {
    setNewReview(event.target.value);
  };
  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (newReview.trim() !== "") {
      const newReviewObj = {
        user: {
          userID: sessionStorage.getItem("UserID"),
        },
        hotel: {
          hotelID: hotelId,
        },
        content: newReview,
        likes: 0,
      };

      try {
        const response = await axios.post(
          "http://localhost:5225/api/reviews",
          newReviewObj
        );
        console.log("Review submitted:", response.data);
        setNewReview("");
        fetchData();
      } catch (error) {
        console.log("Error submitting review:", error);
      }
    }
  };

  return (
    <div className="new-review-container">
      <div className="new-review-box">
        <h3 className="new-review-heading">Write a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            className="review-input"
            placeholder="Write your review here"
            value={newReview}
            onChange={handleInputChange}
          />
          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
