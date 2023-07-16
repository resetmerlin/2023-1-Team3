import React from "react";
import { styled } from "styled-components";

const UserCardContent = ({ memberId, setChecked, name, age, department }) => {
  return (
    <UserInfoContent>
      <UserInfoNameWrap>
        <label htmlFor={memberId}>
          <input
            type="checkbox"
            onChange={setChecked}
            id={memberId}
            style={{ display: "none" }}
          />
          <UserInfoName>
            {name}
            <UserInfoAge> {age}</UserInfoAge>
          </UserInfoName>
        </label>{" "}
      </UserInfoNameWrap>

      <UserInfoDesc>{department}</UserInfoDesc>
    </UserInfoContent>
  );
};

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

export default UserCardContent;
