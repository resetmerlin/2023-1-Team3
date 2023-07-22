import React from "react";
import { styled } from "styled-components";
import { UserDeleteButton, UserLikeButton, UserMessageButton } from "../Button";

const UserCardButton = ({
  goNextSlideHandler,
  likeAction,
  saveValue,
  memberId,
  startMessage,
}) => {
  return (
    <ButtonWrap>
      <UserDeleteButton goNextSlideHandler={goNextSlideHandler} />
      <UserLikeButton
        likeAction={likeAction}
        saveValue={saveValue}
        memberId={memberId}
      />
      <UserMessageButton startMessage={startMessage} memberId={memberId} />
    </ButtonWrap>
  );
};

const ButtonWrap = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default UserCardButton;
