import React from "react";
import { Link } from "react-router-dom";
import { BoxIconElement } from "boxicons";

const MobileBottom = () => {
  return (
    <div className="home__bottom">
      <Link to="/" className="home__bottom__link--home">
        <box-icon
          name="home-alt-2"
          color="rgb(238, 240, 244)"
          size="2rem"
          type="solid"
        ></box-icon>
      </Link>
      <Link to="/message" className="home__bottom__link--message">
        <box-icon
          color="rgb(141 145 157)"
          name="message-rounded"
          size="2rem"
        ></box-icon>
      </Link>
      <Link to="/save" className="home__bottom__link--heart">
        <box-icon color="rgb(141 145 157)" name="heart" size="2rem"></box-icon>{" "}
      </Link>
      <Link to="/setting" className="home__bottom__link--setting">
        <box-icon color="rgb(141 145 157)" name="cog" size="2rem"></box-icon>{" "}
      </Link>
    </div>
  );
};

export default MobileBottom;
