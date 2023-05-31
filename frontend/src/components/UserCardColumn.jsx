import React, { forwardRef, memo } from "react";

import { styled } from "styled-components";

const UserCardColumn = memo(
  forwardRef(({ user }, ref) => {
    return (
      <ColumnBig ref={ref}>
        {user?.image == "DEFAULT" && user?.gender == "MALE" ? (
          <UserColumnProfile
            style={{
              backgroundImage: `
    url('./default/default-men.png')`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            alt="save-profile"
          ></UserColumnProfile>
        ) : user?.image == "DEFAULT" && user?.gender == "FEMALE" ? (
          <UserColumnProfile
            style={{
              backgroundImage: `
    url('./default/default-women.png')`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            alt="save-profile"
          ></UserColumnProfile>
        ) : (
          <UserColumnProfile
            style={{
              backgroundImage: `
  url(${user?.image}`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            alt="save-profile"
          ></UserColumnProfile>
        )}

        <UserColumnDescWrap>
          <UserColumnName>{user?.name}</UserColumnName>
          <UserColumnMajor>{user?.department}</UserColumnMajor>
        </UserColumnDescWrap>
      </ColumnBig>
    );
  })
);
const ColumnBig = styled.div`
  display: flex;
  width: 47%;
  height: 45%;
  flex-direction: column;
  margin: 0.7rem 0.3rem;
  align-items: center;
  transition: all 0.1s ease-in;
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
`;

const UserColumnProfile = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  border-radius: 8px;

  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
const UserColumnDescWrap = styled.div`
  box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  font-size: 1rem;
  width: 100%;
  height: 25%;
  border-bottom-left-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.7rem;
  border-bottom-right-radius: 8px;
`;
const UserColumnName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
`;
const UserColumnMajor = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: #b3aeae;
`;

export default UserCardColumn;
