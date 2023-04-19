import React from "react";
import { Link } from "react-router-dom";
import { BoxIconElement } from "boxicons";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation().pathname;

  return (
    <>
      {location == "/register" ? (
        <></>
      ) : location == "/login" ? (
        <></>
      ) : (
        <div className="footer">
          <Link to="/" className="footer__link--home">
            {location == "/" ? (
              <box-icon
                name="home-alt-2"
                color="rgb(238, 240, 244)"
                size="2rem"
                type="solid"
              ></box-icon>
            ) : (
              <box-icon
                name="home-alt-2"
                color="rgb(141 145 157)"
                size="2rem"
              ></box-icon>
            )}
          </Link>
          <Link to="/message" className="footer__link--message">
            {location == "/message" ? (
              <box-icon
                color="rgb(238, 240, 244)"
                name="message-rounded"
                size="2rem"
                type="solid"
              ></box-icon>
            ) : (
              <box-icon
                color="rgb(141 145 157)"
                name="message-rounded"
                size="2rem"
              ></box-icon>
            )}
          </Link>
          <Link to="/save" className="footer__link--heart">
            {location == "/save" ? (
              <box-icon
                color="rgb(238, 240, 244)"
                name="heart"
                size="2rem"
                type="solid"
              ></box-icon>
            ) : (
              <box-icon
                color="rgb(141 145 157)"
                name="heart"
                size="2rem"
              ></box-icon>
            )}
          </Link>
          <Link to="/setting" className="footer__link--setting">
            {location == "/setting" ? (
              <box-icon
                color="rgb(238, 240, 244)"
                name="cog"
                size="2rem"
                type="solid"
              ></box-icon>
            ) : (
              <box-icon
                color="rgb(141 145 157)"
                name="cog"
                size="2rem"
              ></box-icon>
            )}
          </Link>
        </div>
      )}
    </>
  );
};

export default Footer;
