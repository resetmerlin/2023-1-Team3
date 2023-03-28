import React from "react";
import { useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation().pathname;
  console.log(location);
  return (
    <>
      {location == "/conversation" ? (
        <></>
      ) : (
        <div className="header">
          <h1>Message</h1>
        </div>
      )}
    </>
  );
};

export default Header;
