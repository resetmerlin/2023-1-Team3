import React from "react";
import "./CardTop.scss";
const CardTopView = ({ imageSrc }) => {
  return (
    <img
      className="card__top__profile"
      decoding="async"
      fetchpriority="high"
      src={imageSrc}
      key={imageSrc}
    />
  );
};

export default CardTopView;
