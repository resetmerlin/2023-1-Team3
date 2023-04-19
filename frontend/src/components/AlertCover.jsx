import React from "react";
import { peopleListAction } from "../actions/peopleAction";
import { useDispatch, useSelector } from "react-redux";

const AlertCover = ({ endPageSignal }) => {
  const dispatch = useDispatch();

  return (
    <div className="home__alert">
      <button
        className="home__alert__btn"
        onClick={() => dispatch(peopleListAction())}
      >
        마지막 페이지입니다, 다시 보겠습니까? 클릭!
      </button>
    </div>
  );
};

export default AlertCover;
