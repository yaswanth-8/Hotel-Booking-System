// Static.jsx

import React from "react";
import "./Static.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faDoorOpen,
  faMountainSun,
  faPaw,
  faPersonShelter,
  faPersonSwimming,
  faTv,
  faVideo,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const Static = ({ site }) => {
  return (
    <div className="static-container">
      <h2>Self check-in</h2>
      <p>
        <span className="static-icon">
          <FontAwesomeIcon icon={faDoorOpen} style={{ color: "#000000" }} />
        </span>
        You can check in with the doorperson.
      </p>
      <p>
        <span className="static-icon">
          <FontAwesomeIcon
            icon={faCalendar}
            style={{ color: "#000000" }}
            size="lg"
          />
        </span>
        Free cancellation for 48 hours.
      </p>
      <hr />
      <div className="offerings">
        <h3>What this place offers</h3>
        <ul className="offerings-ul">
          <div>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon
                  icon={faMountainSun}
                  style={{ color: "#000000" }}
                />
              </span>
              {site}
            </li>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon
                  icon={faPersonShelter}
                  style={{ color: "#000000" }}
                  size="lg"
                />
              </span>
              24 x 7 service
            </li>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon icon={faWifi} style={{ color: "#000000" }} />
              </span>
              Wifi
            </li>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon
                  icon={faCar}
                  style={{ color: "#000000" }}
                  size="lg"
                />
              </span>
              Free parking on premises
            </li>
          </div>
          <div>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon
                  icon={faPersonSwimming}
                  style={{ color: "#000000" }}
                  size="lg"
                />
              </span>
              Private pool
            </li>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon
                  icon={faPaw}
                  style={{ color: "#000000" }}
                  size="lg"
                />
              </span>
              Pets allowed
            </li>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon icon={faTv} style={{ color: "#000000" }} />
              </span>
              18" HDTV with standard cable/satellite
            </li>
            <li>
              <span className="static-icon">
                <FontAwesomeIcon
                  icon={faVideo}
                  style={{ color: "#000000" }}
                  size="lg"
                />
              </span>
              Security cameras on property
            </li>
          </div>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Static;
