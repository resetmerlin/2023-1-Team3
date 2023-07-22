import React from "react";
import "./CardBottom.scss";

import {
  UserDeleteButton,
  UserLikeButton,
  UserMessageButton,
} from "../../Button";
export const CardBottomView = ({ infoProps, buttonProps }) => {
  return (
    <div className="card__bottom">
      <div className="card__bottom__wrap">
        <CardBottomInfo {...infoProps} />
        <CardBottomButtons {...buttonProps} />
      </div>
    </div>
  );
};

const CardBottomButtons = ({
  goNextSlideHandler,
  likeAction,
  saveValue,
  memberId,
  startMessage,
}) => {
  return (
    <div className="card__bottom__buttons ">
      <UserDeleteButton goNextSlideHandler={goNextSlideHandler} />
      <UserLikeButton
        likeAction={likeAction}
        saveValue={saveValue}
        memberId={memberId}
      />
      <UserMessageButton startMessage={startMessage} memberId={memberId} />
    </div>
  );
};

const CardBottomInfo = ({ memberId, setChecked, name, age, department }) => {
  return (
    <div className="card__bottom__info">
      <div className="card__bottom__info-main">
        <label htmlFor={memberId}>
          <input
            type="checkbox"
            onChange={setChecked}
            id={memberId}
            style={{ display: "none" }}
          />
          <span className="card__bottom__info-main__name">
            {name}
            <span className="card__bottom__info-main__age"> {age}</span>
          </span>
        </label>{" "}
      </div>

      <span className="card__bottom__info__department">{department}</span>
    </div>
  );
};
