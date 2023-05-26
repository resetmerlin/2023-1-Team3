import React, { useState, useCallback } from "react";
import { styled } from "styled-components";
import { BoxIconElement } from "boxicons";

const HomeMain = ({
  userDetail,
  dispatch,
  saveUserAction,
  getPreviousUserHandler,
}) => {
  const age =
    new Date().getFullYear() - new Date(userDetail?.birth).getFullYear() + 1;

  const [saveValue, setSaveValue] =
    useState(false); /** 좋아요 버튼 Handler 함수 */

  return (
    <UserInfoWrap>
      <UserInfoContent>
        <UserInfoNameWrap>
          <UserInfoName>
            {userDetail.name}
            <UserInfoAge> {age}</UserInfoAge>
          </UserInfoName>{" "}
          <box-icon
            name="dots-horizontal-rounded"
            color="black"
            size="2.3rem"
          ></box-icon>
        </UserInfoNameWrap>

        <UserInfoDesc>커뮤니케이션학과</UserInfoDesc>
      </UserInfoContent>
      <ButtonWrap>
        <SmallUserButton
          type="button"
          onClick={() => {
            getPreviousUserHandler();
          }}
        >
          <box-icon
            name="x"
            color="rgb(128, 113, 252)"
            size="2.5rem"
          ></box-icon>
        </SmallUserButton>

        <MediumUserButton
          type="button"
          style={{
            boxShadow:
              saveValue == true && " 0px 0px 33px 10px rgba(128,113,252,0.46)",
            WebkitBoxShadow:
              saveValue == true && " 0px 0px 33px 10px rgba(128,113,252,0.46)",
            MozBoxShadow:
              saveValue == true && " 0px 0px 33px 10px rgba(128,113,252,0.46)",
          }}
          onClick={async () => {
            setSaveValue((state) => !state);

            await dispatch(saveUserAction(userDetail.memberId, !saveValue));
          }}
        >
          {saveValue == false && (
            <box-icon
              color="rgb(128, 113, 252)"
              name="heart"
              size="2.3rem"
              type="solid"
            ></box-icon>
          )}

          {saveValue == true && (
            <box-icon
              color="rgb(128, 113, 252)"
              name="heart"
              size="2.5rem"
              type="solid"
            ></box-icon>
          )}
        </MediumUserButton>
        <SmallUserButton type="button">
          <box-icon
            color="rgb(128, 113, 252)"
            name="message-rounded"
            size="2rem"
            type="solid"
          ></box-icon>
        </SmallUserButton>
      </ButtonWrap>
    </UserInfoWrap>
  );
};
const UserInfoWrap = styled.div`
  height: 100%;
  width: 85%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 0.7rem 0;
`;

const UserInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserInfoName = styled.span`
  font-size: 2rem;
  display: flex;
  font-weight: 600;
`;
const UserInfoAge = styled.span`
  margin-left: 0.6rem;
  font-size: 1.5rem;
  display: flex;
  align-items: flex-end;
  font-weight: 500;
`;

const UserInfoNameWrap = styled.div`
  color: black;
  font-size: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserInfoDesc = styled.span`
  color: black;
  font-size: 1rem;
  margin: 0.3rem 0;
`;
const ButtonWrap = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const SmallUserButton = styled.button`
  background-color: white;

  width: auto;
  height: auto;
  cursor: pointer;
  border: none;
  margin: 0 0.5rem;
`;

const MediumUserButton = styled.button`
  background-color: white;
  border-radius: 50%;
  width: 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border: none;
  transition: all 0.2s ease-in-out;
`;

export default HomeMain;
