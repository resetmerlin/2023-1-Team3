import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getImageSrc } from '../../../func/commonLogicHelper';
import Card from '../../../components/Card/Card';
import CardDetails from '../../../components/PopupCard/CardDetails';
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

  const popupStyle = { display: userChildCardPopup ? 'none' : 'flex' };

  const props = {
    popupStyle: popupStyle,
    goNextSlideHandler: goNextSlideHandler,
    user: user,
    saveValue: saveValue,
    startMessage: () => {
      startMessage(user?.memberId);
    },
    savAction: savAction,
    popupCheckedHandler: (e) => {
      setUserChildCardPopup(e.target.checked);
      getUserFromChild(e.target.checked);
    },

    age: age,
    imageSrc: getImageSrc(user),
  };

  const popupProps = {
    user: user,
    blockAction: () => {
      blockAction();
    },
    likeAction: () => {
      savAction(user?.memberId);
    },
    age: age,
    blockValue: blockValue,
    saveValue: saveValue,
    goBackToSlide: cancelPopup,
    imageSrc: getImageSrc(user),
    startMessage: () => {
      startMessage(user?.memberId);
    },
  };

  return (
    <>
      <HomeWrap style={popupStyle}>
        <Card {...props} />
      </HomeWrap>
      {userChildCardPopup && <CardDetails {...popupProps} />}
    </>
  );
};

export const HomeWrap = styled.div`
  height: 98%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HomeContent;
