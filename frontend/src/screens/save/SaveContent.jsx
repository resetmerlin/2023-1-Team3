import React, { useState, useCallback, forwardRef } from 'react';
import UserCardColumn from '../../components/CardColumn/UserCardColumn';
import { getImageSrc } from '../../func/commonLogicHelper';
import CardDetails from '../../components/PopupCard/CardDetails';

const SaveContent = forwardRef(
  (
    {
      user,
      handleChildStateChange,
      sendBlockUser,
      sendSaveValue,
      startMessage,
    },
    ref
  ) => {
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

    const props = {
      ref: ref,
      checkedState: checked == false ? false : true,
      popupHandler: (e) => {
        setChecked(e.target.checked);
        handleChildStateChange(e.target.checked);
      },
      imageSrc: getImageSrc(user),
      user: user,
      age: new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1,
      saveValue: saveValue,
      goBackToSlide: goBackToSlide,
      blockAction: blockStatusHandler,
      likeAction: saveStatusHandler,
      blockValue: blockValue,
      startMessage: () => {
        startMessage(user?.memberId);
      },
    };

    return (
      <>
        <UserCardColumn {...props} />
        {checked && <CardDetails {...props} />}
      </>
    );
  }
);

export default SaveContent;
