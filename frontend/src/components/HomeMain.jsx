import React, { useEffect } from "react";
import { BoxIconElement } from "boxicons";
import { saveUserAction } from "../actions/buttonAction";
import { useDispatch, useSelector } from "react-redux";
// useEffect(() => {
//   window.addEventListener('popstate', ()=>));
//   return () => {
//     window.removeEventListener('popstate', handleUrlChange);
//   };
// }, []);
const HomeMain = ({ userDetail }) => {
  const dispatch = useDispatch();
  const user = userDetail.name;

  const saveButtonHandler = (e) => {
    // dispatch(saveUserAction({
    //   user: userDetail.name,
    //   user
    // }))
  };

  return (
    <div className="home__main">
      <div className="home__main__information">
        <span className="home__main__information__name">
          {userDetail.name} {userDetail.age}
        </span>
        <div className="home__main__information__desc">
          <div className="home__main__information__desc__wrap">
            <box-icon
              type="solid"
              name="graduation"
              color="white"
              style={{ marginRight: ".4rem" }}
            ></box-icon>
            DKU {userDetail.major}
          </div>
        </div>
        <div className="home__main__button__wrap">
          <button className="home__main__button">
            <box-icon name="x" color="white" size="2rem"></box-icon>
          </button>
          <button
            className="home__main__button--save"
            onClick={(e) => saveButtonHandler(e.target.value)}
          >
            <box-icon
              color="white"
              name="heart"
              size="2.3rem"
              type="solid"
            ></box-icon>
          </button>
          <button className="home__main__button">
            <box-icon
              color="white"
              name="message-rounded"
              size="1.5rem"
              type="solid"
            ></box-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
