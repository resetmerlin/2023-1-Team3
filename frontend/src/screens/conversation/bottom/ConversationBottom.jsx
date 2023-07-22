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

  const keyDownSubmit = (e) => {
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13 && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();

      messageFormRef.current.requestSubmit();
    }
  };

  /** form input 사이즈 원래대로 돌아오게 함 */
  const backToDefaultInputHeight = () => {
    messageFormRef.current.style.height = "0";
  };
  /** Form에서 작성한 메시지를 submit하여 데이터를 전송*/
  const onSubmit = useCallback(async (data) => {
    await sendMsg(data?.message);
    setValue("message", "");
    backToDefaultInputHeight();
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
    keyDownSubmit: keyDownSubmit,
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
