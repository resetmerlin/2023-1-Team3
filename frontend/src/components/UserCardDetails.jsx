import React, { memo } from "react";
import { styled } from "styled-components";
import {
  UserInfoAge,
  UserInfoDesc,
  UserInfoName,
  UserInfoNameWrap,
} from "./UserCard";
import {
  BackToSlideCardButton,
  BlockButton,
  UserDetailLikeButton,
  UserDetailsMessageButton,
} from "./Button";
import { BoxIconElement } from "boxicons";

const UserCardDetails = memo(function UserCardDetails({
  style,
  user,
  age,
  blockAction,
  saveValue,
  likeAction,
  goBackToSlide,
  blockValue,
}) {
  return (
    <UserCardDetailsWrap>
      <UserCardDetailsImageWrap style={style}></UserCardDetailsImageWrap>
      <BackToSlideCardButton goBackToSlide={goBackToSlide} />

      <UserCardDetailsDescWrap>
        <UserInfoNameWrap
          style={{
            marginTop: "2.3rem",
            width: "100%",
          }}
        >
          <UserInfoName style={{ fontWeight: "700", fontSize: "2.3rem" }}>
            {user?.name}

            <UserInfoAge>{age}</UserInfoAge>
          </UserInfoName>

          <PopupDot htmlFor="popup-dot">
            <box-icon
              name="dots-horizontal-rounded"
              color="black"
              size="3rem"
            ></box-icon>
          </PopupDot>
          <PopupDotInput
            type="checkbox"
            id="popup-dot"
            name="popup-dot"
            style={{ display: "none" }}
          />
          <SmallPopupbox className="popupCheckbox-dot">
            <button
              style={{
                width: "100%",
                height: "50%",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              {" "}
              신고하기
            </button>
            <BlockButton
              memberId={user?.memberId}
              blockValue={blockValue}
              blockAction={blockAction}
            />
          </SmallPopupbox>
        </UserInfoNameWrap>

        <UserInfoDesc>
          <span>{user?.department}</span>
        </UserInfoDesc>

        <UserInfoIntroduction>
          <UserInfoDesc>{user?.introduction}</UserInfoDesc>
        </UserInfoIntroduction>
        <UserCardDetailsButtonWrap>
          <UserDetailLikeButton
            likeAction={likeAction}
            saveValue={saveValue}
            memberId={user?.memberId}
          />

          <UserDetailsMessageButton />
        </UserCardDetailsButtonWrap>
      </UserCardDetailsDescWrap>
    </UserCardDetailsWrap>
  );
});

const UserCardDetailsWrap = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Or any number higher than the z-index of other elements */
`;

const UserCardDetailsButtonWrap = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
`;
const UserInfoIntroduction = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  hegiht: auto;
`;
const UserCardDetailsImageWrap = styled.div`
  height: 45%;
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.5rem;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: all 0.2s ease;
`;
const PopupDot = styled.label`
  position: absolute;
  top: 3%;
  right: 3%;
  #popup-dot:checked + .popupCheckbox-dot {
    display: flex;
  }
`;
const PopupDotInput = styled.input`
  &:checked + .popupCheckbox-dot {
    display: flex;
  }
`;
const SmallPopupbox = styled.div`
  position: absolute;
  top: 10%;
  right: 3%;
  width: 6rem;
  height: 5rem;
  font-size: 1rem;
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: white;
  border-radius: 8px;
  -webkit-box-shadow: rgb(214, 214, 214) 0px 4px 9px;
  -moz-box-shadow: rgb(214, 214, 214) 0px 4px 9px;
  box-shadow: rgb(214, 214, 214) 0px 4px 9px;
  button {
    border: none;

    font-size: 0.9rem;
    background-color: white;
  }
`;
const UserCardDetailsDescWrap = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: start;
  padding: 0 2rem;
  align-items: start;
  background: white;
  z-index: 3000;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  flex-direction: column;
`;
export default UserCardDetails;
