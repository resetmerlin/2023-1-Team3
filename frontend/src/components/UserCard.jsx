import React, { memo } from "react";
import { styled } from "styled-components";
import { BoxIconElement } from "boxicons";
import { UserDeleteButton, UserLikeButton, UserMessageButton } from "./Button";
const UserCard = ({
  userDetail,
  sendLikeUser,
  goNextSlideHandler,
  saveValue,
  setSaveValue,
  age,
}) => {
  return (
    <UserInfoWrap>
      <UserInfoContent>
        <UserInfoNameWrap>
          <UserInfoName>
            {userDetail?.name}
            <UserInfoAge> {age}</UserInfoAge>
          </UserInfoName>{" "}
          <box-icon
            name="dots-horizontal-rounded"
            color="black"
            size="2.3rem"
          ></box-icon>
        </UserInfoNameWrap>

        <UserInfoDesc>{userDetail?.department}</UserInfoDesc>
      </UserInfoContent>
      <ButtonWrap>
        <UserDeleteButton goNextSlideHandler={goNextSlideHandler} />
        <UserLikeButton
          saveValue={saveValue}
          setSaveValue={setSaveValue}
          sendLikeUser={sendLikeUser}
          memberId={userDetail?.memberId}
        />
        <UserMessageButton />
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

export default UserCard;
