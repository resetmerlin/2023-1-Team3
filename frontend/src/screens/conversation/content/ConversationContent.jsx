import React, { useEffect, useRef, useState } from "react";
import "./ConversationContent.scss";
import ConversationContentView from "./ConversationContentView";

const ConversationContent = ({
  messageHistory,
  messageReceivedNow,
  myMemberId,
  giveCurrentTime,
}) => {
  /** 전체 message containter 역할을 하는 conversation__content div의 ref */
  const contentRef = useRef();

  const [currentTime, setCurrentTime] = useState();
  /** 최근 메시지로 자동 스크롤 함 */
  useEffect(() => {
    const currentTime = giveCurrentTime();
    setCurrentTime(currentTime.split("T")[1].slice(0, 5));

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
    currentTime: currentTime,
    messageHistory:
      messageHistory &&
      messageHistory.map((message) => {
        if (typeof message.timeStamp !== "string") {
        } else {
          let tempTimeArray = message.timeStamp && message.timeStamp.split("T");
          tempTimeArray[1] = tempTimeArray[1].slice(0, 5);
          message.timeStamp = tempTimeArray;
        }

        return message;
      }),
    messageReceivedNow:
      messageReceivedNow &&
      messageReceivedNow.map((message) => {
        if (typeof message.timeStamp !== "string") {
        } else {
          let tempTimeArray = message.timeStamp && message.timeStamp.split("T");
          tempTimeArray[1] = tempTimeArray[1].slice(0, 5);
          message.timeStamp = tempTimeArray;
        }

        return message;
      }),
    myMemberId: myMemberId,
  };

  const refProps = {
    ref: contentRef,
  };

  return <ConversationContentView {...props} ref={refProps} />;
};

export default ConversationContent;
