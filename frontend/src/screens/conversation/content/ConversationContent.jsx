import React from "react";
import "./ConversationContent.scss";
import PartnerMessage from "../../../components/PartnerMessage";
import MyMessage from "../../../components/MyMessage";

const ConversationContent = ({
  messageHistory,
  messageReceivedNow,
  myMemberId,
}) => {
  const props = {
    messageHistory: messageHistory,
    messageReceivedNow: messageReceivedNow,
  };

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

export default ConversationContent;
