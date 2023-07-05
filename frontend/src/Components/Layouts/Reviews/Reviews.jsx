import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useSelector } from "react-redux";
import AddReview from "./AddReview/AddReview";
import axios from "axios";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [userLikesData, setUserLikesData] = useState([]);
  const hotelId = sessionStorage.getItem("HotelID");
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId, auth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5225/api/reviews/${hotelId}`
      );
      setReviews(response.data);
      console.log(response.data);

      // Send additional GET request for likes
      if (auth !== "no-user") {
        const userID = sessionStorage.getItem("UserID");
        const likesResponse = await axios.get(
          `http://localhost:5225/api/getlikes?userId=${userID}`
        );
        console.log(likesResponse.data);
        setUserLikesData(likesResponse.data);
      }
      // Handle the likes data as needed
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = (reviewID, isLiked) => {
    const userID = sessionStorage.getItem("UserID");

    if (isLiked) {
      // Send DELETE request to remove the like
      const like = userLikesData.find(
        (like) => like.review.reviewID === reviewID
      );
      if (like) {
        axios
          .delete(`http://localhost:5225/api/likes/${like.likeID}`)
          .then((response) => {
            // Handle success response
            console.log("Like removed successfully:", response.data);
            fetchData();

            // Perform any necessary updates or re-fetch data
          })
          .catch((error) => {
            // Handle error response
            console.log("Error removing like:", error);
          });
      }
    } else {
      // Send POST request to add the like
      const likeModel = {
        review: {
          reviewID: reviewID,
        },
        user: {
          userID: userID,
        },
      };
      axios
        .post("http://localhost:5225/api/likes", likeModel)
        .then((response) => {
          // Handle success response
          console.log("Like added successfully:", response.data);
          fetchData();

          // Perform any necessary updates or re-fetch data
        })
        .catch((error) => {
          // Handle error response
          console.log("Error adding like:", error);
        });
    }
  };

  const removeReviewHandler = (reviewID) => {
    console.log("remove review handler", reviewID);
    axios
      .delete(`http://localhost:5225/api/reviews/${reviewID}`)
      .then((response) => {
        console.log("Review deleted successfully:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.log("Error deleting review:", error);
      });
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Reviews</h2>
      <hr className="reviews-divider" />

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div className="review" key={review.reviewID}>
              <div className="review-header">
                <span className="reviewer">{review.user.name}</span>
                <span className="date">
                  {new Date(review.reviewDate).toLocaleDateString("en-GB")}
                  {sessionStorage.getItem("userEmail") === review.user.email ||
                  auth === "admin" ? (
                    <span>
                      {" "}
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <FontAwesomeIcon
                        onClick={() => removeReviewHandler(review.reviewID)}
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
                  {userLikesData.some(
                    (like) => like.review.reviewID === review.reviewID
                  ) ? (
                    <button
                      className="like-button liked"
                      onClick={() => handleLike(review.reviewID, true)}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} size="lg" /> (
                      {review.likes})
                    </button>
                  ) : (
                    <button
                      className="like-button"
                      onClick={() => handleLike(review.reviewID, false)}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} size="lg" /> (
                      {review.likes})
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faThumbsUp} size="lg" /> (
                  {review.likes})
                </div>
              )}
              <hr className="review-divider" />
            </div>
          ))
        ) : (
          <div className="empty-message">No reviews present 😕</div>
        )}
      </div>

      {auth !== "no-user" ? (
        <AddReview
          setReviews={setReviews}
          reviews={reviews}
          fetchData={fetchData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Reviews;
