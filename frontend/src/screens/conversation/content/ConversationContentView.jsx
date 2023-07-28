import { MessageHorizontalLine } from "../../../components/HorizontalLine";
import { MessageLoader } from "../../../components/Loader";
import "./ConversationContent.scss";
import { forwardRef } from "react";

const ConversationContentView = forwardRef(
  (
    { messageHistory, messageReceivedNow, myMemberId, currentTime, imageSrc },
    { contentRef, messageRef }
  ) => {
    return (
      <div className="conversation__content" ref={contentRef}>
        {messageHistory &&
          messageHistory.map((message, id) => {
            if (
              message.timeStamp[1]?.split(" ")[1] !==
                messageHistory[id + 1]?.timeStamp[1]?.split(" ")[1] &&
              message.timeStamp[1]?.split(" ")[1] !==
                currentTime[1]?.split(" ")[1]
            ) {
              if (message.recvMemberId !== myMemberId) {
                if (id == 0) {
                  return (
                    <FullMyMessage
                      message={message}
                      key={id}
                      ref={messageRef}
                    />
                  );
                } else {
                  return <FullMyMessage message={message} key={id} />;
                }
              } else {
                if (id == 0) {
                  return (
                    <FullPartnerMessage
                      imageSrc={imageSrc}
                      message={message}
                      key={id}
                      ref={messageRef}
                    />
                  );
                } else {
                  return (
                    <FullPartnerMessage
                      message={message}
                      key={id}
                      imageSrc={imageSrc}
                    />
                  );
                }
              }
            } else {
              if (message.recvMemberId !== myMemberId) {
                if (id == 0) {
                  return (
                    <MyMessage
                      message={message.message}
                      key={id}
                      ref={messageRef}
                    />
                  );
                } else {
                  return <MyMessage message={message.message} key={id} />;
                }
              } else {
                if (id == 0) {
                  return (
                    <PartnerMessage
                      message={message.message}
                      key={id}
                      ref={messageRef}
                      imageSrc={imageSrc}
                    />
                  );
                } else {
                  return (
                    <PartnerMessage
                      message={message.message}
                      key={id}
                      imageSrc={imageSrc}
                    />
                  );
                }
              }
            }
          })}
        {messageReceivedNow &&
          messageReceivedNow.map((message, id) => {
            if (
              message.timeStamp[1]?.split(" ")[1] !==
                messageReceivedNow[id + 1]?.timeStamp[1]?.split(" ")[1] &&
              message.timeStamp[1]?.split(" ")[1] !==
                currentTime[1]?.split(" ")[1]
            ) {
              if (message.recvMemberId !== myMemberId) {
                return (
                  <FullMyMessage message={message} key={id} ok={message?.ok} />
                );
              } else {
                return (
                  <FullPartnerMessage
                    message={message}
                    key={id}
                    imageSrc={imageSrc}
                  />
                );
              }
            } else {
              if (message.recvMemberId !== myMemberId) {
                return (
                  <MyMessage
                    message={message.message}
                    key={id}
                    ok={message?.ok}
                  />
                );
              } else {
                return (
                  <PartnerMessage
                    message={message.message}
                    key={id}
                    imageSrc={imageSrc}
                  />
                );
              }
            }
          })}
      </div>
    );
  }
);

const PartnerMessage = forwardRef(({ message, imageSrc }, ref) => {
  return (
    <div className="conversation__content__message__wrap " ref={ref}>
      <img
        className="conversation__content__profile"
        src={imageSrc}
        alt="conversation-user-image"
      ></img>

      <p className="conversation__content__message" id="partner">
        {message}
      </p>
    </div>
  );
});

const FullPartnerMessage = forwardRef(({ message, imageSrc }, ref) => {
  return (
    <>
      <PartnerMessage message={message.message} ref={ref} imageSrc={imageSrc} />
      <MessageHorizontalLine
        time={message.timeStamp[1]}
        date={message.timeStamp[0]}
      />
    </>
  );
});

const MyMessage = forwardRef(({ message, ok }, ref) => {
  return (
    <>
      <div
        className="conversation__content__message__wrap "
        id="client-justify"
        ref={ref}
      >
        <p className="conversation__content__message" id="client">
          {message}
          {ok == "loading" && <MessageLoader />}
        </p>
      </div>
    </>
  );
});

const FullMyMessage = forwardRef(({ message, ok }, ref) => {
  return (
    <>
      <MyMessage message={message.message} ref={ref} ok={ok} />

      <MessageHorizontalLine
        time={message.timeStamp[1]}
        date={message.timeStamp[0]}
      />
    </>
  );
});
export default ConversationContentView;
