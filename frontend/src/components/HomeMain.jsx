import React, { useEffect, useState, useRef } from "react";
import { saveUserAction } from "../actions/buttonAction";
import { useDispatch, useSelector } from "react-redux";

const HomeMain = ({ userDetail }) => {
  const dispatch = useDispatch();
  /** 유저 이름 */
  const user = userDetail.name;

  /** 유저 생일년도 및 나이*/
  const birth = userDetail.birth;
  const age = new Date().getFullYear() - new Date(birth).getFullYear() + 1;

  /** 유저 성별 */
  const gender = userDetail.gender;

  /** 유저 식별값 */
  const memberId = userDetail.memberId;

  /** 좋아요 버튼 클릭 state */
  const [saveState, setSaveState] = useState("");

  /** saveInfo안에 saveUserAction후의 상태 값 존재 */
  const saveInfo = useSelector((state) => state.saveInfo);

  const { loading: saveLoading, error: saveError, saveStatus } = saveInfo;

  /** 좋아요 ref */

  const saveValue = useRef(false);
  /** 좋아요 버튼 Handler 함수 */
  const saveButtonHandler = () => {
    saveValue.current = !saveValue.current;

    console.log(saveValue.current);

    /** Action trigger => API 호출 */
    dispatch(saveUserAction(memberId, saveValue.current));
  };

  return (
    <div className="home__main">
      <div className="home__main__information">
        <span className="home__main__information__name">
          {user} {age}
        </span>
        <div className="home__main__information__desc">
          <div className="home__main__information__desc__wrap">
            <box-icon
              type="solid"
              name="graduation"
              color="white"
              style={{ marginRight: ".4rem" }}
            ></box-icon>
            DKU Communication
          </div>
        </div>

        <div className="home__main__information__desc">
          <div className="home__main__information__desc__wrap">{gender}</div>
        </div>
        <div className="home__main__button__wrap">
          <button className="home__main__button" type="button">
            <box-icon name="x" color="white" size="2rem"></box-icon>
          </button>

          <button
            type="submit"
            className="home__main__button--save"
            onClick={saveButtonHandler}
            value={saveValue.current}
          >
            {saveValue.current == true ? (
              <box-icon
                color="red"
                name="heart"
                size="2.3rem"
                type="solid"
              ></box-icon>
            ) : (
              <box-icon
                color="white"
                name="heart"
                size="2.3rem"
                type="solid"
              ></box-icon>
            )}
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
