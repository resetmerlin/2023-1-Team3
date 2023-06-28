import React from "react";
import { Link } from "react-router-dom";

const ConversationScreen = () => {
  return (
    <section className="conversation">
      <div className="conversation__header">
        <div className="conversation__header__back">
          <Link to="/message">
            <box-icon name="arrow-back" size="2rem" color="white"></box-icon>
          </Link>
        </div>
        <div className="conversation__header__information__wrap">
          <img
            src="./public/images/userImage/random4.jpg"
            alt="conversation-user-image"
            className="conversation__header__user-image"
          />
          <div className="conversation__header__information">
            <span className="conversation__header__information__name">
              James linn
            </span>
          </div>
        </div>
      </div>
      <div className="conversation__content">
        <div
          className="conversation__content__message__wrap "
          id="client-justify"
        >
          <img
            className="conversation__content__profile"
            src="./public/images/userImage/random4.jpg"
            alt="conversation-user-image"
          ></img>

          <p className="conversation__content__message" id="partner">
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
          <img
            className="conversation__content__profile"
            src="./public/images/userImage/random4.jpg"
            alt="conversation-user-image"
          ></img>
        </div>

        <div className="conversation__content__message__wrap time">
          <p>9pm</p>
        </div>

        <div className="conversation__content__message__wrap">
          <img
            className="conversation__content__profile"
            src="./public/images/userImage/random4.jpg"
            alt="conversation-user-image"
          ></img>
          <p className="conversation__content__message" id="partner">
            tf?
          </p>
        </div>
        <div className="conversation__content__message__wrap">
          <img
            className="conversation__content__profile"
            src="./public/images/userImage/random4.jpg"
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
          <img
            className="conversation__content__profile"
            src="./public/images/userImage/random4.jpg"
            alt="conversation-user-image"
          ></img>
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
          <img
            className="conversation__content__profile"
            src="./public/images/userImage/random4.jpg"
            alt="conversation-user-image"
          ></img>
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
          <img
            className="conversation__content__profile"
            src="./public/images/userImage/random4.jpg"
            alt="conversation-user-image"
          ></img>
        </div>
      </div>
      <div className="conversation__bottom">
        <div className="conversation__bottom__keyboard-input">
          <input type="text" className="blinking-cursor" autofocus />

          <button className="conversation__bottom__message-send">
            <box-icon
              type="solid"
              name="paper-plane"
              size="1.6rem"
              color="white"
            ></box-icon>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConversationScreen;
