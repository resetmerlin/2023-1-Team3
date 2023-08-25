import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { getImageSrc } from '../../../func/commonLogicHelper';
import Card from '../../../components/Card/Card';
import CardDetails from '../../../components/PopupCard/CardDetails';

type Props = {
  user: { memberId: string; birth: Date };
  sendBlockUser: (memberId: string, blockBoolean: boolean) => void;
  sendLikeUser: (memberId: string, saveBoolean: boolean) => void;
  goNextSlideHandler: () => void;
  getUserFromChild: (popupBoolean: boolean) => void;
  startMessage: (memberId: string) => void;
};

export default function HomeContent({
  sendBlockUser,
  user,
  sendLikeUser,
  goNextSlideHandler,
  getUserFromChild,
  startMessage,
}: Props) {
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
  }, [setSaveValue, sendLikeUser, saveValue, user]);

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
    popupStyle,
    goNextSlideHandler,
    user,
    saveValue,
    startMessage: () => {
      startMessage(user?.memberId);
    },
    savAction,
    popupCheckedHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserChildCardPopup(e.target.checked);
      getUserFromChild(e.target.checked);
    },
    age,
    imageSrc: getImageSrc(user),
  };

  const popupProps = {
    startMessage: () => {
      startMessage(user?.memberId);
    },
    user,
    blockAction: () => {
      blockAction();
    },
    likeAction: savAction,
    age,
    blockValue,
    saveValue,
    goBackToSlide: cancelPopup,
    imageSrc: getImageSrc(user),
  };

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define  */}
      <HomeWrap style={popupStyle}>
        <Card {...props} />
      </HomeWrap>
      {userChildCardPopup && <CardDetails {...popupProps} />}
    </>
  );
}

const HomeWrap = styled.div`
  position: absolute;
  height: 94%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
