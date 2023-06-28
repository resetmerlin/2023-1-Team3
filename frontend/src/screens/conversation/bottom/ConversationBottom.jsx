import React, { useCallback } from "react";
import ConversationBottomView from "./ConversationBottomView";
import "./ConversationBottom.scss";

const ConversationBottom = ({ onSubmit, handleSubmit, register }) => {
  // JSX를 추상화한 Props Object
  const props = {
    onSubmit: onSubmit,
    handleSubmit: handleSubmit,
    register: register,
  };
  return <ConversationBottomView {...props} />;
};

export default ConversationBottom;
