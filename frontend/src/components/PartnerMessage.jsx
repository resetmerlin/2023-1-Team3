import React from "react";

const PartnerMessage = ({ message }) => {
  return (
    <div className="conversation__content__message__wrap ">
      <img
        className="conversation__content__profile"
        src="../default/default-men.png"
        alt="conversation-user-image"
      ></img>

      <p className="conversation__content__message" id="partner">
        {message}
      </p>
    </div>
  );
};

export default PartnerMessage;
