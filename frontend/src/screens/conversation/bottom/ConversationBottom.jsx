import React, { useCallback, useEffect, useRef } from "react";
import ConversationBottomView from "./ConversationBottomView";
import { useForm } from "react-hook-form";
import "./ConversationBottom.scss";

const ConversationBottom = ({ sendMsg }) => {
  /** 하위 컴포넌트의 textarea ref */
  const messageInputRef = useRef();

  /** 하위 컴포넌트의 form ref */
  const messageFormRef = useRef();

  const { handleSubmit, register, setValue, watch } = useForm({
    mode: "onChange",
  });
  /** Form에서 작성한 메시지를 submit하여 데이터를 전송*/
  const onSubmit = useCallback(async (data) => {
    sendMsg(data?.message);
    setValue("message", "");
  });

  const { ref } = register("message");

  /** 메시지 input onChange */
  const message = watch("message");

  useEffect(() => {
    if (messageInputRef.current !== null) {
      messageFormRef.current.style.height = `${messageInputRef.current?.scrollHeight}px`;
    }
  }, [message]);

  // JSX를 추상화한 Props Object
  const props = {
    onSubmit: onSubmit,
    handleSubmit: handleSubmit,
    register: { ...register("message", { required: true }) },
    reference: (e) => {
      ref(e);
      messageInputRef.current = e;
    },
  };

  const refProps = {
    messageInputRef: messageInputRef,
    messageFormRef: messageFormRef,
  };
  return <ConversationBottomView {...props} ref={refProps} />;
};

export default ConversationBottom;
