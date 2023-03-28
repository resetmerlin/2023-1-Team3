import React from "react";
import Messages from "../components/Messages";
import MobileBottom from "../components/homeBottom/MobileBottom";
const MessageScreen = () => {
  return (
    <>
      <section className="message">
        <span className="message__title">Your conversation</span>
        <Messages />
        <MobileBottom />
      </section>
    </>
  );
};

export default MessageScreen;
