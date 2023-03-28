import React from "react";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <div>
      <div className="home__nav">
        <span className="home__top__logo">VISTA</span>
        <div className="home__nav__link-wrap">
          <Link to="/" className="home__bottom__link--home">
            <i className="bx bxs-home"></i>
            <span>홈</span>
          </Link>
          <Link to="/message" className="home__bottom__link--message">
            <i class="bx bx-message-rounded"></i>
            <span>메시지</span>
          </Link>
          <Link to="/save" className="home__bottom__link--heart">
            <i className="bx bx-heart"></i>
            <span>저장</span>
          </Link>
          <Link to="/setting" className="home__bottom__link--setting">
            <i className="bx bx-cog"></i>
            <span>설정</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
