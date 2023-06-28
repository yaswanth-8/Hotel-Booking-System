import React, { useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewer: "John Doe",
      date: "June 1, 2023",
      content: "Great hotel with excellent service!",
      likes: 10,
      dislikes: 2,
    },
    // Add more dummy reviews here
  ]);

  const [newReview, setNewReview] = useState("");

  const handleInputChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    if (newReview.trim() !== "") {
      const newReviewObj = {
        id: reviews.length + 1,
        reviewer: "New Reviewer",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        content: newReview,
        likes: 0,
        dislikes: 0,
      };

      setReviews([...reviews, newReviewObj]);
      setNewReview("");

      console.log("New Review:", newReviewObj);
    }
  };

  const handleLike = (id) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === id) {
        return { ...review, likes: review.likes + 1 };
      }
      return review;
    });

    setReviews(updatedReviews);
  };

  const handleDislike = (id) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === id) {
        return { ...review, dislikes: review.dislikes + 1 };
      }
      return review;
    });

    setReviews(updatedReviews);
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Reviews</h2>
      <hr className="reviews-divider" />

      <div className="reviews-list">
        {reviews.map((review) => (
          <div className="review" key={review.id}>
            <div className="review-header">
              <span className="reviewer">{review.reviewer}</span>
              <span className="date">{review.date}</span>
            </div>
            <div className="content">{review.content}</div>
            <div className="review-actions">
              <button
                className="like-button"
                onClick={() => handleLike(review.id)}
              >
                Like ({review.likes})
              </button>
              <button
                className="dislike-button"
                onClick={() => handleDislike(review.id)}
              >
                Dislike ({review.dislikes})
              </button>
            </div>
            <hr className="review-divider" />
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default Reviews;
