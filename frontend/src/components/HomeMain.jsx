import React, { useEffect, useState } from "react";
import { BoxIconElement } from "boxicons";
import { saveUserAction } from "../actions/buttonAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// useEffect(() => {
//   window.addEventListener('popstate', ()=>));
//   return () => {
//     window.removeEventListener('popstate', handleUrlChange);
//   };
// }, []);
const HomeMain = ({ userDetail }) => {
  const dispatch = useDispatch();
  const user = userDetail.name;
  const [saveState, setSaveState] = useState(true);

  const saveButtonHandler = (e) => {
    setSaveState((current) => !current);
    console.log(saveState);
  };
  const params = {
    told: "bar",
    signal: "qux",
  };

  axios
    .get("https://example.com/api", { params })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
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
          <button className="home__main__button" type="button">
            <box-icon name="x" color="white" size="2rem"></box-icon>
          </button>
          <button
            value={saveState}
            type="button"
            className="home__main__button--save"
            onClick={saveButtonHandler}
          >
            <box-icon
              color="white"
              name="heart"
              size="2.3rem"
              type="solid"
            ></box-icon>
          </button>
          <button className="home__main__button" type="button">
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
