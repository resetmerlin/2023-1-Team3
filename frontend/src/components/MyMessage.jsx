import React from "react";

const MyMessage = ({ message }) => {
  return (
    <div className="conversation__content__message__wrap " id="client-justify">
      <p className="conversation__content__message" id="client">
        {message}
      </p>
    </div>
  );
};

export default MyMessage;
