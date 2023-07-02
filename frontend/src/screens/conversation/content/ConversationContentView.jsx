import { MessageHorizontalLine } from "../../../components/HorizontalLine";
import "./ConversationContent.scss";
import { forwardRef } from "react";

const ConversationContentView = forwardRef(
  ({ messageHistory, messageReceivedNow, myMemberId }, { ref }) => {
    return (
      <div className="conversation__content" ref={ref}>
        {messageHistory &&
          messageHistory.map((message) => {
            return <PartnerMessage message={message.message} />;
          })}

        {messageReceivedNow &&
          messageReceivedNow.map((message, id) => {
            return message.recvMemberId == myMemberId ? (
              <PartnerMessage message={message.message} key={id + 1} />
            ) : (
              <MyMessage message={message.message} key={id + 1} />
            );
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

      <MessageHorizontalLine />
    </>
  );
};

export default ConversationContentView;
