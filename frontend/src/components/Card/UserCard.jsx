import React from "react";
import { styled } from "styled-components";
import UserCardContent from "./UserCardContent";
import UserCardButton from "./UserCardButton";

const UserCard = ({
  userDetail,
  goNextSlideHandler,
  saveValue,
  likeAction,
  age,
  startMessage,
  setUserChildCardPopup,
  getUserFromChild,
}) => {
  const contentProps = {
    setChecked: (e) => {
      setUserChildCardPopup(e.target.checked);
      getUserFromChild(e.target.checked);
    },
    memberId: userDetail?.memberId,
    department: userDetail?.department,
    age: age,
    name: userDetail?.name,
  };

  const buttonProps = {
    goNextSlideHandler: goNextSlideHandler,
    likeAction: likeAction,
    saveValue: saveValue,
    memberId: userDetail?.memberId,
    startMessage: startMessage,
  };

  const props = {
    contentProps: contentProps,
    buttonProps: buttonProps,
  };
  return <UserCardView {...props} />;
};
const UserCardView = ({ contentProps, buttonProps }) => {
  return (
    <UserInfoWrap>
      <UserCardContent {...contentProps} />
      <UserCardButton {...buttonProps} />
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

export default UserCard;
