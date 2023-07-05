import React, { useState } from "react";
import "./RaiseQuery.css";
import axios from "axios";
import Modal from "../../UI/Modal"; // Make sure to provide the correct path to the Modal component

const RaiseQuery = () => {
  const userId = sessionStorage.getItem("UserID");
  console.log(userId + " is the user ID");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryModel, setQueryModel] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = e.target[0].value;
    const query = e.target[1].value;
    const newQueryModel = {
      user: {
        userID: userId,
      },
      subject: subject,
      content: query,
      status: "pending",
    };
    setQueryModel(newQueryModel);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    // Perform the API call here or any other action needed after the user confirms
    axios
      .post("http://localhost:5225/api/queries", queryModel)
      .then((response) => {
        console.log("Query submitted successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error submitting query:", error);
      });

    // Close the modal after the submission is complete
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    // Close the modal if the user cancels
    setIsModalOpen(false);
  };

  return (
    <div className="component-spacing">
      <div className="raise-query">
        <h2>Raise Query</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="subject"
              placeholder="Enter the subject"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <textarea id="content" placeholder="Enter your query" rows={4} />
          </div>
          <button className="green-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h3>Are you sure you want to submit the query?</h3>
        <div className="modal-buttons">
          <button className="modal-cancel" onClick={handleModalClose}>
            Cancel
          </button>
          <button className="modal-confirm" onClick={handleModalConfirm}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RaiseQuery;
