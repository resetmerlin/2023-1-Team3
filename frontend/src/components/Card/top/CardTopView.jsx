import React from "react";
import "./CardTop.scss";

const CardTopView = ({ imageSrc }) => {
  return (
    <div className="card__top">
      <img
        className="card__top__profile"
        decoding="async"
        fetchpriority="high"
        loading="lazy"
        src={imageSrc}
        key={imageSrc}
      />
    </div>
  );
};

export default CardTopView;
