import React from 'react';
import { CardBottomView } from './bottom/CardBottomView';
import CardTopView from './top/CardTopView';
import { styled } from 'styled-components';
import { BoxIconElement } from 'boxicons';
import { BackToSlideCardButton } from '../Button';

const MyCard = ({
  user,
  age,
  imageSrc,
  popupCheckedHandler,
  goBackToScreen,
}) => {
  const topProps = {
    imageSrc: imageSrc,
  };

  const bottomProps = {
    infoProps: {
      setChecked: popupCheckedHandler,
      memberId: user?.memberId,
      department: user?.department,
      age: age,
      name: user?.name,
    },
  };

  const props = {
    goBackToScreen: goBackToScreen,
    topProps: topProps,
    bottomProps: bottomProps,
  };
  return <MyCardView {...props} />;
};
const MyCardView = ({ bottomProps, topProps, goBackToScreen }) => {
  return (
    <MyCardWrap>
      <BackToSlideCardButton goBackToSlide={goBackToScreen} />

      <CardTopView {...topProps} />
      <CardBottomView {...bottomProps} />
    </MyCardWrap>
  );
};

const MyCardWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  flex-direction: column;
  width: 85%;
  height: 72.38%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyCard;
