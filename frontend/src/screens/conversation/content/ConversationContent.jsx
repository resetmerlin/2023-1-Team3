import React from "react";
import "./ConversationContent.scss";
import ConversationContentView from "./ConversationContentView";

const ConversationContent = ({
  messageHistory,
  messageReceivedNow,
  myMemberId,
}) => {
  const props = {
    messageHistory: messageHistory,
    messageReceivedNow: messageReceivedNow,
    myMemberId: myMemberId,
  };

  return <ConversationContentView {...props} />;
};

export default ConversationContent;
