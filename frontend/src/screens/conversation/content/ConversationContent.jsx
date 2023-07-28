import React, { useEffect, useRef, useState } from "react";
import "./ConversationContent.scss";
import ConversationContentView from "./ConversationContentView";

const ConversationContent = ({
  messageHistory,
  messageReceivedNow,
  myMemberId,
  giveCurrentTime,
  page,
  getAllMessageQueue,
  endPageSignal,
  imageSrc,
}) => {
  /** 전체 message containter 역할을 하는 conversation__content div의 ref */
  const contentRef = useRef();

  /** messagehistory array 인덱스 값 중 가장 마지막 element의 ref */
  const messageRef = useRef();

  const [currentTime, setCurrentTime] = useState([]);

  /** 최근 메시지로 자동 스크롤 함 */
  useEffect(() => {
    const currentTime = giveCurrentTime().split("T");

    const arrangedCurrentTime = [currentTime[0], currentTime[1].slice(0, 5)];

    arrangedCurrentTime[1] =
      arrangedCurrentTime[1].split(":")[0] > 12
        ? "오후 " +
          (+arrangedCurrentTime[1].split(":")[0] - 12) +
          ":" +
          arrangedCurrentTime[1].split(":")[1]
        : "오전 " + arrangedCurrentTime[1];

    setCurrentTime([arrangedCurrentTime[0], arrangedCurrentTime[1]]);

    if (contentRef.current.offsetTop < contentRef.current.scrollHeight) {
      const amountOfScroll =
        contentRef.current.scrollHeight - contentRef.current.offsetTop;

      contentRef.current?.scroll({
        top: amountOfScroll,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messageReceivedNow, messageHistory]);

  const messageDateHandler = (tempTimeArray) => {
    const date = tempTimeArray[0].split("-");

    const currentDate = currentTime[0].split("-");

    /** 현재 년도가 메세지 년도보다 클때 */
    if (+currentDate[0] > +date[0]) {
      return date[0] + "년 " + +date[1] + "월 " + +date[2] + "일";
    } else {
      /** 년도가 같은데 현재 month가 메세지 month보다 클때 */
      if (+currentDate[1] > +date[1]) {
        return +date[1] + "월 " + +date[2] + "일";
      } else {
        /** 년도와 month가 같은데 현재 날짜가 메세지 날짜보다 클때 */
        if (+currentDate[2] > +date[2]) {
          date[2] =
            +currentDate[2] - 1 == +date[2]
              ? "어제"
              : +date[1] + "월 " + date[2] + "일";

          return date[2];
        }
      }

      return "";
    }
  };

  const messageTimeHandler = (message) => {
    let tempTimeArray = message.timeStamp && message.timeStamp.split("T");

    tempTimeArray[0] = messageDateHandler(tempTimeArray);

    tempTimeArray[1] = tempTimeArray[1].slice(0, 5);
    tempTimeArray[1] =
      tempTimeArray[1].split(":")[0] > 12
        ? "오후 " +
          (+tempTimeArray[1].split(":")[0] - 12) +
          ":" +
          tempTimeArray[1].split(":")[1]
        : "오전 " + tempTimeArray[1];

    message.timeStamp = tempTimeArray;

    return message;
  };

  useEffect(() => {
    let targetElement = messageRef.current;

    if (targetElement && !endPageSignal && messageHistory) {
      const observer = new IntersectionObserver(
        async (entries) => {
          const observedPage = entries[0];
          if (observedPage?.isIntersecting) {
            /** 새로운 유저 리스트 call */
            getAllMessageQueue(page + 1);
          }
        },
        { threshold: 1 }
      );

      /** Ref로 지정한 마지막 element 관찰 */
      observer.observe(targetElement);

      return () => {
        /**  element 관찰 취소 */
        observer.unobserve(targetElement);
      };
    }
  }, [messageRef?.current, messageHistory, endPageSignal]);

  /** JSX 추상화를 위한 object */

  const props = {
    currentTime: currentTime,
    imageSrc: imageSrc,
    messageHistory:
      messageHistory &&
      messageHistory?.map((message) => {
        if (typeof message.timeStamp !== "string") {
        } else {
          message = messageTimeHandler(message);
        }

        return message;
      }),
    messageReceivedNow:
      messageReceivedNow &&
      messageReceivedNow?.map((message) => {
        if (typeof message.timeStamp !== "string") {
        } else {
          message = messageTimeHandler(message);
        }

        return message;
      }),
    myMemberId: myMemberId,
  };

  const refProps = {
    contentRef: contentRef,
    messageRef: messageRef,
  };

  return <ConversationContentView {...props} ref={refProps} />;
};

export default ConversationContent;
