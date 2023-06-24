import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import ConversationBottomView from "./ConversationBottomView";
import "./ConversationBottom.scss";

const ConversationBottom = ({ onSubmit }) => {
  const methods = useForm({
    mode: "onChange",
  });

  const { handleSubmit, register } = methods;
  // JSX를 추상화한 Props Object
  const props = {
    onSubmit: onSubmit,
    handleSubmit: methods?.handleSubmit,
    register: { ...register("message", { required: true }) },
  };
  return <ConversationBottomView {...props} />;
};

export default ConversationBottom;
