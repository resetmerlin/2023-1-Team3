import React from "react";
import { Link } from "react-router-dom";
const ProfileEditScreen = () => {
  return (
    <section className="profileEdit">
      <div className="profileEdit__top center">
        <Link to="/setting">
          <box-icon name="arrow-back" color="rgb(196, 196, 196)"></box-icon>
          <span>Setting</span>
        </Link>

        <span className="profileEdit__top__center center">프로필 설정</span>

        <Link to="/setting " className="profileEdit__top__checked">
          <box-icon
            name="check"
            color="rgb(196, 196, 196)"
            size="2.3rem"
          ></box-icon>
        </Link>
      </div>

      <label
        for="profile"
        className="profileEdit__content__profile__camera center"
      >
        <box-icon
          type="solid"
          name="camera"
          size="1.5rem"
          color="black"
        ></box-icon>
      </label>
      <input
        type="file"
        id="profile"
        name="profile"
        accept="image/png, image/jpeg"
      ></input>
      <div className="profileEdit__main">
        <div className="profileEdit__main__information">
          <div className="profileEdit__main__information__name">
            <box-icon
              type="solid"
              name="pencil"
              color="white"
              size="2rem"
              style={{ marginRight: ".6rem" }}
            ></box-icon>
            {/* <label htmlFor="profile-edit-information">Chole,24</label> */}
            <input
              type="text"
              id="profile-edit-information"
              placeholder="James linn"
            />
          </div>

          <div className="profileEdit__main__information__desc">
            <div className="profileEdit__main__information__desc__wrap">
              <box-icon
                type="solid"
                name="pencil"
                color="white"
                style={{ marginRight: ".4rem" }}
              ></box-icon>

              <input
                type="text"
                id="profile-edit-information"
                placeholder="DKU Computer-Science
              "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileEditScreen;
