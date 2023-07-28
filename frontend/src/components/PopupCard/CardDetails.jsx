import React from "react";
import { BackToSlideCardButton } from "../Button";
import CardDetailsTopView from "./top/CardDetailsTopView";
import CardDetailsBottomView from "./bottom/CardDetailsBottomView";
import { styled } from "styled-components";

const CardDetails = ({
  user,
  blockAction,
  likeAction,
  age,
  blockValue,
  saveValue,
  goBackToSlide,
  imageSrc,
}) => {
  const bottomProps = {
    name: user?.name,
    age: age,
    blockValue: blockValue,
    memberId: user?.memberId,
    department: user?.department,
    blockAction: blockAction,

    introduction: user?.introduction,
    likeAction: likeAction,
    saveValue: saveValue,
  };
  const props = {
    goBackToSlide: goBackToSlide,
    topProps: {
      imageSrc: imageSrc,
    },
    bottomProps: bottomProps,
  };
  return <CardDetailsView {...props} />;
};

const CardDetailsView = ({ goBackToSlide, topProps, bottomProps }) => {
  return (
    <CardDetailsWrap>
      <BackToSlideCardButton goBackToSlide={goBackToSlide} />
      <CardDetailsTopView {...topProps} />
      <CardDetailsBottomView {...bottomProps} />
    </CardDetailsWrap>
  );
};

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

export default CardDetails;
