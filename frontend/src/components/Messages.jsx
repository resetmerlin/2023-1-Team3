import React from "react";
import { Link } from "react-router-dom";
const Messages = () => {
  return (
    <div className="message__row">
      <div className="message__column">
        <div className="message__profile">
          <img
            src="./public/images/userImage/user-1.jpg"
            alt="message-profile"
          />
        </div>
        <div className="message__desc">
          <Link to="/conversation">
            {" "}
            <span className="message__desc__name">Jordyn Dokidos</span>
            <span className="message__desc__conversation">Hi!</span>
          </Link>
        </div>
        <div className="message__notification">
          <span className="message__notification__time">8:12pm</span>
          <div className="message__notification__notify">1</div>
        </div>{" "}
      </div>
      <div className="message__column">
        <div className="message__profile">
          <img
            src="./public/images/userImage/radom2.jpeg"
            alt="message-profile"
          />
        </div>
        <div className="message__desc">
          <Link to="/conversation">
            <span className="message__desc__name">Michael roscsa</span>
            <span className="message__desc__conversation">
              단대 긱사 앞 벚꽃 봄?
            </span>
          </Link>
        </div>
        <div className="message__notification">
          <span className="message__notification__time">8:12pm</span>
          <div className="message__notification__notify">6</div>
        </div>{" "}
      </div>
      <div className="message__column">
        <div className="message__profile">
          <img
            src="./public/images/userImage/random4.jpg"
            alt="message-profile"
          />
        </div>
        <div className="message__desc">
          <span className="message__desc__name">James linn</span>
          <span className="message__desc__conversation"></span>
        </div>
        <div className="message__notification">
          <span className="message__notification__time">8:12pm</span>
          <div className="message__notification__notify">13</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
