import React from "react";
import "./ConversationContent.scss";

const ConversationContentView = ({
  messageHistory,
  messageReceivedNow,
  myMemberId,
}) => {
  return (
    <div className="conversation__content">
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
};

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

const MyMessage = ({ message }) => {
  return (
    <div className="conversation__content__message__wrap " id="client-justify">
      <p className="conversation__content__message" id="client">
        {message}
      </p>
    </div>
  );
};
export default ConversationContentView;
