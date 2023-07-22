import React from "react";
import { styled } from "styled-components";
import UserCard from "../../../components/Card/UserCard";

const HomeContentView = ({
  popupStyle,
  goNextSlideHandler,
  user,
  saveValue,
  startMessage,
  savAction,
  setUserChildCardPopup,
  age,
  imageSrc,
  getUserFromChild,
  peopleListLoading,
}) => {
  return (
    <HomeWrap style={popupStyle}>
      <HomeContentWrap style={popupStyle}>
        <UserCardProfile decoding="async" fetchpriority="high" src={imageSrc} />

        {peopleListLoading ? (
          <Loading />
        ) : (
          <HomeInfo>
            <UserCard
              goNextSlideHandler={goNextSlideHandler}
              userDetail={user}
              saveValue={saveValue}
              startMessage={startMessage}
              likeAction={savAction}
              setUserChildCardPopup={setUserChildCardPopup}
              age={age}
              getUserFromChild={getUserFromChild}
            />
          </HomeInfo>
        )}
      </HomeContentWrap>
    </HomeWrap>
  );
};
const UserCardProfile = styled.img`
  height: 77%;
  width: 100%;
  object-fit: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.5rem;
  background-repeat: none,
  background-size: cover,
  background-position: center,
  overflow: hidden;
  transition: all 0.2s ease;
  border-radius: 12px;
`;

const HomeWrap = styled.div`
  position: absolute;
  height: 96%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HomeContentWrap = styled.div`
  height: 100%;
  flex-direction: column;
  width: 85%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const HomeInfo = styled.div`
  height: 23%;
  width: 100%;

  display: flex;
  justify-content: center;
  background-color: white;
  transition: all 0.2s ease;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  align-items: center;
  box-shadow: -1px 7px 17px 5px rgb(236, 234, 247);
  -webkit-box-shadow: -1px 7px 17px 5px rgb(236, 234, 247);
  -moz-box-shadow: -1px 7px 17px 5px rgb(236, 234, 247);
`;

export default HomeContentView;
