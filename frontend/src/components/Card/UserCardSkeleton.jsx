import React from "react";
import { styled } from "styled-components";

const UserCardSkeleton = ({ popupStyle, name, age, department }) => {
  return (
    <HomeContentWrap style={popupStyle}>
      <UserCardProfile decoding="async" fetchpriority="high" />

      <HomeInfo>
        <UserInfoWrap>
          <UserInfoContent>
            <UserInfoNameWrap>
              <UserInfoName>
                {name}
                <UserInfoAge> {age}</UserInfoAge>
              </UserInfoName>
            </UserInfoNameWrap>

            <UserInfoDesc>{department}</UserInfoDesc>
          </UserInfoContent>
          <ButtonWrap>
            <SmallUserButton>
              {" "}
              <box-icon
                name="x"
                color="rgb(128, 113, 252)"
                size="2.5rem"
              ></box-icon>
            </SmallUserButton>
            <MediumUserButton>
              {" "}
              <box-icon
                color="rgb(128, 113, 252)"
                name="heart"
                size="2.3rem"
                type="solid"
              ></box-icon>
            </MediumUserButton>
            <SmallUserButton>
              <box-icon
                color="rgb(128, 113, 252)"
                name="message-rounded"
                size="2rem"
                type="solid"
              ></box-icon>
            </SmallUserButton>
          </ButtonWrap>
        </UserInfoWrap>
      </HomeInfo>
    </HomeContentWrap>
  );
};
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
  cursor: pointer;
`;
export const UserInfoContent = styled.div`
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

const UserInfoWrap = styled.div`
  height: 100%;
  width: 85%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 0.7rem 0;
`;
const HomeContentWrap = styled.div`
  height: 100%;
  flex-direction: column;
  width: 85%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserCardProfile = styled.div`
  height: 77%;
  width: 100%;
  object-fit: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  border-radius: 12px;
  background-color: rgb(128, 113, 252);
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
  cursor: pointer;

  transition: all 0.2s ease-in-out;
`;

export default UserCardSkeleton;
