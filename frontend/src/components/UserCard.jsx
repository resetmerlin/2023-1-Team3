import React, { memo } from "react";
import { styled } from "styled-components";
import { BoxIconElement } from "boxicons";
import { UserDeleteButton, UserLikeButton, UserMessageButton } from "./Button";
const UserCard = memo(function UserCard({
  userDetail,
  goNextSlideHandler,
  saveValue,
  likeAction,
  age,
  setUserChildCardPopup,
  getUserFromChild,
}) {
  return (
    <UserInfoWrap>
      <UserInfoContent>
        <UserInfoNameWrap>
          <label htmlFor={userDetail?.memberId}>
            <input
              type="checkbox"
              onChange={(e) => {
                setUserChildCardPopup(e.target.checked);
                getUserFromChild(e.target.checked);
              }}
              id={userDetail?.memberId}
              style={{ display: "none" }}
            />

            <UserInfoName>
              {userDetail?.name}
              <UserInfoAge> {age}</UserInfoAge>
            </UserInfoName>
          </label>{" "}
        </UserInfoNameWrap>

        <UserInfoDesc>{userDetail?.department}</UserInfoDesc>
      </UserInfoContent>
      <ButtonWrap>
        <UserDeleteButton goNextSlideHandler={goNextSlideHandler} />
        <UserLikeButton
          likeAction={likeAction}
          saveValue={saveValue}
          memberId={userDetail?.memberId}
        />
        <UserMessageButton />
      </ButtonWrap>
    </UserInfoWrap>
  );
});
export const UserInfoWrap = styled.div`
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
export const UserInfoName = styled.span`
  font-size: 2rem;
  display: flex;
  font-weight: 600;
`;
export const UserInfoAge = styled.span`
  margin-left: 0.6rem;
  font-size: 1.5rem;
  display: flex;
  align-items: flex-end;
  font-weight: 500;
`;

export const UserInfoNameWrap = styled.div`
  color: black;
  font-size: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const UserInfoDesc = styled.span`
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
