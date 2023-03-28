import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation().pathname;
  console.log(location);
  return (
    <>
      {location == "/message" ? (
        <div className="header">
          <h1>Message</h1>
        </div>
      ) : location == "/register" ? (
        <div
          className="header form-header"
          style={{
            color: "black",
            backgroundColor: "white",
            position: "static",
          }}
        >
          <span className="form-header__logo logo">VISTA</span>
        </div>
      ) : location == "/login" ? (
        <div
          className="header form-header"
          style={{
            color: "black",
            backgroundColor: "white",
            position: "static",
          }}
        >
          <span className="form-header__logo logo">VISTA</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
