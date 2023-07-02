import React, { useEffect, useRef } from "react";
import "./ConversationContent.scss";
import ConversationContentView from "./ConversationContentView";

const ConversationContent = ({
  messageHistory,
  messageReceivedNow,
  myMemberId,
}) => {
  /** 전체 message containter 역할을 하는 conversation__content div의 ref */
  const contentRef = useRef();

  /** 최근 메시지로 자동 스크롤 함 */
  useEffect(() => {
    if (contentRef.current.offsetTop < contentRef.current.scrollHeight) {
      const amountOfScroll =
        contentRef.current.scrollHeight - contentRef.current.offsetTop;

      contentRef.current?.scroll({
        top: amountOfScroll,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messageReceivedNow]);

  /** JSX 추상화를 위한 object */
  const props = {
    messageHistory: messageHistory,
    messageReceivedNow: messageReceivedNow,
    myMemberId: myMemberId,
  };

  const refProps = {
    ref: contentRef,
  };

  return <ConversationContentView {...props} ref={refProps} />;
};

export default ConversationContent;
