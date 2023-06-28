import React from "react";
import "./ConversationContent.scss";

const ConversationContentView = () => {
  return (
    <div className="conversation__content">
      <div className="conversation__content__message__wrap ">
        <img
          className="conversation__content__profile"
          src="../default/default-men.png"
          alt="conversation-user-image"
        ></img>

        <p className="conversation__content__message" id="partner"></p>
      </div>
      <div
        className="conversation__content__message__wrap "
        id="client-justify"
      >
        <p className="conversation__content__message" id="client">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          blanditiis doloribus temporibus laudantium. Aut tempore perferendis
          quasi facere porro blanditiis enim illum odio, quod ea ducimus,
          accusantium quisquam? Veniam, iste?
        </p>
      </div>

      <div className="conversation__content__message__wrap time">
        <p>9pm</p>
      </div>

      <div className="conversation__content__message__wrap">
        <img
          className="conversation__content__profile"
          src="../default/default-men.png"
          alt="conversation-user-image"
        ></img>
        <p className="conversation__content__message" id="partner">
          tf?
        </p>
      </div>
      <div className="conversation__content__message__wrap">
        <img
          className="conversation__content__profile"
          src="../default/default-men.png"
          alt="conversation-user-image"
        ></img>
        <p className="conversation__content__message" id="partner">
          u good bro?
        </p>
      </div>

      <div
        className="conversation__content__message__wrap "
        id="client-justify"
      >
        <p className="conversation__content__message" id="client">
          ofc
        </p>
      </div>
      <div
        className="conversation__content__message__wrap "
        id="client-justify"
      >
        <p className="conversation__content__message" id="client">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          blanditiis doloribus temporibus laudantium. Aut tempore perferendis
          quasi facere porro blanditiis enim illum odio, quod ea ducimus,
          accusantium quisquam? Veniam, iste?
        </p>
      </div>
      <div
        className="conversation__content__message__wrap "
        id="client-justify"
      >
        <p className="conversation__content__message" id="client">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          blanditiis doloribus temporibus laudantium. Aut tempore perferendis
          quasi facere porro blanditiis enim illum odio, quod ea ducimus,
          accusantium quisquam? Veniam, iste?
        </p>
      </div>
    </div>
  );
};

export default ConversationContentView;
