import React from "react";
import { peopleListAction } from "../actions/peopleAction";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
const AlertCover = ({ endPageSignal }) => {
  const dispatch = useDispatch();

  return (
    <LastPageAlert>
      <button
        className="home__alert__btn"
        onClick={() => dispatch(peopleListAction())}
      >
        마지막 페이지입니다, 다시 보겠습니까? 클릭!
      </button>
    </LastPageAlert>
  );
};

const LastPageAlert = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
`;

export default AlertCover;
