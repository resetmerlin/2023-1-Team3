import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import UserCardDetails from "../../../components/UserCardDetails";
import { getImageSrc } from "../../../func/commonLogicHelper";
import HomeContentView from "./HomeContentView";
const HomeContent = ({
  sendBlockUser,
  user,
  sendLikeUser,
  peopleListLoading,
  goNextSlideHandler,
  getUserFromChild,
  startMessage,
}) => {
  const age =
    new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1;

  /** 유저 저장 state */
  const [saveValue, setSaveValue] = useState(false);
  /** 유저 삭제 state */
  const [blockValue, setBlockValue] = useState(false);

  const [userChildCardPopup, setUserChildCardPopup] = useState(false);

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
  const cancelPopup = useCallback(() => {
    setUserChildCardPopup(false);
    getUserFromChild(false);
  });

  const props = {
    popupStyle: { display: userChildCardPopup ? "none" : "flex" },
    goNextSlideHandler: goNextSlideHandler,
    user: user,
    saveValue: saveValue,
    startMessage: startMessage,
    savAction: savAction,
    setUserChildCardPopup: setUserChildCardPopup,
    getUserFromChild: getUserFromChild,
    age: age,
    peopleListLoading,
    imageSrc: getImageSrc(user),
  };

  const popupProps = {
    user: user,
    blockAction: blockAction,
    likeAction: savAction,
    age: age,
    blockValue: blockValue,
    saveValue: saveValue,
    goBackToSlide: cancelPopup,
    imageSrc: getImageSrc(user),
  };

  return (
    <>
      <HomeContentView {...props} />
      {userChildCardPopup && <UserCardDetails {...popupProps} />}
    </>
  );
};

export const HomeWrap = styled.div`
  position: absolute;
  height: 96%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HomeContent;
