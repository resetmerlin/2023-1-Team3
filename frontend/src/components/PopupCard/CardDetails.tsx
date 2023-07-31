import React from 'react';
import { styled } from 'styled-components';
import { BackToSlideCardButton } from '../Button';
import CardDetailsTopView from './top/CardDetailsTopView';
import CardDetailsBottomView from './bottom/CardDetailsBottomView';

export default function CardDetails({
  user,
  blockAction,
  likeAction,
  age,
  blockValue,
  saveValue,
  goBackToSlide,
  imageSrc,
}) {
  const bottomProps = {
    name: user?.name,
    age,
    blockValue,
    memberId: user?.memberId,
    department: user?.department,
    blockAction,

    introduction: user?.introduction,
    likeAction,
    saveValue,
  };
  const props = {
    goBackToSlide,
    topProps: {
      imageSrc,
    },
    bottomProps: bottomProps,
  };
  return <CardDetailsView {...props} />;
}

function CardDetailsView({ goBackToSlide, topProps, bottomProps }) {
  return (
    <CardDetailsWrap>
      <BackToSlideCardButton goBackToSlide={goBackToSlide} />
      <CardDetailsTopView {...topProps} />
      <CardDetailsBottomView {...bottomProps} />
    </CardDetailsWrap>
  );
}

const CardDetailsWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
