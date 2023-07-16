import React, { memo, forwardRef } from "react";
import { styled } from "styled-components";

const UserCardColumn = memo(
  forwardRef(({ user, checkedState, popupHandler, imageSrc }, ref) => {
    const props = {
      name: user?.name,
      department: user?.department,
      id: `${user?.memberId} column`,
      checkedState: checkedState,
      popupHandler: popupHandler,
      imageSrc: imageSrc,
      ref,
    };

    return <UserCardColumnView {...props} />;
  })
);

const UserCardColumnView = forwardRef(
  ({ name, department, id, checkedState, popupHandler, imageSrc }, ref) => {
    return (
      <ColumnBig ref={ref}>
        <input
          type="checkbox"
          name={id}
          id={id}
          checked={checkedState}
          onChange={popupHandler}
        />
        <ColumnLabel htmlFor={id}>
          <UserColumnProfile loading="lazy" src={imageSrc} alt="save-profile" />

          <UserColumnDescWrap>
            <UserColumnName>{name}</UserColumnName>
            <UserColumnMajor>{department}</UserColumnMajor>
          </UserColumnDescWrap>
        </ColumnLabel>
      </ColumnBig>
    );
  }
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
  input {
    display: none;
  }
`;

const ColumnLabel = styled.label`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s ease-in;
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
`;

const UserColumnProfile = styled.img`
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-repeat: none;
  background-size: cover;
  background-position: center;
  object-fit: cover;

  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
const UserColumnDescWrap = styled.div`
  box-shadow: 0px 2px 16px -2px rgb(217 211 255);
  -webkit-box-shadow: 0px 2px 16px -2px rgb(217 211 255);
  -moz-box-shadow: 0px 2px 16px -2px rgb(217 211 255);
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
