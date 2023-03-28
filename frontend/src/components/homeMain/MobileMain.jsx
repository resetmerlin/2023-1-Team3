import React from "react";
import { BoxIconElement } from "boxicons";

const MobileMain = () => {
  return (
    <div className="home__main">
      <i className="bx bx-chevron-right home__main__img__slide"></i>
      <div className="home__main__information">
        <span className="home__main__information__name">Chloe, 24</span>
        <div className="home__main__information__desc">
          <div className="home__main__information__desc__wrap">
            <box-icon
              type="solid"
              name="graduation"
              color="white"
              style={{ marginRight: ".4rem" }}
            ></box-icon>
            DKU Computer-Science
          </div>
          <div className="home__main__information__desc__wrap">
            <box-icon
              type="solid"
              name="hand"
              color="white"
              style={{ marginRight: ".4rem" }}
            ></box-icon>
            6시 pc방 갈 사람?
          </div>
        </div>
        <div className="home__main__button__wrap">
          <button className="home__main__button">
            <box-icon name="x" color="white" size="2rem"></box-icon>
          </button>
          <button className="home__main__button--save">
            <box-icon
              color="rgb(213,65,65)"
              name="heart"
              size="2.5rem"
              type="solid"
            ></box-icon>
          </button>
          <button className="home__main__button">
            <box-icon
              color="white"
              name="message-rounded"
              size="2rem"
              type="solid"
            ></box-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMain;
