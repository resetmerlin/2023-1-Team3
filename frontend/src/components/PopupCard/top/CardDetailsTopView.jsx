import React from "react";
import "./CardDetailsTop.scss";
const CardDetailsTopView = ({ imageSrc }) => {
  return (
    <div className="card-details__top">
      <img
        className="card-details__profile"
        loading="lazy"
        src={imageSrc}
        key={imageSrc}
        alt="card-details-profile"
      />
    </div>
  );
};

export default CardDetailsTopView;
