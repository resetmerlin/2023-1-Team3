import React, {
  forwardRef,
  memo,
  useState,
  useCallback,
  useEffect,
} from "react";

import { styled } from "styled-components";
import UserCardDetails from "./UserCardDetails";

const UserCardColumn = memo(
  forwardRef(
    ({ user, handleChildStateChange, sendBlockUser, sendSaveValue }, ref) => {
      /** 유저 저장 state */
      const [saveValue, setSaveValue] = useState(true);
      const [blockValue, setBlockValue] = useState(false);
      const [checked, setChecked] = useState(false);

      /** 다시 Slide로 돌아감 */
      const goBackToSlide = useCallback(() => {
        setChecked(false);
        handleChildStateChange(false);
      });
      /** 유저 state 변경 후 서버에 보냄 */
      const saveStatusHandler = useCallback(() => {
        setSaveValue((save) => !save);
        sendSaveValue(user?.memberId, !saveValue);
      });

      /** 삭제 state를 변경 후 서버에 보냄 */
      const blockStatusHandler = useCallback(() => {
        setBlockValue((value) => !value);
        sendBlockUser(user?.memberId, !blockValue);
      });
      /** 유저 나이 n살로 변경 */
      const age =
        new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1;

      const [imageVersion, setImageVersion] = useState(Date.now());

      useEffect(() => {
        // Whenever the user object changes, update the imageVersion state
        setImageVersion(Date.now());
      }, [user]);

      const getImageSrc = useCallback(() => {
        if (user?.image === "DEFAULT") {
          if (user?.gender === "MALE") {
            return `../default/default-men.png`;
          }
          if (user?.gender === "FEMALE") {
            return `../default/default-women.png`;
          }
        }
        // Add imageVersion as a query parameter to the URL
        return `${user?.image}?ver=${imageVersion}`;
      }, [user]);
      return (
        <>
          <ColumnBig ref={ref}>
            <input
              type="checkbox"
              style={{ display: "none" }}
              name={`${user?.memberId} column`}
              id={`${user?.memberId} column`}
              checked={checked == false ? false : true}
              onChange={(e) => {
                setChecked(e.target.checked);
                handleChildStateChange(e.target.checked);
              }}
            />
            <ColumnLabel htmlFor={`${user?.memberId} column`}>
              <UserColumnProfile
                loading="lazy"
                src={getImageSrc()}
                alt="save-profile"
              />

              <UserColumnDescWrap>
                <UserColumnName>{user?.name}</UserColumnName>
                <UserColumnMajor>{user?.department}</UserColumnMajor>
              </UserColumnDescWrap>
            </ColumnLabel>
          </ColumnBig>
          {checked && (
            <UserCardDetails
              user={user}
              age={age}
              getImageSrc={getImageSrc}
              saveValue={saveValue}
              goBackToSlide={goBackToSlide}
              blockAction={blockStatusHandler}
              likeAction={saveStatusHandler}
              blockValue={blockValue}
            />
          )}
        </>
      );
    }
  )
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
