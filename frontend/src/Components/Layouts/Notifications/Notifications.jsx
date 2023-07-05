import React, { useEffect, useState } from "react";
import "./Notifications.css";
import Modal from "../../UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [myNotificationsCount, setMyNotificationsCount] = useState(null); // Initialize myNotificationsCount with 0

  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5225/api/queries");
      setNotifications(response.data);
      const myNotifications = response.data.filter(
        (notification) =>
          notification.user.userID.toString().trim() ===
          sessionStorage.getItem("UserID").trim()
      );
      const Count = myNotifications.length;
      setMyNotificationsCount(Count);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  const handleDeny = async (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.queryID !== notificationId
    );
    setNotifications(updatedNotifications);
    setSelectedNotification(null);

    const selectedNotification = notifications.find(
      (notification) => notification.queryID === notificationId
    );

    if (!selectedNotification) {
      console.error("Notification not found");
      return;
    }

    selectedNotification.status = "denied";

    try {
      await axios.put(
        `http://localhost:5225/api/Queries/${notificationId}`,
        selectedNotification
      );
      console.log("Notification status updated successfully");
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
    fetchNotifications();
  };

  const handleResolve = async (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.queryID !== notificationId
    );
    setNotifications(updatedNotifications);
    setSelectedNotification(null);

    const selectedNotification = notifications.find(
      (notification) => notification.queryID === notificationId
    );

    if (!selectedNotification) {
      console.error("Notification not found");
      return;
    }

    selectedNotification.status = "resolved";

    try {
      await axios.put(
        `http://localhost:5225/api/Queries/${notificationId}`,
        selectedNotification
      );
      console.log(`Notification ${notificationId} resolved successfully`);
    } catch (error) {
      console.error("Error resolving notification:", error);
    }
    fetchNotifications();
  };

  const openDenyModal = (notificationId) => {
    setSelectedNotification(notificationId);
    setShowDenyModal(true);
  };

  const openResolveModal = (notificationId) => {
    setSelectedNotification(notificationId);
    setShowResolveModal(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setShowDenyModal(false);
    setShowResolveModal(false);
  };

  const showMessageHandler = (content) => {
    setSelectedMessage(content);
  };

  const hideMessageHandler = () => {
    setSelectedMessage("");
  };

  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <div key={notification.queryID}>
          {auth === "admin" ||
          notification.user.userID.toString().trim() ===
            sessionStorage.getItem("UserID").trim() ? (
            <div className="notification">
              <div className="message">
                <span className="notification-subject">
                  {notification.subject} ➡ 📅{" "}
                  {new Date(notification.queryDate).toLocaleDateString("en-GB")}
                </span>
                {selectedMessage === notification.content && (
                  <div className="tab-space">
                    <p>{notification.content}</p>
                    {auth === "admin" ? (
                      <span className="notification-user">
                        - {notification.user.name}{" "}
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>

              <div className="notification-corner-right">
                {notification.status === "resolved" ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "#00d60e" }}
                      size="lg"
                    />
                  </span>
                ) : (
                  ""
                )}
                {notification.status === "denied" ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{ color: "#db0000" }}
                      size="lg"
                    />
                  </span>
                ) : (
                  ""
                )}
                {notification.status === "pending" ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ color: "#e2bd03" }}
                      size="lg"
                    />
                  </span>
                ) : (
                  ""
                )}
                {auth === "admin" && notification.status === "pending" ? (
                  <span>
                    <button onClick={() => openDenyModal(notification.queryID)}>
                      Deny
                    </button>
                    <button
                      onClick={() => openResolveModal(notification.queryID)}
                    >
                      Resolve
                    </button>
                  </span>
                ) : (
                  ""
                )}
                {selectedMessage === notification.content ? (
                  <button onClick={hideMessageHandler}>
                    <FontAwesomeIcon icon={faAngleUp} />
                  </button>
                ) : (
                  <button
                    onClick={() => showMessageHandler(notification.content)}
                  >
                    <FontAwesomeIcon icon={faAngleDown} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}

      <div>
        {myNotificationsCount !== null &&
        myNotificationsCount === 0 &&
        auth !== "admin" ? (
          <div className="empty-message">Empty</div>
        ) : (
          ""
        )}
      </div>

      <Modal isOpen={showDenyModal} onClose={closeModal}>
        <p>😮 Do you want to deny it?</p>
        <button
          className="modal-cancel"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
        <button
          className="modal-confirm"
          onClick={() => {
            handleDeny(selectedNotification);
            closeModal();
          }}
        >
          OK
        </button>
      </Modal>

      <Modal isOpen={showResolveModal} onClose={closeModal}>
        <p>Do you want to resolve it?</p>
        <button
          className="modal-ok-button"
          onClick={() => {
            handleResolve(selectedNotification);
            closeModal();
          }}
        >
          OK
        </button>
      </Modal>
    </div>
  );
};

export default Notifications;
