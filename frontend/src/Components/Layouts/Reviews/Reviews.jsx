import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useSelector } from "react-redux";
import AddReview from "./AddReview/AddReview";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const hotelId = sessionStorage.getItem("HotelID");
  console.log(hotelId + " is hotelID for reviews");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5225/api/reviews/${hotelId}`
        );
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [hotelId]);

  const auth = useSelector((state) => state.auth.user);

  const handleLike = (id) => {
    // setReviews((prevReviews) =>
    //   prevReviews.map((review) =>
    //     review.id === id
    //       ? {
    //           ...review,
    //           likes: review.likes === 1 ? 0 : 1,
    //         }
    //       : review
    //   )
    // );
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Reviews</h2>
      <hr className="reviews-divider" />

      <div className="reviews-list">
        {reviews.map((review) => (
          <div className="review" key={review.reviewID}>
            <div className="review-header">
              <span className="reviewer">{review.user.name}</span>
              <span className="date">
                {new Date(review.reviewDate).toLocaleDateString("en-GB")}
                {sessionStorage.getItem("userEmail") === review.user.email ? (
                  <span>
                    {" "}
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#ff0000" }}
                    />
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="content">{review.content}</div>
            {auth !== "no-user" ? (
              <div className="review-actions">
                <button
                  className={`like-button ${review.likes === 1 ? "liked" : ""}`}
                  onClick={() => handleLike(review.id)}
                >
                  Like ({review.likes})
                </button>
              </div>
            ) : (
              ""
            )}
            <hr className="review-divider" />
          </div>
        ))}
      </div>
      {auth !== "no-user" ? (
        <AddReview setReviews={setReviews} reviews={reviews} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Reviews;
