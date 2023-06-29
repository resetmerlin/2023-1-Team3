import React, { useCallback } from "react";
import ConversationBottomView from "./ConversationBottomView";
import { useForm } from "react-hook-form";
import "./ConversationBottom.scss";

const ConversationBottom = ({ sendMsg }) => {
  const { handleSubmit, register, setValue } = useForm({
    mode: "onChange",
  });
  /** Form에서 작성한 메시지를 submit하여 데이터를 전송*/
  const onSubmit = useCallback(async (data) => {
    sendMsg(data?.message);
    setValue("message", "");
  }, []);

  // JSX를 추상화한 Props Object
  const props = {
    onSubmit: onSubmit,
    handleSubmit: handleSubmit,
    register: { ...register("message", { required: true }) },
  };
  return <ConversationBottomView {...props} />;
};

export default ConversationBottom;
