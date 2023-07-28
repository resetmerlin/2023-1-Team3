import React from "react";
import { CardBottomView } from "./bottom/CardBottomView";
import CardTopView from "./top/CardTopView";
import { styled } from "styled-components";
import { BoxIconElement } from "boxicons";

const Card = ({
  popupStyle,
  goNextSlideHandler,
  user,
  saveValue,
  startMessage,
  savAction,
  age,
  imageSrc,
  popupCheckedHandler,
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

    buttonProps: {
      goNextSlideHandler: () => {
        goNextSlideHandler();
      },
      likeAction: () => {
        savAction(user?.memberId);
      },

      saveValue: saveValue,
      memberId: user?.memberId,
      startMessage: () => {
        startMessage(user?.memberId);
      },
    },
  };

  const props = {
    popupStyle: popupStyle,

    topProps: topProps,
    bottomProps: bottomProps,
  };
  return <CardView {...props} />;
};
const CardView = ({ bottomProps, topProps, popupStyle }) => {
  return (
    <CardWrap style={popupStyle}>
      <CardTopView {...topProps} />
      <CardBottomView {...bottomProps} />
    </CardWrap>
  );
};

const CardWrap = styled.div`
  height: 100%;
  flex-direction: column;
  width: 85%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Card;
