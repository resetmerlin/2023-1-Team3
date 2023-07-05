import { MessageHorizontalLine } from "../../../components/HorizontalLine";
import "./ConversationContent.scss";
import { forwardRef } from "react";

const ConversationContentView = forwardRef(
  (
    { messageHistory, messageReceivedNow, myMemberId, currentTime },
    { ref }
  ) => {
    return (
      <div className="conversation__content" ref={ref}>
        {messageHistory &&
          messageHistory.map((message) => {
            return <PartnerMessage message={message.message} />;
          })}

        {messageReceivedNow &&
          messageReceivedNow.map((message, id) => {
            if (
              message.timeStamp[1] !==
                messageReceivedNow[id + 1]?.timeStamp[1] &&
              message.timeStamp[1] !== currentTime
            ) {
              if (message.recvMemberId == myMemberId) {
                return <FullPartnerMessage message={message} key={id} />;
              } else {
                return <FullMyMessage message={message} key={id} />;
              }
            } else {
              if (message.recvMemberId == myMemberId) {
                return <PartnerMessage message={message.message} key={id} />;
              } else {
                return <MyMessage message={message.message} key={id} />;
              }
            }
          })}
      </div>
    );
  }
);

const PartnerMessage = ({ message }) => {
  return (
    <div className="conversation__content__message__wrap ">
      <img
        className="conversation__content__profile"
        src="../default/default-men.png"
        alt="conversation-user-image"
      ></img>

      <p className="conversation__content__message" id="partner">
        {message}
      </p>
    </div>
  );
};

const FullPartnerMessage = ({ message }) => {
  return (
    <>
      <PartnerMessage message={message.message} />
      <MessageHorizontalLine time={message.timeStamp[1]} />
    </>
  );
};

const MyMessage = ({ message }) => {
  return (
    <div className="conversation__content__message__wrap " id="client-justify">
      <p className="conversation__content__message" id="client">
        {message}
      </p>
    </div>
  );
};

const FullMyMessage = ({ message }) => {
  return (
    <>
      <MyMessage message={message.message} />

      <MessageHorizontalLine time={message.timeStamp[1]} />
    </>
  );
};
export default ConversationContentView;
