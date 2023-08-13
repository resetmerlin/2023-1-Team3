import React from 'react';
import { CardBottomView } from './bottom/CardBottomView';
import CardTopView from './top/CardTopView';
import './Card.scss';

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
      startMessage,
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
    <div className='card' style={popupStyle}>
      <CardTopView {...topProps} />
      <CardBottomView {...bottomProps} />
    </div>
  );
};

export default Card;
