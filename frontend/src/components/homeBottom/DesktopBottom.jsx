import React from "react";

const DesktopBottom = () => {
  return (
    <div className="home__button">
      <div className="home__main__button">
        <button className="home__main__button--save">
          <i className="bx bxs-heart"></i>
        </button>
        <button className="home__main__button--message">
          <i className="bx bx-message-rounded"></i>
        </button>
      </div>
      <div className="home__bottom__information">
        <span className="home__bottom__information__name">Chloe, 24</span>
        <div className="home__bottom__information__desc">
          <div className="home__bottom__information__desc__wrap">
            Neuroscience Specialist at Intra-Cellular
          </div>
          <div className="home__bottom__information__desc__wrap">
            Dankook University
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopBottom;
