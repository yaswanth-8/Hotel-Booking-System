import React, { useState } from "react";
import "./Notifications.css";
import Modal from "../../UI/Modal";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleDeny = (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
    setSelectedNotification(null);
  };

  const handleResolve = (notificationId) => {
    // Handle resolve logic for the given notification
    console.log(`Resolving notification ${notificationId}`);
  };

  const openModal = (notificationId) => {
    setSelectedNotification(notificationId);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          <div className="message">{notification.message}</div>
          <div className="buttons">
            <button onClick={() => openModal(notification.id)}>Deny</button>
            <button onClick={() => handleResolve(notification.id)}>
              Resolve
            </button>
          </div>
        </div>
      ))}

      <Modal isOpen={selectedNotification !== null} onClose={closeModal}>
        <p>Do you want to deny it?</p>
        <button
          className="modal-ok-button"
          onClick={() => handleDeny(selectedNotification)}
        >
          OK
        </button>
      </Modal>
    </div>
  );
};

export default Notifications;
