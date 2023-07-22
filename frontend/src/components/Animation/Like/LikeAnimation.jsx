import React from "react";
import "./LikeAnimation.scss";

const LikeAnimation = () => {
  return <LikeAnimationView />;
};

const LikeAnimationView = () => {
  return (
    <div className="love-particle__wrap">
      <div className="love-particle__component love-particle-1">
        <box-icon
          className="heart-particle"
          type="solid"
          name="heart"
          color="rgb(128, 113, 252)"
        ></box-icon>
      </div>
      <div className="love-particle__component love-particle-2">
        <box-icon
          type="solid"
          className="heart-particle"
          name="heart"
          color="rgb(128, 113, 252)"
        ></box-icon>
      </div>
      <div className="love-particle__component love-particle-3">
        <box-icon
          type="solid"
          className="heart-particle"
          name="heart"
          color="rgb(128, 113, 252)"
        ></box-icon>
      </div>
      <div className="love-particle__component love-particle-4">
        <box-icon
          type="solid"
          className="heart-particle"
          name="heart"
          color="rgb(128, 113, 252)"
        ></box-icon>
      </div>
      <div className="love-particle__component love-particle-5">
        <box-icon
          type="solid"
          className="heart-particle"
          name="heart"
          color="rgb(128, 113, 252)"
        ></box-icon>
      </div>
      <div className="love-particle__component love-particle-6">
        <box-icon
          type="solid"
          className="heart-particle"
          name="heart"
          color="rgb(128, 113, 252)"
        ></box-icon>
      </div>
    </div>
  );
};
export default LikeAnimation;
