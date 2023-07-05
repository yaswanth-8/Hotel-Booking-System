import React, { useEffect, useState } from "react";
import Auth from "../Auth/Auth";
import Hotels from "../Hotels/Hotels";
import { useSelector } from "react-redux";
import Loading from "../Layouts/Loading/Loading";

function Homescreen({ isAuthVisible }) {
  const auth = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  const isMobile = window.innerWidth <= 767; // Check if screen size is mobile

  return (
    <div className="welcomepage-container">
      {auth === "no-user" && isAuthVisible && (
        <div className="auth-container">
          <Auth />
        </div>
      )}
      <div className="hotels-container">
        {loading ? <Loading /> : <Hotels />}
      </div>
      {!isAuthVisible &&
        isMobile && ( // Conditionally display Hotels component only on mobile
          <div className="hotels-component-below">
            <Hotels />
          </div>
        )}
    </div>
  );
}

export default Homescreen;
