import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import Loading from "../../components/Loading";
import UserCard from "../../components/UserCard";
import UserCardDetails from "../../components/UserCardDetails";
const HomeContent = ({
  sendBlockUser,
  user,
  sendLikeUser,
  peopleListLoading,
  goNextSlideHandler,
  getUserFromChild,
}) => {
  const age =
    new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1;

  const [saveValue, setSaveValue] =
    useState(false); /** 좋아요 버튼 Handler 함수 */
  const [userChildCardPopup, setUserChildCardPopup] = useState(false);

  /** 유저 삭제 state */
  const [blockValue, setBlockValue] = useState(false);

  /** 유저 state 변경 후 서버에 보냄 */
  const savAction = useCallback(() => {
    setSaveValue((save) => !save);
    sendLikeUser(user?.memberId, !saveValue);
  });

  /** 삭제 state를 변경 후 서버에 보냄 */
  const blockAction = useCallback(async () => {
    await setBlockValue((value) => !value);

    sendBlockUser(user?.memberId, !blockValue);
  });

  /** 다시 Slide로 돌아감 */
  const goBackToSlide = () => {
    setUserChildCardPopup(false);
    getUserFromChild(false);
  };

  const userCardImageStyle = {
    backgroundImage:
      user?.image == "DEFAULT" && user?.gender == "MALE"
        ? `
  url('./default/default-men.png')`
        : user?.image == "DEFAULT" && user?.gender == "FEMALE"
        ? `
  url('./default/default-women.png')`
        : `
  url(${user?.image}`,
  };
  return (
    <>
      <HomeWrap
        style={{
          display: userChildCardPopup ? "none" : "flex",
        }}
      >
        <HomeContentWrap
          style={{
            display: userChildCardPopup ? "none" : "flex",
          }}
        >
          <UserCardProfile style={userCardImageStyle} />

          {peopleListLoading ? (
            <Loading />
          ) : (
            <HomeInfo>
              <UserCard
                goNextSlideHandler={goNextSlideHandler}
                userDetail={user}
                saveValue={saveValue}
                likeAction={savAction}
                setUserChildCardPopup={setUserChildCardPopup}
                age={age}
                getUserFromChild={getUserFromChild}
              />
            </HomeInfo>
          )}
        </HomeContentWrap>
      </HomeWrap>
      {userChildCardPopup && (
        <UserCardDetails
          user={user}
          blockAction={blockAction}
          likeAction={savAction}
          age={age}
          blockValue={blockValue}
          saveValue={saveValue}
          goBackToSlide={goBackToSlide}
          style={userCardImageStyle}
        />
      )}
    </>
  );
};
const UserCardProfile = styled.div`
  height: 77%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.5rem;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  background-repeat: none,
  background-size: cover,
  background-position: center,
  overflow: hidden;
  transition: all 0.2s ease;
  border-radius: 12px;
`;

export const HomeWrap = styled.div`
  position: absolute;
  height: 96%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HomeContentWrap = styled.div`
  height: 100%;
  flex-direction: column;
  width: 85%;

  display: flex;
  justify-content: center;
  align-items: center;
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

export default HomeContent;
