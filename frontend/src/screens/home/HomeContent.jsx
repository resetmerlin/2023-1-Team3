import React, { useState } from "react";
import { styled } from "styled-components";
import Loading from "../../components/Loading";
import UserCard from "../../components/UserCard";
import UserCardImage from "../../components/UserCardImage";
const HomeContent = ({
  user,
  sendLikeUser,
  peopleListLoading,
  goNextSlideHandler,
}) => {
  const age =
    new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1;

  const [saveValue, setSaveValue] =
    useState(false); /** 좋아요 버튼 Handler 함수 */
  return (
    <HomeWrap>
      <HomeContentWrap>
        <UserCardImage user={user} />

        {peopleListLoading ? (
          <Loading />
        ) : (
          <HomeInfo>
            <UserCard
              goNextSlideHandler={goNextSlideHandler}
              userDetail={user}
              saveValue={saveValue}
              setSaveValue={setSaveValue}
              age={age}
              sendLikeUser={sendLikeUser}
            />
          </HomeInfo>
        )}
      </HomeContentWrap>
    </HomeWrap>
  );
};

export const HomeWrap = styled.div`
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
  box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
`;

export default HomeContent;
