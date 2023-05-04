import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const SettingScreen = () => {
  return (
    <section className="setting">
      <div className="setting__content">
        <div className="setting__content__profile__wrap center flex-direction-col ">
          <img
            className="setting__content__profile__img"
            alt="setting-profile-image"
            src="/public/images/userImage/random4.jpg"
          ></img>
          <span className="setting__content__profile__name">James linn</span>
        </div>
        <div className="setting__content__row">
          <div className="setting__content__column__title center">
            <span>계정</span>
          </div>

          <div className="setting__content__column center">
            <Link to="/setting/profile" className="center">
              <box-icon
                type="solid"
                name="user-circle"
                color="white"
                size="2rem"
              ></box-icon>
              <span>프로필 설정</span>
            </Link>
          </div>

          <div className="setting__content__column__title center">
            <span>보안</span>
          </div>

          <div className="setting__content__column center">
            <Link to="/setting/security" className="center">
              <box-icon
                type="solid"
                name="key"
                color="white"
                size="2rem"
              ></box-icon>
              <span>계정 보안</span>
            </Link>
          </div>

          <div className="setting__content__column__title center">
            <span>Contact us</span>
          </div>

          <div className="setting__content__column center">
            <box-icon
              name="envelope"
              type="solid"
              color="white"
              size="2rem"
            ></box-icon>
            <span>공식 이메일</span>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default SettingScreen;
